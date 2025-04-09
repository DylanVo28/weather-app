import {WiCloudy, WiStrongWind, WiHumidity} from "react-icons/wi";
import {FaArrowDown} from "react-icons/fa";
import {useWeatherApp} from "../Provider";
import ImageCustom from "../../../../components/ui/ImageCustom";
import {get} from 'lodash'


const WeatherCard: React.FC = ({}) => {
    const date = new Date().toLocaleDateString();

    const {currentWeather} = useWeatherApp()
    const srcWeatherImage = `https://openweathermap.org/img/wn/${get(currentWeather, 'weather[0].icon', '')}@2x.png`
    const tempWeather = Math.round(get(currentWeather, 'main.temp', 0)) / 10
    const visibilityWeather = get(currentWeather, 'visibility', 0) / 1000
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
            <p className="text-gray-600 mb-4">{date}</p>
            <div className="flex items-center justify-center gap-8">
                <ImageCustom
                    src={srcWeatherImage}
                    alt={get(currentWeather, 'weather[0].icon', '')}/>
                <div className="text-right">
                    <p className="text-3xl font-semibold">{tempWeather}°C</p>
                    <p className="text-gray-700">{get(currentWeather, 'weather[0].description', '')}</p>
                </div>
            </div>
            <div className="mt-6 flex justify-between text-sm text-gray-700">
                <div className="flex flex-col items-center">
                    <span>Humidity</span>
                    <div className={'flex gap-1 items-center'}>
                        <WiHumidity className="text-2xl"/>
                        <span className="font-semibold">{get(currentWeather, 'main.humidity', '')} <span
                            className="text-xs">%</span></span>
                    </div>

                </div>
                <div className="flex flex-col items-center">
                    <span>Winds</span>
                    <div className={'flex gap-1 items-center'}>
                        <div className="flex items-center gap-1">
                            <FaArrowDown className="text-xs"/>
                            <span className="font-semibold">{get(currentWeather, 'wind.speed', '')}</span>
                        </div>
                        <span className="text-xs">m/s</span>
                    </div>

                </div>
                <div className="flex flex-col items-center">
                    <span>Visibility</span>
                    <div className={'flex gap-1 items-center'}>
                        <span className="font-semibold">{visibilityWeather}</span>
                        <span className="text-xs">km</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
