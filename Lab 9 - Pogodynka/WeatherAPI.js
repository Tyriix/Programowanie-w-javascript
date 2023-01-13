export default class WeatherAPI{

    static GetAllCities(){
        const cities = JSON.parse(localStorage.getItem('weatherapp-cities') || '[]');
        return cities;
    }

    static SaveCity(cityToSave){
        const cities = WeatherAPI.GetAllCities();
        console.log(cityToSave)
        console.log(cityToSave.name)
        cities.push(cityToSave);
        localStorage.setItem('weatherapp-cities', JSON.stringify(cities))
        
    }
}