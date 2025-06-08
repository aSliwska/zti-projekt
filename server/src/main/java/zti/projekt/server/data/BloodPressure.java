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
import zti.projekt.server.control.PatientController.BloodPressureInput;
import zti.projekt.server.control.PatientController.WeightInput;

@Setter
@Getter
@Entity
@Table(name="blood_pressure")
public class BloodPressure implements Serializable {

	@Id
	@SequenceGenerator(name="blood_pressure_generator", sequenceName="blood_pressure_id_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="blood_pressure_generator")
	private Integer id;

    @ManyToOne
    @JoinColumn(name="patient_id", nullable = false)
	private Patient patient;

	@Column(nullable = false)
	private OffsetDateTime measurement_time;

	@Column(nullable = false)
	private Integer systolic;

	@Column(nullable = false)
	private Integer diastolic;

	protected BloodPressure() {
		// no-args constructor required by JPA spec
	}

	public BloodPressure(Patient patient, OffsetDateTime measurement_time, Integer systolic, Integer diastolic) {
		this.patient = patient;
		this.measurement_time = measurement_time;
		this.systolic = systolic;
		this.diastolic = diastolic;
	}

	public BloodPressure(BloodPressureInput bloodPressureInput, Patient patient) {
		this.measurement_time = bloodPressureInput.measurement_time();
		this.systolic = bloodPressureInput.systolic();
		this.diastolic = bloodPressureInput.diastolic();
		this.patient = patient;
	}
}
