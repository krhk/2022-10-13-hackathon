package cz.hackathon.hkbackend.object;

import lombok.Data;

@Data
public class SbirkaProperties {
    public int OBJECTID;
    public String nazev;
    public String ico;
    public String pravni_forma;
    public String  misto_konani;
    public String  ucel;
    public String zahajeni;
    public String ukonceni;
    public String cislo_bankovniho_uctu;
    public String www;
    public String nazev_vusc;
    public String kod_vusc;
    public String nazev_okresu;
    public String kod_okresu;
    public String nazev_orp;
    public String kod_orp;
    public String nazev_obce;
    public String kod_obce;
    public String nazev_ulice;
    public String cislo_domovni;
    public String typ_cisla_domovni;
    public String cislo_orienacni;
    public String psc;
    public String wkt;
    public double x;
    public double y;
    public String dp_id;
    public double distance;
}