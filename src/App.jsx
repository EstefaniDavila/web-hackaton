import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter como Router
import Routes from './routes/routes';

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root')); // Renderiza tu componente App en el elemento con id "root"
