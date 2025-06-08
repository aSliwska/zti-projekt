package zti.projekt.server.control;

import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import zti.projekt.server.data.BloodPressure;
import zti.projekt.server.data.Patient;
import zti.projekt.server.data.Weight;

@CrossOrigin
@Controller
public class PatientController {

    PatientRepository patientRepository;
    WeightRepository weightRepository;
    BloodPressureRepository bloodPressureRepository;

    public PatientController(PatientRepository patientRepository, WeightRepository weightRepository, BloodPressureRepository bloodPressureRepository) {
        this.patientRepository = patientRepository;
        this.weightRepository = weightRepository;
        this.bloodPressureRepository = bloodPressureRepository;
    }

    @QueryMapping
    public Patient patient(@Argument Integer id) {
        return patientRepository.findById(id).orElseGet(() -> { return null; });
    }

    @QueryMapping
    public List<Patient> patients() {
        return patientRepository.findAll();
    }

    public record PatientInput(String fname, String lname, OffsetDateTime date_of_birth, String phone) {}
    public record WeightInput(OffsetDateTime measurement_time, Float weight) {}
    public record BloodPressureInput(OffsetDateTime measurement_time, Integer systolic, Integer diastolic) {}

    @MutationMapping
    public Patient createPatient(@Argument PatientInput patientInput) {
        return patientRepository.save(new Patient(patientInput));
    }

    @MutationMapping
    public Patient updatePatient(@Argument Integer id, @Argument PatientInput patientInput) {
        Patient patientToUpdate = patientRepository.findById(id).get();

        patientToUpdate.setFname(patientInput.fname);
        patientToUpdate.setLname(patientInput.lname);
        patientToUpdate.setDate_of_birth(patientInput.date_of_birth);
        patientToUpdate.setPhone(patientInput.phone);
        
        return patientRepository.save(patientToUpdate);
    }

    @MutationMapping
    public Integer removePatient(@Argument Integer id) {
        patientRepository.deleteById(id);        
        return id;
    }

    @MutationMapping
    public Weight createWeight(@Argument Integer patient_id, @Argument WeightInput weightInput) {
        Patient patient = patientRepository.findById(patient_id).get();

        Weight newWeight = new Weight(weightInput, patient);
        patient.addWeight(newWeight);
        
        return weightRepository.save(newWeight);
    }

    @MutationMapping
    public Weight updateWeight(@Argument Integer id, @Argument WeightInput weightInput) {
        Weight weightToUpdate = weightRepository.findById(id).get();

        weightToUpdate.setMeasurement_time(weightInput.measurement_time);
        weightToUpdate.setWeight(weightInput.weight);
        
        return weightRepository.save(weightToUpdate);
    }

    @MutationMapping
    public Integer removeWeight(@Argument Integer id) {
        weightRepository.deleteById(id);        
        return id;
    }

    @MutationMapping
    public BloodPressure createBloodPressure(@Argument Integer patient_id, @Argument BloodPressureInput bloodPressureInput) {
        Patient patient = patientRepository.findById(patient_id).get();

        BloodPressure newBloodPressure = new BloodPressure(bloodPressureInput, patient);
        patient.addBloodPressure(newBloodPressure);
        
        return bloodPressureRepository.save(newBloodPressure);
    }

    @MutationMapping
    public BloodPressure updateBloodPressure(@Argument Integer id, @Argument BloodPressureInput bloodPressureInput) {
        BloodPressure bloodPressureToUpdate = bloodPressureRepository.findById(id).get();

        bloodPressureToUpdate.setMeasurement_time(bloodPressureInput.measurement_time);
        bloodPressureToUpdate.setSystolic(bloodPressureInput.systolic);
        bloodPressureToUpdate.setDiastolic(bloodPressureInput.diastolic);
        
        return bloodPressureRepository.save(bloodPressureToUpdate);
    }

    @MutationMapping
    public Integer removeBloodPressure(@Argument Integer id) {
        bloodPressureRepository.deleteById(id);        
        return id;
    }
}