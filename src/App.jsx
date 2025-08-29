import './App.css';
import axios from "axios";
import {useState} from "react";
import regionColor from "./helpers/regionColor.js";

// endpoint info alle landen: https://restcountries.com/v3.1/independent?status=true
function App() {
    console.log(regionColor('Asia'));

    const [countriesInfo, setCountriesInfo] = useState({
        name: '',
        population: 0,
        flag: '',
        region: '',
    });

    async function fetchCountry (){
        try {
            const response = await axios.get('https://restcountries.com/v3.1/independent?status=true');
            console.log(response.data[0].flags);
            setCountriesInfo({
                name: response.data[0].name.official,
                population: response.data[0].population,
                flag: response.data[0].flags.png,
                region: response.data[0].region,
            });
            console.log(response.data[0].region);

        } catch (e){
            console.error(e);
        }
    }

    return (
        <>
        <h1>World Regions</h1>
            <ul>
                <li>{countriesInfo.name}</li>
                <p>Has a population of {countriesInfo.population} of people</p>
                <img src={countriesInfo.flag} alt="country flag"/>
            </ul>
            <button type='button' onClick={fetchCountry}>Haal de info op</button>
        </>
    )
}

export default App
