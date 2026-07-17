import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Leaf, IndianRupee, CheckCircle, ArrowRight, Loader2, ShieldCheck, Award, AlertCircle, Calendar } from 'lucide-react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';

const DONATION_TIERS = [
	{ id: 'tier1', amount: 100, title: 'Sapling Partner', desc: 'Plants 2 native trees in urban areas and monitors their growth.', icon: '🌱' },
	{ id: 'tier2', amount: 250, title: 'Clean Water Champion', desc: 'Cleans 100 sq ft of riverbed and funds local water toxicity testing kits.', icon: '💧' },
	{ id: 'tier3', amount: 500, title: 'Air Guardian', desc: 'Funds 1 community air quality sensor to report pollution in real-time.', icon: '💨' },
	{ id: 'tier4', amount: 1000, title: 'Climate Defender', desc: 'Sponsors 1 public environmental awareness workshop or school campaign.', icon: '🌎' },
];

function Donate() {
	const navigate = useNavigate();
	const [selectedTier, setSelectedTier] = useState('tier2'); // default to ₹250
	const [customAmount, setCustomAmount] = useState('');
	const [isMonthly, setIsMonthly] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState('card');
	
	// Form state
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [expiry, setExpiry] = useState('');
	const [cvv, setCvv] = useState('');
	
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errors, setErrors] = useState({});
	const [paymentReference, setPaymentReference] = useState('');

	// Get active donation amount
	const getDonationAmount = () => {
		if (customAmount) {
			return parseFloat(customAmount) || 0;
		}
		const tier = DONATION_TIERS.find(t => t.id === selectedTier);
		return tier ? tier.amount : 0;
	};

	const handleTierSelect = (id) => {
		setSelectedTier(id);
		setCustomAmount(''); // Clear custom amount when tier is selected
	};

	const handleCustomAmountChange = (e) => {
		const val = e.target.value;
		if (val === '' || (/^\d*\.?\d*$/.test(val))) {
			setCustomAmount(val);
			setSelectedTier(''); // Clear selected preset tier
		}
	};

	const handleValidation = () => {
		const tempErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const amount = getDonationAmount();

		if (amount <= 0) {
			tempErrors.amount = 'Please select or enter a donation amount';
		}
		if (!name.trim()) {
			tempErrors.name = 'Full name is required';
		}
		if (!email.trim()) {
			tempErrors.email = 'Email is required';
		} else if (!emailRegex.test(email)) {
			tempErrors.email = 'Please enter a valid email address';
		}

		if (paymentMethod === 'card') {
			if (!cardNumber.replace(/\s+/g, '').trim()) {
				tempErrors.cardNumber = 'Card number is required';
			} else if (cardNumber.replace(/\s+/g, '').length < 16) {
				tempErrors.cardNumber = 'Card number must be 16 digits';
			}
			if (!expiry.trim()) {
				tempErrors.expiry = 'Expiration date is required';
			} else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry)) {
				tempErrors.expiry = 'Use MM/YY format';
			}
			if (!cvv.trim()) {
				tempErrors.cvv = 'CVV is required';
			} else if (cvv.length < 3) {
				tempErrors.cvv = 'Must be 3-4 digits';
			}
		}

		setErrors(tempErrors);
		return Object.keys(tempErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!handleValidation()) return;

		setIsLoading(true);
		
		// Simulate network payment request
		setTimeout(() => {
			setPaymentReference(`EV-${Math.floor(100000 + Math.random() * 900000)}`);
			setIsLoading(false);
			setIsSuccess(true);
		}, 2000);
	};

	return (
		<div className='min-h-[calc(100vh-14rem)] w-full bg-gradient-to-br from-gray-50 via-green-50/5 to-emerald-50/10 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
			{/* Soft background glow circles */}
			<div className='absolute -top-40 -left-40 w-96 h-96 bg-green-200/30 rounded-full blur-3xl pointer-events-none' />
			<div className='absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none' />

			<div className='max-w-6xl mx-auto z-10 relative'>
				
				{/* Top heading */}
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200/50 mb-3'>
						<Heart className='w-3.5 h-3.5 fill-green-600 text-green-600' /> Support EcoVoice
					</span>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-none mb-4'>
						Empower Environmental Actions
					</h1>
					<p className='text-gray-600 text-lg leading-relaxed'>
						Your contributions directly fund public real-time climate sensors, neighborhood cleanups, and local tree plantation campaigns. Every rupee counts.
					</p>
				</div>

				{/* Success Modal Overlay */}
				{isSuccess && (
					<div className='fixed inset-0 bg-black/50 backdrop-blur-md z-150 flex items-center justify-center p-4 animate-fade-in'>
						<div className='bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-gray-100 animate-scale-up'>
							<div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce relative'>
								<Heart className='w-10 h-10 fill-green-600' />
								<div className='absolute inset-0 bg-green-500 rounded-full blur-md opacity-25 -z-10 animate-ping' />
							</div>
							<h2 className='text-3xl font-extrabold text-gray-900 mb-2'>
								Thank You!
							</h2>
							<p className='text-green-700 font-semibold mb-4 text-lg'>
								Donation of ₹{getDonationAmount().toFixed(2)} Received
							</p>
							<p className='text-gray-500 text-sm mb-6 leading-relaxed'>
								You have successfully supported the <strong>{getDonationAmount() >= 1000 ? 'Climate Defender' : getDonationAmount() >= 500 ? 'Air Guardian' : getDonationAmount() >= 250 ? 'Clean Water Champion' : 'Sapling Partner'}</strong> initiative. A receipt has been sent to <strong>{email}</strong>.
							</p>
							
							<div className='bg-gray-50 rounded-xl p-4 mb-6 text-left text-xs space-y-2 text-gray-600 border border-gray-100'>
								<div className='flex justify-between'><span className='font-medium'>Payment Reference:</span> <span className='font-mono text-gray-900'>{paymentReference}</span></div>
								<div className='flex justify-between'><span className='font-medium'>Frequency:</span> <span className='text-gray-900'>{isMonthly ? 'Monthly Recurring' : 'One-time Donation'}</span></div>
								<div className='flex justify-between'><span className='font-medium'>Paid via:</span> <span className='text-gray-900'>{paymentMethod === 'card' ? 'Credit Card' : 'PayPal'}</span></div>
							</div>

							<button
								onClick={() => navigate('/')}
								className='w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3.5 font-semibold text-sm transition-all duration-300 shadow-lg shadow-green-600/25 cursor-pointer'
							>
								Back to Homepage
							</button>
						</div>
					</div>
				)}

				{/* Main Content Form & Tiers Grid */}
				<div className='grid lg:grid-cols-12 gap-8'>
					
					{/* Left: Tiers & Info (7 Columns) */}
					<div className='lg:col-span-7 space-y-6'>
						
						{/* Donation Impact Cards */}
						<h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
							<Sparkles className='w-5 h-5 text-green-600' /> 1. Select Impact Tier
						</h3>
						
						<div className='grid md:grid-cols-2 gap-4'>
							{DONATION_TIERS.map((tier) => (
								<button
									key={tier.id}
									type='button'
									onClick={() => handleTierSelect(tier.id)}
									className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 relative group flex flex-col justify-between cursor-pointer ${
										selectedTier === tier.id
											? 'border-green-600 bg-green-50/20 shadow-md shadow-green-600/5'
											: 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
									}`}
								>
									{selectedTier === tier.id && (
										<span className='absolute top-4 right-4 bg-green-600 text-white p-0.5 rounded-full'>
											<CheckCircle className='w-4 h-4 fill-green-600' />
										</span>
									)}
									<div>
										<div className='text-3xl mb-3'>{tier.icon}</div>
										<h4 className='font-bold text-gray-900 group-hover:text-green-700 transition-colors text-base'>{tier.title}</h4>
										<p className='text-gray-500 text-xs mt-1 leading-relaxed'>{tier.desc}</p>
									</div>
									<div className='text-2xl font-extrabold text-green-700 mt-4'>
										₹{tier.amount}
									</div>
								</button>
							))}
						</div>

						{/* Custom Amount Field */}
						<div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3'>
							<div className='flex justify-between items-center'>
								<label className='font-bold text-gray-900 text-sm'>
									Or enter a custom donation amount
								</label>
								{customAmount && (
									<span className='text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full'>
										Custom amount active
									</span>
								)}
							</div>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 font-semibold'>
									<IndianRupee className='w-5 h-5 text-gray-500' />
								</div>
								<input
									type='text'
									value={customAmount}
									onChange={handleCustomAmountChange}
									className={`block w-full pl-10 pr-3 py-4 border rounded-xl bg-gray-50/50 text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-lg ${
										errors.amount ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'
									}`}
									placeholder='Enter custom amount (e.g. 500)'
								/>
							</div>
							{errors.amount && (
								<p className='text-xs text-red-600 flex items-center gap-1'>
									<AlertCircle className='w-3.5 h-3.5' /> {errors.amount}
								</p>
							)}
						</div>

						{/* Monthly Toggle Card */}
						<div className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4'>
							<div className='flex items-center gap-3'>
								<div className='p-3 bg-green-50 rounded-xl text-green-600'>
									<Calendar className='w-5 h-5' />
								</div>
								<div>
									<h4 className='font-bold text-gray-900 text-sm'>Make this a monthly contribution</h4>
									<p className='text-gray-500 text-xs mt-0.5'>Support continuous tree watering and monitor sensor nodes year-round.</p>
								</div>
							</div>
							<label className='relative inline-flex items-center cursor-pointer select-none'>
								<input
									type='checkbox'
									checked={isMonthly}
									onChange={(e) => setIsMonthly(e.target.checked)}
									className='sr-only peer'
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:height-5 after:width-5 after:transition-all peer-checked:bg-green-600"></div>
							</label>
						</div>

						{/* Extra security guarantees */}
						<div className='grid grid-cols-3 gap-4 pt-2 text-center text-gray-500 text-xs'>
							<div className='flex flex-col items-center gap-1.5 p-3 bg-gray-50/50 rounded-xl border border-gray-100'>
								<ShieldCheck className='w-5 h-5 text-green-600' />
								<span className='font-semibold text-gray-700'>SSL Encrypted Secure</span>
							</div>
							<div className='flex flex-col items-center gap-1.5 p-3 bg-gray-50/50 rounded-xl border border-gray-100'>
								<Award className='w-5 h-5 text-green-600' />
								<span className='font-semibold text-gray-700'>501(c)(3) Tax Exempt</span>
							</div>
							<div className='flex flex-col items-center gap-1.5 p-3 bg-gray-50/50 rounded-xl border border-gray-100'>
								<Leaf className='w-5 h-5 text-green-600' />
								<span className='font-semibold text-gray-700'>100% Direct Impact</span>
							</div>
						</div>

					</div>

					{/* Right: Payment details Form (5 Columns) */}
					<div className='lg:col-span-5'>
						<div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-6 sticky top-28'>
							
							<div>
								<h3 className='text-lg font-bold text-gray-900'>2. Payment Details</h3>
								<p className='text-gray-500 text-xs mt-1'>Fill in your information to complete the donation.</p>
							</div>

							{/* Donation summary indicator */}
							<div className='bg-green-50/40 border border-green-100/50 rounded-xl p-4 flex justify-between items-center'>
								<span className='text-xs font-semibold text-green-800 uppercase tracking-wider'>Selected donation:</span>
								<span className='text-2xl font-extrabold text-green-700'>
									₹{getDonationAmount().toFixed(2)}
									{isMonthly && <span className='text-xs font-semibold text-green-600/70'>/mo</span>}
								</span>
							</div>

							{/* Payment Method Selector */}
							<div className='flex border border-gray-100 rounded-xl overflow-hidden p-1 bg-gray-50/50'>
								<button
									type='button'
									onClick={() => { setPaymentMethod('card'); setErrors({}); }}
									className={`flex-1 py-2 text-xs font-semibold transition-all duration-200 rounded-lg flex items-center justify-center gap-2 cursor-pointer ${
										paymentMethod === 'card' ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-400 hover:text-gray-600'
									}`}
								>
									<FaCreditCard className='w-3.5 h-3.5 text-green-600' />
									<span>Credit Card</span>
								</button>
								<button
									type='button'
									onClick={() => { setPaymentMethod('paypal'); setErrors({}); }}
									className={`flex-1 py-2 text-xs font-semibold transition-all duration-200 rounded-lg flex items-center justify-center gap-2 cursor-pointer ${
										paymentMethod === 'paypal' ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-400 hover:text-gray-600'
									}`}
								>
									<FaPaypal className='w-3.5 h-3.5 text-blue-500' />
									<span>PayPal</span>
								</button>
							</div>

							<form onSubmit={handleSubmit} className='space-y-4'>
								
								{/* Billing Contact details */}
								<div className='space-y-1.5'>
									<label className='text-xs font-semibold text-gray-700 block'>
										Full Name
									</label>
									<input
										type='text'
										value={name}
										onChange={(e) => setName(e.target.value)}
										className={`block w-full px-3.5 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
											errors.name ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'
										}`}
										placeholder='Jane Doe'
									/>
									{errors.name && (
										<p className='text-xs text-red-600 flex items-center gap-1 mt-1'>
											<AlertCircle className='w-3.5 h-3.5' /> {errors.name}
										</p>
									)}
								</div>

								<div className='space-y-1.5'>
									<label className='text-xs font-semibold text-gray-700 block'>
										Email Address
									</label>
									<input
										type='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className={`block w-full px-3.5 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
											errors.email ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'
										}`}
										placeholder='jane@example.com'
									/>
									{errors.email && (
										<p className='text-xs text-red-600 flex items-center gap-1 mt-1'>
											<AlertCircle className='w-3.5 h-3.5' /> {errors.email}
										</p>
									)}
								</div>

								{/* Credit Card inputs (Card only) */}
								{paymentMethod === 'card' ? (
									<>
										<div className='space-y-1.5'>
											<label className='text-xs font-semibold text-gray-700 block'>
												Card Number
											</label>
											<input
												type='text'
												value={cardNumber}
												onChange={(e) => setCardNumber(e.target.value)}
												maxLength='19'
												className={`block w-full px-3.5 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
													errors.cardNumber ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'
												}`}
												placeholder='4111 2222 3333 4444'
											/>
											{errors.cardNumber && (
												<p className='text-xs text-red-600 flex items-center gap-1 mt-1'>
													<AlertCircle className='w-3.5 h-3.5' /> {errors.cardNumber}
												</p>
											)}
										</div>

										<div className='grid grid-cols-2 gap-4'>
											<div className='space-y-1.5'>
												<label className='text-xs font-semibold text-gray-700 block'>
													Expiration Date
												</label>
												<input
													type='text'
													value={expiry}
													onChange={(e) => setExpiry(e.target.value)}
													maxLength='5'
													className={`block w-full px-3.5 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
														errors.expiry ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'
													}`}
													placeholder='MM/YY'
												/>
												{errors.expiry && (
													<p className='text-xs text-red-600 flex items-center gap-1 mt-1'>
														<AlertCircle className='w-3.5 h-3.5' /> {errors.expiry}
													</p>
												)}
											</div>

											<div className='space-y-1.5'>
												<label className='text-xs font-semibold text-gray-700 block'>
													CVV
												</label>
												<input
													type='password'
													value={cvv}
													onChange={(e) => setCvv(e.target.value)}
													maxLength='4'
													className={`block w-full px-3.5 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
														errors.cvv ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'
													}`}
													placeholder='•••'
												/>
												{errors.cvv && (
													<p className='text-xs text-red-600 flex items-center gap-1 mt-1'>
														<AlertCircle className='w-3.5 h-3.5' /> {errors.cvv}
													</p>
												)}
											</div>
										</div>
									</>
								) : (
									<div className='bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-center text-sm text-gray-600 space-y-3'>
										<p>You will be redirected to PayPal's secure portal to authorize your donation after clicking submit.</p>
									</div>
								)}

								{/* Submit Button */}
								<button
									type='submit'
									disabled={isLoading}
									className='w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold text-sm transition-all duration-300 flex justify-center items-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-green-600/35 focus:ring-4 focus:ring-green-500/20 outline-none disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer mt-4'
								>
									{isLoading ? (
										<>
											<Loader2 className='w-4 h-4 animate-spin' />
											<span>Processing Transaction...</span>
										</>
									) : (
										<>
											<span>Donate ₹{getDonationAmount().toFixed(2)}</span>
											<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
										</>
									)}
								</button>

							</form>
						</div>
					</div>

				</div>

			</div>
		</div>
	);
}

export default Donate;
