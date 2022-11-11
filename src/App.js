import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Navigation from "./routes/navigation/Navigation";
import SignIn from "./routes/signIn/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* <Route path='shop' element={<Shop />} /> */}
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
