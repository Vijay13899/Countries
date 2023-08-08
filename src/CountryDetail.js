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
  // const [isLoaded, setIsLoaded] = useState(false);
  function numberToWords(number) {
    // Word representations for numbers 0 to 19
    const units = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    // Word representations for tens
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    // Word representations for large units (thousands, millions, billions, etc.)
    const largeUnits = [
      "",
      "thousand",
      "million",
      "billion",
      "trillion",
      "quadrillion",
      "quintillion",
    ];

    if (number === 0) {
      return units[number];
    }

    // Function to convert a three-digit number to words
    function convertThreeDigitNumber(num) {
      const hundred = Math.floor(num / 100);
      const remainder = num % 100;
      let words = "";

      if (hundred > 0) {
        words += units[hundred] + " hundred ";
      }

      if (remainder > 0) {
        if (remainder < 20) {
          words += units[remainder];
        } else {
          const ten = Math.floor(remainder / 10);
          const unit = remainder % 10;
          words += tens[ten] + " " + units[unit];
        }
      }

      return words.trim();
    }

    // Split the number into groups of three digits
    const groups = [];
    while (number > 0) {
      groups.push(number % 1000);
      number = Math.floor(number / 1000);
    }

    // Convert each group into words and concatenate them
    let result = "";
    for (let i = groups.length - 1; i >= 0; i--) {
      const group = groups[i];
      if (group !== 0) {
        result += convertThreeDigitNumber(group) + " " + largeUnits[i] + " ";
      }
    }

    return result.trim();
  }
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
              <span className="title">Population:</span>{" "}
            </p>
            <p>
              {country.population +
                " (" +
                numberToWords(country.population) +
                ")"}
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
