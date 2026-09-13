import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AvatarPage from "./pages/AvatarPage";
import AvatarRegistrationPage from "./pages/AvatarRegistrationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AvatarRegistrationPage />
          }
        />

        <Route
          path="/avatar"
          element={
            <AvatarPage />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;