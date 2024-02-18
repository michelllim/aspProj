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
        <section className=" pt-10 pb-24 px-3 md:pt-10 md:pb-20">
          <div className="flex container w-full justify-start">
            {/* Image on the left */}
            <img className="custom-image" src="/tbkit.jpg" alt="TB Kit" />
            
            {/* Content on the right, including the Card component for the text */}
            <Card className="card-container">
              <Text className="font-bold text-2xl text-center mb-4">
                TB Pre-Diagnosis & Post-Recovery Kit
              </Text>
              {/* Additional content here */}
              <Text className="text-lg text-center mb-4"> Our project will help to solve the problem of diagnosing TB at home and making spirometry more meaningful and effective.</Text>
            </Card>
          </div>

            <section className=" pt-10 pb-24 px-3 md:px-0">
                <div className="flex justify-between items-center max-w-6xl mx-auto w-full">
                    {/* Assuming Button is a styled component or a component from a library like Material-UI/React Bootstrap */}
                    <button className="btn-large" onClick={() => navigate("/survey")}>Test TB</button>
                    <button className="btn-large" onClick={() => navigate("/instructions")}>Rehabilitation</button>
                </div>
            </section>

        </section>
      );
}
export default Home


