import { Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './pages/Hero';
import ClimateMap from './pages/ClimateMap';
import Community from './pages/Community';
import CommunityPosts from './pages/CommunityPosts';
import Learn from './pages/Learn';
import Reports from './pages/Reports';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Donate from './pages/Donate';
import Petitions from './pages/Petitions';
import Volunteer from './pages/Volunteer';
import Marketplace from './pages/Marketplace';
import Knowledge from './pages/Knowledge';
import Challenges from './pages/Challenges';
import AIAssistant from './pages/AIAssistant';

function App() {
	return (
		<div className='h-screen w-screen flex flex-col'>
			<div>
				<NavBar />
			</div>
			<main className=' flex-1 pt-20'>
				<Routes>
					<Route path='/' element={<Hero />} />
					<Route path='/climatemap' element={<ClimateMap />} />
					<Route path='/reports' element={<Reports />} />
					<Route path='/community' element={<Community />} />
					<Route path='/community/posts' element={<CommunityPosts />} />
					<Route path='/learn' element={<Learn />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/login' element={<Login />} />
					<Route path='/donate' element={<Donate />} />
					<Route path='/petitions' element={<Petitions />} />
					<Route path='/volunteer' element={<Volunteer />} />
					<Route path='/marketplace' element={<Marketplace />} />
					<Route path='/knowledge' element={<Knowledge />} />
					<Route path='/challenges' element={<Challenges />} />
				</Routes>
			</main>
			<div className='pt-8'>
                <Footer />
            </div>
			<AIAssistant />
		</div>
	);
}

export default App;
