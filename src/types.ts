export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}


export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export enum Entries {
  HealthCheck = "HealthCheck",
  OccupationalHealthCare = "OccupationalHealthCare",
  Hospital = "Hospital",
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: Entries.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: Entries.Hospital;
  discharge: Discharge
}

export interface Discharge {
  date: string;
  criteria: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: Entries.OccupationalHealthCare;
  employerName: string;
  sickLeave?: SickLeave
}

export interface SickLeave {
  startDate: string;
  endDate: string
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

