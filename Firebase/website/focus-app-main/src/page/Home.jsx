import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/elements/Card';
import Text from '../components/elements/Text';
import Button from '../components/elements/Button';
import Time from '../components/widgets/Time';
import Settings from '../components/widgets/Settings';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/features/userSlice';
import { notesFetch } from '../store/features/noteSlice';
import { useNavigate } from 'react-router-dom';
import Pomodoro from '../components/widgets/Pomodoro';
// import { getAllUserNotes } from '../store/features/noteSlice';



const Home = () => {

    const user = useSelector((state) => state.user.value);
    const { value, status } = useSelector((state) => state.note);
    
    const dispatch = useDispatch();

    const navigate = useNavigate();


    useEffect(() => {      

        const intervalID = setInterval(() => {
            // console.log("yes")
        }, 1000)

        return () => clearInterval(intervalID);
    }, [])

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch])
    // console.log("user here: ", user.uid);

    useEffect(() => {
        dispatch(notesFetch(user.uid))
    }, [dispatch, user.uid])

    return (
      <section className="flex flex-col items-center justify-center min-h-screen py-20 px-5 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-7xl">
              {/* Image on the left or top on smaller screens */}
              <img className="w-full md:w-3/5 xl:w-1/2" src="/tbkit.jpg" alt="TB Kit" />
    
              {/* Content on the right or bottom on smaller screens */}
              <div className="card-container max-w-xl text-center">
                  <h2 className="font-bold text-4xl mb-6">
                      TB Pre-Diagnosis & Post-Recovery Kit
                  </h2>
                  <p className="text-xl mb-6">
                      Our project will help to solve the problem of diagnosing TB at home and making spirometry more meaningful and effective.
                  </p>
                  {/* Additional content here */}
              </div>
          </div>
    
          <div className="mt-12 flex flex-wrap justify-center gap-6">
              <button className="btn-large bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold py-4 px-8 rounded" onClick={() => navigate("/survey")}>Test TB</button>
              <button className="btn-large bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold py-4 px-8 rounded" onClick={() => navigate("/instructions")}>Rehabilitation</button>
          </div>
      </section>
    );
    
  
}
export default Home


