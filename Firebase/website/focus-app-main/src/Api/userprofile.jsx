import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function UserProfile() {
  // Convert handleSendUserId to a regular function
  const handleSendUserId = (userId) => {
    fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Prediction:', data);
      // Handle response data
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  // Use useEffect hook to replicate componentDidMount behavior
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Directly call handleSendUserId with user.uid
        handleSendUserId(user.uid);
      } else {
        console.log("No user is signed in.");
      }
    });
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div>
      {/* Update the onClick to use an arrow function to call handleSendUserId */}
      <button onClick={() => handleSendUserId("Directly passing userId if needed")}>Get Prediction</button>
    </div>
  );
}

export default UserProfile;
