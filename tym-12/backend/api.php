<?php
include 'fetch.php';
foreach ($_GET as $ke => $valu) {
$type = 0;
if ($type == 0) {
    $url = "";
    $res = GetFromApi(base64_decode($ke));
    for ($i = 0; $i < count($res); $i++) {
        $lat = $res[$i]['geometry']["y"];
        if($lat==NULL) $lat = $res[$i]['geometry']["coordinates"][0];
        $lon = $res[$i]['geometry']["x"];
        if($lon==NULL) $lon = $res[$i]['geometry']["coordinates"][1];
        if (isset($res[$i]['attributes'])) {
            $name = $res[$i]['attributes']["Název"];
            unset($res[$i]['attributes']["Název"]);
            $street = $res[$i]['attributes']["Název ulice"];
            unset($res[$i]['attributes']["Název ulice"]);
            $city = $res[$i]['attributes']["Název obce"];
            unset($res[$i]['attributes']["Název obce"]);
            $number = $res[$i]['attributes']["Číslo popisné nebo evidenční podle typu čísla domovního"];
            unset($res[$i]['attributes']["Číslo popisné nebo evidenční podle typu čísla domovního"]);
            $zip = $res[$i]['attributes']["PSČ"];
            unset($res[$i]['attributes']["PSČ"]);
            $text = "";
            foreach ($res[$i]['attributes'] as $key => $value) {
                $text .= "$key : $value <br>";
            }
            DrawPoint($lon, $lat, "Název: $name <br> Adresa:$street $number <br> Obec:$city<br> PSČ:$zip<br>$text");
        } else {
            $name = $res[$i]['properties']["nazev"];
            unset($res[$i]['properties']["nazev"]);
            $street = $res[$i]['properties']["nazev_ulice"];
            unset($res[$i]['properties']["nazev_ulice"]);
            $city = $res[$i]['properties']["nazev_obce"];
            unset($res[$i]['properties']["nazev_obce"]);
            $number = $res[$i]['properties']["typ_cisla_domovniho"] . $res[$i]['attributes']["cislo_domovni"] . "/" . $res[$i]['attributes']["cislo_orientacni"];
            unset($res[$i]['properties']["typ_cisla_domovniho"]);
            unset($res[$i]['properties']["cislo_domovni"]);
            unset($res[$i]['properties']["cislo_orientacni"]);
            $zip = $res[$i]['properties']["psc"];
            unset($res[$i]['properties']["psc"]);
            $text = "";
            foreach ($res[$i]['properties'] as $key => $value) {
                $text .= "$key : $value <br>";
            }
            DrawPoint($lon, $lat, "Název: $name <br> Adresa:$street $number <br> Obec:$city<br> PSČ:$zip<br>$text");
        }

    }
}
}/* else if ($type == 1) {
    $url = "";
    $res = GetFromApi($url);
    for ($i = 0; $i < count($res); $i++) {
        $lonlat = $res[$i]["lonlat"];
        DrawPolyLine($lonlat, "");
    }
} else {
    $url = "";
    $res = GetFromApi($url);
    for ($i = 0; $i < count($res); $i++) {
        $lonlat = $res[$i]["lonlat"];
        DrawPolygon($lonlat, "");
    }
}*/
//DrawPoint(50.19840000000004, 15.83370000000008, "\"Hlavní budova\"");
function DrawPoint($x, $y, $text)
{
    print(" <Marker position={[$x,$y]}>
      <Popup>
        $text
      </Popup>
    </Marker>");
}

function DrawPolyLine($lonlats, $text)
{
    print("");
}

function DrawPolygon($lonlats, $text)
{
    print("L.polygon($lonlats).addTo(map).bindPopup($text)");
}

?>