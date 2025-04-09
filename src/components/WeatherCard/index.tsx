import { WiCloudy, WiStrongWind, WiHumidity } from "react-icons/wi";
import { FaArrowDown } from "react-icons/fa";
import {useWeatherApp} from "../../pages/Home";



const WeatherCard: React.FC = ({
                                                 }) => {
    const date = new Date().toLocaleDateString();

    const {currentWeather}=useWeatherApp()
    return (

        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
            <p className="text-gray-600 mb-4">{date}</p>
            <div className="flex items-center justify-center gap-8">
               <img src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`} alt={currentWeather?.weather[0].icon} />
                <div className="text-right">
                    <p className="text-3xl font-semibold">{Math.round(currentWeather?.main.temp || 0)/10}°C</p>
                    <p className="text-gray-700">{currentWeather?.weather[0].description}</p>
                </div>
            </div>
            <div className="mt-6 flex justify-between text-sm text-gray-700">
                <div className="flex flex-col items-center">
                    <span>Humidity</span>
                    <div className={'flex gap-1 items-center'}>
                        <WiHumidity className="text-2xl" />
                        <span className="font-semibold">{currentWeather?.main.humidity} <span className="text-xs">%</span></span>
                    </div>

                </div>
                <div className="flex flex-col items-center">
                    <span>Winds</span>
                    <div className={'flex gap-1 items-center'}>
                        <div className="flex items-center gap-1">
                            <FaArrowDown className="text-xs" />
                            <span className="font-semibold">{currentWeather?.wind.speed}</span>
                        </div>
                        <span className="text-xs">m/s</span>
                    </div>

                </div>
                <div className="flex flex-col items-center">
                    <span>Visibility</span>
                    <div className={'flex gap-1 items-center'}>
                        <span className="font-semibold">{currentWeather?.visibility || 0 / 1000}</span>
                        <span className="text-xs">km</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
