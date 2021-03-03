DROP DATABASE IF EXISTS medical_records;

CREATE DATABASE medical_records;

\c medical_records

CREATE TABLE MedicalCenter
(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL,
  location TEXT NOT NULL
);

CREATE TABLE Doctor
(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL,
  medicalCenter_id int NOT NULL REFERENCES MedicalCenter
);

CREATE TABLE Patient
(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL
);

CREATE TABLE Disease
(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL,
  sympton TEXT NOT NULL,
  patient_id int REFERENCES Patient
);

CREATE TABLE Visit
(
  id SERIAL PRIMARY KEY, 
  medicalCenter_id int NOT NULL REFERENCES MedicalCenter,
  doctor_id int NOT NULL REFERENCES Doctor,
  patient_id int NOT NULL REFERENCES Patient,
  time TEXT NOT NULL
);

