package cz.hackathon.hkbackend.company;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;


public class ListOfEmployees {
    @JsonProperty("D:CSO")
    public List<XmlEmployeeNode> objects;
}