import React from "react";
import { Icon, Table } from "semantic-ui-react";
import { Entry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import ShowDiagnoses from "./ShowDiagnoses";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryData = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case "HealthCheckEntry":
            return (
                <div>
                    <Table>
                        <Table.Body>
                            <Table.Row>
                                <Table.HeaderCell>
                                    {entry.date} <Icon name="heartbeat"></Icon>
                                </Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    {entry.description}
                                </Table.Cell>
                                <Table.Cell>
                                    <strong>Specialist: </strong> {entry.specialist}
                                </Table.Cell>
                                <Table.Cell><HealthRatingBar rating={entry.healthCheckRating} showText={true} /></Table.Cell>
                                <Table.Cell>
                                    <ShowDiagnoses diagnosesCodes={entry.diagnosisCodes} />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            );
        case "OccupationalHealthcareEntry":
            return (
                <div>
                    <Table>
                        <Table.Body>
                            <Table.Row>
                                <Table.HeaderCell>
                                    {entry.date} <Icon name="stethoscope"></Icon>
                                </Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>{entry.description}</Table.Cell>
                                <Table.Cell><strong>Specialist: </strong> {entry.specialist}</Table.Cell>
                                <Table.Cell><strong>Employer name: </strong> {entry.employerName}</Table.Cell>
                                <Table.Cell>
                                    <ShowDiagnoses diagnosesCodes={entry.diagnosisCodes} />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>

            );
        case "HospitalEntry":
            return (
                <div>
                    <Table>
                        <Table.Body>
                            <Table.Row>
                                <Table.HeaderCell>
                                    {entry.date} <Icon name="hospital"></Icon>
                                </Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>{entry.description}</Table.Cell>
                                <Table.Cell> <strong>Specialist: </strong> {entry.specialist}</Table.Cell>
                                <Table.Cell>
                                    <ShowDiagnoses diagnosesCodes={entry.diagnosisCodes} />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryData;
