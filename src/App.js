import React from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Signup from "./Signup/Signup";

function App() {
  const [userTokenCookie, setUserTokenCookie, removeUserTokenCookie] = useCookies(["token"]);
  setUserTokenCookie("token", "test", { path: "/" });
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage userCookie={userTokenCookie}
            setCookie={setUserTokenCookie} removeCookie={removeUserTokenCookie} />} />
          <Route path="/login" element={<Login userCookie={userTokenCookie}
            setCookie={setUserTokenCookie} removeCookie={removeUserTokenCookie} />} />
          <Route path="/signup" element={<Signup userCookie={userTokenCookie}
            setCookie={setUserTokenCookie} removeCookie={removeUserTokenCookie} />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>


  );
}

export default App;
