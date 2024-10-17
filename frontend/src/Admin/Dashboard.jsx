import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

// Register components for ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [dataCount, setDataCount] = useState({ usercount: 0, tyrecount: 0, ordercount: 0});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/admin/get-count');
                setDataCount(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []); 

    // Data for the line chart (Users Over Time)
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Users',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Users Over Time',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Data for the pie chart (Overview)
    const pieData = {
        labels: ['Users', 'Products', 'Orders'],
        datasets: [
            {
                label: 'Count',
                data: [dataCount.usercount, dataCount.tyrecount, dataCount.ordercount],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Statistics Overview',
            },
        },
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Grid for cards */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div" align="center">
                                Users
                            </Typography>
                            <Typography variant="h4" align="center" color="primary">
                                {dataCount.usercount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div" align="center">
                                Products
                            </Typography>
                            <Typography variant="h4" align="center" color="secondary">
                                {dataCount.tyrecount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div" align="center">
                                Orders
                            </Typography>
                            <Typography variant="h4" align="center" color="error">
                                {dataCount.ordercount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent style={{ height: '300px' }}>
                            <Line options={lineOptions} data={lineData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent style={{ height: '300px' }}>
                            <Pie options={pieOptions} data={pieData} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;