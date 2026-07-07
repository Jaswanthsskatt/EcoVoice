import { Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './pages/Hero';
import ClimateMap from './pages/ClimateMap';
import Report from './pages/Reports';
import Community from './pages/Community';
import CommunityPosts from './pages/CommunityPosts';
import Learn from './pages/Learn';
import Reports from './pages/Reports';
import About from './pages/About';
import Contact from './pages/Contact';

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
				</Routes>
			</main>
			<div className='pt-8'>
                <Footer />
            </div>
		</div>
	);
}

export default App;
