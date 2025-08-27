import './App.css';
import axios from "axios";
import {useState} from "react";
// endpoint info alle landen: https://restcountries.com/v3.1/independent?status=true
function App() {
    const [countryName, setCountryName] = useState('');
    const [countryPopulation, setCountryPopulation] = useState(0);
    const [countryFlag, setCountryFlag] = useState('')

    async function fetchCountry (){
        try {
            const response = await axios.get('https://restcountries.com/v3.1/independent?status=true');
            console.log(response.data[0].flags);
            setCountryName(response.data[0].name.official);
            setCountryPopulation(response.data[0].population);
            setCountryFlag(response.data[0].flags.png);
        } catch (e){
            console.error(e);
        }
    }

    return (
        <>
        <h1>World Regions</h1>
            <ul>
                <li>{countryName}</li>
                <p>Has a population of {countryPopulation} of people</p>
                <img src={countryFlag} alt="country flag"/>
            </ul>
            <button type='button' onClick={fetchCountry}>Haal de info op</button>
        </>
    )
}

export default App
