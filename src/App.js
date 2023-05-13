import Countries from "./Countries";
import "./styles.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route } from "react-router-dom";
import CountryDetail from "./CountryDetail.js";

export default function App() {
  const [theme, setTheme] = useState(true);
  function handleClick() {
    setTheme(!theme);
  }
  let ihStyle;
  ihStyle = {
    color: theme ? "" : "white",
    backgroundColor: theme ? "white" : "hsl(209, 23%, 22%)"
  };
  return (
    <>
      <div className="header" style={ihStyle}>
        <h4>Where in the world?</h4>
        {theme ? (
          <p className="theme" onClick={handleClick}>
            <FontAwesomeIcon icon={faMoon} /> Dark mode
          </p>
        ) : (
          <p className="theme" onClick={handleClick}>
            <FontAwesomeIcon icon={faSun} /> Light mode
          </p>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Countries theme={theme} />} />
        <Route path="/detail/:name" element={<CountryDetail theme={theme} />} />
      </Routes>
    </>
  );
}
