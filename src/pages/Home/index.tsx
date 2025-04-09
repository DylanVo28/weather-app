import WeatherApp from "../../components/WeatherApp";
import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "../../hooks/useLocation";

interface WeatherData {
    main: { temp: number; humidity: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number; deg: number };
    visibility: number;
}

interface ForecastData {
    dt: number;
    main: { temp_max: number; temp_min: number };
    weather: { description: string; icon: string }[];
}
interface IContext {
    currentWeather: WeatherData | null;
    forecast: ForecastData[]
}
const Context=createContext<IContext>({
    currentWeather:null,
    forecast:[]
})

const Home: React.FC = () => {
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData[]>([]);
    const {location,addHistory} = useLocation();
    const {REACT_APP_API_KEY}=process.env; // or replace this ced4c284a8456ffbc462a8322091fce0

    useEffect(() => {
        fetchWeather(location);
    }, []);

    const fetchWeather = async (query: string) => {
        try {
            // Current weather
            const currentRes = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${REACT_APP_API_KEY}`
            );
            setCurrentWeather(currentRes.data);

            // 5-day forecast
            const forecastRes = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${REACT_APP_API_KEY}`
            );
            setForecast(forecastRes.data.list);
            addHistory(query)
        } catch (err) {
            setCurrentWeather(null);
            setForecast([]);
        }
    };

    return <Context.Provider value={{currentWeather,forecast}}>
        <WeatherApp/>
    </Context.Provider>
}

export const useWeatherApp = () => useContext(Context);

export default Home