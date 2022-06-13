

import { useState, useEffect } from "react";
import axios from 'axios';

export default function Main() {
  const [rates, setRates] = useState([])

  useEffect(() => {
    getRates('USD')
  }, []);

  const changeCoin = (element) => {
    getRates(element.target.value)
  }

  const getRates = (coin) => {
    axios.get(`https://open.er-api.com/v6/latest/${coin}`).then((response) => {
      const newRates = {
        MXN: response.data.rates.MXN, 
        USD: response.data.rates.USD, 
        EUR: response.data.rates.EUR, 
        CAD: response.data.rates.CAD,
        GBP: response.data.rates.GBP
      }
      setRates(newRates)
    });
  }

  return (
    <div> 
      <select onChange={(e) => { changeCoin(e) }} defaultValue="USD">
        <option value="MXN">MXN</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="GBP">GBP</option>
      </select>

      {Object.keys(rates).map((coin, i) => {
        return <p key={i}> FIAT {coin}: {rates[coin]} </p>
      })}
    </div>
  );
}
