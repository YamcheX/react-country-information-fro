import './App.css';
import axios from "axios";
import {useState} from "react";
import regionColor from "./helpers/regionColor.js";

// endpoint info alle landen: https://restcountries.com/v3.1/independent?status=true
function App() {
    console.log(regionColor('Asia'));


    const [countries, setCountries] = useState([]);

    async function fetchCountry (){
        try {
            const response = await axios.get('https://restcountries.com/v3.1/independent?status=true');
            response.data.sort((a,b) => a.population - b.population);
            setCountries(response.data);
            console.log(response.data[0].region);

        } catch (e){
            console.error(e);
        }
    }

    return (
        <>
        <h2>World Regions</h2>
            <ul>
                {countries.map((country) => (
                    <li key={country.cca3} className={regionColor(country.region)}>
                        <span className='country-flag'><img src={country.flags.png} alt="country flag"/></span>
                        <h3 className='country-name'>{country.name.official}</h3>
                        <p>Has a population of {country.population} of people</p>

                    </li>
                ))}
             </ul>


            <button type='button' onClick={fetchCountry}>Haal de info op</button>
        </>
    )
}

export default App
