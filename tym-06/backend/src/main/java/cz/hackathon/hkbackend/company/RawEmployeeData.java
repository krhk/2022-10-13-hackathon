package cz.hackathon.hkbackend.company;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RawEmployeeData {
    @JsonProperty("D:F")
    public String pozice;
    @JsonProperty("D:FO")
    public RawPerson person;

    public Employee toUse() {
        return new Employee(person.name, person.surName, person.titul, pozice);
    }
}