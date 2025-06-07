CREATE TABLE IF NOT EXISTS patient (
    id SERIAL NOT NULL PRIMARY KEY,
    fname VARCHAR NOT NULL,
    lname VARCHAR NOT NULL,
    date_of_birth TIMESTAMPTZ NOT NULL,
    phone VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS weight (
    id SERIAL NOT NULL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patient (id),
    measurment_time TIMESTAMPTZ NOT NULL,
    weight REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS blood_pressure (
    id SERIAL NOT NULL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patient (id),
    measurment_time TIMESTAMPTZ NOT NULL,
    systolic INTEGER NOT NULL,
    diastolic INTEGER NOT NULL
);
