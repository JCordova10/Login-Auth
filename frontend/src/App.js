import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginForm from "./components/loginForm";
import Navbar from "./components/Navbar";
import NewUser from "./components/newUser"
import LoggedIn from "./components/loggedIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
            exact path="/"
            element={<LoginForm />}
            />
            <Route 
              path="/newUser"
              element={<NewUser />}
            />
            <Route 
              path="/loggedIn"
              element={<LoggedIn />}
            />
          </Routes>
          
        </div>    
      </BrowserRouter>
    </div>
  );
}

export default App;
