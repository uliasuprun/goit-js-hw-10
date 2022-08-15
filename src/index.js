import './css/styles.css';
import fetchCountries from './fetchCountries.js'
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(){
    let countryName = `${searchBox.value}`.trim()
    if (searchBox.value === ""){
        countryList.innerHTML = ""
        countryInfo.innerHTML = ""
    } else {
    fetchCountries(countryName).then(data => {
        if (data.length > 10){
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            countryList.innerHTML = ""
            return
        }
        else if (data.length > 1) {
            generateList(data)
            countryInfo.innerHTML = ""
        }
        else {
            countryList.innerHTML = ""
            generateInfo(...data)
        }
    })
    .catch(error => {console.log('error in catch', error)})
}
};

function createList(array){
    return `<li class = "list-item">
    <img class="list-item__flag" 
    src="${array.flags.svg}" 
    alt="${array.name.official}" 
    width=30 
    height=30>
    <p class = "list-item__info">${array.name.official}</p>
    </li>`
};

function generateList (allArray){
    const result = allArray.reduce((acc, array) => acc + createList(array), "");
    return countryList.innerHTML = result;
};

function generateInfo (array){
    return countryInfo.innerHTML = `
    <h1 class="country-title">
    <img 
    class="flag-list" 
    src="${array.flags.svg}" 
    alt="${array.name.official}" 
    width=50 
    height=50>${array.name.official}</h1>
    <ul>
    <li class="info-item">Languages: <span class="info-text">${Object.values(array.languages)}</span></li>
    <li class="info-item">Population: <span class="info-text">${array.population}</span></li>
    <li class="info-item">Capital: <span class="info-text">${array.capital}</span></li>
    </ul>
    `
};