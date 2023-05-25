import React from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";


function App() {
  const [userTokenCookie, setUserTokenCookie, removeUserTokenCookie] = useCookies(["token"]);
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/userchat" element={<HomePage userCookie={userTokenCookie}
            setuserCookie={setUserTokenCookie} removeCookie={removeUserTokenCookie} />} />
          <Route path="/" element={<Login userCookie={userTokenCookie}
            setuserCookie={setUserTokenCookie} removeCookie={removeUserTokenCookie} />} />
          <Route path="/Register" element={<Register userCookie={userTokenCookie}
            setuserCookie={setUserTokenCookie} removeCookie={removeUserTokenCookie} />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>


  );
}

export default App;
