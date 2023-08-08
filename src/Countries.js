import { useState } from "react";
import { useRef, useEffect } from "react";
import data from "./utils/data.json";
import Cards from "./components/Cards";

function Countries({ theme }) {
  const termRef = useRef(null);
  const regionRef = useRef(null);
  const popRef = useRef(null);
  const [term, setTerm] = useState("");
  const [region, setRegion] = useState("");
  const [pop, setPop] = useState("");
  const [Countriesdata, setCountriesdata] = useState();
  // const [isLoaded, setIsLoaded] = useState(false);
  let style, ihStyle, textStyle;
  textStyle = {
    color: theme ? "hsl(200, 15%, 8%)" : "white",
  };
  style = {
    backgroundColor: theme ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)",
  };
  ihStyle = {
    color: theme ? "" : "white",
    backgroundColor: theme ? "white" : "hsl(209, 23%, 22%)",
  };
  useEffect(() => {
    const middle = data.filter((country) => {
      const nameMatch = country.name.toLowerCase().includes(term);
      const continentMatch = region
        ? country.region.toLowerCase().includes(region)
        : true;
      return nameMatch && continentMatch;
    });
    if (pop) {
      if (pop === "asc") {
        middle.sort((a, b) => a.population - b.population);
      } else {
        middle.sort((a, b) => b.population - a.population);
      }
    }
    setCountriesdata(middle);
  }, [term, region, pop]);
  function handleSearch(e) {
    e.preventDefault();
    setTerm(termRef.current.value.toLowerCase());
    setRegion(regionRef.current.value.toLowerCase());
    setPop(popRef.current.value.toLowerCase());
    console.log("Form submitted.....");
    console.log(termRef.current.value);
    console.log(regionRef.current.value);
    console.log(popRef.current.value);
    console.log(Countriesdata);
  }
  // useEffect(() => {
  //   // Simulate content loading delay
  //   setTimeout(() => {
  //     setIsLoaded(true);
  //   }, 2000); // Adjust the delay as needed
  // }, [term, region]);
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
              <select ref={popRef} style={ihStyle}>
                <option value="">Filter by population</option>
                <option value="Asc">Ascending</option>
                <option value="Des">Descending</option>
              </select>
              <input type="submit" value="Search" />
            </form>
          </div>
          <div className={`card-grp` /* ${isLoaded ? "loaded" : ""} */}>
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
