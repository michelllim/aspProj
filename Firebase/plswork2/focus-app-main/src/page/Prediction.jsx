import React, { useState, useEffect } from 'react';

const Prediction = () => {
    // Placeholder for the prediction result
    // This would be set based on the actual prediction from your Python model
    const [hasTB, setHasTB] = useState(null);

    useEffect(() => {
        // Here you would call your Python API to get the prediction result
        // For now, we will simulate it with a timeout
        setTimeout(() => {
            // Simulate getting a prediction result
            // Replace this with actual API call and result handling
            const predictionResult = Math.random() > 0.5; // Randomly sets to true or false
            setHasTB(predictionResult);
        }, 1000);
    }, []);

    return (
        <section className='h-screen flex items-center justify-center bg-gray-200'>
            <div className='bg-white p-6 rounded-lg shadow-md text-gray-800 max-w-lg w-full'>
                {hasTB !== null ? (
                    <p className='text-2xl font-bold text-center'>
                        {hasTB ? "Congrats! You don't have TB!" : "You have a high risk of having TB. Please go to a doctor for a diagnosis."}
                    </p>
                ) : (
                    <p className='text-2xl font-bold text-center'>Loading prediction...</p>
                )}
            </div>
        </section>
    );
};

export default Prediction;