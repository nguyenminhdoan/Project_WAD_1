import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Box,
    Divider
} from '@mui/material';
import {
    BarChart,
    LineChart,
    PieChart
} from '@mui/x-charts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import DevicesIcon from '@mui/icons-material/Devices';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const DashboardPage = () => {
    // Bar chart data
    const barChartData = [
        { month: 'Jan', sales: 65, expenses: 50 },
        { month: 'Feb', sales: 59, expenses: 45 },
        { month: 'Mar', sales: 80, expenses: 60 },
        { month: 'Apr', sales: 81, expenses: 70 },
        { month: 'May', sales: 56, expenses: 40 }
    ];

    // Line chart data
    const lineChartData = [
        { date: 'Week 1', visitors: 100 },
        { date: 'Week 2', visitors: 120 },
        { date: 'Week 3', visitors: 170 },
        { date: 'Week 4', visitors: 160 },
        { date: 'Week 5', visitors: 180 }
    ];

    // Pie chart data
    const pieChartData = [
        { id: 0, value: 35, label: 'Desktop' },
        { id: 1, value: 45, label: 'Mobile' },
        { id: 2, value: 20, label: 'Tablet' }
    ];

    // User data for table
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', lastLogin: '2023-06-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', lastLogin: '2023-05-28' },
        { id: 3, name: 'Robert Brown', email: 'robert@example.com', status: 'Active', lastLogin: '2023-06-14' },
        { id: 4, name: 'Lisa Johnson', email: 'lisa@example.com', status: 'Active', lastLogin: '2023-06-16' },
    ];

    // Tasks data
    const tasks = [
        { id: 1, task: 'Update user dashboard', progress: 80 },
        { id: 2, task: 'Fix login issues', progress: 45 },
        { id: 3, task: 'Create new API endpoints', progress: 30 },
        { id: 4, task: 'Implement feedback form', progress: 100 }
    ];

    // Styled metric card component
    const MetricCard = ({ title, value, icon, trend, color }) => (
        <Card sx={{ height: '100%', backgroundColor: color || 'white' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Typography variant="body2" color="text.secondary">{title}</Typography>
                        <Typography variant="h4" sx={{ my: 1 }}>{value}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {trend > 0 ?
                                <TrendingUpIcon color="success" fontSize="small" /> :
                                <TrendingDownIcon color="error" fontSize="small" />
                            }
                            <Typography variant="body2" sx={{ ml: 0.5 }} color={trend > 0 ? "success.main" : "error.main"}>
                                {Math.abs(trend)}% {trend > 0 ? 'increase' : 'decrease'}
                            </Typography>
                        </Box>
                    </div>
                    <Box sx={{
                        backgroundColor: 'rgba(0,0,0,0.08)',
                        borderRadius: '50%',
                        width: 50,
                        height: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Analytics Dashboard
            </Typography>

            {/* Metrics Row */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <MetricCard
                        title="Total Users"
                        value="1,234"
                        icon={<PeopleIcon fontSize="large" />}
                        trend={8.5}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <MetricCard
                        title="Active Sessions"
                        value="567"
                        icon={<DevicesIcon fontSize="large" />}
                        trend={12.3}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <MetricCard
                        title="New Signups"
                        value="89"
                        icon={<PersonAddIcon fontSize="large" />}
                        trend={-3.8}
                    />
                </Grid>
            </Grid>

            {/* Charts Row */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Monthly Sales & Expenses
                            </Typography>
                            <BarChart
                                width={500}
                                height={300}
                                series={[
                                    { data: barChartData.map(item => item.sales), label: 'Sales', id: 'sales' },
                                    { data: barChartData.map(item => item.expenses), label: 'Expenses', id: 'expenses' }
                                ]}
                                xAxis={[{ scaleType: 'band', data: barChartData.map(item => item.month) }]}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Device Distribution
                            </Typography>
                            <PieChart
                                series={[{
                                    data: pieChartData,
                                    innerRadius: 30,
                                    outerRadius: 100,
                                    paddingAngle: 2,
                                    cornerRadius: 5,
                                }]}
                                width={300}
                                height={300}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Line Chart & Task Progress */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Weekly Visitor Trends
                            </Typography>
                            <LineChart
                                width={500}
                                height={300}
                                series={[{
                                    data: lineChartData.map(item => item.visitors),
                                    label: 'Visitors',
                                }]}
                                xAxis={[{ scaleType: 'band', data: lineChartData.map(item => item.date) }]}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Task Progress
                            </Typography>
                            {tasks.map((task) => (
                                <Box key={task.id} sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2">{task.task}</Typography>
                                        <Typography variant="body2">{task.progress}%</Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={task.progress}
                                        sx={{ mt: 1, height: 8, borderRadius: 5 }}
                                    />
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* User Table */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                User Activity
                            </Typography>
                            <TableContainer component={Paper} elevation={0}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableCell>User</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Last Login</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            px: 1,
                                                            py: 0.5,
                                                            borderRadius: 1,
                                                            backgroundColor: user.status === 'Active' ? 'success.light' : 'error.light',
                                                            color: user.status === 'Active' ? 'success.dark' : 'error.dark',
                                                        }}
                                                    >
                                                        {user.status}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{user.lastLogin}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardPage;