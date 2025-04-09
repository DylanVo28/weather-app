import WeatherCard from "../WeatherCard";
import ForecastList from "../ForecastList";


const WeatherApp: React.FC = () => {

    return (<div className={'bg-[#a8e6cf] '}>
        <div className={' max-w-[400px] m-auto pt-8'}>
            <WeatherCard/>
            <br/>
           <ForecastList/>
        </div>
        </div>
    );
};

export default WeatherApp;