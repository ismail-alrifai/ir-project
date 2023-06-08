/** @format */
import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/search/:datasetParam' element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
