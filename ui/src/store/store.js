import { atom } from 'jotai';
import { gql } from '@apollo/client';

export const patientCardAtom = atom(undefined);
export const currentPatientIdAtom = atom(undefined);
export const currentWeightIdAtom = atom(undefined);
export const currentBloodPressureIdAtom = atom(undefined);

export const QUERY_PATIENTS = gql`{
  patients {
    id
    fname
    lname
    date_of_birth
    phone
  }
}`;

export const QUERY_PATIENT_CHARTS = gql`query GetPatientCharts($id: ID!) {
  patient(id: $id) {
    weights {
      id
      measurement_time
      weight
    }
    bloodPressures {
      id
      measurement_time
      systolic
      diastolic
    }
  }
}`;

export const CREATE_PATIENT = gql`mutation CreatePatient($patientInput: PatientInput!) {
  createPatient(patientInput: $patientInput) {
    id
  }
}`;

export const UPDATE_PATIENT = gql`mutation UpdatePatient($id: ID!, $patientInput: PatientInput!) {
  updatePatient(id: $id, patientInput: $patientInput) {
    id
  }
}`;

export const REMOVE_PATIENT = gql`mutation RemovePatient($id: ID!) {
  removePatient(id: $id)
}`;

export const CREATE_WEIGHT = gql`mutation CreateWeight($patient_id: Int!, $weightInput: WeightInput!) {
  createWeight(patient_id: $patient_id, weightInput: $weightInput) {
    id
  }
}`;

export const UPDATE_WEIGHT = gql`mutation UpdateWeight($id: ID!, $weightInput: WeightInput!) {
  updateWeight(id: $id, weightInput: $weightInput) {
    id
  }
}`;

export const REMOVE_WEIGHT = gql`mutation RemoveWeight($id: ID!) {
  removeWeight(id: $id)
}`;

export const CREATE_BLOOD_PRESSURE = gql`mutation CreateBloodPressure($patient_id: Int!, $bloodPressureInput: BloodPressureInput!) {
  createBloodPressure(patient_id: $patient_id, bloodPressureInput: $bloodPressureInput) {
    id
  }
}`;

export const UPDATE_BLOOD_PRESSURE = gql`mutation UpdateBloodPressure($id: ID!, $bloodPressureInput: BloodPressureInput!) {
  updateBloodPressure(id: $id, bloodPressureInput: $bloodPressureInput) {
    id
  }
}`;

export const REMOVE_BLOOD_PRESSURE = gql`mutation RemoveBloodPressure($id: ID!) {
  removeBloodPressure(id: $id)
}`;
