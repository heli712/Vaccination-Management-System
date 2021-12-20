package com.example.springsocial.model;
import org.hibernate.annotations.GenericGenerator;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.persistence.*;
import java.util.List;
@Entity
public class PatientVaccinations {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String pvid;
    @OneToOne(targetEntity = User.class)
    private String patientId;
    @OneToOne(targetEntity = Vaccines.class)
    private String vaccineId;
    @OneToOne(targetEntity = User.class)
    private String doctorId;

    public PatientVaccinations(String pvid, String patientId, String vaccineId, String doctorId) {
        this.pvid = pvid;
        this.patientId = patientId;
        this.vaccineId = vaccineId;
        this.doctorId = doctorId;
    }

    public String getPvid() {
        return pvid;
    }

    public void setPvid(String pvid) {
        this.pvid = pvid;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getVaccineId() {
        return vaccineId;
    }

    public void setVaccineId(String vaccineId) {
        this.vaccineId = vaccineId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }


}
