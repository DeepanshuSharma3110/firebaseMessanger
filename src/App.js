import { database } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
