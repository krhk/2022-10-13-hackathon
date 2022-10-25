package com.example.hulsker

import com.google.gson.Gson
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.URL

class Data {

    constructor(){
        GetData()
    }

    fun GetData() {
        val gson = Gson()

        val KlubyJsonString = getJSON("https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Kluby/FeatureServer/0/query?where=1%3D1&outFields=nazev,popis,x,y,nazev_obce,nazev_ulice,cislo_domovni,www,telefon,cislo_orientacni,typ_cisla_domovniho,wkt&outSR=4326&f=json")
        val KlubyJsonData = KlubyJsonString.split("features\":")[1]
        val KlubyJsonData2 = KlubyJsonData.substring(0, KlubyJsonData.length - 1)
        KlubyList = gson.fromJson(KlubyJsonData2, KlubyData::class.java)

        val KinaJsonString = getJSON("https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Kina/FeatureServer/0/query?where=1%3D1&outFields=nazev,provozovatel,bez_barier,typ_kina,nazev_okresu,nazev_obce,nazev_ulice,cislo_domovni,typ_cisla_domovniho,x,y&outSR=4326&f=json")
        val KinaJsonData = KinaJsonString.split("features\":")[1]
        val KinaJsonData2 = KinaJsonData.substring(0, KinaJsonData.length - 1)
        KinaList = gson.fromJson(KinaJsonData2, KinaData::class.java)

        val CentraJsonString = getJSON("https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Z%C3%A1bavn%C3%AD_centra/FeatureServer/0/query?where=1%3D1&outFields=nazev,popis,nazev_obce,nazev_ulice,cislo_domovni,typ_cisla_domovniho,www,telefon,x,y,cislo_orientacni&outSR=4326&f=json")
        val CentraJsonData = CentraJsonString.split("features\":")[1]
        val CentraJsonData2 = CentraJsonData.substring(0, CentraJsonData.length - 1)
        CentraList = gson.fromJson(CentraJsonData2, CentraData::class.java)

    }

    lateinit var KinaList : KinaData
    lateinit var KlubyList : KlubyData
    lateinit var CentraList : CentraData

    class KinaData : ArrayList<KinaDataItem>()

    data class KinaDataItem(
        val attributes: KinaAttributes,
        val geometry: KinaGeometry
    )

    data class KinaAttributes(
        val bez_barier: String,
        val cislo_domovni: String,
        val nazev: String,
        val nazev_obce: String,
        val nazev_okresu: String,
        val nazev_ulice: String,
        val provozovatel: String,
        val typ_cisla_domovniho: String,
        val typ_kina: String,
        val x: Double,
        val y: Double
    )

    data class KinaGeometry(
        val x: Double,
        val y: Double
    )

    class CentraData : ArrayList<CentraDataItem>()

    data class CentraDataItem(
        val attributes: CentraAttributes,
        val geometry: CentraGeometry
    )

    data class CentraAttributes(
        val cislo_domovni: String,
        val cislo_orientacni: String,
        val nazev: String,
        val nazev_obce: String,
        val nazev_ulice: String,
        val popis: String,
        val telefon: String,
        val typ_cisla_domovniho: String,
        val www: String,
        val x: Double,
        val y: Double
    )

    data class CentraGeometry(
        val x: Double,
        val y: Double
    )

    class KlubyData : ArrayList<KlubyDataItem>()

    data class KlubyDataItem(
        val attributes: KlubyAttributes,
        val geometry: KlubyGeometry
    )

    data class KlubyAttributes(
        val cislo_domovni: String,
        val cislo_orientacni: String,
        val nazev: String,
        val nazev_obce: String,
        val nazev_ulice: String,
        val popis: String,
        val telefon: String,
        val typ_cisla_domovniho: String,
        val wkt: String,
        val www: String,
        val x: Double,
        val y: Double
    )

    data class KlubyGeometry(
        val x: Double,
        val y: Double
    )

    fun getJSON(url: String): String {
        val url = URL(url)
        val con: HttpURLConnection = url.openConnection() as HttpURLConnection
        con.setRequestProperty("Content-Type", "application/json; utf-8")
        con.setRequestProperty("Accept", "application/json")
        con.requestMethod = "GET"
        val responseCode = con.responseCode
        con.connectTimeout = 5000
        con.readTimeout = 5000
        println("GET Response Code :: $responseCode")
        return if (responseCode == HttpURLConnection.HTTP_OK) { // success
            val inStream = con.inputStream
            val response = convertStreamToString(inStream)
            //println(response)
            con.disconnect()
            response
        } else {
            println("GET request not worked")
            con.disconnect()
            ""
        }
    }

    private fun convertStreamToString(`is`: InputStream): String {
        val s = java.util.Scanner(`is`).useDelimiter("\\A")
        return if (s.hasNext()) s.next() else ""
    }
}

