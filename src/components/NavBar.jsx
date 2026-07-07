import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import eco from '../assets/eco.svg';
import { navLinks } from '../constants';

function NavBar() {
	const [active, setActive] = useState('');

	return (
		<>
			<nav className='fixed top-0 left-0 right-0 z-100 h-21 flex justify-between items-center backdrop-blur-xl  shadow-lg border border-b-white/50 bg-black/60'>
				<NavLink to='/' onClick={() => setActive('')}>
					<div className='flex pl-5 lg:pl-15 text-xl text-white font-medium gap-1 cursor-pointer'>
						<img src={eco} alt='logo' className='w-6 ' />
						<div>EcoVoice</div>
					</div>
				</NavLink>
				<div>
					<ul className='hidden md:hidden lg:flex justify-evenly text-white font-normal gap-0 lg:gap-12 text-base'>
						{navLinks.map(({ name, path }) => (
							<li key={path}>
								<NavLink
									to={path}
									onClick={() => setActive(name)}
									className='relative cursor-pointer'
								>
									<span
										className={`transition-colors duration-300 ${
											active === name
												? 'text-green-500 border-b-3 pb-1 border-b-white'
												: 'text-white hover:text-green-600'
										}`}
									>
										{name}
									</span>
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				<div className='hidden md:hidden lg:flex pr-15'>
					<div className=' flex gap-0 lg:gap-5 '>
						<button className=' border-2 border-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer'>
							SignUp
						</button>
						<button className=' border-2 border-blue-600 text-white text-sm font-semibold px-4 py-2  rounded-lg cursor-pointer'>
							Login
						</button>
					</div>
				</div>
			</nav>
		</>
	);
}

export default NavBar;
