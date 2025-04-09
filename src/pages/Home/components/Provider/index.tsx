import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useLocation} from "../../../../hooks/useLocation";

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

const Context = createContext<IContext>({
    currentWeather: null,
    forecast: []
})

const Provider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {location} = useLocation();
    const {REACT_APP_API_KEY} = process.env; // or replace this ced4c284a8456ffbc462a8322091fce0
    const {data: currentWeather} = useQuery({
        queryKey: ['currentWeather', `location: ${location}`],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${REACT_APP_API_KEY}`
                )
                return response.data
            } catch (error) {
                return null
            }
        },
        initialData: null
    })

    const {data: forecast} = useQuery({
        queryKey: ['forecast', `location: ${location}`],
        queryFn: async () => {
            try {
                const forecastRes = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${REACT_APP_API_KEY}`
                );
                return forecastRes.data.list
            } catch (error) {
                return []
            }

        },
        initialData: []
    })

    return <Context.Provider value={{currentWeather, forecast}}>
        {children}
    </Context.Provider>
}

export const useWeatherApp = () => useContext(Context);

export default Provider