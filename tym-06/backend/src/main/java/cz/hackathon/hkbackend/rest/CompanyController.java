package cz.hackathon.hkbackend.rest;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import cz.hackathon.hkbackend.company.Employee;
import cz.hackathon.hkbackend.company.RootXmlNode;
import cz.hackathon.hkbackend.company.Utils;
import cz.hackathon.hkbackend.http.API;
import lombok.SneakyThrows;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompanyController {
    private static final ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);


    @SneakyThrows
    @GetMapping(path = "/compdata")
    public List<Employee> retrieveCompanyData(@RequestParam int ico) {
        String companyInfoXML = API.getCompanyInfo(ico);
        JSONObject jsonObject = XML.toJSONObject(companyInfoXML);
        String jsonString = jsonObject.toString(4);
        RootXmlNode uwu = objectMapper.readValue(jsonString, RootXmlNode.class);
        return Utils.Companion.parseToUsefullData(uwu);
    }
}

