import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokemonList from "./pages/PokemonList";
import ExamData from "./pages/ExamData";

const getBasename = () => {
  return `${process.env.PUBLIC_URL.split("/").pop()}`;
};

function App() {
  return (
    <BrowserRouter basename={getBasename()}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<PokemonList />} />
          <Route path="/examdata" element={<ExamData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
