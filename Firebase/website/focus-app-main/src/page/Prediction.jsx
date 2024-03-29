import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Prediction = () => {
    const user = useSelector((state) => state.user.value);
    // Prediction result
    // This would be set based on the actual prediction from your Python model
    const [hasTB, setHasTB] = useState(null);

    const sendDataToFlask = async() => {
        const requestData = {
          key: user.uid, // send uuid in request
        };
        axios.post('http://127.0.0.1:5000/do-prediction', requestData)
          .then(response => {
            console.log(response.data); // Handle response from Flask backend
            fetchData()
          })
          .catch(e => {
            console.error('Error:', e);
          });
      };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/show-prediction/${user.uid}`);
            console.log("data fetched: ",response.data);
            setHasTB(response.data.tbpred);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log("Component mounted, sending data to Flask");
        sendDataToFlask();
    }, []); 



    return (
        <section className='main-height flex-col flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg shadow-md text-gray-800 max-w-lg w-full'>
            {hasTB !== null ? (
            <p className='text-2xl font-bold text-center'>
                {hasTB > 80 ? `Your risk level is ${hasTB.toFixed(2)}%. You have a severe risk of having TB. Please seek immediate medical attention.` :
                hasTB > 60 ? `Your risk level is ${hasTB.toFixed(2)}%. You have a high risk of having TB. Please go to a doctor for a proper diagnosis.` :
                hasTB > 40 ? `Your risk level is ${hasTB.toFixed(2)}%. You have a moderate risk of having TB. We recommend consulting a healthcare professional.` :
                hasTB > 20 ? `Your risk level is ${hasTB.toFixed(2)}%. You have a low risk of having TB. Regular monitoring is advisable.` :
                `Your risk level is ${hasTB.toFixed(2)}%. You have a minimal risk of having TB. No immediate action required.`}
            </p>
        ) : (
            <p className='text-2xl font-bold text-center'>Loading prediction...</p>
        )}

            </div>
        </section>


    );
};

export default Prediction;