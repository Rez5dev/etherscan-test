import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Header, ConnectWeb3Modal } from "./Components";
import { HomePage } from "./pages/home/Home";
import { Header } from "./components/Header/Header";
import ConnectWeb3Modal from "./components/ConnectWeb3Modal/ConnectWeb3Modal";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="content" data-testid="homepage">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        <ConnectWeb3Modal/>
      </div>
    </BrowserRouter>
  );
}

export default App;
