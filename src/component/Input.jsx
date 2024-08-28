import React, { useEffect, useState } from 'react';
import countriesData from '../country-currency.json';

function Input() {
  const [openOptions, setOpenOptions] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (countriesData.length > 0) {
      setSelected(countriesData[0]);
    }
  }, []);

  const handleSelectCountry = (country) => {
    setSelected(country);
    setOpenOptions(false);
  };

  return (
    <div className="flex justify-between mt-16">
      <input 
        type="text" 
        placeholder="Type to search..." 
        className="input input-bordered w-72 p-3 max-h-12 rounded-md max-w-xs border-2" 
      />
      <input 
        type="text" 
        placeholder="Type to search..." 
        className="input input-bordered w-72 p-3 rounded-md max-h-12 max-w-xs border-2" 
      />
      
      <div>
        <p className='mt-[-36px] mb-2 text-lg font-bold'>To</p>
        <div 
          onClick={() => setOpenOptions(!openOptions)} 
          className="border-2 w-80 flex p-3 h-12 rounded justify-between cursor-pointer"
        >
          {selected && (
            <>
              <img src={selected.flag} alt={`${selected.name} flag`} className='w-8' />
              <span>
                {selected.currencies && (
                  `${Object.keys(selected.currencies)[0]} - ${Object.values(selected.currencies)[0].name}`
                )}
              </span>
            </>
          )}
          <span>
            {!openOptions ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i onClick={() => setOpenOptions(false)} className="fa-solid fa-xmark"></i>
            )}
          </span>
        </div>

        {openOptions && (
          <ul className="options shadow-lg px-3 w-72 bg-white overflow-y-scroll h-80 rounded">
            {countriesData.map((country, index) => (
              <li 
                key={index} 
                className="flex gap-5 mt-2 items-center cursor-pointer hover:bg-slate-300 text-sm"
                onClick={() => handleSelectCountry(country)}
              >
                <img src={country.flag} alt={`${country.name} flag`} className='w-8 h-6' />
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
    </div>
  );
}

export default Input;
