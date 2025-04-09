import React, {useMemo} from "react";
import {useWeatherApp} from "../Provider";
import ImageCustom from "../../../../components/ui/ImageCustom";

interface ForecastData {
    dt: number;
    main: { temp_max: number; temp_min: number };
    weather: { description: string; icon: string }[];
}

const ForecastList = () => {
    const {forecast} = useWeatherApp()

    const groupByDay = useMemo(() => {
        return forecast.reduce((acc, item) => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
        }, {} as Record<string, typeof forecast>);
    }, [forecast])

    return <div className="bg-white rounded-2xl shadow-md p-6 max-w-xl mx-auto">
        <ul>
            {Object.entries(groupByDay).map(([date, items]) => (
                <li key={date}>
                    <h3 className={'font-bold mb-2'}>{date === new Date().toLocaleDateString() ? 'Today' : date}</h3>
                    {
                        items.map((item, index) => <ForecastCard key={index} item={item}/>)
                    }
                </li>
            ))}
        </ul>

    </div>
}
const ForecastCard: React.FC<{ item: ForecastData }> = ({item}) => {
    const date = new Date(item.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    const tempMax = Math.round(item.main.temp_max) / 10
    const tempMin = Math.round(item.main.temp_min) / 10
    return (
        <div className="mb-4">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm text-gray-800">
                    <span className="">{date}</span>
                    <ImageCustom src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="weather"
                                 className="w-8 h-8"/>
                    <span className="text-center w-[100px]">
                        {tempMax}/{tempMin}°C
                    </span>
                    <span className="text-right flex-1 capitalize text-gray-600">{item.weather[0].description}</span>
                </div>
            </div>
        </div>
    );
};

export default ForecastList;
