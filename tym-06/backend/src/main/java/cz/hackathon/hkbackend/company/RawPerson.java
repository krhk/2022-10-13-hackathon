package cz.hackathon.hkbackend.company;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RawPerson {
    @JsonProperty("D:J")
    public String name;
    @JsonProperty("D:P")
    public String surName;
    @JsonProperty("D:TP")
    public String titul;
}