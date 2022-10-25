package com.example.hulsker

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


var data = Data()

@RestController
@RequestMapping("/api")
class Requests (val service: RequestService) {
        @GetMapping("/retrievedata/{typ}/{obec}")
        fun RetrieveData(@PathVariable obec: String, @PathVariable typ: String): String {
            return when(typ){
                "Kina" -> service.GetKina(obec)
                "Kluby" -> service.GetKluby(obec)
                "Centra" -> service.GetCentra(obec)
                else -> "Error"
            }
        }

        @GetMapping("/getrandom")
        fun GetRandom() : String {
            return service.GetRandom()
        }

        @GetMapping("/getcoords")
        fun GetCoords() : List<Double> {
            return service.GetCoords()
        }

        @GetMapping("/getnearest/{type}/{x},{y}")
        fun GetNearest(@PathVariable type: String,@PathVariable x: Float, @PathVariable y: Float): String {
            return service.GetNearest2(type,x,y)
        }

        @GetMapping("/getobce")
        fun GetObce(): String {
            return service.GetObce()
        }

}