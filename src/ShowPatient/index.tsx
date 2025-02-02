import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Icon, Card, Button } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { toPatient } from "../utils";
import EntryData from "./EntryData";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const ShowPatient = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const fetchStatus = useRef({ shouldFetch: false });

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patient.id}/entries`,
                values
            );
            dispatch(updatePatient(updatedPatient));
            closeModal();
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };




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

    const showEntries = () => {
        if (patient.entries.length < 1) {
            return (
                <div>No entries yet.</div>
            );
        }
        return (
            <div>
                {patient
                    .entries.map((entry) => (
                        <EntryData key={entry.id} entry={entry} />
                    ))
                }
            </div>
        );
    };

    if (!patient) return null;


    return (
        <div>
            <Container textAlign="center">
                <h3>Patient info</h3>
            </Container>

            <br /><br />
            <Card.Content>

                <h3>{patient.name} {showGender()}</h3>
                <div><strong>SSN:</strong> {patient.ssn}</div>
                <div><strong>Date of Birth:</strong> {patient.dateOfBirth} </div>
                <div><strong>Occupation:</strong> {patient.occupation}</div>

                <h3>Entries</h3>
                {showEntries()}
            </Card.Content>
            <div><br/>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button onClick={() => openModal()}>Add New Entry</Button>
            </div>
        </div >
    );
};


export default ShowPatient;
