CREATE SCHEMA IF NOT EXISTS zti_proj;

CREATE TABLE IF NOT EXISTS zti_proj.patient (
    id SERIAL NOT NULL PRIMARY KEY,
    fname VARCHAR NOT NULL,
    lname VARCHAR NOT NULL,
    date_of_birth TIMESTAMPTZ NOT NULL,
    phone VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS zti_proj.weight (
    id SERIAL NOT NULL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES zti_proj.patient (id),
    measurement_time TIMESTAMPTZ NOT NULL,
    weight REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS zti_proj.blood_pressure (
    id SERIAL NOT NULL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES zti_proj.patient (id),
    measurement_time TIMESTAMPTZ NOT NULL,
    systolic INTEGER NOT NULL,
    diastolic INTEGER NOT NULL
);
