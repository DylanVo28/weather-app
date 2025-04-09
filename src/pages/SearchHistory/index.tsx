import React, {useEffect, useState} from 'react';
import {useLocation} from "../../hooks/useLocation";
import {CiSearch} from "react-icons/ci";
import {CiTrash} from "react-icons/ci";
import {useMutation} from "@tanstack/react-query";
import {useDebounceCallback} from "usehooks-ts";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const SearchHistory: React.FC = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState<string>('');
    const {updateLocation, history, addHistory, deleteHistory} = useLocation();

    const handleSearch = (query: string) => () => {
        updateLocation(query);
        addHistory(query)
    }

    const handleDeleteHistory = (item: string) => () => {
        deleteHistory(item)
    };

    const submitMutation = useMutation({
        mutationFn: async (e: React.FormEvent) => {
            e.preventDefault();
            const arrsSearch = search.split(",")
            await new Promise(r => setTimeout(r, 1000));
            if (arrsSearch.length !== 2) {
                throw new Error("Invalid country or city")
            }
            if (search) {
                handleSearch(search)();
            }
        },
        onSuccess: () => {
            setSearch('');
            setError('');
        },
        onError: (error) => {
            setError(error.message)
        }
    })

    const handleChangeInput = useDebounceCallback((e) => {
        setSearch(e.target.value);
    }, 300)

    return (
        <article className={'bg-[#a8e6cf] min-h-[100vh] '}>
            <div className={' max-w-[400px] m-auto pt-8'}>
                <section>
                    <form onSubmit={submitMutation.mutate}>
                        <div className="flex flex-col items-start space-y-1 w-full max-w-md mx-auto">
                            <div className="flex w-full">
                                <Input
                                    placeholder="Search..."
                                    onChange={handleChangeInput}

                                />

                                <Button
                                    disabled={submitMutation.isPending}
                                    className="bg-blue-600 text-white hover:text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                                >
                                    {submitMutation.isPending ? "Loading..." : "Search"}
                                </Button>

                            </div>
                            {error && (
                                <span className="text-red-500 text-sm ml-1">Invalid country or city</span>
                            )}
                        </div>
                    </form>
                </section>
                <section>
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
                                        <Button onClick={handleSearch(location)} className={'hover:text-blue-600'}>
                                            <CiSearch size={18}/>
                                        </Button>
                                        <Button onClick={handleDeleteHistory(location)} className="hover:text-red-600">
                                            <CiTrash size={18}/>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </article>
    );
};

export default SearchHistory;