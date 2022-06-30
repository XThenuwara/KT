import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Table from "./components/Table/Table";
import { SocketIO } from "./lib/socket";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  SocketIO();

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="container p-2">
      <AnimatePresence>
        <Navbar></Navbar>
        <Table />
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
