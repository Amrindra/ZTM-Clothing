import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/authentication/Authentication";
import CheckOut from "./routes/checkout/CheckOut";
import Home from "./routes/Home";
import Navigation from "./routes/navigation/Navigation";
import Shop from "./routes/shop/Shop";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="authentication" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
}

export default App;
