import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import { DataTable } from './components/DataTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Short URLS</h1>
      </header>
      <br />
      <div class="container">
        <DataTable data=""></DataTable>
      </div>
    </div>
  );
}

export default App;
