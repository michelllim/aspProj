import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { realtimedb, auth } from "../firebase"; // Importing realtimedb
import { ref, onValue } from "firebase/database";

const Analytics = () => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null); // Add this line
    const [data, setData] = useState({ labels: [], psiValues: [] });
    const userId = auth.currentUser ? auth.currentUser.uid : null; // Getting user ID if user is logged in

    useEffect(() => {
        console.log("User ID:", userId);
        if (!userId) {
            console.log("User not logged in");
            return; // Return if user is not logged in
        }

        /*const fetchData = () => {
            const chartDataRef = ref(realtimedb, 'users/' + userId); // Reference to user's data
            console.log("Chart Data Reference:", chartDataRef);
            onValue(chartDataRef, (snapshot) => {
                const userData = snapshot.val();
                console.log("User Data:", userData);
                const labels = [];
                const psiValues = [];
                
                // Extract date and psi values
                if (userData) {
                    Object.values(userData).forEach(item => {
                        labels.push(item.date);
                        psiValues.push(item.psi);
                    });
                }

                setData({ labels, psiValues });
            });

            return () => {
                // Cleanup function to unsubscribe from the database
                chartDataRef.off('value');
            };
        };*/

        const fetchData = () => {
            const chartDataRef = ref(realtimedb, 'users/' + userId); // Reference to user's data
            console.log("Chart Data Reference:", chartDataRef);
            onValue(chartDataRef, (snapshot) => {
                const userData = snapshot.val();
                console.log("User Data:", userData);
                
                if (userData) {
                    const labels = Object.values(userData.date || []);
                    const psiValues = Object.values(userData.psi || []);
                    console.log("Labels:", labels);
                    console.log("Psi Values:", psiValues);
                    setData({ labels, psiValues });
                } else {
                    setData({ labels: [], psiValues: [] }); // Reset data if userData is empty
                }
            });
        
            return () => {
                // Cleanup function to unsubscribe from the database
                chartDataRef.off('value');
            };
        };
        
        fetchData();
    }, [userId]);
    

    useEffect(() => {
        console.log("Data:", data);
        if (chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');
    
            // Destroy existing chart instance if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
    
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Breath Pressure Chart',
                        data: data.psiValues,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'PSI Values'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        
                    },
                    maintainAspectRatio: false, // Add this line
                    responsive: true, // Add this line
                    width: 1000, // Add this line (desired width)
                    height: 1000 // Add this line (desired height)
                }
            });
        }
    }, [data]);
    
    return (
        <section className='h-screen flex items-center justify-center bg-gray-200'>
            <div>
                <div>
                    Dashboard
                </div>
                <div>
                    <canvas ref={chartContainer} width="1000" height="max" />
                </div>
            </div>
        </section>
    );
}

export default Analytics;
