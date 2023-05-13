import { useParams, useNavigate, Link } from "react-router-dom";
import "./styles.css";
import data from "./utils/data.json";

function CountryDetail({ theme }) {
  const { name } = useParams();
  const country = data.find((c) => c.name.toLowerCase() === name.toLowerCase());
  console.log(name);
  console.log(country);
  const navigate = useNavigate();
  let style, textStyle, btnStyle;
  textStyle = {
    color: theme ? "hsl(200, 15%, 8%)" : "white",
  };
  style = {
    backgroundColor: theme ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)",
  };
  btnStyle = {
    backgroundColor: theme ? "white" : "hsl(207, 26%, 17%)",
    color: theme ? "hsl(207, 26%, 17%)" : "white",
    border: "none",
    boxShadow: theme ? "2px 2px 10px #aaa" : "2px 2px 10px hsl(207, 26%, 10%)",
  };
  return (
    <>
      <div className="detail" style={{ ...textStyle, ...style }}>
        <button className="back" style={btnStyle} onClick={() => navigate(-1)}>
          {"<- Back"}
        </button>
        <img src={country.flag} alt={country.name} />
        <div className="data">
          <div className="part1">
            <h3>{country.name}</h3>
            <p>
              <span className="title">Native Name:</span> {country.nativeName}
            </p>
            <p>
              <span className="title">Population:</span> {country.population}
            </p>
            <p>
              <span className="title">Region:</span> {country.region}
            </p>
            <p>
              <span className="title">Sub Region:</span> {country.subregion}
            </p>
            <p>
              <span className="title">Capital:</span> {country.capital}
            </p>
          </div>
          <div className="part2">
            <p>
              <span className="title">Top level domain:</span>{" "}
              {country.topLevelDomain[0]}
            </p>
            {country.currencies ? (
              <p>
                <span className="title">Currencies:</span>{" "}
                {country.currencies.map((currency, ind) => {
                  if (ind < country.currencies.length - 1) {
                    return currency.name + ",";
                  } else {
                    return currency.name;
                  }
                })}
              </p>
            ) : (
              ""
            )}
            <p>
              <span className="title">Languages:</span>{" "}
              {country.languages.map((language, ind) => {
                if (ind < country.languages.length - 1) {
                  return language.name + ",";
                } else {
                  return language.name;
                }
              })}
            </p>
          </div>
          {country.borders ? (
            <div className="part3">
              <h5>Border countries:</h5>
              <div className="borders">
                {country.borders.map((code) => {
                  let matching_c = data.filter(
                    (country_d) => country_d.alpha3Code === code
                  );
                  console.log(matching_c[0].name);
                  return (
                    <Link
                      to={`/detail/${matching_c[0].name}`}
                      className="border"
                      style={btnStyle}
                    >
                      {matching_c[0].name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default CountryDetail;
