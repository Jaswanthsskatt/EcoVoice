export const navLinksDesktop = [
	{ name: 'Home', path: '/' },
	{ name: 'Climate Map', path: '/climatemap' },
	{ name: 'Issues', path: '/reports' },
	{ name: 'Community', path: '/community' },
	{ name: 'Academy', path: '/learn' },
	{ name: 'Marketplace', path: '/marketplace' },
	{ name: 'About', path: '/about' },
	{ name: 'Contact', path: '/contact' },
];

export const navLinksMobile = [
	{ name: 'Home', path: '/' },
	{ name: 'Climate Map', path: '/climatemap' },
	{ name: 'Issues', path: '/reports' },
	{ name: 'Community', path: '/community' },
	{ name: 'Academy', path: '/learn' },
	{ name: 'Marketplace', path: '/marketplace' },
	{ name: 'About', path: '/about' },
	{ name: 'Contact', path: '/contact' },
];

import {
	FaLeaf,
	FaTemperatureHigh,
	FaTint,
	FaTree,
	FaMapMarkedAlt,
	FaUsers,
	FaBookOpen,
} from 'react-icons/fa';

export const stats = [
	{
		icon: <FaLeaf />,
		title: 'Air Quality ',
		value: '42',
		status: 'Good',
		color: 'text-green-600',
		bg: 'bg-green-100',
	},
	{
		icon: <FaTemperatureHigh />,
		title: 'Temperature',
		value: '28°C',
		status: 'Moderate',
		color: 'text-orange-500',
		bg: 'bg-orange-100',
	},
	{
		icon: <FaTint />,
		title: 'Rainfall',
		value: '12 mm',
		status: 'Light Rain',
		color: 'text-blue-500',
		bg: 'bg-blue-100',
	},
	{
		icon: <FaTree />,
		title: 'Trees Planted',
		value: '12,580',
		status: 'This Month',
		color: 'text-green-700',
		bg: 'bg-green-100',
	},
];

export const cards = [
	{
		icon: <FaMapMarkedAlt />,
		title: 'Climate Map',
		desc: 'View real-time environmental data and alerts.',
		btn: 'Explore Map →',
		color: 'bg-green-100 text-green-600',
		path: '/climatemap',
	},
	{
		icon: <FaLeaf />,
		title: 'Report Issue',
		desc: 'Report environmental issues in your area.',
		btn: 'Report Now →',
		color: 'bg-orange-100 text-orange-500',
		path: '/reports',
	},
	{
		icon: <FaUsers />,
		title: 'Community',
		desc: 'Connect, share and make a difference.',
		btn: 'Join Community →',
		color: 'bg-blue-100 text-blue-600',
		path: '/community',
	},
	{
		icon: <FaBookOpen />,
		title: 'Learn',
		desc: 'Learn about climate change and sustainability.',
		btn: 'Start Learning →',
		color: 'bg-green-100 text-green-700',
		path: '/learn',
	},
];

import airQuality from '../assets/air_quality.jpeg';
import heavyRainfall from '../assets/heavy_rainfall.jpeg';
import treesPlanted from '../assets/trees_planted.jpeg';

export const updates = [
	{
		image: airQuality,
		title: 'Air Quality Improved',
		date: 'July 07, 2026',
		description:
			'AQI levels dropped by 18% across the city due to recent rainfall and plantation drives.',
	},
	{
		image: heavyRainfall,
		title: 'Heavy Rainfall Alert',
		date: 'July 06, 2026',
		description:
			'Meteorological dept predicts moderate to heavy rainfall in coastal regions.',
	},
	{
		image: treesPlanted,
		title: '10,000 Trees Planted',
		date: 'July 05, 2026',
		description:
			'Volunteers successfully planted over 10,000 saplings during the Green Earth campaign.',
	},
];