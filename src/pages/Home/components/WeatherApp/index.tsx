import WeatherCard from "../WeatherCard";
import ForecastList from "../ForecastList";


const WeatherApp: React.FC = () => {

    return (<article className={'bg-[#a8e6cf] '}>
            <div className={' max-w-[400px] m-auto pt-8'}>
                <section>
                    <WeatherCard/>
                </section>
                <br/>
                <section>
                    <ForecastList/>
                </section>
            </div>
        </article>
    );
};

export default WeatherApp;