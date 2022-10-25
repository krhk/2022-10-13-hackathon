from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from transports.models import IredoBusStop

from import_export import resources


class IredoBusStopResource(resources.ModelResource):

    class Meta:
        model = IredoBusStop


@admin.register(IredoBusStop)
class IredoBusStopAdmin(ImportExportModelAdmin):
    resource_class = IredoBusStopResource
