package zti.projekt.server.control;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.graphql.data.GraphQlRepository;

import zti.projekt.server.data.Weight;

@GraphQlRepository
public interface WeightRepository extends JpaRepository<Weight, Integer> {
    Weight save(Weight weight);
}
