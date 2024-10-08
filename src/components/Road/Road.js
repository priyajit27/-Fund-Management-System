import React from 'react';
import { Route, Routes } from "react-router-dom";
import Data from '../Data/Data';
import Form from "../Form/Form";
import Navbar from "../Navbar/Navbar";
import Option from "../Option/Option";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadAccount,
  loadAllData,
  loadMedical,
  loadNetwork,
  loadProvider,
  subscribeToEvents,
} from "../../store/interactions";
import config from "../../config.json";
import Alert from "../Alert/Alert";
const Road= () => {
    const dispatch = useDispatch();
    const loadBlockchainData = async () => {
      const provider = loadProvider(dispatch);
      const chainId = await loadNetwork(provider, dispatch);
      const medical_config = config[chainId].medical;
      window.ethereum.on("accountsChanged", () => {
        loadAccount(provider, dispatch);
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      const medical = loadMedical(provider, medical_config.address, dispatch);
      loadAllData(provider, medical, dispatch);
      subscribeToEvents(medical, dispatch);
    };
    useEffect(() => {
      loadBlockchainData();
    });
  return (
    <div className="App">
    <div className="navbar">
      <Navbar />
      <Option />
      <Routes>
        <Route path="/form" exact element={<Form />} />
        <Route path="/Data" element={<Data />} />
      </Routes>
      <Alert />
    </div>
    {/* </div> */}
  </div>
  );
};

export default Road;



