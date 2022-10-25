package cz.hackathon.hkbackend.object;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class SbirkyJson {
    private String type;
    private String name;
    public List<SbirkaFeature> features;

}