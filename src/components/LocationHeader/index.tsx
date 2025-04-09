import { CiLocationOn } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import {Link} from "react-router-dom";
import {useLocation} from "../../hooks/useLocation";



const LocationHeader: React.FC = () => {
    const {location} = useLocation();

    return (
        <div className="flex items-center justify-between px-4 py-2 max-w-[400px] mx-auto">
                <Link to={'/'}>
                    <div className="flex items-center space-x-2">

                    <CiLocationOn className="text-xl text-gray-600" />
                    <h2 className="text-lg font-semibold">
                        {location}
                    </h2>
                    </div>

                </Link>

            <Link to={`/search`}>
                <button>
                    <FiSearch className="text-xl text-gray-600 hover:text-black transition-colors" />
                </button>
            </Link>

        </div>
    );
};

export default LocationHeader;
