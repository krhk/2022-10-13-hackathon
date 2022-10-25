using Newtonsoft.Json;
namespace hackathon.Server.Api;
public class Feature
{
    [JsonProperty("type")]
    public string? Type { get; set; }

    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("geometry")]
    public Geometry? Geometry { get; set; }

    [JsonProperty("properties")]
    public Properties? Properties { get; set; }
}

public class Geometry
{
    [JsonProperty("type")]
    public string? Type { get; set; }

    [JsonProperty("coordinates")]
    public List<double>? Coordinates { get; set; }
}

public class Properties
{
    [JsonProperty("bez_barier")]
    public string? BezBarier { get; set; }
    [JsonProperty("nazev")]
    public string? Nazev { get; set; }

    [JsonProperty("popis")]
    public string? Popis { get; set; }

    [JsonProperty("nazev_vusc")]
    public string? NazevVusc { get; set; }

    [JsonProperty("kod_vusc")]
    public string? KodVusc { get; set; }

    [JsonProperty("nazev_okresu")]
    public string? NazevOkresu { get; set; }

    [JsonProperty("kod_okresu")]
    public string? KodOkresu { get; set; }

    [JsonProperty("nazev_orp")]
    public string? NazevOrp { get; set; }

    [JsonProperty("kod_orp")]
    public string? KodOrp { get; set; }

    [JsonProperty("nazev_obce")]
    public string? NazevObce { get; set; }

    [JsonProperty("kod_obce")]
    public string? KodObce { get; set; }

    [JsonProperty("nazev_ulice")]
    public string? NazevUlice { get; set; }

    [JsonProperty("cislo_domovni")]
    public string? CisloDomovni { get; set; }

    [JsonProperty("typ_cisla_domovniho")]
    public string? TypCislaDomovniho { get; set; }

    [JsonProperty("cislo_orientacni")]
    public object? CisloOrientacni { get; set; }

    [JsonProperty("psc")]
    public string? Psc { get; set; }

    [JsonProperty("www")]
    public string? Www { get; set; }

    [JsonProperty("telefon")]
    public string? Telefon { get; set; }

    [JsonProperty("wkt")]
    public string? Wkt { get; set; }

    [JsonProperty("x")]
    public double? X { get; set; }

    [JsonProperty("y")]
    public double? Y { get; set; }

    [JsonProperty("dp_id")]
    public string? DpId { get; set; }

    [JsonProperty("ds_id")]
    public string? DsId { get; set; }

    [JsonProperty("OBJECTID")]
    public int OBJECTID { get; set; }
}

public class ResponseData
{
    [JsonProperty("type")]
    public string? Type { get; set; }

    [JsonProperty("features")]
    public List<Feature>? Features { get; set; }
}


