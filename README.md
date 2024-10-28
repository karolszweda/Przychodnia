# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


Tworzenie frontendu w React to proces budowania dynamicznych interfejsów użytkownika przy użyciu komponentów. React to biblioteka JavaScript do tworzenia nowoczesnych aplikacji webowych z naciskiem na szybkość, modularność i ponowne wykorzystanie kodu. Oto jak krok po kroku zacząć tworzyć frontend w React.

### 1. **Przygotowanie środowiska**
Zanim zaczniesz tworzyć frontend w React, musisz zainstalować kilka narzędzi:

#### Kroki:
1. **Zainstaluj Node.js**: 
   React jest zbudowany na Node.js. Pobierz i zainstaluj Node.js z [oficjalnej strony](https://nodejs.org/).
   
2. **Zainstaluj menedżer pakietów `npm`**:
   Node.js zawiera `npm` (Node Package Manager), który jest używany do instalacji bibliotek i narzędzi.

3. **Uruchom aplikację React**:
   Po zainstalowaniu projektu, możesz uruchomić go lokalnie:
   ```bash
   npm start
   ```
   Aplikacja zostanie uruchomiona na [http://localhost:3000](http://localhost:3000).

### 2. **Struktura projektu React**
Po utworzeniu projektu `create-react-app` utworzy kilka podstawowych plików i katalogów:
- `public/` – zawiera plik `index.html`, który jest podstawą twojej aplikacji.
- `src/` – tutaj znajduje się kod źródłowy aplikacji, w tym komponenty React.

Kluczowy plik w folderze `src` to `index.js`, który renderuje główny komponent aplikacji do DOM-u w przeglądarce:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

### 3. **Tworzenie komponentów React**
React opiera się na **komponentach**. Komponenty to podstawowe bloki budujące interfejs użytkownika. Mogą to być np. przyciski, formularze, całe sekcje strony, które są odseparowane logicznie.

#### Przykład komponentu:
```javascript
// src/components/Welcome.js
import React from 'react';

const Welcome = () => {
    return <h1>Welcome to our Clinic!</h1>;
}

export default Welcome;
```

Aby użyć tego komponentu w aplikacji:
```javascript
// src/App.js
import React from 'react';
import Welcome from './components/Welcome';

function App() {
    return (
        <div className="App">
            <Welcome />
        </div>
    );
}

export default App;
```

### 4. **JSX – JavaScript XML**
React używa specjalnej składni zwanej **JSX**, która pozwala pisać HTML bezpośrednio w plikach JavaScript. JSX wygląda jak HTML, ale jest w rzeczywistości przetwarzany do czystego JavaScript.

#### Przykład JSX:
```javascript
const element = <h1>Hello, world!</h1>;
```
Pod spodem JSX zamieniane jest na:
```javascript
const element = React.createElement('h1', null, 'Hello, world!');
```

### 5. **Stan i właściwości (State i Props)**
Komponenty mogą być stateless lub stateful. Możesz przekazywać dane do komponentów przy pomocy **props** (właściwości) oraz zarządzać wewnętrznym stanem komponentów przy pomocy **state**.

#### Props:
Props to dane przekazywane z komponentu rodzica do komponentu dziecka.
```javascript
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App() {
    return <Welcome name="Anna" />;
}
```

#### State:
State to lokalne dane zarządzane przez komponent. Stateful komponent może zmieniać swój stan.
```javascript
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
```

### 6. **Obsługa zdarzeń**
React obsługuje zdarzenia jak na przykład kliknięcia, zmiany w formularzach, itp. Zdarzenia w React są bardzo podobne do tych w czystym HTML, ale są napisane w camelCase:
```javascript
function handleClick() {
    alert('Button clicked!');
}

function App() {
    return <button onClick={handleClick}>Click me</button>;
}
```

### 7. **Stylowanie komponentów**
Możesz stylować komponenty React na wiele sposobów:
- **CSS**: Importuj zwykłe pliki CSS do komponentów:
  ```javascript
  import './App.css';
  ```
- **Styled-components**: Używaj stylów zdefiniowanych w komponentach, z pomocą biblioteki jak `styled-components`.

#### Przykład stylowania komponentu:
```css
/* App.css */
.App {
    text-align: center;
}
```

W komponencie:
```javascript
function App() {
    return <div className="App">Hello, world!</div>;
}
```

### 8. **Routing (React Router)**
W aplikacjach wielostronicowych używa się biblioteki **React Router**, aby zarządzać nawigacją między stronami.

#### Instalacja:
```bash
npm install react-router-dom
```

#### Przykład użycia:
```javascript
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
            </Switch>
        </Router>
    );
}
```

### 9. **Formularze i zarządzanie stanem**
React daje elastyczne narzędzia do obsługi formularzy i walidacji danych. Możesz także użyć bibliotek jak `formik` lub `react-hook-form` do zarządzania złożonymi formularzami.

#### Przykład formularza w React:
```javascript
function AppointmentForm() {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Appointment for: ${name}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
            />
            <button type="submit">Book Appointment</button>
        </form>
    );
}
```

### 10. **Użycie Bootstrap w React**
Możesz również użyć Bootstrap, aby szybko stylować swoją aplikację. Po prostu zainstaluj `react-bootstrap`:
```bash
npm install react-bootstrap bootstrap
```

Następnie zaimportuj style Bootstrapa w swoim pliku `index.js`:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

Teraz możesz używać komponentów Bootstrapa:
```javascript
import { Button } from 'react-bootstrap';

function App() {
    return <Button variant="primary">Primary Button</Button>;
}
```

### Podsumowanie:
Tworzenie frontendu w React polega na pracy z komponentami, zarządzaniu stanem i integracji z zewnętrznymi bibliotekami do stylizacji, routingu i zarządzania formularzami. Dzięki zastosowaniu Reacta możesz tworzyć dynamiczne i interaktywne interfejsy użytkownika w sposób modularny, co sprzyja łatwemu utrzymaniu i skalowalności aplikacji.
