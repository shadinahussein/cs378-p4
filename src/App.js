import './App.css';
import React, { useState , useEffect} from "react";
import { auth} from './config/firebase'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthLogIn } from './components/auth';
import { HomePg} from './pages/HomePage';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.log("cur user in initial page: ", currentUser?.email)
      setLoading(false);
    });
    return unsubscribe
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="app">
      {/* <h1>On App</h1> */}
        <BrowserRouter basename="/cs378-p4">
          <Routes>
          <Route exact path="/" element={<AuthLogIn currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/home" element={<HomePg currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          </Routes>
        </BrowserRouter>
    </div>
   
  );
}

export default App;
