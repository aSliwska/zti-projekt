INSERT INTO patient (fname, lname, date_of_birth, phone)
SELECT 'Adrian', 'Abacki', '1978-04-23T00:00Z', '123456789'
WHERE NOT EXISTS (SELECT id FROM patient WHERE fname = 'Adrian');

INSERT INTO patient (fname, lname, date_of_birth, phone)
SELECT 'Bartek', 'Babacki', '1977-07-21T00:00Z', '987654321'
WHERE NOT EXISTS (SELECT id FROM patient WHERE fname = 'Bartek');

INSERT INTO patient (fname, lname, date_of_birth, phone)
SELECT 'Czarek', 'Czaczacki', '1966-12-03T00:00Z', '666666666'
WHERE NOT EXISTS (SELECT id FROM patient WHERE fname = 'Czarek');


INSERT INTO weight (patient_id, measurment_time, weight)
SELECT 1, '2025-05-01T00:00Z', 78.8
WHERE NOT EXISTS (SELECT id FROM weight WHERE measurment_time = '2025-05-01T00:00Z');

INSERT INTO weight (patient_id, measurment_time, weight)
SELECT 1, '2025-05-02T00:00Z', 78.3
WHERE NOT EXISTS (SELECT id FROM weight WHERE measurment_time = '2025-05-02T00:00Z');

INSERT INTO weight (patient_id, measurment_time, weight)
SELECT 1, '2025-05-03T00:00Z', 76.2
WHERE NOT EXISTS (SELECT id FROM weight WHERE measurment_time = '2025-05-03T00:00Z');

INSERT INTO weight (patient_id, measurment_time, weight)
SELECT 1, '2025-05-04T00:00Z', 78.0
WHERE NOT EXISTS (SELECT id FROM weight WHERE measurment_time = '2025-05-04T00:00Z');

INSERT INTO weight (patient_id, measurment_time, weight)
SELECT 1, '2025-05-05T00:00Z', 78.1
WHERE NOT EXISTS (SELECT id FROM weight WHERE measurment_time = '2025-05-05T00:00Z');


INSERT INTO blood_pressure (patient_id, measurment_time, systolic, diastolic)
SELECT 1, '2025-05-01T00:00Z', 110, 65
WHERE NOT EXISTS (SELECT id FROM blood_pressure WHERE measurment_time = '2025-05-01T00:00Z');

INSERT INTO blood_pressure (patient_id, measurment_time, systolic, diastolic)
SELECT 1, '2025-05-02T00:00Z', 120, 75
WHERE NOT EXISTS (SELECT id FROM blood_pressure WHERE measurment_time = '2025-05-02T00:00Z');

INSERT INTO blood_pressure (patient_id, measurment_time, systolic, diastolic)
SELECT 1, '2025-05-03T00:00Z', 130, 80
WHERE NOT EXISTS (SELECT id FROM blood_pressure WHERE measurment_time = '2025-05-03T00:00Z');

INSERT INTO blood_pressure (patient_id, measurment_time, systolic, diastolic)
SELECT 1, '2025-05-04T00:00Z', 125, 90
WHERE NOT EXISTS (SELECT id FROM blood_pressure WHERE measurment_time = '2025-05-04T00:00Z');

INSERT INTO blood_pressure (patient_id, measurment_time, systolic, diastolic)
SELECT 1, '2025-05-05T00:00Z', 105, 70
WHERE NOT EXISTS (SELECT id FROM blood_pressure WHERE measurment_time = '2025-05-05T00:00Z');