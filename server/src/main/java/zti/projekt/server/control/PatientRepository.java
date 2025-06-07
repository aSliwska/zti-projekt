package zti.projekt.server.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.graphql.data.GraphQlRepository;

import zti.projekt.server.data.Patient;

@GraphQlRepository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
    Patient save(Patient patient);
}
