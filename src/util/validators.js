export const validatePatientInput = ({ nom, prenom, cin }) => {
  const errors = {};

  if (nom.trim() === "") {
    errors.nom = "Le Nom est Obligatoire";
  }
  if (prenom.trim() === "") {
    errors.prenom = "Le Prénom est Obligatoire";
  }
  if (cin.trim() === "") {
    errors.cin = "Le CIN est Obligatoire";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateMedecinInput = ({
  nom,
  prenom,
  cinMedecin,
  specialite,
  nomServiceDep,
}) => {
  const errors = {};

  if (nom.trim() === "") {
    errors.nom = "Le Nom est Obligatoire";
  }
  if (prenom.trim() === "") {
    errors.prenom = "Le Prénom est Obligatoire";
  }
  if (cinMedecin.trim() === "") {
    errors.cinMedecin = "Le CIN est Obligatoire";
  }
  if (specialite.trim() === "") {
    errors.specialite = "La spécialité est Obligatoire";
  }
  if (nomServiceDep.trim() === "") {
    errors.nomServiceDep = "Le nom de service est Obligatoire";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
export const validateRDVInput = ({ cinPatient, cinMedecin, date, heure }) => {
  const errors = {};

  if (cinPatient.trim() === "") {
    errors.cinPatient = "Le Nom est Obligatoire";
  }

  if (cinMedecin.trim() === "") {
    errors.cin = "Le CIN est Obligatoire";
  }
  if (date.trim() === "") {
    errors.date = "La date est Obligatoire";
  }
  if (heure.trim() === "") {
    errors.heure = "L'heure est Obligatoire";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

