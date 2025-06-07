package zti.projekt.server.data;

import java.io.Serializable;
import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import zti.projekt.server.control.PatientController.WeightInput;

@Setter
@Getter
@Entity
@Table(name="weight")
public class Weight implements Serializable {

	@Id
	@SequenceGenerator(name="weight_generator", sequenceName="weight_id_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="weight_generator")
	private Integer id;

    @ManyToOne
    @JoinColumn(name="patient_id", nullable = false)
	private Patient patient;

	@Column(nullable = false)
	private OffsetDateTime measurment_time;

	@Column(nullable = false)
	private Float weight;

	protected Weight() {
		// no-args constructor required by JPA spec
	}

	public Weight(Patient patient, OffsetDateTime measurment_time, Float weight) {
		this.patient = patient;
		this.measurment_time = measurment_time;
		this.weight = weight;
	}

	public Weight(WeightInput weight, Patient patient) {
		this.measurment_time = weight.measurment_time();
		this.weight = weight.weight();
		this.patient = patient;
	}
}
