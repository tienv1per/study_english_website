import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/home/Home';
import Lesson from './pages/lesson/Lesson';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path='/details' element={<Lesson/>}/>
				<Route path='/register' element={<Register/>}/>
				<Route path='/login' element={<Login/>}/>
			</Routes>
		</Router>
	);
}

export default App;
