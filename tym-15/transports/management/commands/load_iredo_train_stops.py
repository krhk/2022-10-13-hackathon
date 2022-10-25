import csv
import os

from django.conf import settings
from django.core.management.base import BaseCommand
from transports.models import IredoTrainStop
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    def handle(self, **options):
        # docs: https://docs.djangoproject.com/en/4.1/howto/custom-management-commands/
        data_dir = getattr(settings, "DATA_DIR")
        with open(os.path.join(data_dir, "IredoTrainStops.csv"), encoding="utf-8") as f:
            reader = csv.reader(f)
            for index, row in enumerate(reader):
                if index == 0:
                    continue
                if index % 200 == 0:
                    logger.info(f"Importing now on row {index+1}")
                    print(f"Importing now on row {index+1}")
                _, created = IredoTrainStop.objects.get_or_create(
                    record_external_id=row[0],
                    nazev=row[1],
                    oznaceni=row[2],
                    typ=row[3],
                    nazev_vusc=row[4],
                    kod_vusc=row[5],
                    nazev_okresu=row[6],
                    kod_okresu=row[7],
                    nazev_orp=row[8],
                    kod_orp=row[9],
                    nazev_obce=row[10],
                    kod_obce=row[11],
                    wkt=row[12],
                    x=row[13],
                    y=row[14],
                    dp_id=row[15],
                )