import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

// import { AuthContext } from "../context/auth";

const MenuBar = (props) => {
  // const { user, logout } = useContext(AuthContext);

  // let role = "";

  // if (user) {
  //   if (user.role === 1) {
  //     role = "Opérateur";
  //   }
  //   if (user.role === 2) {
  //     role = "Gestionnaire";
  //   }
  //   if (user.role === 3) {
  //     role = "Décideur";
  //   }
  // }

  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='Patients'
        active={activeItem === "Patients"}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Item
        name='Medecins'
        active={activeItem === "Medecins"}
        onClick={handleItemClick}
        as={Link}
        to='/medecins'
      />
      <Menu.Item
        name='RDV'
        active={activeItem === "RDV"}
        onClick={handleItemClick}
        as={Link}
        to='/rdvs'
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name='Ajouter Medecin'
          active={activeItem === "Ajouter Medecin"}
          onClick={handleItemClick}
          as={Link}
          to='/ajouterMedecin'
        />
        <Menu.Item
          name='Ajouter Patient'
          active={activeItem === "Ajouter Patient"}
          onClick={handleItemClick}
          as={Link}
          to='/ajouter'
        />
        <Menu.Item
          name='Ajouter RDV'
          active={activeItem === "Ajouter RDV"}
          onClick={handleItemClick}
          as={Link}
          to='/ajouterrdv'
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default withRouter(MenuBar);
