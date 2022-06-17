import {
  Routes,
  Route,
} from "react-router-dom";
import HomeView from "./views/HomeView"

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomeView />} />
      </Routes>
    </div>
  );
}