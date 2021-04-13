//https://disease.sh/v3/covid-19/countries


import React, {useState,useEffect} from 'react';
import{
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import './App.css';

function App() {

  const[countries, setCountries]=useState(["INDIA","USA","UK"]);

  //USEEFFECT = Runs a piece of code based on a given condition
  useEffect(() => {
    //async->send a request,wait for it,do something with it

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json())
      .then((data) => {

        const countries = data.map((country) => (
          {
            name: country.country, //United States, United Kingdom
            value: country.countryInfo.iso2 //UK,USA
          }
        ));
          setCountries(countries);
      })
    };
    getCountriesData();
    
  }, [])
  return (
    <div className="app">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value="abc"
          >
            {countries.map((country)=>(<MenuItem value={country.value}>{country.name}</MenuItem>))}
            
            
          </Select>
      </FormControl>
      </div>
    </div>
  );
}

export default App;
