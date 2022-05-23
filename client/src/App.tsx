import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Table from "./components/Table/Table";
import { SocketIO } from "./lib/socket";

function App() {
  SocketIO();

  return (
    <div className="container p-2">
      <Navbar></Navbar>
      <Table />
    </div>
  );
}

export default App;
