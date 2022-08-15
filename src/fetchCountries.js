import Notiflix from 'notiflix';

export default function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags,languages,name`)
    .then(response => {
        if (!response.ok) {
            Notiflix.Notify.failure('Oops, there is no country with that name!')
        } else {
            return response.json()
        }
    })
    .catch(error => {console.log('error in catch', error)})
};