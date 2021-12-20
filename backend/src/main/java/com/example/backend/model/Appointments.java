package com.example.springsocial.model;
import org.hibernate.annotations.GenericGenerator;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
@Entity
public class Appointments {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String aid;
    private String fromTime;
    private String toTime;
    @OneToOne(targetEntity = User.class)
    private User userId;
    @ManyToMany(targetEntity = Vaccines.class)
    private List<Vaccines> vaccineId;
    @OneToOne(targetEntity = Clinics.class)
    private Clinics clinicId;
    private boolean isCheckedIn;

    private String appointmentDate;

    public Appointments(String aid, String fromTime, String toTime, User userId, List<Vaccines> vaccineId, Clinics clinicId, boolean isCheckedIn, String appointmentDate) {
        this.aid = aid;
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.userId = userId;
        this.vaccineId = vaccineId;
        this.clinicId = clinicId;
        this.isCheckedIn = isCheckedIn;
        this.appointmentDate = appointmentDate;
    }

    public Appointments(){

    }
    public String getAid() {
        return aid;
    }

    public void setAid(String aid) {
        this.aid = aid;
    }

    public String getFromTime() {
        return fromTime;
    }

    public void setFromTime(String fromTime) {
        this.fromTime = fromTime;
    }

    public String getToTime() {
        return toTime;
    }

    public void setToTime(String toTime) {
        this.toTime = toTime;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public List<Vaccines> getVaccineId() {
        return vaccineId;
    }

    public void setVaccineId(List<Vaccines> vaccineId) {
        this.vaccineId = vaccineId;
    }

    public Clinics getClinicId() {
        return clinicId;
    }

    public void setClinicId(Clinics clinicId) {
        this.clinicId = clinicId;
    }

    public boolean isCheckedIn() {
        return isCheckedIn;
    }

    public void setCheckedIn(boolean checkedIn) {
        isCheckedIn = checkedIn;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }
}