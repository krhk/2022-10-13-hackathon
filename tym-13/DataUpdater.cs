using System.Net;

namespace skladFim
{
    public class DataUpdater
    {
        private const string PlannedAddress  = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Plánované_opravy_silniční_infrastruktury_na_rok_2022_liniové/FeatureServer/0/query?where=1%3D1&outFields=nazev_okresu,Shape__Length&outSR=4326&f=json";
        private const string CompleteAddress = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Opravy_silniční_infrastruktury_v_letech_2016_až_2021_liniové/FeatureServer/0/query?where=1%3D1&outFields=Shape__Length,nazev_okresu&outSR=4326&f=json";

        private Thread WeeklyDownload { get; set; }

        public DataUpdater()
        {
            
        }

        public void Download()
        {
            WebClient client = new();

            client.DownloadFile(CompleteAddress, "./complete.json");
            client.DownloadFile(PlannedAddress, "./planned.json");
        }
    }
}
