package com.example.hulsker

import JavaCode
import com.google.gson.Gson
import org.springframework.stereotype.Service
import java.awt.geom.Point2D

@Service
class RequestService {

    fun GetKina(Obec : String) : String {
        val gson = Gson()
        val kina = data.KinaList.filter { it.attributes.nazev_obce == Obec }
        if(kina.size == 0) return if (GetKluby(Obec) != null) GetKluby(Obec)
        else if(GetCentra(Obec) != null) GetCentra(Obec)
        else "Nebylo nalezeno žádné kino"
        val json = gson.toJson(kina)
        return json
    }
    fun GetKluby(Obec: String) : String{
        val gson = Gson()
        val kluby = data.KlubyList.filter { it.attributes.nazev_obce == Obec }
        if(kluby.size == 0) return if (GetKina(Obec) != null) GetKina(Obec)
        else if(GetCentra(Obec) != null) GetCentra(Obec)
        else "Nebyly nalezeny žádné kluby"
        val json = gson.toJson(kluby)
        return json
    }
    fun GetCentra(Obec: String): String {
        val gson = Gson()
        val centra = data.CentraList.filter { it.attributes.nazev_obce == Obec }
        if(centra.size == 0) return if (GetKluby(Obec) != null) GetKluby(Obec)
        else if(GetKina(Obec) != null) GetKina(Obec)
        else "Nebylo nalezeno žádné kino"
        val json = gson.toJson(centra)
        return json
    }

    fun GetRandom() : String{
        val gson = Gson()
        val list = listOf(data.KinaList, data.KlubyList, data.CentraList)
        val randomList = list.random()
        val randomItem = randomList.random()
        return gson.toJson(randomItem)
    }


    fun GetNearest2(type: String, x: Float, y: Float) : String{

        var map: MutableMap<Point2D, String> = mutableMapOf()

        if(type == "Kina") {
            for (kino in data.KinaList) {
                map = map.plus(Point2D.Float(kino.attributes.x.toFloat(), kino.attributes.y.toFloat()) to kino.attributes.nazev) as MutableMap<Point2D, String>
            }
        }
        else if(type == "Kluby") {
            for (klub in data.KlubyList) {
                map = map.plus(Point2D.Float(klub.attributes.x.toFloat(), klub.attributes.y.toFloat()) to klub.attributes.nazev) as MutableMap<Point2D, String>
            }
        }
        else if(type == "Centra") {
            for (centrum in data.CentraList) {
                map = map.plus(Point2D.Float(centrum.attributes.x.toFloat(), centrum.attributes.y.toFloat()) to centrum.attributes.nazev) as MutableMap<Point2D, String>
            }
        }


        val list = map.keys.toList()
        val list2 = map.values.toList()

        return JavaCode.FindNearestPointFromList(list, list2, Point2D.Float(x, y))
    }

    data class nearestLocation(val name: String, val location: Point2D)


    data class listObci(val obce: Array<String>)

    fun GetObce() : String{

        var list : List<String> = listOf()

        for(kino in data.KinaList) {
            if (!list.contains(kino.attributes.nazev_obce))
                list = list.plus(kino.attributes.nazev_obce)
        }
        for(klub in data.KlubyList){
            if (!list.contains(klub.attributes.nazev_obce))
                list = list.plus(klub.attributes.nazev_obce)
        }
        for(centrum in data.CentraList)
        {
            if(!list.contains(centrum.attributes.nazev_obce))
                list = list.plus(centrum.attributes.nazev_obce)
        }
        val gson = Gson()
        return gson.toJson(list)

    }

    fun getObce2() {
       /* val gson = Gson()
        val kluby = data.KlubyList.filter { it.attributes.nazev_obce }
        val json = gson.toJson(kluby)*/
    }

    fun GetCoords(): List<Double> {
        var list : List<Double> = listOf()

        for(kino in data.KinaList) {
            if (!list.contains(kino.attributes.x))
                list = list.plus(kino.attributes.x)
            if (!list.contains(kino.attributes.y))
                list = list.plus(kino.attributes.y)
        }
        for(klub in data.KlubyList){
            if (!list.contains(klub.attributes.x))
                list = list.plus(klub.attributes.x)
            if (!list.contains(klub.attributes.y))
                list = list.plus(klub.attributes.y)
        }
        for(centrum in data.CentraList)
        {
            if(!list.contains(centrum.attributes.x))
                list = list.plus(centrum.attributes.x)
            if (!list.contains(centrum.attributes.y))
                list = list.plus(centrum.attributes.y)
        }
        return list
    }
}