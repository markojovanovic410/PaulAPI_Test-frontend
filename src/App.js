import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import SignIn from "./routes/signin";
import Report from "./routes/report";
import Layout from "./routes";
import { CookieContextProvider } from "./states/cookie";
import { useState } from "react";
function App() {
  return (
    <CookieContextProvider initUser={null}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CookieContextProvider>
  );
}

export default App;
