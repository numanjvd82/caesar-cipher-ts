import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import AutokeyCipher from "./pages/AutokeyCipher";
import CaesarCipher from "./pages/CaesarCipher";
import VignereCipher from "./pages/VignereCipher";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CaesarCipher />} />
        <Route path="/vigenere-cipher" element={<VignereCipher />} />
        <Route path="/autokey-cipher" element={<AutokeyCipher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
