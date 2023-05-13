import "../styles.css";
import { Link } from "react-router-dom";

function Cards({ Countriesdata, theme }) {
  let ihStyle;
  ihStyle = {
    color: theme ? "" : "white",
    backgroundColor: theme ? "white" : "hsl(209, 23%, 22%)",
    boxShadow: `5px 5px 25px ${theme ? "#aaa" : "#000"}`
  };
  return (
    <>
      {Countriesdata.map((country) => {
        return (
          <div key={country.name} className="card" style={ihStyle}>
            <Link to={`/detail/${country.name}`}>
              <img src={country.flags.png} alt={country.name} />
            </Link>
            <div className="text">
              <h4>{country.name}</h4>
              <p>Population: {country.population}</p>
              <p>Capital: {country.capital}</p>
              <p>Region: {country.region}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Cards;
