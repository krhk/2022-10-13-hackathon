import csv
import os

from django.conf import settings
from django.core.management.base import BaseCommand
from transports.models import IredoBusStop
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    def handle(self, **options):
        # docs: https://docs.djangoproject.com/en/4.1/howto/custom-management-commands/
        data_dir = getattr(settings, "DATA_DIR")
        with open(os.path.join(data_dir, "IredoBusStops.csv"), encoding="utf-8") as f:
            reader = csv.reader(f)
            for index, row in enumerate(reader):
                if index == 0:
                    continue
                if index % 200 == 0:
                    logger.info(f"Importing now on row {index+1}")
                    print(f"Importing now on row {index+1}")
                _, created = IredoBusStop.objects.get_or_create(
                    record_external_id=row[0],
                    nazev=row[1],
                    oznaceni=row[2],
                    nazev_vusc=row[3],
                    kod_vusc=row[4],
                    nazev_okresu=row[5],
                    kod_okresu=row[6],
                    nazev_orp=row[7],
                    kod_orp=row[8],
                    nazev_obce=row[9],
                    kod_obce=row[10],
                    wkt=row[11],
                    x=row[12],
                    y=row[13],
                    dp_id=row[14],
                )