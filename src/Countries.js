import { useState } from "react";
import { useRef, useEffect } from "react";
import data from "./utils/data.json";
import Cards from "./components/Cards";

function Countries({ theme }) {
  const termRef = useRef(null);
  const regionRef = useRef(null);
  const [term, setTerm] = useState("");
  const [region, setRegion] = useState("");
  const [Countriesdata, setCountriesdata] = useState();

  let style, ihStyle, textStyle;
  textStyle = {
    color: theme ? "hsl(200, 15%, 8%)" : "white"
  };
  style = {
    backgroundColor: theme ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)"
  };
  ihStyle = {
    color: theme ? "" : "white",
    backgroundColor: theme ? "white" : "hsl(209, 23%, 22%)"
  };
  useEffect(() => {
    setCountriesdata(
      data.filter((country) => {
        const nameMatch = country.name.toLowerCase().includes(term);
        const continentMatch = region
          ? country.region.toLowerCase().includes(region)
          : true;
        return nameMatch && continentMatch;
      })
    );
  }, [term, region]);
  function handleSearch(e) {
    e.preventDefault();
    setTerm(termRef.current.value.toLowerCase());
    setRegion(regionRef.current.value.toLowerCase());
    console.log("Form submitted.....");
    console.log(termRef.current.value);
    console.log(regionRef.current.value);
    console.log(Countriesdata);
  }

  return (
    <>
      <div className="whole" style={textStyle}>
        <div className="body" style={style}>
          <div className="form">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder=" Search..."
                ref={termRef}
                style={ihStyle}
              />
              <select id="continent" ref={regionRef} style={ihStyle}>
                <option value=""> Filter by Region</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
              <input type="submit" value="Search" />
            </form>
          </div>
          <div className="card-grp">
            <Cards
              Countriesdata={Countriesdata ? Countriesdata : data}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Countries;
