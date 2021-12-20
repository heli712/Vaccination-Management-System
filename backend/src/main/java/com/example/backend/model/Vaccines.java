package com.example.springsocial.model;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.persistence.*;
import java.util.List;
@Entity
public class Vaccines {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String vid;
    @Column(unique=true)
    private String name;
    private String manufacturer;
    private int numberOfShots;
    private int shotIntervalValue;
    private int duration; // -1 = lifetime

    @OneToMany(targetEntity = Diseases.class)
    private List<Diseases> diseaseId;

    public Vaccines(String vid, String name, String manufacturer, int numberOfShots, int shotIntervalValue, int duration, List<Diseases> diseaseId) {
        this.vid = vid;
        this.name = name;
        this.manufacturer = manufacturer;
        this.numberOfShots = numberOfShots;
        this.shotIntervalValue = shotIntervalValue;
        this.duration = duration;
        this.diseaseId = diseaseId;
    }

    public Vaccines(){

    }

    public String getVid() {
        return vid;
    }

    public void setVid(String vid) {
        this.vid = vid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public int getNumberOfShots() {
        return numberOfShots;
    }

    public void setNumberOfShots(int numberOfShots) {
        this.numberOfShots = numberOfShots;
    }

    public int getShotIntervalValue() {
        return shotIntervalValue;
    }

    public void setShotIntervalValue(int shotIntervalValue) {
        this.shotIntervalValue = shotIntervalValue;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }


    public List<Diseases> getDiseaseId() {
        return diseaseId;
    }

    public void setDiseaseId(List<Diseases> diseaseId) {
        this.diseaseId = diseaseId;
    }


}
