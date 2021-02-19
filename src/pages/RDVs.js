import React, { useState, useEffect } from "react";
import { Grid, Dimmer, Loader, Table, Button } from "semantic-ui-react";
import _ from "lodash";
import axios from "axios";
import { DateInput } from "semantic-ui-calendar-react";

const RDVs = (props) => {
  const [loadingList, setLoadingList] = useState(false);
  const [rdvList, setrdvList] = useState([]);
  const [show, setShow] = useState(true);
  const [searchDate, setSearchDate] = useState("");

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

    axios.get("http://localhost:9191/Rdv/rdvs").then((res) => {
      setrdvList(res.data);
      setLoadingList(false);
    });
  }, []);
  const source = rdvList
    ? rdvList.map((rdv) => {
        return {
          title: rdv.nom + " " + rdv.prenom,
          description: rdv.cinrdv,
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
          <DateInput
            onChange={(e, data) => {
              setSearchDate(data.value);
              if (data.value !== "") {
                setShow(false);
              } else {
                setShow(true);
              }
            }}
            popupPosition='bottom left'
            name='date'
            placeholder='Date'
            iconPosition='left'
            value={searchDate}
          />
        </Grid.Column>
      </Grid>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>CIN Médecin</Table.HeaderCell>
            <Table.HeaderCell>CIN Patient</Table.HeaderCell>

            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Heure</Table.HeaderCell>
            <Table.HeaderCell>Supprimer</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {show ? (
          <Table.Body>
            <Dimmer active={loadingList}>
              <Loader size='mini'>Loading</Loader>
            </Dimmer>

            {rdvList
              ? rdvList.map((rdv) => {
                  return (
                    <Table.Row key={rdv.id}>
                      <Table.Cell> {rdv.cinMedecin}</Table.Cell>
                      <Table.Cell> {rdv.cinPatient}</Table.Cell>
                      <Table.Cell>{rdv.date}</Table.Cell>

                      <Table.Cell>{rdv.heure}</Table.Cell>
                      <Table.Cell>
                        <Button
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:9191/Rdv/deleteRdv/${rdv.id}`
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

            {rdvList
              ? rdvList.map((rdv) => {
                  return rdv.date === searchDate ? (
                    <Table.Row key={rdv.id}>
                      <Table.Cell> {rdv.cinMedecin}</Table.Cell>
                      <Table.Cell> {rdv.cinPatient}</Table.Cell>
                      <Table.Cell>{rdv.date}</Table.Cell>

                      <Table.Cell>{rdv.heure}</Table.Cell>
                      <Table.Cell>
                        <Button
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:9191/Rdv/deleteRdv/${rdv.id}`
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

export default RDVs;
