import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import eco from '../assets/eco.svg';
import { navLinksDesktop, navLinksMobile } from '../constants';

function NavBar() {
	const [active, setActive] = useState('');
	const [toggle, setToggle] = useState(false);

	return (
		<>
			{/* DESKTOP NAVIGATION */}
			<nav className='fixed top-0 left-0 right-0 z-100 h-20 flex justify-between items-center backdrop-blur-xl shadow-lg border-b border-white/50 bg-black/60'>
				<NavLink to='/' onClick={() => setActive('')}>
					<div className='flex pl-5 lg:pl-10 text-2xl text-white font-medium gap-1 cursor-pointer'>
						<img src={eco} alt='logo' className='w-6 ' />
						<div>EcoVoice</div>
					</div>
				</NavLink>
				<div>
					<ul className='hidden md:hidden lg:flex justify-evenly text-white font-normal gap-0 lg:gap-12 text-base'>
						{navLinksDesktop.map(({ name, path }) => (
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
				<div className='hidden md:hidden lg:flex pr-6 lg:pr-10'>
					<div className='flex gap-0 lg:gap-5'>
						<button className=' border-2 border-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer'>
							Donate
						</button>
						<button className=' border-2 border-blue-600 text-white text-sm font-semibold px-4 py-2  rounded-lg cursor-pointer'>
							Login
						</button>
					</div>
				</div>
			</nav>

			{/* MOBILE MENU BUTTON */}
			<div className='lg:hidden fixed top-6 right-5 z-110'>
				<button
					onClick={() => setToggle(!toggle)}
					className='flex flex-col justify-center items-center gap-2 cursor-pointer'
				>
					<span
						className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${
							toggle ? 'rotate-45 translate-y-3' : ''
						}`}
					/>

					<span
						className={`w-2 h-0.5 bg-white rounded transition-all duration-300 ${
							toggle ? 'opacity-0' : 'opacity-100'
						}`}
					/>

					<span
						className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${
							toggle ? '-rotate-45 -translate-y-2' : ''
						}`}
					/>
				</button>
			</div>

			{/* MOBILE DROPDOWN MENU */}
			{toggle && (
				<div className='lg:hidden fixed top-22 right-2 w-52 bg-black/60 backdrop-blur-2xl border border-white/20 rounded-md shadow-2xl z-110'>
					<ul className='flex flex-col py-4 text-center'>
						{navLinksMobile.map(({ name, path }) => (
							<li key={path}>
								<NavLink
									to={path}
									onClick={() => {
										setActive(name);
										setToggle(false);
									}}
									className='flex flex-col pb-1 text-white font-medium hover:text-green-500 transition duration-300'
								>
									<div
										className={`${
											active === name
												? 'text-green-500 pb-1'
												: ''
										}`}
									>
										{name}
									</div>
								</NavLink>
							</li>
						))}

						<div className='mt-5 px-5 flex flex-col gap-3'>
							<button className='border-2 border-green-600 text-white py-2 rounded-lg'>
								Donate
							</button>

							<button className='border-2 border-blue-600 text-white py-2 rounded-lg'>
								Login
							</button>
						</div>
					</ul>
				</div>
			)}
		</>
	);
}

export default NavBar;