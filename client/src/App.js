import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
