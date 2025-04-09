import {ThemeProvider} from "styled-components";
import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import LocationHeader from "./components/LocationHeader";
import SearchHistory from "./pages/SearchHistory";
import Home from "./pages/Home";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const theme = {
    colors: {
        primary: '#3498db',
        background: '#f5f6fa',
        card: '#ffffff',
        text: '#2d3436',
    }
};
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <LocationHeader/>

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/search" element={<SearchHistory/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false}/>

        </QueryClientProvider>
    );
}

export default App;