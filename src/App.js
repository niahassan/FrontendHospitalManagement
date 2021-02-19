import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import AuthRoute from "./util/AuthRoute";
import Home from "./pages/Home";
import AjouterPatient from "./pages/AjouterPatient";
import Medecins from "./pages/Medecins";
import AjouterMedecin from "./pages/AjouterMedecin";
import AjouterRendezVous from "./pages/AjouterRendezVous";
import RDVs from "./pages/RDVs";
import MenuBar from "./components/MenuBar";

const App = () => {
  const [currentId, setCurrentId] = useState("");
  const [info, setInfo] = useState({});
  return (
    <>
      <Router>
        <Container>
          <MenuBar />
          <AuthRoute
            exact
            path='/'
            component={Home}
            setCurrentId={setCurrentId}
            setInfo={setInfo}
            info={info}
          />
          <AuthRoute
            exact
            path='/ajouter'
            component={AjouterPatient}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setInfo={setInfo}
            info={info}
          />
          <AuthRoute
            exact
            path='/ajoutermedecin'
            component={AjouterMedecin}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setInfo={setInfo}
            info={info}
          />
          <AuthRoute
            exact
            path='/ajouterrdv'
            component={AjouterRendezVous}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setInfo={setInfo}
            info={info}
          />
          <AuthRoute
            exact
            path='/rdvs'
            component={RDVs}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setInfo={setInfo}
            info={info}
          />
          <AuthRoute
            exact
            path='/medecins'
            component={Medecins}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setInfo={setInfo}
            info={info}
          />
        </Container>
      </Router>
    </>
  );
};

export default App;
