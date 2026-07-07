import React from 'react';
import eco from '../assets/eco.png';
import ecobar from '../assets/ecobar.png';
import { stats, cards } from '../constants';

function Hero() {
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

						<div className='flex gap-4 flex-wrap mb-4 md:mb-10 '>
							<button className=' w-60 rounded text-white font-bold bg-green-600 px-6 py-3 cursor-pointer '>
								Explore Climate Map
							</button>
							<button className=' w-60 rounded text-black font-bold bg-white px-6 py-3 cursor-pointer '>
								Report an Issue
							</button>
						</div>

						<div className='w-full relative -left-2 flex justify-center items-center'>
							<div className='p-4 gap-2 bg-transparent backdrop-blur-lg rounded-2xl grid grid-col-1 lg:grid-cols-4 border border-gray-50  '>
								{stats.map((stats, index) => (
									<div
										className='w-80 h-26 md:w-60 md:h-20 flex justify-center items-center gap-10 border-b lg:border-b-0 lg:border-r border-gray-50 last:border-b-0 last:lg:border-r-0'
										key={index}
									>
										<div
											className={`w-20 h-20 rounded-2xl ${stats.bg} ${stats.color} flex items-center justify-center text-4xl`}
										>
											{stats.icon}
										</div>
										<div className='flex flex-col gap-2'>
											<p className='text-neutral-400 font-medium text-base'>
												{stats.title}
											</p>

											<h2 className='text-2xl font-semibold text-white'>
												{stats.value}
											</h2>

											<span className='text-neutral-400 font-medium text-sm'>
												{stats.status}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='-mt-10 relative w-full flex flex-col justify-center items-center'>
				<h2 className='text-4xl font-bold text-center'>What We Do</h2>

				<p className='px-5 text-center text-gray-600 mt-4 m-10'>
					Tools and resources to help you stay informed and take
					action.
				</p>

				<div className='flex flex-wrap justify-center items-center gap-4'>
					{cards.map((cards, index) => (
						<div
							key={index}
							className='w-75 border-2 border-gray-200 bg-white rounded-2xl p-5 shadow-lg shadow-gray-600'
						>
							<div className=' flex flex-col gap-4'>
								<div className='flex gap-5 items-center'>
									<div
										className={`w-14 h-14 rounded-full flex justify-center items-center text-3xl ${cards.color}`}
									>
										{cards.icon}
									</div>

									<h3 className='text-2xl font-semibold'>
										{cards.title}
									</h3>
								</div>

								<p className='text-gray-600  tracking-tight'>
									{cards.desc}
								</p>

								<p className='text-green-600 font-semibold'>
									{cards.btn}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	);
}

export default Hero;
