import {
  Routes,
  Route,
} from "react-router-dom";
import HomeView from "./views/HomeView"
import LoginView from "./views/LoginView"

export default function App() {
  const user = null;
  return (
    <div className="App">
      {!user ? <LoginView /> : (
        <Routes>
          <Route exact path="/" element={<HomeView />} />
        </Routes>
      )}
    </div>
  );
}