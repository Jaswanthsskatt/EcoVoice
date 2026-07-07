    		<section className=' relative z-30  flex justify-center items-center'>
    			<div className='p-5 gap-2 bg-white rounded-2xl grid grid-col-1 lg:grid-cols-4 border border-gray-200 shadow-lg shadow-gray-600 '>
    				{stats.map((stats, index) => (
    					<div
    						className='w-80 h-30 md:w-70 md:h-25 flex justify-center items-center gap-10 border-b lg:border-b-0 lg:border-r border-gray-400 last:border-b-0 last:lg:border-r-0'
    						key={index}
    					>
    						<div
    							className={`w-20 h-20 rounded-2xl ${stats.bg} ${stats.color} flex items-center justify-center text-4xl`}
    						>
    							{stats.icon}
    						</div>
    						<div className='flex flex-col gap-2'>
    							<p className='text-gray-500 font-medium text-base'>
    								{stats.title}
    							</p>

    							<h2 className='text-2xl font-semibold text-black'>
    								{stats.value}
    							</h2>

    							<span className='text-gray-500 font-medium text-sm'>
    								{stats.status}
    							</span>
    						</div>
    					</div>
    				))}
    			</div>
    		</section>
    		<section className='relative w-full flex flex-col justify-center items-center'>
    			<h2 className='text-4xl font-bold text-center'>What We Do</h2>

    			<p className='text-center text-gray-500 mt-4 mb-10'>
    				Tools and resources to help you stay informed and take
    				action.
    			</p>

    			<div className='grid md:grid-cols-4 gap-4'>
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

    							<p className='text-gray-500  tracking-tight'>
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
    		<section className='relative w-full flex flex-col justify-center items-center'>
    			<div className='flex flex-col gap-4 bg-white border-2 border-gray-200  shadow-lg shadow-gray-600 rounded-2xl px-15 py-10'>
    				<h2 className='text-black text-center text-4xl font-bold'>
    					Small Actions, Big Impact
    				</h2>

    				<p className='text-center text-gray-500'>
    					Every action counts. Start today and inspire others.
    				</p>
    				<div className='text-center'>
    					<button className=' bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer'>
    						Get Involved
    					</button>
    				</div>
    			</div>
    		</section>
