import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { NavLink, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const NitricTest = () => {
    const navigate = useNavigate();

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerCompleted, setTimerCompleted] = useState(false);
    const [feNoValue, setFeNoValue] = useState(null);

    const handleStartTimer = () => {
        setIsTimerRunning(true);
        setTimerCompleted(false);
    };

    const handleTimerComplete = () => {
        setIsTimerRunning(false);
        setTimerCompleted(true);
        // Generate random FeNo value between 10 and 30
        const randomFeNo = Math.floor(Math.random() * (25 - 16 + 1)) + 16;
        setFeNoValue(randomFeNo);
    };

    
    
    const handleComplete = async () => {
        const uuid = auth.currentUser.uid
        const userRef = doc(db, "users", uuid);
        try {
            await updateDoc(userRef, {
                NitricOxide: feNoValue
            });
            console.log("Nitric oxide value updated successfully!");
            // Navigate to the prediction page
            navigate("/prediction");
        } catch (error) {
            console.error("Error updating nitric oxide value:", error);
        }

    };


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative">
                {isTimerRunning ? (
                    <CountdownCircleTimer
                        isPlaying
                        duration={1}
                        colors={['#004777', '#A30000', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        onComplete={handleTimerComplete}
                    >
                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                ) : timerCompleted ? (
                    <div className="h-60 w-60 bg-white drop-shadow-xl rounded-3xl flex flex-col justify-between">
                        <div className='text-3xl font-bold text-center mt-20'>FeNo: {feNoValue}ppb</div>
                        <div className="text-center">
                            <button className="bg-blue-400 font-bold py-2 px-4 rounded mb-8" onClick={handleComplete}>
                                Click here to see your result
                            </button>
                        </div>
                    </div>
                ) : (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-3xl font-bold py-2 px-4 rounded" onClick={handleStartTimer}>
                        Press to Start test for Exhaled Nitric Oxide Level in Breathe
                    </button>
                )}
            </div>
        </div>
    );
};

export default NitricTest;
