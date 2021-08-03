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
  HealthCheck = "HealthCheckEntry",
  OccupationalHealthCare = "OccupationalHealthcareEntry",
  Hospital = "HospitalEntry",
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
  type: "HealthCheckEntry";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "HospitalEntry";
  discharge: Discharge
}

export interface Discharge {
  date: string;
  criteria: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcareEntry";
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

