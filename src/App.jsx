/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Form from './components/Form';
import StudentList from './components/studentList';

const App = () => {
  const [tipusEstudiant, setTipusEstudiant] = useState('Grau');
  const [ngPlaces, setNGPlaces] = useState(60);
  const [gPlaces, setGPlaces] = useState(40);
  const [detallsEstudiant, setDetallsEstudiant] = useState({});
  const [action, setAction] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');

  const handleChange = (e) => {
    setTipusEstudiant(e.target.value);
  };

  const setPlacesDisponibles = (updatedPlaces) => {
    tipusEstudiant === 'PostGrau'
      ? setGPlaces(updatedPlaces)
      : setNGPlaces(updatedPlaces);
  };

  const handleItemSelection = (action, selectedItemId) => {
    setAction(action);
    setSelectedItemId(selectedItemId);
  };

  const restaurarPlaces = (pgm) => {
    pgm === 'Grau' ? setNGPlaces(ngPlaces + 1) : setGPlaces(gPlaces + 1);
  };

  return (
    <div className="App flex flex-col items-center justify-center ">
      <div className="programes my-2">
        <h3 className="title my-2 text-2xl text-blue-500">
          Formulari d'inscripció d'estudiants.
        </h3>
        <ul className="ulInscripcio ">
          <li
            className="parentLabels my-2 flex items-center justify-evenly"
            onChange={handleChange}
          >
            <label className="radioLabel">
              <input
                type="radio"
                value="Grau"
                name="programGroup"
                defaultChecked
                className="radioInput mr-2"
              />
              Grau
            </label>
            <label className="radioLabel">
              <input
                type="radio"
                value="PostGrau"
                name="programGroup"
                className="radioInput mr-2"
              />
              Post Grau
            </label>
          </li>
          <li className="parentLabels my-2">
            Places disponibles per estudiant{' '}
            <strong>
              {tipusEstudiant}:{' '}
              {tipusEstudiant === 'PostGrau' ? gPlaces : ngPlaces}
            </strong>
          </li>
        </ul>
      </div>
      <Form
        tipusEstudiantSelect={tipusEstudiant}
        setPlacesDisponibles={setPlacesDisponibles}
        placesActuals={tipusEstudiant === 'PostGrau' ? gPlaces : ngPlaces}
        setDetallsEstudiant={setDetallsEstudiant}
        handleItemSelection={handleItemSelection}
      />
      <StudentList
        detallsEstudiant={detallsEstudiant}
        setDetallsEstudiant={setDetallsEstudiant}
        action={action}
        setAction={setAction}
        selectedItemId={selectedItemId}
        restaurarPlaces={restaurarPlaces}
      />
    </div>
  );
};

export default App;
