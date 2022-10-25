from rest_framework import serializers

from transports.models import IredoBusStop, IredoTrainStop


class BusStopSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = IredoBusStop
        fields = [
            "record_external_id",
            "nazev",
        ]

class TrainStopSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = IredoTrainStop
        fields = [
            "record_external_id",
            "nazev",
        ]