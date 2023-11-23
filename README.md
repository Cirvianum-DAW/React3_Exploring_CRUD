# REACT 2 - "Think" React

En la primera part, has après alguns conceptes bàsics de React. Hem demostrat aquests conceptes amb l'ajuda d'un projecte de formulari d'inscripció d'estudiants.

A continuació ampliarem aquest projecte així que necessitaràs el codi de la teva pràctica anterior. Insistirem en els conceptes de **props** i **state**, i presentarem els **"lyfe-cycle events"** de React. El nostre projecte constarà de diversos components, i aprendrem com gestionar l'estat entre ells. També explorarem els **React Hooks** amb més detall.

Afegirem més components a la nostra aplicació i farem que siguin més cohesionats. Dissenyarem una llista que emmagatzemi i mostri els detalls dels estudiants. Incorporarem la capacitat d'afegir, eliminar i editar elements, (CRUD) permetent més interacció entre els components de formulari i de llista.

Som-hi!

## Instal·lació

Aquest repositori és una continuació del projecte que s'incia a [REACT 1 - "Hello World"](https://github.com/Cirvianum-DAW/MP6_React1_HelloWorld/tree/desenvolupament) i on ja s'explica com instal·lar les dependències i executar el projecte.

## Extensions de VSCode

Hi ha algunes extensions de VSCode que poden ser útils per desenvolupar amb React. Algunes que ja les coneixeu:

- Prettier - Code formatter
- ESLint - Linter for JavaScript
- ES7+ React/Redux/GraphQL/React-Native snippets
- VS Code React Refactor
- JS JSX Snippets

Investiga de quina manera et poden ajudar aquestes extensions i com instal·lar-les.

## Estructura del projecte

El projecte té la següent estructura:

- `src/App.jsx`: Aquest és el component principal de l'aplicació. És responsable de renderitzar la disposició principal de l'aplicació i altres components.
- `src/index.jsx`: Aquest és el punt d'entrada de l'aplicació. És responsable de renderitzar el component `App` i adjuntar-lo al DOM.
- `src/components/HelloWorld.jsx`: Aquest és un component senzill que mostra un missatge "Hola, món!". És utilitzat pel component `App`.
- `vite.config.js`: Aquest és el fitxer de configuració per a Vite. S'utilitza per personalitzar el comportament de Vite, com ara definir àlies i canviar el directori de sortida de la compilació.
- `package.json`: Aquest és el fitxer de configuració per a npm. Llista les dependències i scripts del projecte.

## Pràctica

### Restructuració del formulari

Anem a fer algunes modificacions sobre el formulari que vam crear a la pràctica anterior. Obre App.js i modifica-ho de manera que et quedi quelcom semblant a això (si vas canviar el no de les variables, adapta-ho).

![Form](./assets/img_readme/radio_buttons.png)

Intenta imaginar com ho faries i, en tot cas, revisa els canvis que hem fet a `App.js`:

```jsx
import React, { useState } from 'react';
import Form from './components/Form';

const App = () => {
  const [tipusEstudiant, setTipusEstudiant] = useState('No Graduat');
  const [ngPlaces, setNGPlaces] = useState(60);
  const [gPlaces, setGPlaces] = useState(40);

  const handleChange = (e) => {
    setTipusEstudiant(e.target.value);
  };

  const setPlacesDisponibles = (updatedPlaces) => {
    tipusEstudiant === 'Graduat'
      ? setGPlaces(updatedPlaces)
      : setNGPlaces(updatedPlaces);
  };

  return (
    <div className="App flex h-screen flex-col items-center justify-center ">
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
                value="No Graduat"
                name="programGroup"
                defaultChecked
                className="radioInput mr-2"
              />
              No Graduat
            </label>
            <label className="radioLabel">
              <input
                type="radio"
                value="Graduat"
                name="programGroup"
                className="radioInput mr-2"
              />
              Graduat
            </label>
          </li>
          <li className="parentLabels my-2">
            Places disponibles per estudiant{' '}
            <strong>
              {tipusEstudiant}:{' '}
              {tipusEstudiant === 'Graduat' ? gPlaces : ngPlaces}
            </strong>
          </li>
        </ul>
      </div>
      <Form
        tipusEstudiantSelect={tipusEstudiant}
        setPlacesDisponibles={setPlacesDisponibles}
        placesActuals={tipusEstudiant === 'Graduat' ? gPlaces : ngPlaces}
      />
    </div>
  );
};

export default App;
```

Principalment hem fet els següents canvis respecte al darrer codi que teníem:

- Sintaxi: passem de funcions de component a funció fletxa (arrow function)
- Hem afegit un encapçala
- Hem afegit un llistat amb els dos tipus d'estudiants i un radiobutton per a cadascun d'ells
- Hem canviat la manera de mostrar el nombre de places disponibles

Anem a fer algunes modificacions també sobre 'Form.js' per tal d'apropar-nos més a un model de formulari habitual. Mostrem un exemple un cop acabem d'introduir les dades d'un nou estudiant:

![newFields](./assets/img_readme/new_fields.webp)

Anem a veure com hem modificat el codi de `Form.js`:

```jsx
import React, { useState } from 'react';

const Form = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleClick = (event) => {
    handleInputReset('', '', '');
    setWelcomeMessage(
      `${firstName} ${lastName} enregistrat. Email enviat a ${email}`,
    );
    props.setPlacesDisponibles(props.placesActuals - 1);
    event.preventDefault(); // Necessari per evitar que el form es refresqui
  };

  //change of input value set method
  const handleInputChange = (setInput, event) => {
    setInput(event.target.value);
  };

  //set input fields
  const handleInputReset = (firstName, lastName, email) => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
  };

  return (
    <div className="flex h-screen justify-center">
      <form className="enrolForm w-3/4" name="enrolForm">
        <ul className="ulEnrol">
          <li className="mb-2">
            <input
              className="border-1 mb-4 w-full rounded-lg border-dotted border-black bg-gray-200 p-2"
              type="text"
              name="firstname"
              placeholder="Nom"
              value={firstName}
              onChange={(event) => handleInputChange(setFirstName, event)}
            />
          </li>
          <li>
            <input
              className="border-1 mb-4 w-full rounded-lg border-dotted border-black bg-gray-200 p-2"
              type="text"
              name="lastname"
              placeholder="Cognom"
              value={lastName}
              onChange={(event) => handleInputChange(setLastName, event)}
            />
          </li>
          <li>
            <input
              className="border-1 mb-4 w-full rounded-lg border-dotted border-black bg-gray-200 p-2"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) => handleInputChange(setEmail, event)}
            />
          </li>
          <li>
            <input
              className="mb-4 w-full rounded bg-blue-500 p-2 px-4 py-2 font-bold text-white hover:bg-blue-700"
              type="submit"
              name="Enrol"
              alt="Enrol"
              value="Inscripció"
              onClick={handleClick}
            />
          </li>
          <li>
            <label className="mb-4 block w-full p-2 text-2xl" id="studentMsg">
              {welcomeMessage}
            </label>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Form;
```

Els principals canvis que hem fet són:

- Sintaxi: passem de funcions de component a funció fletxa (arrow function)
- Hem tret l'encapçalament `h1` que teníem.
- Codi més ordenat i més fàcil d'aplicar estils amb `ul` i `li`.
- S'afegeix el camp `value` per reiniciar els valors a "blank" de `firstName`, `lastName` i `email` al formulari.
- Canviem `onBlur` per `onChange`. Això ens permet que quan es canvia el valor de l'input, el valor de la variable d'estat també canvia.
- Tenim una sola funció `handleInputChange` encarregada de canviar el valor de la variable d'estat en funció de l'input que s'estigui modificant. Aquesta funció rep com a paràmetres la funció `setInput` i l'event que es produeix quan es modifica l'input. Això ens permet reutilitzar la mateixa funció per a tots els inputs.
- Enlloc d'un botó `submit` tenim un botó `button` que crida la funció `handleClick` quan es fa clic. Aquesta funció és la que s'encarrega de fer el submit del formulari.
- La funció `handleInputReset` s'encarrega de reiniciar els valors dels inputs quan es fa el submit del formulari.
- Veuràs algunes classes que no tenen ús (ja que nosaltres apliquem estils amb Tailwind) però que ens permeten veure com es poden aplicar estils a un formulari (i formen part de l'exemple original). Pots obviar-es.

### Llistat d'alumnes

Verifica que la lògica del teu codi funciona correctament, que pots afegir estudiants de tots dos tipus i que el nombre de places disponibles es va actualitzant correctament i es mostra el missatge de benvinguda correctament.

> **Atenció:** A partir d'ara parlaré de estudiants de "grau" i "post-grau" ja que em sembla més lògic per una aplicació que hagi d'utilitzar el personal d'una universitat per exemple de cara a la inscripció de l'alumnat. He fet les modificacions pertinents al codi però si vols que et quedi com a "no-graduat" i "graduat" no hi ha cap problema.

Actualment, disposem d'un formulari d'inscripció d'estudiants que permet al personal introduir informació sobre estudiants de grau i postgrau. No obstant això, no tenim cap manera de veure els estudiants ja inscrits. Abordarem aquesta qüestió en aquesta secció.

Crearem una visualització on el personal pugui veure els detalls dels estudiants inscrits. Tan aviat com el personal introdueixi la informació de l'estudiant, aquesta es afegirà a la vista. Eliminarem el missatge de benvinguda actual ja que no serà necessari quan puguem mostrar l'estudiant afegit a la llista a la part inferior.

Anem a crear un nou component que anomenarem `studentList.jsx`. Anem a crear l'estructura que haurà de tenir i a poblar-ho amb dades estàtiques que omplirem nosaltres de manera manual.

```jsx
import React from 'react';

// Test items
let items = [];
for (let i = 1; i < 5; i++) {
  items.push({
    key: i,
    fname: 'FirstName ' + i,
    lname: 'LastName ' + i,
    program: 'UG',
    email: 'Email ' + i,
  });
}
const StudentList = () => {
  return (
    <table className="m-3 table-auto rounded-lg">
      <thead className="bg-blue-500 p-2 px-4 py-2 font-bold text-white">
        <tr>
          <th className="rounded-l-lg px-4 py-2">Nom</th>
          <th className="px-4 py-2">Cognoms</th>
          <th className="px-4 py-2">Estudis</th>
          <th className="rounded-r-lg px-4 py-2">Correu</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.key}>
            <td className="border px-4 py-2">{item.fname}</td>
            <td className="border px-4 py-2">{item.lname}</td>
            <td className="border px-4 py-2">{item.program}</td>
            <td className="border px-4 py-2">{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default StudentList;
```

Aquí hem fet servir una iteració per omplir les dades amb informació estàtica i poblar la ** taula** a la que hem donat estil bàsic amb les classes de Tailwind.

### Reaccions entre "Sibling Components"

Ara que tenim el llistat d'estudiants, hem de fer que el formulari i el llistat es comuniquin entre ells. En aquest cas, el formulari i el llistat són **components germans** (Sibling Reactions), ja que no hi ha cap relació jeràrquica entre ells. Per tant, no podem utilitzar la comunicació de dalt a baix (top-down) que hem vist fins ara.

> **Nota:** Hem de fer servir el **component pare** (parent component) per a gestionar l'estat i passar-lo als components germans. En aquest cas, el component pare és `App.jsx`.

Anem per passos:

Anem a fer canvis sobre `App.jsx` i ens crearem una variable `detallsEstudiant` per emmagatzemar la informació dels estudiants

```jsx
const [detallsEstudiant, setDetallEstudiants] = useState([]);
```

A continuació haurem de passar aquesta variable com a prop al component `Form`:

```jsx
<Form
  tipusEstudiantSelect={tipusEstudiant}
  setPlacesDisponibles={setPlacesDisponibles}
  placesActuals={tipusEstudiant === 'PostGrau' ? gPlaces : ngPlaces}
  setDetallsEstudiant={setDetallsEstudiant}
/>
```

Ara el component `Form` podrà accedir a la funció `setDetallsEstudiant` que li passarem com a prop (`prop.setStudentDetails`) i que utilitzarem per afegir els detalls de l'estudiant a la llista.

Això és tot el que necessitem a `App.jsx`.

Anem a `Form.jsx` i fem algunes modificacions a la funció `handleClick` perquè afegeixi els detalls de l'estudiant a la llista:

```jsx
const handleClick = (event) => {
  handleInputReset('', '', '');
  props.setPlacesDisponibles(props.placesActuals - 1);
  // Generació d'un ID per l'estudiant - 4digit
  const randomKey = Math.floor(1000 + Math.random() * 9000);
  let id = randomKey;
  props.setDetallsEstudiant({
    key: id,
    fname: firstName,
    lname: lastName,
    programa: props.tipusEstudiantSelect,
    email: email,
  });
  event.preventDefault(); // Necessari per evitar que el form es refresqui
};
```

Hem afegit una variable `randomKey` que ens permetrà generar un ID per a cada estudiant. Aquesta variable es genera amb un nombre aleatori entre 1000 i 9999. A continuació, afegim els detalls de l'estudiant a la variable d'estat `detallsEstudiant` a través de la funció `setDetallsEstudiant` que hem passat com a prop. Per tant quan fem click al botó d'inscripció, a part d'actualitzar el nombre de places disponibles, també afegim els detalls de l'estudiant.

A més d'això, modifica el teu codi de manera que no es mostri el missatge de benvinguda quan s'afegeix un estudiant a la llista (ja no ho necessitem). T'ho deixo a tu... has d'eliminar:

- La variable d'estat `welcomeMessage`
- Els imports de `useState` i `setWelcomeMessage`
- Els elements `label` i `li` que mostren el missatge de benvinguda
- La crida a la funció `setWelcomeMessage` dins de la funció `handleClick`

Ara anem a actualitzar `App.js` novament de manera que passi la variable d'estat `detallsEstudiant` com a prop al component `StudentList`. Ja saps com fer-ho, no? Exacte, afegint com a prop `detallsEstudiant={detallsEstudiant}`:

```jsx
<StudentList detallsEstudiant={detallsEstudiant} />
```

A continuació anem a veure un nou `hook` de React que ens permetrà actualitzar la llista d'estudiants quan s'afegeix un nou estudiant: `useEffect`

Aturem-nos un moment i veiem dos recursos que ens poden ajudar molt en el nostre camí d'aprenentatge de React:

- [La documentació oficial de React](https://www.reactjs.wiki)
- [Preguntas típicas de React.js](https://www.reactjs.wiki/)

Fes un cop d'ull al que ens diu sobre `useEffect`. Com veuràs, aquest hook ens permet executar codi en certs moments que desitjem al llarg del cicle de vida d'un component. En el nostre cas, volem que s'executi cada cop que es modifiqui la variable d'estat `detallsEstudiant`. Per tant, el que farem serà afegir el següent codi a `StudentList.jsx`:

```jsx
const StudentList = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const isItemKey = props.detallsEstudiant.key;
    if (isItemKey) {
      setItems((prevItems) => [...prevItems, props.detallsEstudiant]);
      props.setDetallsEstudiant({});
    }
  }, [props]);
```

Anem a veure què fa aquest codi:

- Hem creat una variable d'estat `items` que contindrà la llista d'estudiants.
- Hem afegit un `useEffect` que s'executarà cada cop que es modifiqui la variable d'estat `props.detallsEstudiant`. Això ho fem a través de la clàusula `useEffect(() => {}, [props])`. Com que l'únic `props` que li passem és `props.detallsEstudiant`, aquest codi s'executarà cada cop que es modifiqui aquesta variable d'estat.
- A continuació, comprovem si la variable d'estat `props.detallsEstudiant` té un valor per la clau `key`. Si és així, afegim els detalls de l'estudiant a la variable d'estat `items` a través de la funció `setItems`. Aquesta funció únicament va afegint els detalls de cada estudiant en forma d'objecte i els afegim a la variable d'estat `items` que és un array. Per poder mantenir els detalls anteriors, ho fem amb l'operador de propagació `...prevItems`.
- Finalment, un cop actualitzada la llista, reiniciem la variable d'estat `props.detallsEstudiant` a través de la funció `props.setDetallsEstudiant({})`.

La gran avantatge de fer servir `useEffect` és que podem executar codi i per tant renderitzar la llista d'estudiants només quan és absolutament necessari. Això ens permetrà millorar el rendiment de la nostra aplicació.

Revisa bé el teu codi fins ara i mira que tot sigui funcional. Si tot ha anat bé, hauries de poder afegir estudiants a la llista i veure els detalls dels estudiants a la taula. Aqui tens un exemple:

![StudentList](./assets/img_readme/student_list.webp)

En alguns moments aquesta lògica d'anar passant les variables d'estat de component a component, seguint la jerarquia d'aquests, pot acabar sent un mal de cap. Per això, React ens proporciona altres maneres de gestionar l'estat de l'aplicació a través dels **context**. Això ho veurem més endavant però. Per ara, continuarem afegint algunes característiques i millorant la nostra aplicació. Anem a mirar d'incorporar les característiques d'un **CRUD** (Create, Read, Update, Delete) per a la nostra aplicació.

### Edició i eliminació d'estudiants

Ara que tenim una llista d'estudiants, volem poder editar i eliminar estudiants. Per fer-ho, afegirem un botó d'edició i un botó d'eliminació a cada fila de la taula. Aquests botons ens permetran editar i eliminar estudiants de la llista.

Anem a fer-ho amb les icones de react. Pots trobar més informació sobre aquestes icones a [react-icons](https://react-icons.github.io/react-icons/). Aqui ho farem amb les icones de Material Design. Per això, instal·la la llibreria `react-icons`:

```bash
npm install react-icons --save
```

A continuació importa les icones que necessitaràs a `StudentList.jsx`:

```jsx
import { MdEdit, MdDelete } from 'react-icons/md';
```

Anem a afegir les dues icones als detalls de cada estudiant a la taula. Al `handleClick` afegeix les dues icones com a part dels detalls de l'estudiant:

```jsx
  const handleClick = (event) => {
    ...
    props.setDetallsEstudiant({
      key: id,
      fname: firstName,
      lname: lastName,
      program: props.tipusEstudiantSelect,
      email: email,
      edit: <MdEdit />,
      delete: <MdDelete />,
    });
    ...
  };
```

Ara que tenim les icones, podem afegir-les a la taula, tant a la capçalera com a cada fila de la taula. Aquí us mostro l'exemple de les files:

```jsx
<tbody>
  {items.map((item) => (
    <tr key={item.key}>
      <td className="border px-4 py-2">{item.fname}</td>
      <td className="border px-4 py-2">{item.lname}</td>
      <td className="border px-4 py-2">{item.program}</td>
      <td className="border px-4 py-2">{item.email}</td>
      <td className="border px-4 py-2">{item.edit}</td>
      <td className="border px-4 py-2">{item.delete}</td>
    </tr>
  ))}

```

Fixa't com hauria de quedar:

![StudentList](./assets/img_readme/student_list_edit_delete.webp)

Comencem implementant la funcionalitat per borrar estudiants. Per fer-ho, hem de lligar un esdeveniment onClick al botó d'eliminació. Aquest esdeveniment ha de cridar a una funció que eliminaria l'estudiant de la llista i que necessitaria de l'ID de l'estudiant com a paràmetre per identificar l'estudiant a eliminar.

Comencem afegint un esdeveniment onClick al botó d'eliminació al botó que hem afegit anteriorment al camp `delete` dels detalls de l'estudiant. Ho farem ja anticipant una funció que anomenarem `handleItemSelection` que encara no hem creat però que ens permetrà gestionar diferents accions sobre l'estudiant.

```jsx
props.setDetallsEstudiant({
  key: id,
  fname: firstName,
  lname: lastName,
  program: props.tipusEstudiantSelect,
  email: email,
  edit: <MdEdit />,
  delete: (
    <MdDelete
      className="hover:text-red-500"
      onClick={() => props.handleItemSelection('delete', id)}
    />
  ),
});
```

Com veus hem afegit també un hover per canviar el color del text del botó d'eliminació quan el ratolí hi passi per sobre. Afegeix les classes de Tailwind que consideris oportunes.

Així doncs, des del `form` s'està esperant que es passi la funció `handleItemSelection` com a prop. Anem a fer-ho a `App.jsx`.

Anem a afegir dues variables d'estat:

```jsx
const [action, setAction] = useState('');
const [selectedItemId, setSelectedItemId] = useState('');
```

La variable `action` ens permetrà saber quina acció s'ha de dur a terme sobre l'estudiant seleccionat. La variable `selectedItem` ens permetrà guardar l'ID de l'estudiant seleccionat.

A continuació, afegim la funció `handleItemSelection` com a prop al component `Form`:

```jsx
<Form
  tipusEstudiantSelect={tipusEstudiant}
  setPlacesDisponibles={setPlacesDisponibles}
  placesActuals={tipusEstudiant === 'PostGrau' ? gPlaces : ngPlaces}
  setDetallsEstudiant={setDetallsEstudiant}
  handleItemSelection={handleItemSelection}
/>
```

D'entrada implementarem la funció `handleItemSelection` per a la funcionalitat d'eliminar estudiants.

```jsx
const handleItemSelection = (action, selectedItemId) => {
  setAction(action);
  setSelectedItemId(selectedItemId);
};
```

Aquesta funció només s'encarrega de guardar l'acció a realitzar i l'ID de l'estudiant seleccionat a les variables d'estat `action` i `selectedItemId` respectivament.

A continuació definim una nova funció `restaurarPlaces`:

```jsx
const restaurarPlaces = (pgm) => {
  pgm === 'Grau' ? setGPlaces(gPlaces + 1) : setNGPlaces(ngPlaces + 1);
};
```

Aquesta funció ens permetrà restaurar el número de places disponibles en funció del tipus d'estudiant quan esborrem un estudiant de la llista. La passarem com a prop al component `StudentList` junt amb la informació necessaria per identificar l'estudiant a eliminar, `action` i `selectedItemId` i les funcions per actualitzar les variables d'estat `action` i `selectedItemId`.

```jsx
<StudentList
  detallsEstudiant={detallsEstudiant}
  setDetallsEstudiant={setDetallsEstudiant}
  action={action}
  setAction={setAction}
  selectedItemId={selectedItemId}
  restaurarPlaces={restaurarPlaces}
/>
```

Anem ara a fer les modificacions sobre el useEffect de `StudentList.jsx` que recordem que es dispararà cada cop que es modifiqui alguna de les variables d'estat `props.detallsEstudiant`, `props.action` o `props.selectedItemId`. Per tant quan cliquem sobre el botó de borrar la variable d'estat `props.action` canviarà a `delete` i la variable d'estat `props.selectedItemId` contindrà l'ID de l'estudiant a eliminar.

```jsx
useEffect(() => {
  const isItemKey = props.detallsEstudiant.key;
  if (isItemKey) {
    setItems((prevItems) => [...prevItems, props.detallsEstudiant]);
    props.setDetallsEstudiant({});
  }
  // Executem la funció de borrar estudiant per l'ID seleccionat
  if (props.action === 'delete') {
    // filtrem l'array d'estudiants per eliminar l'estudiant seleccionat
    const newItems = items.filter((item) => item.key !== props.selectedItemId);
    setItems(newItems);
    // restaurem les places disponisbles (+1)
    props.restaurarPlaces(items.program);
    // reiniciem la variable d'action per poder borrar més d'un element si ho desitjem.
    props.setAction('');
  }
  // compte! si no posem la clàusula [props.detallsEstudiant, props.action, props.selectedItemId] podem tenir problemes d'execucions no desitjades o constants!
}, [props.detallsEstudiant, props.action]);
```

El codi que hem afegit verifica d'entrada si l'acció a realitzar és `delete`. Si és així, filtra l'array d'estudiants per eliminar l'estudiant seleccionat. A continuació, restaurem les places disponibles.

Hauríeu de poder fer i veure el següent:

![StudentList](./assets/img_readme/student_list_delete.gif)

Prova a veure si tot funciona com hauria! Sí? Bona feina!

En resum, què hem fet per aconseguir la funcionalitat d'eliminar? Hem construït una interacció multicomponent a l'aplicació. El component `Form` construeix amb els detalls de l'estudiant necessaris per omplicar les files, juntament amb els botons d'edició i eliminació. Passem aquests detalls al component `StudentList` quan l'usuari fa clic al botó d'enregistrar. Si es vol eliminar una fila d'estudiant, el component `Form` inicia l'acció i passa els detalls al component `StudentList` a través del component `App`. El component `StudentList` elimina l'element i actualitza la llista d'estudiants.Es restaura l'estat de les places utilitzant una comunicació entre els components StudentList i App.

#### Repte - Edició d'estudiants

A la següent activitat acabarem de completar el CRUD però de moment et proposo que intentis implementar la funcionalitat tu mateix.

Com que ja tenim tota la informació al component `Form`, no hauríem de necessitar cap comunicació entre components. Quan l'usuari faci clic al botó d'edició, el component `Form` hauria de mostrar els detalls de l'estudiant a la part superior del formulari. Això ens permetrà editar els detalls de l'estudiant i actualitzar la llista d'estudiants. Hauríem d'apareixer un botó d'actualització en lloc del botó d'inscripció. Aquest botó actualitzarà els detalls de l'estudiant i actualitzarà la llista d'estudiants. I potser també un botó per cancel·lar l'acció dels canvis que s'està fent.

Bona sort!

### Solució - Edició d'estudiants

Anem a fer-ho!

Intentarem a partir d'ara treballar amb variables només en anglès... sí, ho sé, d'entrada hauríem d'haver seguit una convenció però a vegades també va bé per entendre millor què volem dir i què volem fer.

Dit això, hi ha diferents aproximacions per solucionar-ho, però les principals tasques que hauríem de fer són:

- Actualitzar les dades a mostrar amb les de l'estudiant que volem modificar.
- Canviar els botons que s'han de mostrar (d'inscripció a actualització/cancel·lar)

#### Actualitzant els detalls de l'estudiant

Anem al nostre `Form` i fem-nos una variable d'estat `btnValue` que ens permeti canviar el text del botó i saber si és vol afegir o editar un estudiant.

```jsx
const [btnValue, setBtnValue] = useState('Inscripció');
```

Ara ens creem una nova variable d'estat on guardarem l'ID de l'estudiant que volem editar. També guardarem aquí la ID aleatoòria que generem quan es fa una inscripció nova.

```jsx
const [studentID, setStudentID] = useState('');
```

A continuació afegim la lògica per actualitzar els detalls de l'estudiant a la funció `handleEdit`:

```jsx
const handleEdit = (studentID) => {
  handleInputReset(firstName, lastName, email);
  setStudentID(studentID);
  setBtnValue('Actualitzar');
};
```

Cridarem aquesta funció quan l'usuari faci clic al botó d'edició:

- Invoquem `handleInputReset` per omplir el formulari amb els valors que tinguin en aquell moment les variables d'estat del `Form` corresponents amb la informació de l'estudiant (nom, cognoms, correu).
- Actualitzem el valor de la variable d'estat `studentID` amb l'ID de l'estudiant que volem editar (que li passem com a paràmetre).
- Canviem finalment el text que conté la variable d'estat del del botó d'inscripció per "Actualitzar".

La lògica necessària perquè la informació de l'estudiant en cada moment sigui la correcta, s'implementarà al component `studentList`.

Anem a veure com hauríem de modificar la funció `handleClick`que ha de gestionar la lògica al `Form` tant de la inscripció com de l'actualització:

```jsx
const handleClick = (event) => {
  handleInputReset('', '', '');
  props.setPlacesDisponibles(props.placesActuals - 1);
  // Generació d'un ID per l'estudiant - 4digit
  const randomKey = Math.floor(1000 + Math.random() * 9000);
  // Si estem fent una inscripció, generem un ID nou, sino assignem l'ID de l'estudiant
  const id = btnValue === 'Inscripció' ? randomKey : studentID;
  props.setDetallsEstudiant({
    key: id,
    fname: firstName,
    lname: lastName,
    program: props.tipusEstudiantSelect,
    email: email,
    edit: (
      <MdEdit
        className="text-3xl text-blue-500 hover:text-red-500"
        onClick={() => handleEdit(id)}
      />
    ),
    delete: (
      <MdDelete
        className="text-3xl text-blue-500 hover:text-red-500"
        onClick={() => props.handleItemSelection('delete', id)}
      />
    ),
  });
  setBtnValue('Inscripció');
  event.preventDefault(); // Necessari per evitar que el form es refresqui
};
```

Primerament, hem afegit les següents dues línies:

```jsx
const randomKey = Math.floor(1000 + Math.random() * 9000);
const id = btnValue === 'Inscripció' ? randomKey : studentID;
```

D'entrada posem el valor aleatori a la variable d'estat `studentID`. Aquest és el mateix número que estem guardant a la variable `id` i que passem com a `key` a l'edició. Ara bé, la segona línia diu que si el valor del botó és "Inscripció" (és a dir, si estem fent una inscripció) el valor de la variable `id` serà el valor aleatori. En canvi, si el valor del botó és "Actualitzar" (és a dir, si estem fent una actualització) el valor de la variable `id` serà el valor de la variable d'estat `studentID` que conté l'ID de l'estudiant que volem editar.

També hem modificat el botó d'edició perquè cridi a la funció `handleEdit` i li passi l'ID de l'estudiant que volem editar:

```jsx
edit: (
  <MdEdit
    className="text-3xl text-blue-500 hover:text-red-500"
    onClick={() => handleEdit(id)}
  />
),
```

Afegim un esdeveniment `onClick` al botó d'edició que crida a la funció `handleEdit` i li passa l'ID de l'estudiant que volem editar. Recorda que la funció `handleEdit` de "settejar" la variable studentID amb l'ID de l'estudiant que estem passant aquí i que canvia el text del botó d'inscripció per "Actualitzar".

Perquè després de la edició el botó torni a ser "Inscripció" hem afegit la següent línia al final del nostre codi:

```jsx
setBtnValue('Inscripció');
```

Molt bé, anem a crear ara també la funció `handleClickCancel`per poder cancel·lar l'acció d'editar i tornar a tenir el botó d'inscripció. Afegeix-la a sobre del `handleClick`. Aquí bàsicament resetejem els valors dels inputs i tornem a posar el botó d'inscripció.

```jsx
const handleClickCancel = (event) => {
  handleInputReset('', '', '');
  setBtnValue('Inscripció');
  event.preventDefault(); // Necessari per evitar que el form es refresqui
};
```

Fem una mica de repàs del que hem fet fins ara:

- Hem creat dues noves funcions, `handleEdit` i `handleClickCancel` que ens permeten editar i cancel·lar l'acció d'editar.
- Hem modificat la funció `handleClick` per tal que quan es faci clic al botó d'edició, s'executi la funció `handleEdit`.

Ens toca modificar la part gràfica del formulari de manera que es puguin mostrar els botons i siguin efectius. Vegem el codi:

```jsx
<li className="flex justify-around">
  <input
    className="mb-4 rounded bg-blue-500 p-2 px-4 py-2 font-bold text-white hover:bg-blue-700"
    type="submit"
    name="Enrol"
    alt="Enrol"
    value={btnValue}
    onClick={handleClick}
  />
  <input
    className="mb-4 rounded bg-blue-500 p-2 px-4 py-2 font-bold text-white hover:bg-blue-700"
    type="submit"
    name="btnCancel"
    alt="Cancel"
    value="Cancel"
    onClick={handleClickCancel}
  />
</li>
```

El valor de la variable d'estat `btnValue` ens permet que el `value` sigui dinàmic.

#### Modificació de la lògica del component studentList

Ens falta l'element clau. Per tal que la informació de l'estudiant que volem editar es mostri al formulari, hem de modificar el `useEffect` de `StudentList.jsx` perquè actualitzi `detallsEstudiant` amb la informació de l'estudiant que volem editar en cada cas. Això recordem qeu ho fem a través del props `props.detallsEstudiant`.

Fins ara teníem implementada la lògica per borrar i per afegir un estudiant. Anem a veure el com hem canviat el `useEffect` per implementar la lògica d'edició:

```jsx
useEffect(() => {
  // Lògica per borrar estudiants
  if (props.action === 'delete') {
    // filtrem l'array d'estudiants per eliminar l'estudiant seleccionat
    const newItems = items.filter((item) => item.key !== props.selectedItemId);
    setItems(newItems);
    // restaurem les places disponisbles (+1)
    props.restaurarPlaces(items.program);
    props.setAction('');
  }

  // Lògiga per afegir o editar estudiants
  const isItemKey = props.detallsEstudiant.key;
  if (isItemKey) {
    // Comprovem si l'estudiant ja existeix a la llista
    const i = items.findIndex((item) => item.key === isItemKey);
    if (i > -1) {
      // Si l'estudiant ja existeix, actualitzem les dades. Hem d'evitar mutar l'array original
      const newItems = [...items];
      newItems[i] = props.detallsEstudiant;
      setItems(newItems);
    } else {
      setItems((prevItems) => [...prevItems, props.detallsEstudiant]);
      props.setDetallsEstudiant({});
    }
  }
  // Executem la funció de borrar estudiant per l'ID seleccionat
}, [props.detallsEstudiant, props.action]);
```

D'entrada fixa't que hem canviat l'ordre de la lògica anterior i hem posat el cas del `delete` a l'inici del `useEffect`.

A la segona part, allà on abans només actualitzavem els nostre array d'items, és on ara comprovem si volem afegir un de nou o si ens demanen actualizar-lo:

```jsx
const i = items.findIndex((item) => item.key === isItemKey);
if (i > -1) {
  // Si l'estudiant ja existeix, actualitzem les dades. Hem d'evitar mutar l'array original
  const newItems = [...items];
  newItems[i] = props.detallsEstudiant;
  setItems(newItems);
} else {
  setItems((prevItems) => [...prevItems, props.detallsEstudiant]);
  props.setDetallsEstudiant({});
}
```

Si l'ID o key de l'estudiant existeix, ens retornarà els seu index a l'array. Si és així, actualitzem les dades de l'estudiant. Si no, afegim l'estudiant a l'array com feiem abans.

> **Important:** A React no li agrada que es mutin les variables d'estat directament. Podríem pensar en fer directament:

```jsx
items[i] = props.detallsEstudiant;
setItems(items);
```

> Però així estem mutant directament l'array `items` i després establint l'estat amb el mateix array. React pot agrupar múltiples crides a setItems en una sola actualització per raons de rendiment i probablement no renderitzi el component com toca. Així doncs, evita a tota costa mutar les variables d'estat directament. La manera correcta:

```jsx
const newItems = [...items];
newItems[i] = props.detallsEstudiant;
setItems(newItems);
```

#### Últims retocs...

Més o menys ja ho tenim tret d'alguna problemàtica amb la lògica del programa de l'estudiant (graduat o postgrau)
