import React, { useState, useEffect } from "react";
import { Grid, Search, Dimmer, Loader, Table, Button } from "semantic-ui-react";
import _ from "lodash";
import axios from "axios";

const Medecins = (props) => {
  const [loadingList, setLoadingList] = useState(false);
  const [medecinList, setMedecinList] = useState([]);
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

    axios
      .get("http://localhost:9191/Personnel/Medecin/medecins")
      .then((res) => {
        setMedecinList(res.data);
        setLoadingList(false);
      });
  }, []);
  const source = medecinList
    ? medecinList.map((medecin) => {
        return {
          title: medecin.nom + " " + medecin.prenom,
          description: medecin.cinMedecin,
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
            <Table.HeaderCell>Specialté</Table.HeaderCell>
            <Table.HeaderCell>Nom de Département</Table.HeaderCell>
            <Table.HeaderCell>Modifier</Table.HeaderCell>
            <Table.HeaderCell>Supprimer</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {show ? (
          <Table.Body>
            <Dimmer active={loadingList}>
              <Loader size='mini'>Loading</Loader>
            </Dimmer>

            {medecinList
              ? medecinList.map((medecin) => {
                  return (
                    <Table.Row key={medecin.id}>
                      <Table.Cell> {medecin.nom}</Table.Cell>
                      <Table.Cell>{medecin.prenom}</Table.Cell>

                      <Table.Cell>{medecin.cinMedecin}</Table.Cell>
                      <Table.Cell>{medecin.specialite}</Table.Cell>
                      <Table.Cell>{medecin.nomServiceDep}</Table.Cell>

                      <Table.Cell>
                        <Button
                          onClick={() => {
                            props.setCurrentId(medecin.id);
                            props.setInfo({
                              nom: medecin.nom,
                              prenom: medecin.prenom,
                              cinMedecin: medecin.cinMedecin,
                              specialite: medecin.specialite,
                              nomServiceDep: medecin.nomServiceDep,
                            });
                            setTimeout(
                              () => props.history.push("/ajoutermedecin"),
                              500
                            );
                          }}
                          primary>
                          Modifier
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:9191/Personnel/Medecin/delete/${medecin.id}`
                              )
                              .then((res) => {
                                window.location.reload();
                              });
                          }}
                          primary>
                          Supprimer
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

            {medecinList
              ? medecinList.map((medecin) => {
                  return medecin.cinMedecin === name ? (
                    <Table.Row key={medecin.id}>
                      <Table.Cell> {medecin.nom}</Table.Cell>
                      <Table.Cell>{medecin.prenom}</Table.Cell>

                      <Table.Cell>{medecin.cinMedecin}</Table.Cell>
                      <Table.Cell>{medecin.specialite}</Table.Cell>
                      <Table.Cell>{medecin.nomServiceDep}</Table.Cell>

                      <Table.Cell>
                        <Button
                          onClick={() => {
                            props.setCurrentId(medecin.id);
                            props.setInfo({
                              nom: medecin.nom,
                              prenom: medecin.prenom,
                              cinMedecin: medecin.cinMedecin,
                              specialite: medecin.specialite,
                              nomServiceDep: medecin.nomServiceDep,
                            });
                            setTimeout(
                              () => props.history.push("/ajoutermedecin"),
                              500
                            );
                          }}
                          primary>
                          Modifier
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:9191/Personnel/Medecin/delete/${medecin.id}`
                              )
                              .then((res) => {
                                window.location.reload();
                              });
                          }}
                          primary>
                          Supprimer
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

export default Medecins;
