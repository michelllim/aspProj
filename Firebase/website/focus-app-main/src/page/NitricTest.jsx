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
                    <div>
                        <div className='text-center mb-6 -ml-6 text-white text-xl'>
                            Please blow into the sensor.
                        </div>
                        <CountdownCircleTimer
                            isPlaying
                            duration={8}
                            colors={['#004777', '#A30000', '#A30000', '#A30000']}
                            colorsTime={[7, 5, 2, 0]}
                            onComplete={handleTimerComplete}
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                    </div>
                ) : timerCompleted ? (
                    <div className="h-60 w-60 bg-white drop-shadow-xl rounded-3xl flex flex-col justify-between">
                        <div className='text-3xl font-bold text-center mt-20'>FeNo: {feNoValue}ppb</div>
                        <div className="text-center">
                            <button className="bg-blue-400 py-2 px-4 rounded mb-8" onClick={handleComplete}>
                                Click here to see your result.
                            </button>
                        </div>
                    </div>
                ) : (
                        <div className="bg-white p-10 rounded-lg shadow-2xl"> {/* Increased padding and shadow */}
                            <button 
                                className="bg-white hover:bg-blue-200 text-blue-600 text-4xl font-bold py-4 px-8 rounded-lg" 
                                onClick={handleStartTimer}
                            >
                                Press to start test!
                            </button>
                        </div>

                )}
            </div>
        </div>
    );
};

export default NitricTest;
