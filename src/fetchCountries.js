const BASE_URL1 = 'https://restcountries.com/v3.1/name/';
const BASE_URL2 = '?fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL1}${name}${BASE_URL2}`).then(countries => {
    if (!countries.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return countries.json();
  });
}
