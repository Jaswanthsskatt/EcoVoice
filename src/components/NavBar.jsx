import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  AlertTriangle, 
  Globe, 
  ClipboardList, 
  Heart, 
  ShoppingBag, 
  BookOpen, 
  GraduationCap, 
  Bot, 
  Info, 
  Mail,
  Menu,
  X
} from 'lucide-react';
import { navLinksDesktop, navLinksMobile } from '../constants';

const iconMap = {
  'Home': Home,
  'Community': Users,
  'Issues': AlertTriangle,
  'Climate Map': Globe,
  'Petitions': ClipboardList,
  'Volunteer': Heart,
  'Marketplace': ShoppingBag,
  'Knowledge': BookOpen,
  'Academy': GraduationCap,
  'AI Assistant': Bot,
  'About': Info,
  'Contact': Mail
};

function NavBar() {
	const [toggle, setToggle] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const isHomePage = location.pathname === '/';
	// Dynamic style: transparent background on home page top, white blur elsewhere
	const isDarkHeader = isHomePage && !scrolled;

	return (
		<>
			{/* DESKTOP NAVIGATION */}
			<nav className={`fixed top-0 left-0 right-0 z-50 h-20 flex justify-between items-center px-4 xl:px-8 transition-all duration-500 border-t ${
				isDarkHeader 
					? 'bg-white/10 backdrop-blur-lg border-b border-white/10 border-t-white/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] text-white' 
					: 'bg-white/40 backdrop-blur-lg border-b border-white/50 border-t-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] text-[#08060d]'
			}`}>
				
				{/* LOGO */}
				<NavLink to='/' className='flex flex-col select-none shrink-0 pr-2'>
					<div className='text-2xl font-bold tracking-tight leading-none'>
						<span className='text-[#168a42]'>Eco</span>
						<span className={isDarkHeader ? 'text-white' : 'text-[#08060d]'}>Voice</span>
					</div>
					<span className={`text-[9px] font-bold tracking-wider mt-1 ${
						isDarkHeader ? 'text-gray-300' : 'text-gray-500'
					}`}>
						Speak. Act. Heal Earth.
					</span>
				</NavLink>

				{/* LINKS */}
				<div className='hidden lg:flex items-center justify-center flex-1 h-full px-2'>
					<ul className='flex items-center h-full gap-2.5 xl:gap-5 text-[10.5px] xl:text-[11px] font-semibold'>
						{navLinksDesktop.map(({ name, path }) => {
							const IconComponent = iconMap[name] || Info;
							return (
								<li key={path} className='h-full'>
									<NavLink
										to={path}
										className={({ isActive }) =>
											`h-full px-2.5 xl:px-4 flex flex-col items-center justify-center gap-1.5 border-b-3 transition-all duration-300 cursor-pointer ${
												isActive
													? 'border-[#168a42] text-[#168a42]'
													: isDarkHeader
														? 'border-transparent text-gray-200 hover:text-[#168a42] hover:border-[#168a42]/30'
														: 'border-transparent text-gray-600 hover:text-[#168a42] hover:border-[#168a42]/30'
											}`
										}
									>
										<IconComponent size={19} className='shrink-0' />
										<span className='tracking-wide'>{name}</span>
									</NavLink>
								</li>
							);
						})}
					</ul>
				</div>

				{/* RIGHT BUTTONS */}
				<div className='hidden lg:flex items-center gap-2.5 shrink-0 pl-2'>
					<NavLink to='/donate' className='cursor-pointer'>
						<button className='bg-[#168a42] hover:bg-[#116c33] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all shadow-md shadow-green-700/10 flex items-center gap-1.5 border-none'>
							Donate ♥️
						</button>
					</NavLink>
					<NavLink to='/login' className='cursor-pointer'>
						<button className={`border border-[#168a42] text-[#168a42] text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors ${
							isDarkHeader ? 'hover:bg-white/10' : 'hover:bg-[#168a42]/5'
						}`}>
							Login
						</button>
					</NavLink>
				</div>

				{/* MOBILE MENU TOGGLE BUTTON */}
				<div className='lg:hidden flex items-center gap-3'>
					<NavLink to='/donate' className='cursor-pointer'>
						<button className='bg-[#168a42] hover:bg-[#116c33] text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer'>
							Donate ♥️
						</button>
					</NavLink>
					
					<button
						onClick={() => setToggle(!toggle)}
						className='cursor-pointer p-1 z-50'
						aria-label='Toggle menu'
					>
						{toggle ? (
							<X size={24} className={isDarkHeader ? 'text-white' : 'text-[#08060d]'} />
						) : (
							<Menu size={24} className={isDarkHeader ? 'text-white' : 'text-[#08060d]'} />
						)}
					</button>
				</div>
			</nav>

			{/* MOBILE DROPDOWN MENU */}
			{toggle && (
				<div className='lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto animate-fade-in'>
					<div className='p-6 flex flex-col gap-6'>
						{/* Links list with icons */}
						<ul className='flex flex-col gap-4 text-base font-semibold border-b border-gray-100 pb-6'>
							{navLinksMobile.map(({ name, path }) => {
								const IconComponent = iconMap[name] || Info;
								return (
									<li key={path}>
										<NavLink
											to={path}
											onClick={() => setToggle(false)}
											className={({ isActive }) =>
												`flex items-center gap-3 py-2 px-3 rounded-xl transition-all ${
													isActive 
														? 'bg-[#168a42]/10 text-[#168a42]' 
														: 'text-gray-700 hover:bg-gray-50'
												}`
											}
										>
											<IconComponent size={20} className='shrink-0' />
											<span>{name}</span>
										</NavLink>
									</li>
								);
							})}
						</ul>

						{/* Donate & Login option */}
						<div className='flex flex-col gap-3'>
							<NavLink to='/donate' onClick={() => setToggle(false)} className='w-full'>
								<button className='w-full bg-[#168a42] hover:bg-[#116c33] text-white py-2.5 rounded-xl font-bold transition-all cursor-pointer shadow-md shadow-green-700/10 flex items-center justify-center gap-1.5 border-none'>
									Donate ♥️
								</button>
							</NavLink>
							<NavLink to='/login' onClick={() => setToggle(false)} className='w-full'>
								<button className='w-full border border-[#168a42] text-[#168a42] hover:bg-[#168a42]/5 py-2.5 rounded-xl font-bold transition-all cursor-pointer'>
									Login
								</button>
							</NavLink>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default NavBar;