import { NavLink } from 'react-router-dom';
import eco from '../assets/eco.svg';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

function Footer() {
	return (
		<>
			<section className='flex flex-col'>
				<div className='py-5 md:py-5  bg-black/80 backdrop-blur-xl  shadow-lg px-10 flex flex-wrap gap-10 justify-evenly'>
					<div className=' hidden lg:flex flex-col gap-3 py-1 '>
						<NavLink to='/'>
							<div className='flex  text-xl text-white font-medium gap-1 cursor-pointer'>
								<img src={eco} alt='logo' className='w-6 ' />
								<div>EcoVoice</div>
							</div>
						</NavLink>
						<p className='pl-6 w-xs text-sm font-normal text-white'>
							Building a better tomorrow for our planet.
						</p>
					</div>
					<div className='hidden md:flex flex-wrap gap-20  text-white'>
						<div>
							<p className='text-lg font-semibold pb-2'>
								Quick Links
							</p>
							<ul className='text-sm space-y-1'>
								<li>Home</li>
								<li>Climate Map</li>
								<li>Reports</li>
								<li>Community</li>
								<li>Learn</li>
							</ul>
						</div>
						<div>
							<p className='text-lg font-semibold pb-2'>
								Resources
							</p>
							<ul className='text-sm space-y-1'>
								<li>Resources</li>
								<li>Blog</li>
								<li>Events</li>
								<li>FAQ's</li>
								<li>Contact</li>
							</ul>
						</div>
						<div>
							<p className='text-lg font-semibold pb-2'>Legal</p>
							<ul className='text-sm space-y-1'>
								<li>Privacy Policy</li>
								<li>Terms & Conditions</li>
								<li>Disclaimer</li>
							</ul>
						</div>
					</div>
					<div className='text-white flex flex-col justify-center items-center md:items-start flex-wrap gap-3'>
						<p className='text-lg font-semibold'>Connect With Us</p>
						<div className='flex text-4xl text-white gap-5 '>
							<FaFacebook />
							<FaInstagram />
							<FaYoutube />
							<FaSquareXTwitter />
						</div>
						<p className='text-sm' >Subscribe to our newsletter</p>
						<div className='flex flex-wrap justify-center gap-2'>
							<input
								type='text'
								placeholder='Enter Your Email'
								className='w-60 px-2 bg-white border-none rounded-lg outline-none placeholder:text-center placeholder:text-gray-400 text-black'
							/>
							<button className=' bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer'>
								Subscribe
							</button>
						</div>
					</div>
				</div>
				<div className='py-0.5 bg-green-600 text-white text-sm font'>
					<p className='text-center'>
						© {new Date().getFullYear()} EcoVoice. All rights
						reserved.
					</p>
				</div>
			</section>
		</>
	);
}

export default Footer;