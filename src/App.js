import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fundgy</title>
        <link
          rel="canonical"
          href="https://img.icons8.com/?size=1x&id=L3M3pVxJJakz&format=png"
        />
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
        <BrowserRouter>
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>

          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route
                path="/campaign-details/:id"
                element={<CampaignDetails />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
