import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { toPatient } from "../utils";

const ShowPatient = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const fetchStatus = useRef({ shouldFetch: false });

    let patient = patients[id];

    try {
        patient = toPatient({ ...patient });
    } catch {
        if (!patient.ssn) {
            fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
        }
        console.log(`${patient.name} missed data, fetched data from API`);
    }


    useEffect(() => {
        const getPatient = async () => {
            fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
            try {
                const { data: fetchedPatient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(updatePatient(fetchedPatient));
            } catch (e) {
                console.error(e);
            }
        };

        if (fetchStatus.current.shouldFetch) {
            void getPatient();
        }
    }, [id, dispatch]);

    const showGender = () => {
        if (patient.gender === "male") {
            return <Icon name="mars"></Icon>;
        }
        if (patient.gender === "female") {
            return <Icon name="venus"></Icon>;
        }
        if (patient.gender === "other") {
            return <Icon name="transgender"></Icon>;
        }
    };

    if (!patient) return null;

    const showEntries = () => {
        if (!patient.entries) return null;
         return (
            <div>
                <ul>
                    {patient.entries.map((entry) =>
                        <li key={entry.id}> <strong>{entry.date}</strong> <br/>{entry.description} <br/> <small>Diagnosis code: {entry.diagnosisCodes}</small></li>
                    )}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <Container textAlign="center">
                <h3>Patient info</h3>
            </Container>
            <h3>{patient.name} {showGender()}</h3>
            <div><strong>SSN:</strong> {patient.ssn}</div>
            <div><strong>Date of Birth:</strong> {patient.dateOfBirth} </div>
            <div><strong>Occupation:</strong> {patient.occupation}</div>
            <h4>Entries</h4>
            <div>{showEntries()}</div>
        </div >
    );
};


export default ShowPatient;
