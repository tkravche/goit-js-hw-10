import './css/styles.css';
import { fetchCountries } from './fetchCountries';

import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
  cssAnimationStyle: 'from-right',
});

const refs = {
  inputCountryName: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputCountryName.addEventListener(
  'input',
  debounce(onInputCountryName, DEBOUNCE_DELAY)
);

function onInputCountryName(e) {
  const countrySearched = e.target.value.trim();
  if (!countrySearched) {
    clearTemplate(refs.countriesList);
    clearTemplate(refs.countryInfo);
    return;
  }
  fetchCountries(countrySearched)
    .then(countryFound => {
      if (countryFound.length === 0) {
        clearTemplate(refs.countriesList);
        clearTemplate(refs.countryInfo);
      } else if (countryFound.length === 1) {
        createCountryInfo(countryFound);
      } else if (countryFound.length >= 2 && countryFound.length <= 10) {
        createCountriesList(countryFound);
      } else if (countryFound.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        clearTemplate(refs.countriesList);
        clearTemplate(refs.countryInfo);
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function createCountriesList(countryFound) {
  const countries = countryFound.reduce(
    (acc, country) =>
      acc +
      `<li><img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="45"></href=></img><p>${country.name.official}</p></li>`,
    '' );
  refs.countriesList.innerHTML = countries;
  clearTemplate(refs.countryInfo);
}

function createCountryInfo(countryFound) {
  refs.countryInfo.innerHTML = `<div class="country-info__mainInfo"><img src="${
    countryFound[0].flags.svg
  }" alt="${
    countryFound[0].name.official
  }" width="40" ><h1 class="country-info__name">
        ${countryFound[0].name.official}</h1></div>
        <p> <span class="country-info__key">Capital</span>: ${
          countryFound[0].capital
        } </p>
        <p> <span class="country-info__key">Population</span>: ${
          countryFound[0].population
        } </p>
        <p> <span class="country-info__key">Languages</span>: ${Object.values(
          countryFound[0].languages
        ).join(', ')} </p>
        `;
  clearTemplate(refs.countriesList);
}

function clearTemplate(data) {
  data.innerHTML = '';
}
