from django.db import models


class WaitingConnection(models.Model):
    # based on Čekací doby autobusových linek IREDO from https://www.datakhk.cz/datasets/36c1829c77d04e6bb60e6ade221887a2_0/explore
    record_external_id = models.CharField(max_length=30, blank=True, null=True)
    vycka = models.IntegerField(blank=True, null=True)
    zastavka_crz = models.CharField(max_length=255, blank=True, null=True)
    z_do = models.CharField(max_length=255, blank=True, null=True)
    typ = models.CharField(max_length=255, blank=True, null=True)
    dopravce_2 = models.CharField(max_length=255, blank=True, null=True)
    dopravce_1 = models.CharField(max_length=255, blank=True, null=True)
    prijezd_1 = models.CharField(max_length=255, blank=True, null=True)
    spoj_2 = models.CharField(max_length=255, blank=True, null=True)
    spoj_1 = models.IntegerField(blank=True, null=True)
    linka_2 = models.CharField(max_length=255, blank=True, null=True)
    cas = models.CharField(max_length=255, blank=True, null=True)
    linka_1 = models.CharField(max_length=255, blank=True, null=True)
    tarifni_cislo_1 = models.IntegerField(blank=True, null=True)
    odjezd_1 = models.CharField(max_length=255, blank=True, null=True)
    licence_1 = models.IntegerField(blank=True, null=True)
    ceka_1 = models.CharField(max_length=255, blank=True, null=True)
    zastavka_nazev = models.CharField(max_length=255, blank=True, null=True)
    dp_id = models.CharField(max_length=255, blank=True, null=True)
    licence_2 = models.CharField(max_length=255, blank=True, null=True)
    objectid = models.IntegerField(blank=True, null=True)


class OredoTransportService(models.Model):
    # based on oredo public api data https://tabule.oredo.cz/idspublicservices/api/service/position
    record_external_id = models.CharField(max_length=30, blank=True, null=True)
    vehicletype = models.CharField(max_length=255, blank=True, null=True)
    linenumber = models.IntegerField(blank=True, null=True)
    trainNumber = models.CharField(max_length=255, blank=True, null=True)
    servicenumber = models.IntegerField(blank=True, null=True)
    linetype = models.CharField(max_length=255, blank=True, null=True)
    lon = models.CharField(max_length=255, blank=True, null=True)
    dest = models.CharField(max_length=255, blank=True, null=True)
    dep = models.CharField(max_length=255, blank=True, null=True)
    operator = models.CharField(max_length=255, blank=True, null=True)
    desttime = models.CharField(max_length=255, blank=True, null=True)
    delay = models.CharField(max_length=255, blank=True, null=True)
    deptime = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    angle = models.IntegerField(blank=True, null=True)
    sourcetype = models.CharField(max_length=255, blank=True, null=True)
    time = models.CharField(max_length=255, blank=True, null=True)
    lat = models.CharField(max_length=255, blank=True, null=True)
    desc = models.CharField(max_length=255, blank=True, null=True)

class IredoTrainStop(models.Model):
    # based on https://www.datakhk.cz/datasets/66e5464b30b24d30b32ccba724b9e86e_0/explore?location=50.368288%2C15.814465%2C9.95
    record_external_id = models.CharField(max_length=30, blank=True, null=True)
    nazev = models.CharField(max_length=255, blank=True, null=True)
    oznaceni = models.IntegerField(blank=True, null=True)
    typ = models.CharField(max_length=255, blank=True, null=True)
    nazev_vusc = models.CharField(max_length=255, blank=True, null=True)
    kod_vusc = models.CharField(max_length=255, blank=True, null=True)
    nazev_okresu = models.CharField(max_length=255, blank=True, null=True)
    kod_okresu = models.CharField(max_length=255, blank=True, null=True)
    nazev_orp = models.CharField(max_length=255, blank=True, null=True)
    kod_orp = models.CharField(max_length=255, blank=True, null=True)
    nazev_obce = models.CharField(max_length=255, blank=True, null=True)
    kod_obce = models.IntegerField(blank=True, null=True)
    wkt = models.CharField(max_length=255, blank=True, null=True)
    x = models.CharField(max_length=255, blank=True, null=True)
    y = models.CharField(max_length=255, blank=True, null=True)
    dp_id = models.CharField(max_length=255, blank=True, null=True)


class IredoBusStop(models.Model):
    # based on https://www.datakhk.cz/datasets/ab928607832141f8bebb36261593107a_0/explore?location=50.363318%2C15.786612%2C9.63
    record_external_id = models.CharField(max_length=30, blank=True, null=True)
    wkt = models.CharField(max_length=255, blank=True, null=True)
    nazev_okresu = models.CharField(max_length=255, blank=True, null=True)
    nazev = models.CharField(max_length=255, blank=True, null=True)
    kod_vusc = models.CharField(max_length=255, blank=True, null=True)
    oznaceni = models.IntegerField(blank=True, null=True)
    kod_obce = models.IntegerField(blank=True, null=True)
    nazev_orp = models.CharField(max_length=255, blank=True, null=True)
    kod_okresu = models.CharField(max_length=255, blank=True, null=True)
    nazev_obce = models.CharField(max_length=255, blank=True, null=True)
    nazev_vusc = models.CharField(max_length=255, blank=True, null=True)
    x = models.CharField(max_length=255, blank=True, null=True)
    y = models.CharField(max_length=255, blank=True, null=True)
    dp_id = models.CharField(max_length=255, blank=True, null=True)
    kod_orp = models.CharField(max_length=255, blank=True, null=True)
    objectid = models.CharField(max_length=255, blank=True, null=True)

