import { useEffect, useRef, useState } from "react";
import classes from "./BitcoinDashboard.module.css";
import Currency from "./Currency/Currency";
import Card from "./UI/Card";

const BitcoinDashboard = () => {
  const [currency, setCurrency] = useState({ bpi: "", time: { updated: "" } });
  const [isFetchedFirtTime, setisFetchedFirstTime] = useState(false);

  const [difference, setDifference] = useState({});

  console.log(difference);

  const prevCountRef = useRef();

  if (isFetchedFirtTime === false) {
    fetchCurrencyData();
    setisFetchedFirstTime(true);

    console.log("is updated?");
  }

  // every 15 seconds fetches the data
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrencyData();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // checkes the difference between last and updated currencies
  useEffect(() => {
    const tmpDifference = {};

    Object.keys(currency.bpi).forEach((key) => {
      if (prevCountRef.current !== "") {
        console.log(currency.bpi[key].rate, prevCountRef.current[key].rate);
        if (currency.bpi[key].rate < prevCountRef.current[key].rate)
          tmpDifference[key] = "decrease";
        else if (currency.bpi[key].rate > prevCountRef.current[key].rate)
          tmpDifference[key] = "increase";
        else tmpDifference[key] = "";
      }
    });

    setDifference(tmpDifference);

    //console.log(prevCountRef.current, currency.bpi);

    prevCountRef.current = currency.bpi;
  }, [currency.time.updated, currency.bpi]);

  //function to fetch data
  async function fetchCurrencyData() {
    const response = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );

    const data = await response.json();

    setCurrency(data);
  }

  return (
    <Card className={classes.dashboard}>
      <h1>Bitcoin Dashboard</h1>
      <div className={classes.list}>
        <ul>
          {Object.keys(currency.bpi).map((cur, i) => {
            const change =
              Object.keys(difference).length !== 0 ? difference[cur] : "";

            return (
              <Currency
                key={currency.bpi[cur].code}
                currency={currency.bpi[cur].code}
                rate={currency.bpi[cur].rate}
                symbol={currency.bpi[cur].symbol}
                change={change}
              />
            );
          })}
        </ul>
      </div>
    </Card>
  );
};

export default BitcoinDashboard;
