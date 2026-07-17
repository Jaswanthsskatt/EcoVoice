import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eco from '../assets/eco.png';
import { stats, cards, updates } from '../constants';


function Hero() {
  const [dynamicStats, setDynamicStats] = useState([
    {
      icon: stats[0].icon,
      title: 'Air Quality',
      value: '42',
      status: 'Good',
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      icon: stats[1].icon,
      title: 'Temperature',
      value: '28°C',
      status: 'Moderate',
      color: 'text-orange-500',
      bg: 'bg-orange-100',
    },
    {
      icon: stats[2].icon,
      title: 'Rainfall',
      value: '12 mm',
      status: 'Light Rain',
      color: 'text-blue-500',
      bg: 'bg-blue-100',
    },
    {
      icon: stats[3].icon,
      title: 'Trees Planted',
      value: '12,580',
      status: 'This Month',
      color: 'text-green-700',
      bg: 'bg-green-100',
    }
  ]);

  useEffect(() => {
    const fetchHomeStats = async () => {
      const apiKey = '5V9J8R3CW29LNC6BQQH84VW5S';
      const location = 'London,UK';
      try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=${apiKey}&unitGroup=metric&include=current`);
        if (response.ok) {
          const data = await response.json();
          const temp = Math.round(data.currentConditions.temp);
          const precip = data.currentConditions.precip || 0;
          const humidity = data.currentConditions.humidity || 50;
          const cloudcover = data.currentConditions.cloudcover || 0;
          
          // Estimate AQI based on humidity and cloud cover
          const calculatedAqi = Math.round(30 + (humidity * 0.15) + (cloudcover * 0.1));
          const aqiStatus = calculatedAqi < 50 ? 'Good' : 'Moderate';

          setDynamicStats(prev => [
            { ...prev[0], value: String(calculatedAqi), status: aqiStatus },
            { ...prev[1], value: `${temp}°C`, status: 'Real-time' },
            { ...prev[2], value: `${precip} mm`, status: precip > 0 ? 'Raining' : 'Clear' },
            { ...prev[3] }
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch home stats:", err);
      }
    };
    fetchHomeStats();
  }, []);
	return (
		<>
			<section className='flex flex-col relative w-full h-screen'>
				<img
					src={eco}
					alt='eco'
					className='relative -top-20 w-full h-full object-cover'
				/>
				<div className='absolute top-5 left-5 md:top-20 md:left-20 right-0'>
					<div className=' text-white'>
						<h1 className='text-4xl md:text-6xl font-bold mb-2 md:mb-6  leading-tight'>
							<span>Together for a</span>
							<br />
							<span className='text-green-600'>Greener </span>
							<span>Tomorrow</span>
						</h1>

						<p className='w-xs md:w-2xl text-base md:text-lg leading-8 mb-4 md:mb-8'>
							EcoVoice is a platform for real-time environmental
							information, community action, and sustainable
							future.
						</p>

						<div className='flex gap-4 flex-wrap mb-6 md:mb-15 '>
							<Link to="/climatemap">
								<button className=' w-60 rounded-xl text-white font-bold bg-[#168a42] hover:bg-[#116c33] px-6 py-3.5 cursor-pointer transition-colors shadow-lg shadow-green-700/20 '>
									Explore Climate Map
								</button>
							</Link>
							<Link to="/reports">
								<button className=' w-60 rounded-xl text-black font-bold bg-white hover:bg-gray-100 px-6 py-3.5 cursor-pointer transition-colors shadow-md border border-gray-200 '>
									Report an Issue
								</button>
							</Link>
						</div>

						<div className='w-full flex justify-center items-center mt-6 pr-4 lg:pr-20'>
							<div className='w-full p-4 md:p-6 bg-black/40 backdrop-blur-xl rounded-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border border-white/10 shadow-2xl'>
								{dynamicStats.map((item, index) => (
									<div
										className='w-full flex items-center gap-4 px-4 py-2 lg:border-r border-white/10 last:border-r-0'
										key={index}
									>
										<div
											className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-3xl shrink-0`}
										>
											{item.icon}
										</div>
										<div className='flex flex-col min-w-0'>
											<p className='text-neutral-400 font-semibold text-xs uppercase tracking-wider truncate'>
												{item.title}
											</p>

											<h2 className='text-xl font-bold text-white mt-0.5'>
												{item.value}
											</h2>

											<span className='text-neutral-300/80 font-medium text-[11px] mt-0.5 block'>
												{item.status}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='max-w-7xl mx-auto mt-24 md:mt-36 relative w-full flex flex-col justify-center items-center'>
				<h2 className='text-4xl font-bold text-center'>What We Do</h2>

				<p className='px-5 text-center text-gray-600 mt-4 '>
					Tools and resources to help you stay informed and take
					action.
				</p>

				<div className='flex flex-wrap justify-center items-center gap-6 mt-8'>
					{cards.map((card, index) => (
						<Link 
							to={card.path} 
							key={index}
							className='w-75 border border-gray-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-green-600/40 transition-all duration-300 -translate-y-0 hover:-translate-y-1 block text-inherit no-underline cursor-pointer'
						>
							<div className=' flex flex-col gap-3'>
								<div className='flex gap-4 items-center'>
									<div
										className={`w-14 h-14 rounded-full flex justify-center items-center text-3xl shrink-0 ${card.color}`}
									>
										{card.icon}
									</div>

									<h3 className='text-lg font-bold text-gray-900'>
										{card.title}
									</h3>
								</div>

								<p className='text-gray-500 text-xs leading-relaxed'>
									{card.desc}
								</p>

								<p className='text-[#168a42] font-semibold text-xs mt-1 flex items-center gap-1 hover:text-[#116c33] transition-colors'>
									{card.btn}
								</p>
							</div>
						</Link>
					))}
				</div>
			</section>
			<section className='relative mt-20 md:mt-32 w-full hidden md:flex flex-col justify-center items-center'>
				<div className='flex flex-col flex-wrap gap-4 border border-gray-200 bg-white shadow-sm rounded-3xl px-16 py-10 max-w-xl mx-auto'>
					<h2 className='text-gray-900 text-center text-3xl font-extrabold'>
						Small Actions, Big Impact
					</h2>

					<p className='text-center text-gray-500 text-sm leading-relaxed'>
						Every action counts. Start today and inspire others. Join local cleanups or support conservation actions.
					</p>
					<div className='text-center mt-2'>
						<Link to="/community">
							<button className=' bg-[#168a42] hover:bg-[#116c33] text-white text-xs font-bold px-6 py-3 rounded-xl cursor-pointer transition-colors shadow-md shadow-green-600/10'>
								Get Involved &rarr;
							</button>
						</Link>
					</div>
				</div>
			</section>

			<section className='max-w-7xl mx-auto mt-24 md:mt-36 relative w-full flex flex-col mb-16'>
				<div className='px-8 flex justify-between items-center'>
					<h2 className='text-3xl font-bold text-gray-900'>Latest Updates</h2>
					<Link to="/learn" className="text-[#168a42] hover:text-[#116c33] font-bold text-sm no-underline cursor-pointer">
						View All &rarr;
					</Link>
				</div>

				<p className='px-8 text-left text-gray-600 my-4 '>
					Stay informed with the latest environmental news and alerts.
				</p>

				<div className='flex flex-wrap justify-center items-center px-5 gap-6'>
					{updates.map((item, index) => (
						<Link 
							to="/learn"
							key={index}
							className='flex flex-col gap-1 w-96 overflow-hidden border border-gray-200 bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 text-inherit no-underline cursor-pointer'
						>
							<div className='h-48 flex items-center justify-center overflow-hidden rounded-2xl shrink-0'>
								<img src={item.image} alt={item.title} className='w-full h-full object-cover transition-transform duration-500 hover:scale-103'  />
							</div>

							<div className='flex flex-col gap-2 mt-4'>
								<p className='text-[10px] font-bold text-gray-400 uppercase tracking-wider'>
									{item.date}
								</p>

								<h3 className='text-lg font-bold text-gray-900 leading-snug hover:text-green-750 transition-colors'>
									{item.title}
								</h3>

								<p className='text-gray-500 text-xs leading-relaxed'>
									{item.description}
								</p>

								<p className='mt-3 flex items-center text-[#168a42] font-semibold text-xs hover:text-[#116c33] transition-colors'>
									Read Article &rarr;
								</p>
							</div>
						</Link>
					))}
				</div>
			</section>
		</>
	);
}

export default Hero;