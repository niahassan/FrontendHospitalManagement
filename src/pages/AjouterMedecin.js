import React, { useState } from "react";
import { Form, Input, Button, Select } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { validateMedecinInput } from "../util/validators";
import axios from "axios";

const AjouterMedecin = (props) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { values, onChange, onSubmit } = useForm(createMedecinCallback, {
    nom: props.info.nom ? props.info.nom : "",
    prenom: props.info.prenom ? props.info.prenom : "",
    cinMedecin: props.info.cinMedecin ? props.info.cinMedecin : "",
    specialite: props.info.specialite ? props.info.specialite : "",
    nomServiceDep: props.info.nomServiceDep ? props.info.nomServiceDep : "",
  });

  function createMedecinCallback() {
    const { valid, errors } = validateMedecinInput(values);
    if (!valid) {
      setErrors(errors);
      return;
    }

    if (props.info.nom) {
      setLoading(true);

      axios
        .put(
          `http://localhost:9191/Personnel/Medecin/update/${props.currentId}`,
          values
        )
        .then((res) => {
          setLoading(false);
          setTimeout(() => props.history.push("/medecins"), 1000);
        });
    } else {
      setLoading(true);
      axios
        .post(`http://localhost:9191/Personnel/Medecin/add`, values)
        .then((res) => {
          setLoading(false);
          setTimeout(() => props.history.push("/medecins"), 1000);
        });
    }

    props.setInfo({});
  }
  return (
    <>
      <>
        <h2>{props.currentId ? "Modifier" : "Ajouter"} Médecin</h2>
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
              label='CIN Medecin'
              placeholder='CIN Medecin'
              error={errors.cinMedecin ? true : false}
              value={values.cinMedecin}
              name='cinMedecin'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              onChange={onChange}
              id='form-input-control-first-name'
              name='nomServiceDep'
              control={Input}
              label='Nom de Département'
              placeholder='Nom de Département'
              onChange={onChange}
              error={errors.nomServiceDep ? true : false}
              value={values.nomServiceDep}
            />
            <Form.Field
              onChange={onChange}
              name='specialite'
              id='form-input-control-last-name'
              control={Input}
              label='Specialté'
              placeholder='Specialté'
              error={errors.specialite ? true : false}
              value={values.specialite}
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

export default AjouterMedecin;
