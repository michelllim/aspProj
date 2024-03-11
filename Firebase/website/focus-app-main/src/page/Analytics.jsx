import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { realtimedb, auth } from "../firebase"; // Importing realtimedb
import { ref, onValue } from "firebase/database";

const Analytics = () => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
    const [data, setData] = useState({ labels: [], psiValues: [] });
    const [displayedData, setDisplayedData] = useState({ labels: [], psiValues: [] }); // State for displayed data
    const [limit, setLimit] = useState(100); // State for the limit of data points to display
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    useEffect(() => {
        if (!userId) {
            return;
        }

        const fetchData = () => {
            const chartDataRef = ref(realtimedb, 'users/' + userId);
            onValue(chartDataRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData) {
                    const labels = Object.values(userData.date || []);
                    const psiValues = Object.values(userData.psiD || []);
                    setData({ labels, psiValues });
                } else {
                    setData({ labels: [], psiValues: [] });
                }
            });
        
            return () => {
                chartDataRef.off('value');
            };
        };
        
        fetchData();
    }, [userId]);
    
    useEffect(() => {
        if (data.labels.length > 0 && data.psiValues.length > 0) {
            // Limit the data based on the set limit
            const limitedData = {
                labels: data.labels.slice(0, limit),
                psiValues: data.psiValues.slice(0, limit)
            };
            setDisplayedData(limitedData);
        }
    }, [data, limit]);

    useEffect(() => {
        if (chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');
    
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
    
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: displayedData.labels,
                    datasets: [{
                        label: 'Breath Pressure Chart',
                        data: displayedData.psiValues,
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
                    maintainAspectRatio: false,
                    responsive: true,
                    width: 1000,
                    height: 1000
                }
            });
        }
    }, [displayedData]);

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
    };

    return (
        <section className='h-screen flex items-center justify-center'>
            <div>
                <div className='bg-gray-50 rounded-3xl border-4'>
                    <div>
                        <canvas ref={chartContainer} width="1000" height="max" />
                    </div>
                    <div>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange(20)}>20 Data Points</button>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange(50)}>50 Data Points</button>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange(100)}>100 Data Points</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Analytics;
