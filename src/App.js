import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
//CSS
import "./App.css";
//COMPONENTS
import Navbar from "./components/Navbar";
// hokks
import { useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
//CONTEXTS PROVIDER
import { AuthProvider } from "./context/Authcotext";
//PAGES
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Footer from "./components/Footer";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import DashBoard from "./pages/Dashboard/DashBoard";
import CreatePost from "./pages/CreatePost/CreatePost";


function App() {
  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    });

  }, [auth]);

  if(loadingUser){
    return <p>Carregando...</p>
  };

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
          <BrowserRouter>
              <div className="container">
                  <Navbar/>
                  <Routes>
                      <Route path="/"  element={<Home/>}/>
                      <Route path="/about" element={<About/>}/>
                      <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/> }/>
                      <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/> }/>
                      <Route path="/posts/create" element={user ? <CreatePost/> : <Navigate to="/login"/> }/>
                      <Route path="/dashboard" element={user ? <DashBoard/> : <Navigate to="/login"/> }/>
                  </Routes>
              </div>
              <Footer/>
          </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
