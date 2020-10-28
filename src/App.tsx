import React from 'react';
import './App.css';
import Button from "./components/Button";
import Text from "./components/Text";
import CellsList from "./components/CellsList";

function App() {
  return (
    <div className="App">
        <Text />
        <CellsList />
        <Button/>
    </div>
  );
}

export default App;
