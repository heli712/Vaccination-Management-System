package com.example.springsocial.repository;


import com.example.springsocial.model.Appointments;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AppointmentRepository  extends CrudRepository<Appointments, Integer> {
    Appointments findByAid(String id);
    void deleteByAid(String id);
    List<Appointments> findAllByUserId(String userId);
    List<Appointments> findAllByClinicId(String clinicId);


    @Query(value = "SELECT * FROM appointments WHERE date < ?1 AND userId = ?2;", nativeQuery = true)
    List<Appointments> findpastAppointment(String date, String userId);

    @Query(value = "select * from appointments where date > ?1 and userId = ?2;", nativeQuery = true)
    List<Appointments> findpendingAppointment(String date, String userId);

}
