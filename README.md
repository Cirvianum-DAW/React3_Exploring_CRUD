# REACT 3 - Exploring CRUD

Fins ara hem vist com s'interconnecten els diferents components i com podem passa informació entre ells així com alguns dels principals **hooks** de React: `useState` i `useEffect`. 

Anem a continuar amb la nostra aplicació per tal de donar solució al repte que havíem plantejat i continuar millorant les característiques del CRUD sobre la nostra aplicació. 

## Instal·lació

En aquest cas tens disponible el codi fins el punt on ens vam quedar a l'anterior entrega, [MP6_React2_ThinkReact](https://github.com/Cirvianum-DAW/MP6_React2_ThinkReact). Pots fer servir aquests o continuar amb el teu i mirar d'incorporar els canvis. 

## React developer tools

Abans de continuar, pots instal·lar l'extensió de Chrome [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=es). Aquesta extensió ens permetrà inspeccionar els components de React i veure les seves propietats i estat. Quan entris a l'inspector del teu navegador veuràs que apareixen les pestanyes `Components` i `Profiler`. Ens interessa la pestanya de `Components`. Podràs veure en tot moment els valors de les variables d'estat i les propietats dels components renderitzats.

## Solució a l'anterior repte

### Edició d'estudiants

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
