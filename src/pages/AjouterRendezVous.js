import React, { useState } from "react";
import { Form, Input, Button, Select } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { validateRDVInput } from "../util/validators";
import axios from "axios";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
const AjouterRendezVous = (props) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { values, onChange, onSubmit } = useForm(createPatientCallback, {
    cinPatient: props.info.cinPatient ? props.info.cinPatient : "",
    cinMedecin: props.info.cinMedecin ? props.info.cinMedecin : "",
    date: props.info.date ? props.info.date : "",
    heure: props.info.heure ? props.info.heure : "",
  });
  function createPatientCallback() {
    const { valid, errors } = validateRDVInput(values);
    if (!valid) {
      setErrors(errors);
      return;
    }

    if (props.info.cinPatient) {
      setLoading(true);

      axios
        .put(`http://localhost:9191/patient/editer/${props.currentId}`, values)
        .then((res) => {
          setLoading(false);
          setTimeout(() => props.history.push("/"), 1000);
        });
    } else {
      setLoading(true);
      axios.post(`http://localhost:9191/Rdv/addRdv`, values).then((res) => {
        setLoading(false);
        setTimeout(() => props.history.push("/rdvs"), 1000);
      });
    }

    props.setInfo({});
  }
  return (
    <>
      <>
        <h2>{props.currentId ? "Modifier" : "Ajouter"} Rendez-Vous </h2>
        <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-first-name'
              name='cinMedecin'
              control={Input}
              label='CIN Medecin'
              placeholder='CIN Medecin'
              onChange={onChange}
              error={errors.cinMedecin ? true : false}
              value={values.cinMedecin}
            />
            <Form.Field
              onChange={onChange}
              name='cinPatient'
              id='form-input-control-last-name'
              control={Input}
              label='CIN Patient'
              placeholder='CIN Patient'
              error={errors.cinPatient ? true : false}
              value={values.cinPatient}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <DateInput
              name='date'
              onChange={onChange}
              placeholder='Date'
              label='Date'
              value={values.date}
              iconPosition='left'
              popupPosition='bottom left'
            />
            <TimeInput
              name='heure'
              placeholder='Heure'
              label='Heure'
              value={values.heure}
              iconPosition='left'
              popupPosition='bottom left'
              onChange={onChange}
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

export default AjouterRendezVous;
