import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';


const Exchanges_URL = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_1FftgiCBoQLPBPSsfbxhVjB3hPwpo3Za2pgIj2IZ'

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFrom, setAmountInFrom] = useState(true)

  let toAmount, fromAmount;
  if (amountInFrom) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    fromAmount = amount / exchangeRate
    toAmount = amount
  }



  useEffect(() => {
    fetch(Exchanges_URL).then(res => res.json())
      .then(data => {
        console.log(data);
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(Object.keys(data.rates)[0])
        setExchangeRate(data.rates[Object.keys(data.rates)[0]])
      }
      )
  }, [])

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency} onChangeCurrency={e => setFromCurrency(e.target.value)} amount={fromAmount}/>
      <div className='equals'>=</div>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={toCurrency} onChangeCurrency={e => setToCurrency(e.target.value)} amount={toAmount}/>
    </>
  );
}

export default App;

