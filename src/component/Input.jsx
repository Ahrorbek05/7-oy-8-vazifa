import React, { useEffect, useState } from 'react';
import countriesData from '../country-currency.json';

function Input() {
  const [openFromOptions, setOpenFromOptions] = useState(false);
  const [openToOptions, setOpenToOptions] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');

  useEffect(() => {
    if (countriesData.length > 0) {
      setSelectedFrom(countriesData[0]);
      setSelectedTo(countriesData[0]);
    }
  }, []);

  function handleSelectCountry(country, type) {
    if (type === 'from') {
      setSelectedFrom(country);
      setOpenFromOptions(false);
    } else {
      setSelectedTo(country);
      setOpenToOptions(false);
    }
  }

  function handleConvert() {
    if (selectedFrom && selectedTo && amount) {
      const fromRate = Object.values(selectedFrom.currencies)[0].rateToUSD;
      const toRate = Object.values(selectedTo.currencies)[0].rateToUSD;
      const Amount = (fromRate / toRate) * amount;
      setResult(Amount);
    }
  }

  const filteredFromCountries = countriesData.filter(country =>
    country.name.toLowerCase().includes(searchFrom.toLowerCase())
  );

  const filteredToCountries = countriesData.filter(country =>
    country.name.toLowerCase().includes(searchTo.toLowerCase())
  );

  return (
    <div className="flex justify-between mt-16">
      <p className='absolute top-48 font-bold'>Amount</p>
      <input
        type="number"
        placeholder="Amount to convert..."
        className="input input-bordered w-72 p-3 max-h-12 rounded-md max-w-xs border-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      
      <div>
        <p className="mt-[-36px] mb-2 text-lg font-bold">From</p>
        <div
          onClick={() => setOpenFromOptions(!openFromOptions)}
          className="border-2 w-80 flex p-3 h-12 rounded justify-between cursor-pointer"
        >
          {selectedFrom && !openFromOptions && (
            <>
              <img src={selectedFrom.flag} alt={`${selectedFrom.name} flag`} className="w-8" />
              <span>
                {selectedFrom.currencies && (
                  `${Object.keys(selectedFrom.currencies)[0]} - ${Object.values(selectedFrom.currencies)[0].name}`
                )}
              </span>
            </>
          )}
          {openFromOptions && (
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow outline-none"
                placeholder="Search"
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
              />
            </label>
          )}
          <span>
            {!openFromOptions ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i onClick={() => setOpenFromOptions(false)} className="fa-solid fa-xmark"></i>
            )}
          </span>
        </div>

        {openFromOptions && (
          <ul className="options shadow-lg px-3 w-72 bg-white overflow-y-scroll h-80 rounded">
            {filteredFromCountries.map((country, index) => (
              <li
                key={index}
                className="flex gap-5 mt-2 items-center cursor-pointer hover:bg-slate-300 text-sm"
                onClick={() => handleSelectCountry(country, 'from')}
              >
                <img src={country.flag} alt={`${country.name} flag`} className="w-8 h-6" />
                <span>
                  {country.currencies && (
                    `${Object.keys(country.currencies)[0]} - ${Object.values(country.currencies)[0].name}`
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p className="mt-[-36px] mb-2 text-lg font-bold">To</p>
        <div
          onClick={() => setOpenToOptions(!openToOptions)}
          className="border-2 w-80 flex p-3 h-12 rounded justify-between cursor-pointer"
        >
          {selectedTo && !openToOptions && (
            <>
              <img src={selectedTo.flag} alt={`${selectedTo.name} flag`} className="w-8" />
              <span>
                {selectedTo.currencies && (
                  `${Object.keys(selectedTo.currencies)[0]} - ${Object.values(selectedTo.currencies)[0].name}`
                )}
              </span>
            </>
          )}
          {openToOptions && (
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow outline-none"
                placeholder="Search"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
              />
            </label>
          )}
          <span>
            {!openToOptions ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i onClick={() => setOpenToOptions(false)} className="fa-solid fa-xmark"></i>
            )}
          </span>
        </div>

        {openToOptions && (
          <ul className="options shadow-lg px-3 w-72 bg-white overflow-y-scroll h-80 rounded">
            {filteredToCountries.map((country, index) => (
              <li
                key={index}
                className="flex gap-5 mt-2 items-center cursor-pointer hover:bg-slate-300 text-sm"
                onClick={() => handleSelectCountry(country, 'to')}
              >
                <img src={country.flag} alt={`${country.name} flag`} className="w-8 h-6" />
                <span>
                  {country.currencies && (
                    `${Object.keys(country.currencies)[0]} - ${Object.values(country.currencies)[0].name}`
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleConvert} className="absolute top-[480px] right-[260px] bg-white font-semibold border-2 p-4 rounded-md">
        Convert
      </button>

      {result && (
        <div className="mt-4">
          <p className="text-lg font-bold absolute fixed top-[350px] left-[290px]">Amount: {result}</p>
        </div>
      )}
    </div>
  );
}

export default Input;
