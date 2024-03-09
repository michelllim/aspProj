import React, { useState, useEffect } from 'react';
import bg from './components/assets/bg.png';
// import Sidebar from './components/widgets/Sidebar';
import Home from './page/Home';
// import Notes from './page/Notes';
import Signup from './page/Signup';
import Login from './page/Login';
import Survey from './page/Survey';
import Instructions from './page/Instructions';
import Prediction from './page/Prediction';
import Analytics from './page/Analytics';
import NitricTest from './page/NitricTest';
import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/widgets/Navbar';
import Layout from './components/widgets/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import NoteDetail from './page/NoteDetail';
import ProtectedRoute from './components/widgets/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './store/features/userSlice';
import NotFound from './page/NotFound';


function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // const user = "asasa";
  console.log(user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch])


  return (
    <Router>
      <div className="md:overflow-x-auto overflow-x-hidden bg-primary">
        <section>
          <div>
            <Routes>
              <Route element={<ProtectedRoute user={user} />}>
                <Route
                  path="/home"
                  element={
                    < Home />
                  }
                />

                {/* <Route
                  path="/notes/:id"
                  element={<NoteDetail />}
                /> */}

                <Route
                  path="/survey"
                  element={
                    < Survey />
                  }
                />

                <Route
                  path="/instructions"
                  element={
                    < Instructions />
                  }
                />

                <Route
                  path="/prediction"
                  element={
                    < Prediction />
                  }
                />

                <Route
                  path="/analytics"
                  element={
                    < Analytics />
                  }
                />

                <Route
                  path="/nitrictest"
                  element={
                    < NitricTest />
                  }
                />

              </Route>

              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={< NotFound />} />
            </Routes>
          </div>
        </section>

      </div>
    </Router>
  );
}

export default App;



