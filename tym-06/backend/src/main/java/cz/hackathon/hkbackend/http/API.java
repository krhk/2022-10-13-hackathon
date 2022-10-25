package cz.hackathon.hkbackend.http;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import cz.hackathon.hkbackend.object.SbirkyJson;
import lombok.Getter;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Component
public class API {

    @Getter
    public static String cachedData;
    @Getter
    public static SbirkyJson cachedSbirkyJson;

    private static final OkHttpClient client = new OkHttpClient.Builder().build();
    private static final ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    private static final String DATA_URL = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Veřejné_sbírky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
    private static final String COMPANY_URL_TEMPLATE = "https://wwwinfo.mfcr.cz/cgi-bin/ares/darv_or.cgi?ico=";

    public static String getUpdatedData() {
        Request request = new Request.Builder()
                .url(DATA_URL)
                .build();
        Response response;
        try {
            response = client.newCall(request).execute();
            String res = response.body().string();
            if (!res.equals("")) {
                cachedData = res;
                cachedSbirkyJson = getData(cachedData);
            }
            return res;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static SbirkyJson getData(String json) {
        try {
            return objectMapper.readValue(json, SbirkyJson.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getCompanyInfo(int ico) {
        Request request = new Request.Builder()
                .url(COMPANY_URL_TEMPLATE + ico)
                .build();
        Response response;
        try {
            response = client.newCall(request).execute();
            return response.body().string();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
