package cz.hackathon.hkbackend.rest;

import cz.hackathon.hkbackend.http.API;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {

    @GetMapping(path = "/data")
    public String returnAllData() {
        return API.getCachedData();
    }

}
