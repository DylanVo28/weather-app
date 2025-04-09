import WeatherApp from "./components/WeatherApp";
import Provider from "./components/Provider";

const Home: React.FC = () => {
    return <Provider>
        <WeatherApp/>
    </Provider>
}

export default Home;
