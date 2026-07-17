import { useState } from 'react';
import { FaAward, FaCheckDouble, FaFire, FaCircleCheck } from 'react-icons/fa6';

const initialChallenges = [
	{
		id: 1,
		title: 'Zero Waste Week',
		desc: 'Generate zero packaging landfill waste for 7 days. Log your composted waste and recycled packaging.',
		points: 500,
		participants: 1240,
		daysLeft: 3,
		difficulty: 'Hard',
	},
	{
		id: 2,
		title: 'Eco-Transit Challenge',
		desc: 'Commit to walking, biking, or taking electric public transit for all commutes under 5 miles.',
		points: 300,
		participants: 2850,
		daysLeft: 8,
		difficulty: 'Medium',
	},
	{
		id: 3,
		title: 'Local Energy Saver',
		desc: 'Reduce home electricity usage by at least 15% this month compared to your previous baseline.',
		points: 200,
		participants: 4120,
		daysLeft: 14,
		difficulty: 'Easy',
	}
];

function Challenges() {
	const [challenges, setChallenges] = useState(initialChallenges);
	const [joinedIds, setJoinedIds] = useState([]);

	const handleJoin = (id) => {
		if (joinedIds.includes(id)) return;
		setJoinedIds([...joinedIds, id]);
		setChallenges(prev => prev.map(c => c.id === id ? { ...c, participants: c.participants + 1 } : c));
	};

	return (
		<div className='min-h-screen bg-[#06141d] text-white py-12 px-6 md:px-12'>
			<div className='max-w-6xl mx-auto'>
				<div className='flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6'>
					<div>
						<h1 className='text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300 mb-3'>
							Green Challenges
						</h1>
						<p className='text-gray-400 text-lg max-w-xl'>
							Join gamified environmental tasks, earn points, and complete challenges with thousands of global participants.
						</p>
					</div>
					<div className='flex items-center gap-3 bg-[#0b1e2a] border border-white/5 px-4 py-2.5 rounded-xl cursor-pointer self-start md:self-center'>
						<FaFire className='text-amber-400' size={18} />
						<span className='font-bold text-sm'>My Points: {joinedIds.length * 100} XP</span>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{challenges.map(chall => {
						const isJoined = joinedIds.includes(chall.id);

						return (
							<div key={chall.id} className='bg-[#0b1e2a] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-green-500/30 transition-all duration-300 group shadow-xl hover:-translate-y-1'>
								<div>
									<div className='flex items-center justify-between mb-4'>
										<span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${
											chall.difficulty === 'Hard' ? 'text-rose-400 border-rose-400/20 bg-rose-400/5' :
											chall.difficulty === 'Medium' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' :
											'text-emerald-400 border-emerald-400/20 bg-emerald-400/5'
										}`}>
											{chall.difficulty}
										</span>
										<span className='text-xs text-gray-400 font-semibold'>
											{chall.daysLeft} days left
										</span>
									</div>

									<h3 className='text-xl font-bold mb-3 group-hover:text-green-400 transition-colors flex items-center gap-2'>
										<FaAward className='text-green-400 shrink-0' size={18} />
										{chall.title}
									</h3>
									<p className='text-gray-400 text-sm leading-relaxed mb-6'>
										{chall.desc}
									</p>
								</div>

								<div>
									<div className='flex justify-between items-center text-xs font-semibold text-gray-400 mb-6'>
										<span>{chall.participants.toLocaleString()} active</span>
										<span className='text-green-400 font-bold'>+{chall.points} XP</span>
									</div>

									<button
										onClick={() => handleJoin(chall.id)}
										className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all text-sm cursor-pointer ${
											isJoined
												? 'bg-green-500/20 text-green-400 border border-green-500/30'
												: 'bg-green-500 hover:bg-green-600 text-black shadow-md shadow-green-500/10'
										}`}
									>
										{isJoined ? (
											<>
												<FaCircleCheck size={14} />
												Challenge Active
											</>
										) : (
											<>
												<FaCheckDouble size={14} />
												Join Challenge
											</>
										)}
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Challenges;
