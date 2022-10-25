import json

#import requests
from django.db import connection
from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from transports.models import IredoBusStop


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]


def findBuses(request: WSGIRequest, crzs: str):
    crzs = crzs.split('|')
    filter = []
    for item in crzs:
        filter.append(f"zastavka_crz = '{item}'")

    filter = 'OR '.join(filter)
    time_delta_future = 120
    time_delta_history = 5
    cursor = connection.cursor()
    sql = f"select licence_1, linka_1 as cekajici_linka, spoj_1 as cekajici_spoj, dopravce_1 as cekajici_dopravce, prijezd_1::time::text as prijezd_cekajiciho, odjezd_1::time::text as odjezd_cekajiciho ,zastavka_nazev, zastavka_crz, vycka as cekani_navaz_spoje, linka_2 as linka, spoj_2 as spoj, cas as pravidelny_prijezd " \
          f"from transports_waitingconnection where ({filter}) and prijezd_1::time <=  now()::time + INTERVAL '2 hour' + INTERVAL '{time_delta_future} minutes' and prijezd_1::time >=  now()::time + INTERVAL '2 hour' - INTERVAL '{time_delta_history} minutes' order by prijezd_1::time"
    cursor.execute(sql)

    rows = dictfetchall(cursor)

    # TODO: fetching live data from oredo and checking current state of transports
    # res = requests.get("https://tabule.oredo.cz/idspublicservices/api/service/position")
    # for row in rows:
    #     for item in res.json():
    #         if "lineNumber" in item.keys():
    #             if str(item["lineNumber"]) == row["licence_1"]:
    #                 row["delay"] = item["delay"]

    return HttpResponse(json.dumps(list(rows)), content_type="application/json")


from rest_framework.response import Response

from transports.models import IredoBusStop, IredoTrainStop
from transports.serializers import TrainStopSearchSerializer, BusStopSearchSerializer


@csrf_exempt
def bus_stop_search(request):
    if request.method == 'GET':
        search_term = request.GET.get('term')  # request.raw_post_data w/ Django < 1.4
        try:
            cursor = connection.cursor()
            cursor.execute(
                f"select nazev, string_agg(oznaceni::text, '|') as ids from transports_iredobusstop where nazev ilike '%{search_term}%' group by nazev")
            rows = cursor.fetchall()
            cursor.execute(
                f"select nazev, string_agg(id::text, '|') as ids from transports_iredotrainstop where nazev ilike '{search_term}' group by nazev")
            rows += cursor.fetchall()
            data_objects = []
            for row in rows:
                data_objects.append({
                    "label": row[0],
                    "value": row[1]
                })

            return HttpResponse(json.dumps(data_objects), content_type="application/json")
            # bus_stops = IredoBusStop.objects.filter(nazev=search_term).values("record_external_id", "nazev")
            # train_stops = IredoTrainStop.objects.filter(nazev=search_term).values("record_external_id", "nazev")
            # bus_json = BusStopSearchSerializer(bus_stops).data
            # train_json = TrainStopSearchSerializer(train_stops).data
            # Response({
            #     "trains": train_json,
            #     "buses": bus_json
            # })
        except KeyError:
            JsonResponse("Invalid lookup")
    return JsonResponse("Invalid method", safe=False)


@csrf_exempt
def get_all_stops(request):
    try:
        cursor = connection.cursor()
        cursor.execute(
            f"select nazev, string_agg(oznaceni::text, '|') as ids from transports_iredobusstop where oznaceni::text in (select zastavka_crz from transports_waitingconnection) group by nazev")
        rows = cursor.fetchall()
        cursor.execute(
            f"select nazev, string_agg(id::text, '|') as ids from transports_iredotrainstop  where oznaceni::text in (select zastavka_crz from transports_waitingconnection) group by nazev")
        rows += cursor.fetchall()
        data_objects = []
        for row in rows:
            data_objects.append([row[0], row[1]])

        return HttpResponse(json.dumps(data_objects), content_type="application/json")
        # bus_stops = IredoBusStop.objects.filter(nazev=search_term).values("record_external_id", "nazev")
        # train_stops = IredoTrainStop.objects.filter(nazev=search_term).values("record_external_id", "nazev")
        # bus_json = BusStopSearchSerializer(bus_stops).data
        # train_json = TrainStopSearchSerializer(train_stops).data
        # Response({
        #     "trains": train_json,
        #     "buses": bus_json
        # })
    except KeyError:
        JsonResponse("Invalid lookup")


def index(request):
    return render(request, "index.html")
