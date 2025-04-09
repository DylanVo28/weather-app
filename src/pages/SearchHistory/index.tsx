import React, {useEffect, useState} from 'react';
import {useLocation} from "../../hooks/useLocation";
import { CiSearch } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

const SearchHistory: React.FC = () => {
    const [search, setSearch] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const {updateLocation,history, addHistory,deleteHistory} = useLocation();

    const handleSearch = (query: string) => {
        updateLocation(query);
        addHistory(query)
    };

    const handleDeleteHistory = (item: string) => {
        console.log(item);
        deleteHistory(item)
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const arrsSearch=search.split(",")
        if(arrsSearch.length!==2){
            setError('Invalid country or city')
            return
        }
        if (search) {
            handleSearch(search);
            setSearch('');
            setError('')

        }
    };

    return (
        <div className={'bg-[#a8e6cf] min-h-[100vh] '}>
            <div className={' max-w-[400px] m-auto pt-8'}>

                <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start space-y-1 w-full max-w-md mx-auto">
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={e => setSearch(e.target.value)}
                            className={`bg-white flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none ${
                                error ? "border-red-500" : ""
                            }`}
                        />
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </div>
                    {error && (
                        <span className="text-red-500 text-sm ml-1">Invalid country or city</span>
                    )}
                </div>
                </form>
                <h2 className="font-semibold text-lg mb-2 mt-4">Search History</h2>

                <div className="p-4 rounded-xl shadow bg-white w-full ">
                    <div>
            {history.map((location) => (
                <div
                    key={location}
                    className="flex items-center justify-between text-sm"
                >
                    <span>{location}</span>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleSearch(location)}
                            className="hover:text-blue-600"
                        >
                            <CiSearch size={18} />
                        </button>
                        <button
                            onClick={() => handleDeleteHistory(location)}
                            className="hover:text-red-600"
                        >
                            <CiTrash size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
                </div>
            </div>
        </div>
    );
};

export default SearchHistory;