package com.example.springsocial.controller;

import com.example.springsocial.model.Appointments;

import com.example.springsocial.service.AppointmentService;
import com.example.springsocial.util.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Transactional
@RestController
@RequestMapping(path="/appointment")
public class AppointmentController {
    @Autowired
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/createAppointment", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public ResponseEntity<?> createAppointment(@RequestParam Map<String, String> params, Appointments appointment, @RequestParam(value = "email") String email ) {
        String[] vaccineNumbers = params.get("vaccinePairs").split(",");
        String clinicId = params.get("clinicIds");
        String userId = params.get("userIds");

        List<String> vaccineList = Arrays.asList(vaccineNumbers);
        String text = "Your appointment is confirmed on" +  appointment.getFromTime();
        String Subject = "Appointment Confirmation";
        try {
            EmailUtil.sendMail(text, Subject, email);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        try {
            Appointments persistedAppointment = appointmentService.createAppointment(appointment,vaccineList,clinicId,userId);
            return ResponseEntity.accepted().body(persistedAppointment);
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getAppointmentsByAppointmentId", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public Appointments getAppointmentsByAppointmentId(@RequestParam(value = "appointmentId") String appointmentId) {
        try {
            Appointments persistedAppointment = appointmentService.getAppointmentsByAppointmentId(appointmentId);
            return persistedAppointment;
        }
        catch(Exception e) {
            return null;
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getAppointmentsByUserId", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public List<Appointments> getAppointmentsByUserId(@RequestParam(value = "userId") String userId) {
        try {
            List<Appointments> persistedAppointment = appointmentService.getAppointmentsByUserId(userId);
            return persistedAppointment;
        }
        catch(Exception e) {
            return null;
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getAllAppointments", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public List<Appointments> getAllAppointments() {
        try {
            List<Appointments> persistedAppointment = appointmentService.getAllAppointments();
            return persistedAppointment;
        }
        catch(Exception e) {
            return null;
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getAppointmentsByClinicId", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public List<Appointments> getAppointmentsByClinicId(@RequestParam(value = "clinicId") String clinicId) {
        System.out.print(clinicId);
        try {
            List<Appointments> persistedAppointment = appointmentService.getAppointmentsByClinicId(clinicId);
            return persistedAppointment;
        }
        catch(Exception e) {
            System.out.print(e);
            return null;
        }
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(value="/deleteAppointment", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public ResponseEntity<?> deleteAppointment(@RequestParam(value = "appointmentId") String appointmentId) {
        try {
            String persistedAppointment = appointmentService.deleteAppointment(appointmentId);
            return ResponseEntity.accepted().body(persistedAppointment);
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value="/updateAppointment", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public ResponseEntity<?> updateAppointment(@RequestParam Map<String, String> params , @RequestParam(value = "isCheckedIn") Boolean isCheckedIn, @RequestParam(value = "email") String email ) {
        String fromTime = params.get("fromTime");
        String appointmentDate = params.get("appointmentDate");
        String appointmentId = params.get("appointmentId");
        String text = "Your appointment is Updated on" +  appointmentDate +"at"+fromTime;
        String Subject = "Appointment Update Confirmation";
        try {
            EmailUtil.sendMail(text, Subject, email);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        try {
            Appointments persistedAppointment = appointmentService.updateAppointment( fromTime,isCheckedIn, appointmentDate, appointmentId);
            return ResponseEntity.accepted().body(persistedAppointment);
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }




    //@PreAuthorize("hasAuthority('user')")
//    @GetMapping(value = "/pastAppointment")
//    public ResponseEntity<?> pastAppointment(@RequestParam String date,@RequestParam String userId) {
//        try {
//            List<Appointments> responseAppointment = appointmentService.pastAppointment(date, userId);
//            return ResponseEntity.accepted().body(responseAppointment);
//        }
//        catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
//        }
//    }
//
//    //@PreAuthorize("hasAuthority('user')")
//    @GetMapping(value = "/pendingAppointment")
//    public ResponseEntity<?> pendingAppointment(@RequestParam String date, @RequestParam String userId) {
//        try {
//            List<Appointments> pending = appointmentService.pendingAppointment(date, userId);
//            return ResponseEntity.accepted().body(pending);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
//        }
//    }

}
