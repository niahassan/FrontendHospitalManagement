import React, { useState, useEffect } from "react";
import { Grid, Search, Dimmer, Loader, Table, Button } from "semantic-ui-react";
import _ from "lodash";
import axios from "axios";
import { withRouter } from "react-router-dom";
const Home = (props) => {
  const [loadingList, setLoadingList] = useState(false);
  const [patientList, setPatientList] = useState([]);

  const [show, setShow] = useState(true);
  const [name, setName] = useState("");

  const initialState = {
    loading: false,
    results: [],
    value: "",
  };
  function exampleReducer(state, action) {
    switch (action.type) {
      case "CLEAN_QUERY":
        return initialState;
      case "START_SEARCH":
        return { ...state, loading: true, value: action.query };
      case "FINISH_SEARCH":
        return { ...state, loading: false, results: action.results };
      case "UPDATE_SELECTION":
        return { ...state, value: action.selection };

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading: searchLoading, results, value } = state;

  useEffect(() => {
    setLoadingList(true);

    axios.get("http://localhost:9191/patient/all").then((res) => {
      setPatientList(res.data);
      setLoadingList(false);
    });
  }, []);

  const source = patientList
    ? patientList.map((patient) => {
        return {
          title: patient.nom + " " + patient.prenom,
          description: patient.cin,
        };
      })
    : null;

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback(
    (e, data) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: "START_SEARCH", query: data.value });

      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: "CLEAN_QUERY" });
          setShow(true);
          return;
        }

        const re = new RegExp(_.escapeRegExp(data.value), "i");
        const isMatch = (result) => re.test(result.title);

        dispatch({
          type: "FINISH_SEARCH",
          results: _.filter(source, isMatch),
        });
      }, 300);
    },
    [source]
  );
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return (
    <>
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={searchLoading}
            onResultSelect={(e, data) => {
              dispatch({
                type: "UPDATE_SELECTION",
                selection: data.result.title,
              });
              setShow(false);
              setName(data.result.description);
            }}
            onSearchChange={handleSearchChange}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nom</Table.HeaderCell>
            <Table.HeaderCell>Prénom</Table.HeaderCell>

            <Table.HeaderCell>CIN</Table.HeaderCell>
            <Table.HeaderCell>Modifier</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {show ? (
          <Table.Body>
            <Dimmer active={loadingList}>
              <Loader size='mini'>Loading</Loader>
            </Dimmer>

            {patientList
              ? patientList.map((patient) => {
                  return (
                    <Table.Row key={patient.id}>
                      <Table.Cell> {patient.nom}</Table.Cell>
                      <Table.Cell>{patient.prenom}</Table.Cell>

                      <Table.Cell>{patient.cin}</Table.Cell>

                      <Table.Cell>
                        <Button
                          onClick={() => {
                            props.setCurrentId(patient.id);
                            props.setInfo({
                              nom: patient.nom,
                              prenom: patient.prenom,
                              cin: patient.cin,
                            });
                            setTimeout(
                              () => props.history.push("/ajouter"),
                              500
                            );
                          }}
                          primary>
                          Modifier
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              : null}
          </Table.Body>
        ) : (
          <Table.Body>
            <Dimmer active={loadingList}>
              <Loader size='mini'>Loading</Loader>
            </Dimmer>

            {patientList
              ? patientList.map((patient) => {
                  return patient.cin === name ? (
                    <Table.Row key={patient.id}>
                      <Table.Cell> {patient.nom}</Table.Cell>
                      <Table.Cell>{patient.prenom}</Table.Cell>

                      <Table.Cell>{patient.cin}</Table.Cell>

                      <Table.Cell>
                        <Button
                          onClick={() => {
                            props.setCurrentId(patient.id);
                            props.setInfo({
                              nom: patient.nom,
                              prenom: patient.prenom,
                              cin: patient.cin,
                            });
                            setTimeout(
                              () => props.history.push("/ajouter"),
                              500
                            );
                          }}
                          primary>
                          Modifier
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ) : null;
                })
              : null}
          </Table.Body>
        )}
      </Table>
    </>
  );
};

export default withRouter(Home);
