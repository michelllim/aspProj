import React from 'react';

const Instructions = () => {
  return (
    <section className='main-height flex flex-col items-center justify-start pt-10'>
      {/* TB Test Section */}
      <div className='w-full max-w-6xl mx-auto'>
        <h2 className='text-5xl font-bold text-white mb-6 text-left'>TB Test</h2> {/* Ensured left alignment */}
        <div className='font-bold bg-white p-10 rounded-lg shadow-lg text-gray-900 mb-10 text-lg text-left'> {/* Ensured left alignment */}
          <p>Step 1: Download ASP App.</p>
          <p>Step 2: Go to ASP App in your phone and select 'Test' button.</p>
          <p>Step 3: Blow into the mouthpiece when screen shows start.</p>
          <p>Step 4: Exit ASP App and go into the TBKit Website.</p>
          <p>Step 5: Go to Predictions to view TB risk.</p>
            {/* Add more steps as needed */}
        </div>
      </div>
  
      {/* Rehabilitation Section */}
      <div className='w-full max-w-6xl mx-auto'>
        <h2 className='text-5xl font-bold text-white mb-6 text-left'>Rehabilitation</h2> {/* Ensured left alignment */}
        <div className='font-bold bg-white p-10 rounded-lg shadow-lg text-gray-900 text-lg text-left'> {/* Ensured left alignment */}
          <p>Step 1: Download ASP App.</p>
          <p>Step 2: Go to ASP App in your phone and select 'Play' button.</p>
          <p>Step 3: Blow into the mouthpiece when screen shows start. </p>
          <p>Step 4: Exit ASP App and go into the TBKit Website.</p>
          <p>Step 5: Go to Predictions to view breathing report.</p>
          {/* Add more steps as needed */}
        </div>
      </div>
    </section>
);


}

export default Instructions;