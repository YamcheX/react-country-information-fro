import './App.css';
import axios from 'axios';
import { useState } from 'react';
import regionColor from './helpers/regionColor.js';
import worldMap from './assets/world_map.png';
import { useForm } from "react-hook-form";
import spinningGlobe from './assets/spinning-globe.gif'
import formatPopulation from "./helpers/formatPopulation.js";

// endpoint info alle landen: https://restcountries.com/v3.1/independent?status=true
// endpoint specifieke land:  https://restcountries.com/v3.1/name/{name}
// endpoint Nederland :  https://restcountries.com/v3.1/name/netherlands

function App() {
    const { register, handleSubmit, reset } = useForm();
    function onFormSubmit(data) {
        console.log(data.query);
        fetchCountryInfo(data.query);
        reset();
    }
    //console.log(regionColor('Asia'));
    const [countries, setCountries] = useState([]);
    const [countryInfo, setCountryInfo] = useState({});
    const [error, setError] = useState('');


    async function fetchCountry (){
        try {
            const response = await axios.get('https://restcountries.com/v3.1/independent?status=true');
            response.data.sort((a,b) => a.population - b.population);
            setCountries(response.data);
            console.log(response.data);


        } catch (e){
            console.error(e);
        }
    }
    async function fetchCountryInfo (searchTerm){
        setError('');
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`);
            // console.log(response.data[0].capital);
            setCountryInfo(response.data[0]);


        } catch (e) {
            console.error(e);
            setError(`${searchTerm} is niet gevonden. Probeer het opnieuw`);
        }
    }

    return (
        <>
            <header>
                <img src={worldMap} alt='World Map' className='world-map'/>
            </header>
            <main>
                <section>
        <h2>World Regions</h2>
            <ul className='country-list'>
                {countries.map((country) => (
                    <li key={country.cca3} className={regionColor(country.region)}>
                        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className='country-flag'/>
                        <h3 className='country-name'>{country.name.common}</h3>
                        <p className='country-population'>Has a population of {country.population} people</p>

                    </li>
                ))}
             </ul>
            <button type='button' onClick={fetchCountry}>Haal de info op</button>
                </section>

                <section>
                    <h2>Search country information</h2>
                    <img src={spinningGlobe} alt="Spinning Globe" className='spinning-globe'/>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <input
                            type='text'
                            id='query-field'
                            placeholder='Bijvoorbeeld Nederland'
                            {...register('query')}
                        />
                    <button type='submit'>Zoek</button>
                        {error && <p className='error-message'>{error}</p>}
                        {/*// in uitwerking model error anders, id ipv className en binnen span element*/}
                        {/*// {error && <span id="error-message">{error}</span>}*/}
                    </form>
                    {countryInfo.name && !error && (
                    <article>
                    <span>

                    <img src={countryInfo.flags?.png} alt='country flag' className='country-flag'/>
                        <h2>{countryInfo.name?.common}</h2>
                    </span>
                    {countryInfo.name && (
                        <p>
                            {countryInfo.name.common} is situated in {countryInfo.subregion} and the capital is{" "}
                            {countryInfo.capital?.[0]}
                        </p>

                    )}
                        <p>
                            It has a population of {formatPopulation(countryInfo?.population)} million people and it borders with {countryInfo.borders?.length} neighboring countries
                        </p>
                    </article>
                    )}
                </section>
            </main>
        </>
    )
}

export default App
