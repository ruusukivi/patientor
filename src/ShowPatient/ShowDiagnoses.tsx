import React from "react";
import { uid } from "react-uid";

import { useStateValue } from "../state";
import { Diagnosis } from "../types";
import { List } from "semantic-ui-react";

interface DiagnosesProps {
  diagnosesCodes: Array<Diagnosis["code"]> | undefined;
}

const ShowDiagnoses: React.FC<DiagnosesProps> = ({ diagnosesCodes }) => {
  const [{ diagnoses }] = useStateValue();

  if(diagnosesCodes === undefined){
    return null;
  }

  console.log(diagnosesCodes);
  console.log(diagnoses);

  return (
    <List>
      <List.Item>
        <List.Header>
          Diagnoses
        </List.Header>
      </List.Item>
      {diagnosesCodes.map((code) => (
        <List.Item key={uid({})}>
          <List.Content>
            <List.Description>
              <strong>{code} - </strong>
              {diagnoses[code].name}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default ShowDiagnoses;
