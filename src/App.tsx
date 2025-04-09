import {ThemeProvider} from "styled-components";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LocationHeader from "./components/LocationHeader";
import SearchHistory from "./pages/SearchHistory";
import Home from "./pages/Home";
const theme = {
  colors: {
    primary: '#3498db',
    background: '#f5f6fa',
    card: '#ffffff',
    text: '#2d3436',
  }
};

function App() {
  return (
      <ThemeProvider theme={theme}>
          <BrowserRouter>
              <LocationHeader/>

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchHistory/>}/>
          </Routes>
          </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;