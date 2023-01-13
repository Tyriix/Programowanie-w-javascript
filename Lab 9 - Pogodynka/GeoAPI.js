export default class GeoAPI{
    
    static GeocoderAutocomplete(searchInput, geoApiKey) {
      var requestOptions = {
        method: "GET",
      };
  
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchInput}&apiKey=${geoApiKey}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) =>  {
            return result;
        })
        .catch((error) => console.log("error", error));
    }
    static ShowAutocomplete(){

    }
  }