const BASE_URL1 = 'https://restcountries.com/v3.1/name/';
const BASE_URL2 = '?fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL1}${name}${BASE_URL2}`).then(countries => {
    if (countries.status === 404) {
      return Promise.reject(new Error());
    }
    return countries.json();
  });
}
