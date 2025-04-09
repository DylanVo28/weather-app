import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";

interface LocationState {
    location: string;
    history: string[];
    setLocation: (location: string) => void;
    setHistory: (history: string[]) => void;
}
const useLocationStore = create<LocationState>()(
    persist(
        (set, get) => ({
            location: 'Singapore, SG',
            history: [],
            setLocation: (location:string) => set({ location }),
            setHistory: (history: string[]) => set({ history }),
        }),
        {
            name: 'location-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)

export const useLocation = () => {
    const {location, setLocation, history,setHistory}=useLocationStore()
    const updateLocation = (location:string) => {
        setLocation(location);
    }

    const addHistory= (location:string) => {
        const foundedLocation=history.find(h=>h===location)
        if(foundedLocation){
            return
        }
        const newHistory = [...history];
        newHistory.push(location);
        setHistory(newHistory);
    }

    const deleteHistory= (location:string) => {
        const foundedLocation=history.find(h=>h===location)
        if(!foundedLocation){
            return
        }
        let newHistory = [...history];
        newHistory=newHistory.filter(h=>h!==location);
        setHistory(newHistory);
    }
    return {
        location,
        updateLocation,
        addHistory,
        history,
        deleteHistory
    }
}