import { Routes, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import rootReducer from "./reducers";

const store = createStore(rootReducer, composeWithDevTools());
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/" element={<Home />} exact />
      </Routes>
    </Provider>
  );
}

export default App;
