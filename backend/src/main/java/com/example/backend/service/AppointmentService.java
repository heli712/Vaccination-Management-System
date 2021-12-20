//package com.example.springsocial.service;
//import com.example.springsocial.model.Appointments;
//import com.example.springsocial.repository.AppointmentRepository;
//import javassist.NotFoundException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.UnexpectedRollbackException;
//import org.springframework.web.bind.annotation.*;
//import javax.persistence.*;
//import java.sql.SQLIntegrityConstraintViolationException;
//import java.util.List;
//import java.util.UUID;
//
//@Service
////@SqlResultSetMapping(name="updatePassengerDetails", columns = { @ColumnResult(name = "count")})
////@NamedNativeQueries({
////        @NamedNativeQuery(
////                name    =   "updatePassengerDetails",
////                query   =   "UPDATE passenger SET firstname = ?, lastname = ?, phone=?, age = ?, gender = ? WHERE id = ?"
////                ,resultSetMapping = "updateResult"
////        )
////})
//
//
//public class AppointmentService {
//    @Autowired // This means to get the bean called userRepository
//    private AppointmentRepository appointmentRepository;
//
//    @GetMapping
//    public @ResponseBody
//    List<Appointments> getAppointments(String userId){
//        return appointmentRepository.findAllByUserId(userId);
//    }
//
//
//    @PostMapping
//    public Appointments createAppointment(Appointments appointmentDetails) throws Exception {
//        Appointments newAppointment = null;
//        try {
//            newAppointment = appointmentRepository.save(appointmentDetails);
//        }
//        catch(DataIntegrityViolationException ex){
//            throw new Exception("constraint violation", ex);
//        }
//        return newAppointment;
//    }
//
//    @PutMapping()
//    public Appointments updateAppointment(Appointments appointmentDetails, String appointmentId) throws Exception {
//        Appointments existingAppointment = null;
//        try{
//            existingAppointment = appointmentRepository.findByAid(appointmentId);
//            existingAppointment.setFromTime(appointmentDetails.getFromTime());
//            existingAppointment.setToTime(appointmentDetails.getToTime());
//            existingAppointment.setUserId(appointmentDetails.getUserId());
//            existingAppointment.setClinicId(appointmentDetails.getClinicId());
//            existingAppointment.setVaccineId(appointmentDetails.getVaccineId());
//            appointmentRepository.save(existingAppointment);
//        }
//        catch(DataIntegrityViolationException ex){
//            System.out.println("Already exists");
//            throw new Exception("constraint violation", ex);
//        }
//        return existingAppointment;
//    }
//
//    @DeleteMapping()
//    public String deleteAppointment(String appointmentId) {
//        Appointments existingAppointment = appointmentRepository.findByAid(appointmentId);
//        if(existingAppointment!=null){
//            appointmentRepository.deleteByAid(appointmentId);
//            return "Deleted Successfully";
//        }
//        return "-1";
//    }
//
//    @GetMapping
//    public List<Appointments> pastAppointment(String date, String userId) {
//        List<Appointments> pastingAppointment = appointmentRepository.findpastAppointment(date, userId);
//        return pastingAppointment;
//    }
//
//    @GetMapping
//    public List<Appointments> pendingAppointment(String date, String userId) {
//        List<Appointments> pendingResults = appointmentRepository.findpendingAppointment(date, userId);
//        return pendingResults;
//    }
//}


package com.example.springsocial.service;

        import com.example.springsocial.model.Appointments;
        import com.example.springsocial.model.Vaccines;
        import com.example.springsocial.repository.AppointmentRepository;
        import com.example.springsocial.repository.ClinicRepository;
        import com.example.springsocial.repository.VaccineRepository;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.dao.DataIntegrityViolationException;
        import org.springframework.http.ResponseEntity;
        import org.springframework.stereotype.Service;
        import org.springframework.transaction.UnexpectedRollbackException;
        import org.springframework.web.bind.annotation.*;
        import javax.persistence.*;
        import java.sql.SQLIntegrityConstraintViolationException;
        import java.util.ArrayList;
        import java.util.List;
        import java.util.UUID;

@Service
//@SqlResultSetMapping(name="updatePassengerDetails", columns = { @ColumnResult(name = "count")})
//@NamedNativeQueries({
//        @NamedNativeQuery(
//                name    =   "updatePassengerDetails",
//                query   =   "UPDATE passenger SET firstname = ?, lastname = ?, phone=?, age = ?, gender = ? WHERE id = ?"
//                ,resultSetMapping = "updateResult"
//        )
//})

public class AppointmentService {
    @Autowired // This means to get the bean called userRepository
    private AppointmentRepository appointmentRepository;
    @Autowired // This means to get the bean called userRepository
    private VaccineRepository vaccineRepository;
    @Autowired // This means to get the bean called userRepository
    private ClinicRepository clinicRepository;
//    @Autowired // This means to get the bean called userRepository
//    private UserRepository userRepository;

    @GetMapping
    public @ResponseBody
    Appointments getAppointmentsByAppointmentId(String appointmentId){
        Appointments appointment =  appointmentRepository.findByAid(appointmentId);

        return appointment;
    }

    @GetMapping
    public @ResponseBody
    List<Appointments> getAppointmentsByUserId(String userId){
        List<Appointments> allAppointments = (List<Appointments>) appointmentRepository.findAll();
        List<Appointments> filteredAppointments = new ArrayList<>();
        for(int i=0;i<allAppointments.size();i++){
//            if(allAppointments.get(i).getUserId().equals(userRepository.findById(userId))){
//                System.out.print("Inside");
//                filteredAppointments.add(allAppointments.get(i));
//            }
        }
        return filteredAppointments;
    }

    @GetMapping
    public @ResponseBody
    List<Appointments> getAllAppointments(){
        List<Appointments> allAppointments = (List<Appointments>) appointmentRepository.findAll();
        return allAppointments;
    }

    @GetMapping
    public @ResponseBody
    List<Appointments> getAppointmentsByClinicId(String clinicId){
        List<Appointments> allAppointments = (List<Appointments>) appointmentRepository.findAll();
        List<Appointments> filteredAppointments = new ArrayList<>();
        for(int i=0;i<allAppointments.size();i++){
            if(allAppointments.get(i).getClinicId().equals(clinicRepository.findByCid(clinicId))){
                System.out.print("Inside");
                filteredAppointments.add(allAppointments.get(i));
            }
        }
        return filteredAppointments;
    }

    @PostMapping
    public Appointments createAppointment(Appointments appointmentDetails, List<String> vaccineNumbers,String clinicId, String userId) throws Exception {
        Appointments newAppointment = null;
        List<Vaccines> vaccines = new ArrayList<>();
        for(int i=0;i<vaccineNumbers.size();i++) {
            Vaccines vaccineDetails = vaccineRepository.findByVid(vaccineNumbers.get(i));
            vaccines.add(vaccineDetails);
        }
        try {
            appointmentDetails.setVaccineId(vaccines);
            appointmentDetails.setClinicId(clinicRepository.findByCid(clinicId));
            //appointmentDetails.setUserId(userRepository.findByUid(userId));
            newAppointment = appointmentRepository.save(appointmentDetails);
        }
        catch(DataIntegrityViolationException ex){
            throw new Exception("constraint violation", ex);
        }
        return newAppointment;
    }

    @PutMapping()
    public Appointments updateAppointment(String fromTime,Boolean isCheckedIn, String appointmentDate, String appointmentId) throws Exception {
        Appointments existingAppointment = null;
        try{
            existingAppointment = appointmentRepository.findByAid(appointmentId);
            existingAppointment.setFromTime(fromTime);
            existingAppointment.setCheckedIn(isCheckedIn);
            existingAppointment.setAppointmentDate(appointmentDate);
            appointmentRepository.save(existingAppointment);
        }
        catch(DataIntegrityViolationException ex){
            System.out.println("Already exists");
            throw new Exception("constraint violation", ex);
        }
        return existingAppointment;
    }

    @DeleteMapping()
    public String deleteAppointment(String appointmentId) {
        Appointments existingAppointment = appointmentRepository.findByAid(appointmentId);
        if(existingAppointment!=null){
            appointmentRepository.deleteByAid(appointmentId);
            return "Deleted Successfully";
        }
        return "-1";
    }
}