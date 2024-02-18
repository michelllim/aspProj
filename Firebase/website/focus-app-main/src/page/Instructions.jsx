import React from 'react';

const Instructions = () => {
    return (
        <section className='h-screen flex flex-col items-center justify-start pt-10 bg-gray-200'>
          {/* TB Test Section */}
          <div className='w-full max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold text-white mb-4'>TB Test</h2>
            <div className='bg-white p-6 rounded-lg shadow-md text-gray-800 mb-8'>
              <p>Step 1: Download ASP App.</p>
              <p>Step 2: Go to ASP App in your phone and select 'Test' button.</p>
              <p>Step 3: Blow into the mouthpiece when screen shows start.</p>
              <p>Step 4: Exit ASP App and go into the TBKit Website.</p>
              <p>Step 5: Go to Predictions to view TB risk.</p>
                {/* Add more steps as needed */}
            </div>
          </div>
      
          {/* Rehabilitation Section */}
          <div className='w-full max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold text-white mb-4'>Rehabilitation</h2>
            <div className='bg-white p-6 rounded-lg shadow-md text-gray-800'>
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