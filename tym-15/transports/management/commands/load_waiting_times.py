import csv
import os

from django.conf import settings
from django.core.management.base import BaseCommand
from transports.models import WaitingConnection
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    def handle(self, **options):
        # docs: https://docs.djangoproject.com/en/4.1/howto/custom-management-commands/
        data_dir = getattr(settings, "DATA_DIR")
        with open(os.path.join(data_dir, "WaitingTimes.csv"), encoding="utf-8") as f:
            reader = csv.reader(f)
            for index, row in enumerate(reader):
                if index == 0:
                    continue
                if index % 200 == 0:
                    logger.info(f"Importing now on row {index+1}")
                    print(f"Importing now on row {index+1}")
                _, created = WaitingConnection.objects.get_or_create(
                    record_external_id=row[0],
                    linka_1=row[1],
                    licence_1=row[2],
                    spoj_1=row[3],
                    dopravce_1=row[4],
                    tarifni_cislo_1=row[5],
                    prijezd_1=row[6],
                    ceka_1=row[7],
                    odjezd_1=row[8],
                    zastavka_crz=row[9].replace(u'\xa0', u' '),
                    zastavka_nazev=row[10],
                    vycka=row[11],
                    typ=row[12],
                    linka_2=row[13],
                    licence_2=row[14],
                    spoj_2=row[15],
                    dopravce_2=row[15],
                    z_do=row[15],
                    cas=row[15],
                    dp_id=row[15],
                )