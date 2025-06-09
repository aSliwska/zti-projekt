package zti.projekt.server.data;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import zti.projekt.server.control.PatientController.PatientInput;

@Setter
@Getter
@Entity
@Table(name="patient", schema="zti_proj")
public class Patient implements Serializable {

	@Id
	@SequenceGenerator(name="patient_generator", sequenceName="patient_id_seq", allocationSize=1, schema="zti_proj")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="patient_generator")
	private Integer id;

	@Column(nullable = false)
	private String fname;

	@Column(nullable = false)
	private String lname;

	@Column(nullable = false)
	private OffsetDateTime date_of_birth;

	@Column(nullable = false)
	private String phone;

    @OneToMany(mappedBy="patient", cascade = {CascadeType.REMOVE})
    private List<Weight> weights;

    @OneToMany(mappedBy="patient", cascade = {CascadeType.REMOVE})
    private List<BloodPressure> bloodPressures;

	protected Patient() {
		// no-args constructor required by JPA spec
	}

	public Patient(String fname, String lname, OffsetDateTime date_of_birth, String phone) {
		this.fname = fname;
		this.lname = lname;
		this.date_of_birth = date_of_birth;
		this.phone = phone;
	}

	public Patient(PatientInput patientInput) {
		this.fname = patientInput.fname();
		this.lname = patientInput.lname();
		this.date_of_birth = patientInput.date_of_birth();
		this.phone = patientInput.phone();
	}

	public void addWeight(Weight weight) {
		weights.add(weight);
	}

	public void addBloodPressure(BloodPressure bloodPressure) {
		bloodPressures.add(bloodPressure);
	}
}
