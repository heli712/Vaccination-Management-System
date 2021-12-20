package com.example.springsocial.model;
import org.hibernate.annotations.GenericGenerator;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.persistence.*;
import java.util.List;
@Entity
public class Clinics {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String cid;
    @Column(unique=true)
    private String name;
    private String street;
    private String city;
    private String state;
    private String zipcode;
    private String openingTime;
    private String closingTime;
    private int numberOfPhysicians;

    @ManyToMany(targetEntity = Vaccines.class)
    private List<Vaccines> vaccineId;

    public Clinics(String cid, String name, String street,String city,String state,String zipcode, String openingTime, String closingTime, int numberOfPhysicians, List<Vaccines> vaccineId) {
        this.cid = cid;
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.numberOfPhysicians = numberOfPhysicians;
        this.vaccineId = vaccineId;
    }

    public Clinics(){

    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
    }

    public String getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(String closingTime) {
        this.closingTime = closingTime;
    }

    public int getNumberOfPhysicians() {
        return numberOfPhysicians;
    }

    public void setNumberOfPhysicians(int numberOfPhysicians) {
        this.numberOfPhysicians = numberOfPhysicians;
    }
    public List<Vaccines> getVaccineId() {
        return vaccineId;
    }

    public void setVaccineId(List<Vaccines> vaccineId) {
        this.vaccineId = vaccineId;
    }
}