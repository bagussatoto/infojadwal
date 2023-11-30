import React from 'react';
import {  Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Item = React.lazy(() => import('./pages/Item'));
const Checkin = React.lazy(() => import('./pages/Checkin'));

function App() {
	
	return (
		<Router>
			<Header title="GetJadwal" />
			<Container maxW="5xl">
				<Routes>
					<Route 
						path="/"
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Checkin />
							</React.Suspense>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Dashboard />
							</React.Suspense>
						}
					/>
					<Route
						path="/schedule/:day"
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Item />
							</React.Suspense>
						}
					/>
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
