import React, { useState } from "react";
import { Form, Input, Button, Select } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { validatePatientInput } from "../util/validators";
import axios from "axios";

const AjouterPatient = (props) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { values, onChange, onSubmit } = useForm(createPatientCallback, {
    nom: props.info.nom ? props.info.nom : "",
    prenom: props.info.prenom ? props.info.prenom : "",
    cin: props.info.cin ? props.info.cin : "",
  });
  function createPatientCallback() {
    const { valid, errors } = validatePatientInput(values);
    if (!valid) {
      setErrors(errors);
      return;
    }

    if (props.info.nom) {
      setLoading(true);

      axios
        .put(`http://localhost:9191/patient/editer/${props.currentId}`, values)
        .then((res) => {
          setLoading(false);
          setTimeout(() => props.history.push("/"), 1000);
        });
    } else {
      setLoading(true);
      axios
        .post(`http://localhost:9191/patient/sauvegarder`, values)
        .then((res) => {
          setLoading(false);
          setTimeout(() => props.history.push("/"), 1000);
        });
    }

    props.setInfo({});
  }
  return (
    <>
      <>
        <h2>{props.currentId ?  "Ajouter": "Modifier" } Patient</h2>
        <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-first-name'
              name='nom'
              control={Input}
              label='Nom'
              placeholder='Nom'
              onChange={onChange}
              error={errors.nom ? true : false}
              value={values.nom}
            />
            <Form.Field
              onChange={onChange}
              name='prenom'
              id='form-input-control-last-name'
              control={Input}
              label='Prénom'
              placeholder='Prénom'
              error={errors.prenom ? true : false}
              value={values.prenom}
            />

            <Form.Field
              onChange={onChange}
              id='form-input-control-last-name'
              control={Input}
              label='CIN'
              placeholder='CIN'
              error={errors.cin ? true : false}
              value={values.cin}
              name='cin'
            />
          </Form.Group>

          <Form.Field
            id='form-button-control-public'
            control={Button}
            content='Confirm'
            color='green'
            type='submit'
          />
        </Form>
      </>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AjouterPatient;
