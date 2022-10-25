package cz.hackathon.hkbackend.rest

import cz.hackathon.hkbackend.http.API
import cz.hackathon.hkbackend.`object`.*
import org.springframework.web.bind.annotation.*
import kotlin.math.atan2
import kotlin.math.cos
import kotlin.math.sin
import kotlin.math.sqrt

@RestController
class QueryApi {
    private fun getDistance(lat1: Double, lon1: Double, lat2: Double, lon2: Double): Double {
        val metersRatio = 6371e3 // ratio
        val idk1 = lat1 * Math.PI / 180
        val idk2 = lat2 * Math.PI / 180
        val idk3 = (lat2 - lat1) * Math.PI / 180
        val idk = (lon2 - lon1) * Math.PI / 180
        val a = sin(idk3 / 2) * sin(idk3 / 2) + cos(idk1) * cos(idk2) *
                sin(idk / 2) * sin(idk / 2)
        val c = 2 * atan2(sqrt(a), sqrt(1 - a))
        return metersRatio * c // in metres
    }

    @GetMapping("/query")
    fun getQueried(
            @RequestParam(required = false) name: String?,
            @RequestParam(required = false) x: Double?,
            @RequestParam(required = false) y: Double?,
            @RequestParam(required = false) distance: Double?,
            @RequestParam(required = false) type: String?,
            @RequestParam(required = false) amount: Int?,
            @RequestParam(required = false) sortBy: String?,
            @RequestParam(required = false) sort: String?
    ): List<SbirkaFeature> {
        var features: List<SbirkaFeature> = API.cachedSbirkyJson.features

        if (x != null && y != null) {
            features.forEach {
                it.properties.distance = getDistance(it.properties.x, it.properties.y, x, y)
            }
        }

        if (x != null && y != null && distance != null) {
            features = features.filter {
                it.properties.distance < distance
            }
        }
        if (sortBy != null) {
            // tip for reader never use === in kotlin :)
            if (sortBy == "distance" && x != null && y != null) {
                features = features.sortedBy {
                    it.properties.distance
                }
            }
            else if (sortBy == "name") {
                features.sortedBy {
                    it.properties.nazev
                }
            }
        }

        if (sort != null) {
            features = features.reversed()
        }

        return features
    }
}