package cz.hackathon.hkbackend.company;

import com.fasterxml.jackson.annotation.JsonProperty;

public class XmlEmployeeNode {
    @JsonProperty("D:C")
    public RawEmployeeData field;
}