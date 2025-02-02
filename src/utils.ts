/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, Patient, Entry, Entries } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing comment');
    }
    return name;
};

const parseDate = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing comment');
    }
    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing comment');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing comment');
    }
    return occupation;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing comment');
    }
    return gender;
};

const isArrayOfEntries = (param: any[]): param is Entry[] => {
    // case of no entries yet
    if (!Object.values(Entries).includes(param[0])) return true;
    return Object.values(Entries).includes(param[0].type);
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !Array.isArray(entries) || !isArrayOfEntries(entries)) {
        throw new Error('Incorrect or missing comment');
    }
    return entries;
};

export const toPatient = (object: any): Patient => {
    return {
        name: parseName(object.name),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        ssn: parseSSN(object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        id: parseName(object.id),
        entries: parseEntries(object.entries),
    };
};

export default toPatient;