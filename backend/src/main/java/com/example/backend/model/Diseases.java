package com.example.springsocial.model;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.persistence.*;
import java.util.List;

@Entity
public class Diseases {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String did;
    @Column(unique=true)
    private String name;
    private String description;

    public Diseases(String did, String name, String description, List<Vaccines> vaccineId) {
        this.did = did;
        this.name = name;
        this.description = description;
    }
    public Diseases(){

    }

    public String getDid() {
        return did;
    }

    public void setDid(String did) {
        this.did = did;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
