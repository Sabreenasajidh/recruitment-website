var axios = require('axios');

export const fetchCountries = async()=>{
  return await axios.get(
    "https://countriesnow.space/api/v0.1/countries"
);
}

export default {fetchCountries}