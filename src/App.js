//https://disease.sh/v3/covid-19/countries


import React, {useState,useEffect} from 'react';
import{MenuItem,FormControl,Select,Card,CardContent} from "@material-ui/core";
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';

function App() {

  const[countries, setCountries]=useState([]);
  const[country, setInputCountry]=useState("worldwide");
  const[countryInfo, setcountryInfo]=useState({});
  const[tableData, settableData]=useState([]);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=> response.json())
    .then((data) =>{
      setcountryInfo(data);
    });
},[]);
  

  //USEEFFECT = Runs a piece of code based on a given condition
  useEffect(() => {
    //async->send a request,wait for it,do something with it

    const getCountriesData = async () => {
       fetch("https://disease.sh/v3/covid-19/countries")
       .then((response) => response.json())
      .then((data) => {

        const countries = data.map((country) => (
          {
            name: country.country, //United States, United Kingdom
            value: country.countryInfo.iso2 //UK,USA
          }
        ));
         let sortedData=sortData(data);
          settableData(sortedData);
          setCountries(countries);
      })
    };
    getCountriesData();
    
  }, [])

  const onCountryChange = async (event) => {
    const countryCode =event.target.value;
    

    const url = countryCode ==="worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    console.log(url);
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setInputCountry(countryCode);

      //All of the data from the country response
      setcountryInfo(data);
    });
  };
  
  console.log("Country Info >>>",countryInfo);
  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            onChange={onCountryChange}
            value={country}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country)=>(<MenuItem value={country.value}>{country.name}</MenuItem>))}
            
            
          </Select>
      </FormControl>
      </div>

      <div className="app__stats">
            <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases}total={countryInfo.cases}/>

            <InfoBox title="Recoverd" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

            <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
      </div>

      <Map/>
      </div>

      <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}/>
            <h3>Worldwide new cases</h3>
            <LineGraph />
          </CardContent>
      </Card>

      
    </div>
  );
}

export default App;
