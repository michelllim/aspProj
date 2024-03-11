import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { realtimedb, auth } from "../firebase"; // Importing realtimedb
import { ref, onValue } from "firebase/database";

const Analytics = () => {
    const chartContainer1 = useRef(null);
    const chartInstance1 = useRef(null);
    const chartContainer2 = useRef(null);
    const chartInstance2 = useRef(null);
    const [data, setData] = useState({ labels: [], psiValues: []});
    const [displayedData, setDisplayedData] = useState({ labels: [], psiValues: []}); // State for displayed data
    const [displayedData2, setDisplayedData2] = useState({ labels2:[], score: []});
    const [data2, setData2] = useState({labels2:[], score: [] });
    const [limit, setLimit] = useState(100); // State for the limit of data points to display
    const [limit2, setLimit2] = useState(100);
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
                    setData({ labels, psiValues});

                } else {
                    setData({ labels: [], psiValues: []});
                }
            });
        
            return () => {
                chartDataRef.off('value');
            };
        };
        fetchData();

        const fetchData2 = () => {
            const chartDataRef = ref(realtimedb, 'users/' + userId);
            onValue(chartDataRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData) {
                    const labels2 = Object.values(userData.scoreDate || []);
                    const score = Object.values(userData.score || []);
                    setData2({ labels2, score });
                } else {
                    setData2({labels2:[], score: []});
                }
            });
        
            return () => {
                chartDataRef.off('value');
            };
        };
        fetchData2();

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
        if (data2.labels2.length > 0 && data2.score.length > 0) {
            // Limit the data based on the set limit
            const limitedData2 = {
                labels: data2.labels2.slice(0, limit2),
                psiValues: data2.score.slice(0, limit2)
            };
            setDisplayedData2(limitedData2);
        }
    }, [data2, limit2]);

    useEffect(() => {
        if (chartContainer1.current) {
            const ctx = chartContainer1.current.getContext('2d');
    
            if (chartInstance1.current) {
                chartInstance1.current.destroy();
            }
    
            chartInstance1.current = new Chart(ctx, {
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
                    width: '100%', // Set width to 100% for responsiveness
                    height: 500 // You can adjust the height as needed
                }
            });
        }
    }, [displayedData]);

    useEffect(() => {
        if (chartContainer2.current) {
            const ctx2 = chartContainer2.current.getContext('2d');
    
            if (chartInstance2.current) {
                chartInstance2.current.destroy();
            }
    
            chartInstance2.current = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: data2.labels2,
                    datasets: [{
                        label: 'Score Chart',
                        data: data2.score,
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
                                text: 'Score'
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
                    width: '100%', // Set width to 100% for responsiveness
                    height: 500 // You can adjust the height as needed
                }
            });
        }
    }, [displayedData]);
    

    const handleLimitChange = (newLimit) => {
        if (newLimit === 'all') {
            setLimit(data.labels.length); // Set limit to the length of the data array
        } else {
            setLimit(newLimit);
        }
    };
    
    const handleLimitChange2 = (newLimit2) => {
        setLimit2(newLimit2);
        if (newLimit2 === 'all') {
            setLimit2(data2.labels2.length); // Set limit to the length of the data array
        } else {
            setLimit2(newLimit2);
        }
    };
    return (
        <section className='main-height flex items-center justify-center'>
            <div className="w-screen max-w-screen-lg">
                <div className='bg-gray-50 rounded-3xl border-4 mb-6'>
                    <div>
                        <canvas ref={chartContainer1} width="1000" height="max" />
                    </div>
                    <div>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange(20)}>20 Data Points</button>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange(50)}>50 Data Points</button>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange(100)}>100 Data Points</button>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange('all')}>All Data Points</button>
                    </div>
                </div>
                <div className='bg-gray-50 rounded-3xl border-4'>
                    <div>
                        <canvas ref={chartContainer2} width="1000" height="max" />
                    </div>
                    <div>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange2(20)}>20 Data Points</button>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange2(50)}>50 Data Points</button>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange2(100)}>100 Data Points</button>
                        <button className="border-black bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => handleLimitChange2('all')}>All Data Points</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Analytics;
