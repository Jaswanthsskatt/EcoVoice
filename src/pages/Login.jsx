import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight, CheckCircle, Leaf, AlertCircle, Sparkles } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

function Login() {
	const navigate = useNavigate();
	const [isSignUp, setIsSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	
	// Form state
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [agreeTerms, setAgreeTerms] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [errors, setErrors] = useState({});

	const handleValidation = () => {
		const tempErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (isSignUp) {
			if (!name.trim()) tempErrors.name = 'Name is required';
			if (!email.trim()) {
				tempErrors.email = 'Email is required';
			} else if (!emailRegex.test(email)) {
				tempErrors.email = 'Please enter a valid email address';
			}
			if (!password) {
				tempErrors.password = 'Password is required';
			} else if (password.length < 6) {
				tempErrors.password = 'Password must be at least 6 characters';
			}
			if (password !== confirmPassword) {
				tempErrors.confirmPassword = 'Passwords do not match';
			}
			if (!agreeTerms) {
				tempErrors.agreeTerms = 'You must agree to the Terms & Conditions';
			}
		} else {
			if (!email.trim()) {
				tempErrors.email = 'Email is required';
			} else if (!emailRegex.test(email)) {
				tempErrors.email = 'Please enter a valid email address';
			}
			if (!password) {
				tempErrors.password = 'Password is required';
			}
		}

		setErrors(tempErrors);
		return Object.keys(tempErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!handleValidation()) return;

		setIsLoading(true);
		
		// Simulate network request
		setTimeout(() => {
			setIsLoading(false);
			setIsSuccess(true);
			
			// Redirect after success animation
			setTimeout(() => {
				navigate('/');
			}, 1800);
		}, 1500);
	};

	return (
		<div className='min-h-[calc(100vh-14rem)] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-green-50/10 to-emerald-50/15 relative py-12 overflow-hidden'>
			{/* Soft decorative background glows */}
			<div className='absolute -top-40 -left-40 w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none' />
			<div className='absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none' />

			{/* Login Card Container */}
			<div className='w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-12 min-h-[580px] border border-gray-100/50 z-10'>
				
				{/* Left Side: Branding / Info Column (Visible on Desktop) */}
				<div className='hidden lg:flex lg:col-span-5 bg-gradient-to-br from-green-800 via-emerald-900 to-teal-950 p-12 text-white flex-col justify-between relative overflow-hidden'>
					{/* Subtle abstract lines in background */}
					<div className='absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]' />
					
					{/* Header brand */}
					<div className='flex items-center gap-2 relative z-10'>
						<div className='p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20'>
							<Leaf className='w-6 h-6 text-green-400' />
						</div>
						<span className='text-2xl font-bold tracking-tight'>EcoVoice</span>
					</div>

					{/* Center text & features */}
					<div className='space-y-8 relative z-10 my-auto py-10'>
						<div className='space-y-3'>
							<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'>
								<Sparkles className='w-3 h-3' /> Join the movement
							</span>
							<h2 className='text-3xl font-extrabold leading-tight'>
								Empowering Communities for a Greener Planet
							</h2>
						</div>

						<ul className='space-y-4 text-green-100/90 text-sm'>
							<li className='flex items-start gap-3'>
								<div className='mt-1 bg-green-500/20 p-1 rounded-lg text-green-400'>
									<CheckCircle className='w-4 h-4' />
								</div>
								<div>
									<h4 className='font-semibold text-white'>Real-time Climate Mapping</h4>
									<p className='text-green-200/70 text-xs mt-0.5'>Track environmental hazards in your community instantly.</p>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<div className='mt-1 bg-green-500/20 p-1 rounded-lg text-green-400'>
									<CheckCircle className='w-4 h-4' />
								</div>
								<div>
									<h4 className='font-semibold text-white'>Transparent Reporting</h4>
									<p className='text-green-200/70 text-xs mt-0.5'>Report pollution, illegal dumping, and other issues directly.</p>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<div className='mt-1 bg-green-500/20 p-1 rounded-lg text-green-400'>
									<CheckCircle className='w-4 h-4' />
								</div>
								<div>
									<h4 className='font-semibold text-white'>Community-driven Actions</h4>
									<p className='text-green-200/70 text-xs mt-0.5'>Collaborate with neighbors and raise collective voices.</p>
								</div>
							</li>
						</ul>
					</div>

					{/* Footer info */}
					<div className='text-xs text-green-200/50 relative z-10'>
						© {new Date().getFullYear()} EcoVoice Global. All rights reserved.
					</div>
				</div>

				{/* Right Side: Form Column */}
				<div className='col-span-12 lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white relative'>
					
					{/* Success Overlay Animation */}
					{isSuccess && (
						<div className='absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8 animate-fade-in'>
							<div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 animate-bounce'>
								<CheckCircle className='w-12 h-12' />
							</div>
							<h3 className='text-2xl font-bold text-gray-900 mb-2'>
								{isSignUp ? 'Account Created!' : 'Welcome Back!'}
							</h3>
							<p className='text-gray-500 text-sm max-w-sm'>
								{isSignUp 
									? 'Your EcoVoice profile is ready. Preparing your environmental dashboard...' 
									: 'Successfully authenticated. Redirecting you to the homepage...'}
							</p>
							<div className='mt-6 w-24 h-1 bg-gray-100 rounded-full overflow-hidden'>
								<div className='h-full bg-green-600 rounded-full animate-loading-bar' />
							</div>
						</div>
					)}

					{/* Header inside Form card */}
					<div className='mb-8'>
						<h3 className='text-2xl font-bold text-gray-900'>
							{isSignUp ? 'Get started today' : 'Welcome back to EcoVoice'}
						</h3>
						<p className='text-gray-500 text-sm mt-1.5'>
							{isSignUp 
								? 'Create an account to track air/water quality and file reports.' 
								: 'Log in to access your reports and support your community.'}
						</p>
					</div>

					{/* Sign In / Sign Up Navigation Tabs */}
					<div className='flex border-b border-gray-100 mb-8 relative'>
						<button
							type='button'
							onClick={() => {
								setIsSignUp(false);
								setErrors({});
							}}
							className={`flex-1 pb-4 text-sm font-semibold transition-all duration-300 relative cursor-pointer ${
								!isSignUp ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'
							}`}
						>
							Sign In
							{!isSignUp && (
								<span className='absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full' />
							)}
						</button>
						<button
							type='button'
							onClick={() => {
								setIsSignUp(true);
								setErrors({});
							}}
							className={`flex-1 pb-4 text-sm font-semibold transition-all duration-300 relative cursor-pointer ${
								isSignUp ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'
							}`}
						>
							Create Account
							{isSignUp && (
								<span className='absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full' />
							)}
						</button>
					</div>

					{/* Form Element */}
					<form onSubmit={handleSubmit} className='space-y-5'>
						
						{/* Error Banner */}
						{errors.agreeTerms && (
							<div className='p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs flex items-center gap-2 animate-shake'>
								<AlertCircle className='w-4 h-4 shrink-0' />
								<span>{errors.agreeTerms}</span>
							</div>
						)}

						{/* Full Name input (Sign Up only) */}
						{isSignUp && (
							<div className='space-y-1.5'>
								<label className='text-xs font-semibold text-gray-700 block'>
									Full Name
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400'>
										<User size={18} />
									</div>
									<input
										type='text'
										value={name}
										onChange={(e) => setName(e.target.value)}
										className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
											errors.name ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'
										}`}
										placeholder='John Doe'
									/>
								</div>
								{errors.name && (
									<p className='text-xs text-red-600 flex items-center gap-1 mt-1'>
										<AlertCircle className='w-3.5 h-3.5' /> {errors.name}
									</p>
								)}
							</div>
						)}

						{/* Email input */}
						<div className='space-y-1.5'>
							<label className='text-xs font-semibold text-gray-700 block'>
								Email Address
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400'>
									<Mail size={18} />
								</div>
								<input
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
										errors.email ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'
									}`}
									placeholder='you@example.com'
								/>
							</div>
							{errors.email && (
								<p className='text-xs text-red-600 flex items-center gap-1 mt-1'>
									<AlertCircle className='w-3.5 h-3.5' /> {errors.email}
								</p>
							)}
						</div>

						{/* Password input */}
						<div className='space-y-1.5'>
							<div className='flex justify-between items-center'>
								<label className='text-xs font-semibold text-gray-700 block'>
									Password
								</label>
								{!isSignUp && (
									<a href='#forgot' className='text-xs font-semibold text-green-600 hover:text-green-700 transition-colors'>
										Forgot Password?
									</a>
								)}
							</div>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400'>
									<Lock size={18} />
								</div>
								<input
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className={`block w-full pl-10 pr-10 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
										errors.password ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'
									}`}
									placeholder='••••••••'
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer'
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
							{errors.password && (
								<p className='text-xs text-red-600 flex items-center gap-1 mt-1'>
									<AlertCircle className='w-3.5 h-3.5' /> {errors.password}
								</p>
							)}
						</div>

						{/* Confirm Password input (Sign Up only) */}
						{isSignUp && (
							<div className='space-y-1.5'>
								<label className='text-xs font-semibold text-gray-700 block'>
									Confirm Password
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400'>
										<Lock size={18} />
									</div>
									<input
										type={showPassword ? 'text' : 'password'}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className={`block w-full pl-10 pr-10 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
											errors.confirmPassword ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-200'
										}`}
										placeholder='••••••••'
									/>
								</div>
								{errors.confirmPassword && (
									<p className='text-xs text-red-600 flex items-center gap-1 mt-1'>
										<AlertCircle className='w-3.5 h-3.5' /> {errors.confirmPassword}
									</p>
								)}
							</div>
						)}

						{/* Remember Me / Agree Terms Options */}
						{!isSignUp ? (
							<div className='flex items-center justify-between py-1'>
								<label className='flex items-center gap-2 cursor-pointer group select-none'>
									<input
										type='checkbox'
										checked={rememberMe}
										onChange={(e) => setRememberMe(e.target.checked)}
										className='w-4.5 h-4.5 rounded text-green-600 border-gray-300 focus:ring-green-500/20 cursor-pointer accent-green-600'
									/>
									<span className='text-xs text-gray-600 group-hover:text-gray-800 transition-colors font-medium'>
										Keep me logged in
									</span>
								</label>
							</div>
						) : (
							<div className='py-1'>
								<label className='flex items-start gap-2.5 cursor-pointer group select-none'>
									<input
										type='checkbox'
										checked={agreeTerms}
										onChange={(e) => setAgreeTerms(e.target.checked)}
										className='w-4.5 h-4.5 rounded text-green-600 border-gray-300 focus:ring-green-500/20 cursor-pointer accent-green-600 mt-0.5'
									/>
									<span className='text-xs text-gray-600 group-hover:text-gray-800 transition-colors leading-normal font-medium'>
										I agree to the{' '}
										<a href='#terms' className='text-green-600 hover:text-green-700 underline font-semibold'>
											Terms of Service
										</a>{' '}
										and{' '}
										<a href='#privacy' className='text-green-600 hover:text-green-700 underline font-semibold'>
											Privacy Policy
										</a>
									</span>
								</label>
							</div>
						)}

						{/* Submit button */}
						<button
							type='submit'
							disabled={isLoading}
							className='w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3.5 font-semibold text-sm transition-all duration-300 flex justify-center items-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-green-600/35 focus:ring-4 focus:ring-green-500/20 outline-none disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer'
						>
							{isLoading ? (
								<>
									<Loader2 className='w-4 h-4 animate-spin' />
									<span>Processing...</span>
								</>
							) : (
								<>
									<span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
									<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
								</>
							)}
						</button>

					</form>

					{/* Divider */}
					<div className='relative flex py-5 items-center'>
						<div className='flex-grow border-t border-gray-100'></div>
						<span className='flex-shrink mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider'>Or continue with</span>
						<div className='flex-grow border-t border-gray-100'></div>
					</div>

					{/* Social Logins */}
					<div className='flex justify-center'>
						<button
							type='button'
							className='w-full flex justify-center items-center gap-2.5 px-4 py-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl transition-all duration-200 text-xs font-semibold cursor-pointer'
						>
							<FaGoogle className='w-4 h-4 text-red-500' />
							<span>Google</span>
						</button>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Login;
