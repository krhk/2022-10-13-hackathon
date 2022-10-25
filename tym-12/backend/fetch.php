<?php
function GetFromApi($apiurl)
{
    //$apiurl = 'https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/N%C3%A1rodn%C3%AD_kulturn%C3%AD_pam%C3%A1tky_na_indikativn%C3%ADm_seznamu/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $apiurl);
    $content = curl_exec($ch);
    curl_close($ch);
    $decoded = json_decode($content, true);
    if (isset($decoded['features'])) {
        if (isset($decoded['fields'])) {
            if (isset($decoded['fields'][0]['alias'])) {
                for ($x = 0; $x < count($decoded['fields']); $x++) {
                    for ($y = 0; $y < count($decoded['features']); $y++) {
                        $decoded['features'][$y]['attributes'][$decoded['fields'][$x]['alias']] = $decoded['features'][$y]['attributes'][$decoded['fields'][$x]['name']];
                        unset($decoded['features'][$y]['attributes'][$decoded['fields'][$x]['name']]);
                    }
                }
            }
        }
    }
    return($decoded['features']);
}
//print_r(GetFromApi(""));
?>


