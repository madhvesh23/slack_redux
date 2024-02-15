import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import MainPage from "./MainPage";
import { useSelector } from "react-redux";
import { setUser } from "../actions/userAction";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, auth } from "../Firebase";
import Firebase from "../Firebase";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const loading = useSelector((state) => state.loading.loading);
  if (loading) {
    return <Firebase />;
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <MainPage /> : <Login/>}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
