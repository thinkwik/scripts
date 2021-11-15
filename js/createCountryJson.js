import axios from 'axios';
import fs from 'fs';
import _ from 'lodash';

async function init() {
  const continents = await axios({ method: 'get', url: 'http://country.io/continent.json' });
  const countryNames = await axios({ method: 'get', url: 'http://country.io/names.json' });
  const isoCodes = await axios({ method: 'get', url: 'http://country.io/iso3.json' });
  const capitals = await axios({ method: 'get', url: 'http://country.io/capital.json' });
  const phoneCodes = await axios({ method: 'get', url: 'http://country.io/phone.json' });
  const currencyCodes = await axios({ method: 'get', url: 'http://country.io/currency.json' });

  let finalData = [];

  for (const country of Object.keys(continents.data)) {
    finalData.push({
      name: countryNames.data[country],
      continentCode: continents.data[country],
      iso2Code: country,
      iso3Code: isoCodes.data[country],
      capital: capitals.data[country],
      phoneCode: phoneCodes.data[country],
      currencyCode: currencyCodes.data[country],
    });
  }

  finalData = _.orderBy(finalData, 'name', 'asc');

  fs.writeFileSync('./countries.json', JSON.stringify(finalData, null, 2));
}

init();
