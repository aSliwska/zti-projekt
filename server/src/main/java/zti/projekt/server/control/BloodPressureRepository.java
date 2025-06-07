package zti.projekt.server.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.graphql.data.GraphQlRepository;

import zti.projekt.server.data.BloodPressure;

@GraphQlRepository
public interface BloodPressureRepository extends JpaRepository<BloodPressure, Integer> {
    BloodPressure save(BloodPressure bloodPressure);
}
