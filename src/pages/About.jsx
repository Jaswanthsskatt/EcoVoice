import { useState } from 'react';
import { CheckCircle, Quote, Star, Building2, ArrowRight, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import globe from '../assets/globe.jpg';

const PARTNERS = [
	{ name: 'UN Environment', logo: '🇺🇳', role: 'Global NGO Partner' },
	{ name: 'World Wildlife Fund', logo: '🐼', role: 'Conservation Sponsor' },
	{ name: 'Greenpeace Alliance', logo: '🐋', role: 'Advocacy Network' },
	{ name: 'Earth Alliance', logo: '🌍', role: 'Climate Tech Venture' },
	{ name: 'Urban Canopy Project', logo: '🌳', role: 'Afforestation Lead' },
	{ name: 'CleanWater Foundation', logo: '💧', role: 'Hydrology Partner' }
];

const CASE_STUDIES = [
	{
		title: 'Metropolitan Air Sensor Network',
		client: 'Seattle Municipal Council',
		category: 'Municipalities',
		stats: '250+ Sensors Active',
		desc: 'Deployed real-time urban air pollution monitoring stations, reducing reporting latency for hazardous emissions by 40%.',
		impact: 'Direct alerts to 1.2M residents'
	},
	{
		title: 'CSR Forestation & Canopy Growth',
		client: 'EcoCorp Ventures',
		category: 'Corporate CSR',
		stats: '₹5 Lakhs CSR Funded',
		desc: 'Partnered to plant 10,000+ native saplings along dry river basins, creating a self-sustaining ecological zone.',
		impact: 'Neutralized 120 Tons CO2/yr'
	},
	{
		title: 'Illegal Dumping Tracker campaign',
		client: 'Green Earth Activists',
		category: 'NGO Action',
		stats: '85% Cleanup Rate',
		desc: 'Launched community tracking for waste dumps along coastal boundaries, prompting immediate municipal actions.',
		impact: '15 Tons waste cleared'
	}
];

const TESTIMONIALS = [
	{
		quote: "EcoVoice transformed how our city coordinates with residents. Reports of riverbed pollution are dispatched to cleaning crews 3x faster now.",
		author: "Mayor Robert Chen",
		role: "City Environmental Lead",
		stars: 5,
		avatar: "👨‍💼"
	},
	{
		quote: "Integrating our carbon offset reporting with EcoVoice API gives our stakeholders verifiable, real-time proof of our canopy restoration projects.",
		author: "Sarah Jenkins",
		role: "Sustainability Director, EcoCorp",
		stars: 5,
		avatar: "👩‍💼"
	},
	{
		quote: "The transparent data from the air quality grids enabled our researchers to file legal action against industrial emitters with solid evidence.",
		author: "Dr. Aris Vance",
		role: "Director, Earth NGO Alliance",
		stars: 5,
		avatar: "👨‍🔬"
	}
];

const ENGAGEMENT_TIERS = [
	{
		title: 'Municipalities',
		subtitle: 'Local Councils & City Planning',
		features: [
			'Dedicated SMS & email alerts',
			'Public map widgets for city portals',
			'Priority support for waste dispatch'
		],
		badge: 'Most Popular'
	},
	{
		title: 'Corporate CSR',
		subtitle: 'Carbon Offsets & Compliance',
		features: [
			'Verified afforestation reporting',
			'API access for corporate metrics',
			'Co-branded sensor nodes',
			'Tax exempt CSR invoices'
		],
		badge: 'Tax Benefit'
	},
	{
		title: 'NGO / Activists',
		subtitle: 'Advocacy & Community Power',
		features: [
			'Free bulk data exporting',
			'Custom petition widget embeds',
			'Volunteer dispatch channels',
			'Joint grant opportunities'
		],
		badge: 'Free Access'
	}
];

const About = () => {
	const [activeCaseIndex, setActiveCaseIndex] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	
	// Form state
	const [companyName, setCompanyName] = useState('');
	const [contactName, setContactName] = useState('');
	const [contactEmail, setContactEmail] = useState('');
	const [selectedTier, setSelectedTier] = useState('Municipalities');
	const [errors, setErrors] = useState({});

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const tempErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!companyName.trim()) tempErrors.companyName = 'Organization/Company name is required';
		if (!contactName.trim()) tempErrors.contactName = 'Contact name is required';
		if (!contactEmail.trim()) {
			tempErrors.contactEmail = 'Email is required';
		} else if (!emailRegex.test(contactEmail)) {
			tempErrors.contactEmail = 'Please enter a valid email address';
		}

		if (Object.keys(tempErrors).length > 0) {
			setErrors(tempErrors);
			return;
		}

		setErrors({});
		setIsSubmitting(true);

		// Simulate request submission
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
			
			// Clear fields
			setCompanyName('');
			setContactName('');
			setContactEmail('');
		}, 1500);
	};

	return (
		<div className="w-full min-h-screen bg-gray-50/50 py-12 px-4 sm:px-8 lg:px-12 relative overflow-hidden font-sans">
			
			{/* Decorative background glows */}
			<div className="absolute -top-40 -left-40 w-96 h-96 bg-green-200/20 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-emerald-200/10 rounded-full blur-3xl pointer-events-none" />

			{/* HERO SECTION */}
			<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center mb-20 relative z-10">
				<div className="space-y-6">
					<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200/50">
						<Sparkles className="w-3.5 h-3.5" /> EcoVoice Enterprise & NGO Portal
					</span>
					<h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
						Partnering for a <span className="text-green-700">Greener</span>, Measurable Future
					</h1>
					<p className="text-lg text-gray-600 leading-relaxed">
						EcoVoice provides the telemetry, mapping frameworks, and community coordination APIs that enable municipal bodies, NGOs, and corporate sponsors to deploy real climate assets and track environmental hazards transparently.
					</p>
					
					<div className="flex gap-4 flex-wrap">
						<a href="#partner-form" className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-green-700/20 text-sm flex items-center gap-2 cursor-pointer">
							Become a Partner <ArrowRight className="w-4 h-4" />
						</a>
						<a href="#case-studies" className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 text-sm flex items-center gap-1.5 cursor-pointer">
							Explore Case Studies
						</a>
					</div>
				</div>

				<div className="relative">
					<img
						src={globe}
						alt="Earth"
						className="w-full h-[450px] rounded-3xl object-cover shadow-2xl border border-white/50"
					/>
					<div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-150 flex items-center gap-4 animate-pulse">
						<div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 text-xl font-bold">
							🌱
						</div>
						<div>
							<h4 className="font-bold text-gray-900 text-sm">12+ Cities Partnered</h4>
							<p className="text-gray-500 text-xs mt-0.5">Real-time local hazard monitoring</p>
						</div>
					</div>
				</div>
			</div>

			{/* TRUSTED BY / CLIENT LOGO GRID */}
			<div className="max-w-7xl mx-auto border-y border-gray-200/80 py-10 mb-20 relative z-10">
				<p className="text-center text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
					Trusted by leading global environmental bodies and organizations
				</p>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
					{PARTNERS.map((p, idx) => (
						<div key={idx} className="bg-white border border-gray-200/60 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-shadow">
							<span className="text-3xl mb-1.5">{p.logo}</span>
							<h4 className="font-bold text-gray-800 text-xs tracking-tight">{p.name}</h4>
							<span className="text-[10px] text-gray-400 mt-0.5 font-medium">{p.role}</span>
						</div>
					))}
				</div>
			</div>

			{/* CASE STUDIES SECTION */}
			<div id="case-studies" className="max-w-7xl mx-auto mb-20 relative z-10 scroll-mt-24">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
					<div>
						<h2 className="text-3xl font-extrabold text-gray-900">Client Case Studies</h2>
						<p className="text-gray-600 text-sm mt-1">Discover how different sectors are utilizing EcoVoice reports to take direct action.</p>
					</div>
					<div className="flex gap-2 bg-gray-150/60 p-1.5 rounded-xl border border-gray-200 w-fit">
						{CASE_STUDIES.map((cs, idx) => (
							<button
								key={idx}
								onClick={() => setActiveCaseIndex(idx)}
								className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
									activeCaseIndex === idx 
										? 'bg-white shadow-sm text-green-700' 
										: 'text-gray-500 hover:text-gray-800'
								}`}
							>
								{cs.client.split(' ')[0]}
							</button>
						))}
					</div>
				</div>

				<div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-xl grid lg:grid-cols-12 gap-8 items-center">
					<div className="lg:col-span-7 space-y-6">
						<div className="space-y-2">
							<span className="inline-block text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
								{CASE_STUDIES[activeCaseIndex].category}
							</span>
							<h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
								{CASE_STUDIES[activeCaseIndex].title}
							</h3>
							<p className="text-xs font-semibold text-gray-500">
								Partner Organization: <span className="text-gray-800">{CASE_STUDIES[activeCaseIndex].client}</span>
							</p>
						</div>

						<p className="text-gray-600 leading-relaxed text-base">
							{CASE_STUDIES[activeCaseIndex].desc}
						</p>

						<div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
							<div>
								<span className="text-xs font-medium text-gray-400 uppercase tracking-wider block">Scope of work</span>
								<span className="font-extrabold text-gray-900 text-lg mt-0.5 block">{CASE_STUDIES[activeCaseIndex].stats}</span>
							</div>
							<div>
								<span className="text-xs font-medium text-gray-400 uppercase tracking-wider block">Measurable impact</span>
								<span className="font-extrabold text-green-700 text-lg mt-0.5 block">{CASE_STUDIES[activeCaseIndex].impact}</span>
							</div>
						</div>
					</div>

					<div className="lg:col-span-5 bg-gradient-to-br from-green-800 to-emerald-950 rounded-2xl p-8 text-white space-y-6 flex flex-col justify-between min-h-[300px]">
						<div>
							<Building2 className="w-10 h-10 text-green-400 mb-4" />
							<h4 className="font-bold text-xl leading-snug">Empowering Local Governance</h4>
							<p className="text-green-100/80 text-xs mt-2 leading-relaxed">
								By using our dashboard templates, organizations get a turnkey portal to monitor toxic dumps, tree degradation, and atmospheric metrics in real-time.
							</p>
						</div>
						<a href="#partner-form" className="text-xs font-bold text-green-300 hover:text-green-200 flex items-center gap-1.5 group cursor-pointer">
							Request a similar integration <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
						</a>
					</div>
				</div>
			</div>

			{/* ENGAGEMENT TIERS */}
			<div className="max-w-7xl mx-auto mb-20 relative z-10">
				<div className="text-center max-w-2xl mx-auto mb-12">
					<h2 className="text-3xl font-extrabold text-gray-950">Partnership Frameworks</h2>
					<p className="text-gray-500 text-sm mt-1.5">Choose the program that fits your organization's sustainability mandates.</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{ENGAGEMENT_TIERS.map((tier, idx) => (
						<div key={idx} className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden">
							{tier.badge && (
								<span className="absolute top-4 right-4 bg-green-50 text-green-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-150">
									{tier.badge}
								</span>
							)}
							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-extrabold text-gray-900">{tier.title}</h3>
									<p className="text-xs text-gray-500 mt-1 font-medium">{tier.subtitle}</p>
								</div>

								<ul className="space-y-3.5 text-xs text-gray-600">
									{tier.features.map((f, fIdx) => (
										<li key={fIdx} className="flex items-center gap-2">
											<CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
											<span>{f}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="pt-8">
								<a
									href="#partner-form"
									onClick={() => setSelectedTier(tier.title)}
									className="w-full bg-green-50 hover:bg-green-100 text-green-800 text-center font-bold py-3 rounded-xl block text-xs transition-colors cursor-pointer border border-green-100"
								>
									Inquire details
								</a>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* TESTIMONIALS */}
			<div className="max-w-7xl mx-auto mb-20 relative z-10 bg-green-50/20 border border-green-100/50 rounded-3xl p-8 sm:p-12">
				<div className="text-center max-w-2xl mx-auto mb-10">
					<h2 className="text-3xl font-extrabold text-gray-950">Feedback from the Field</h2>
					<p className="text-gray-500 text-sm mt-1">Read reviews from officers leading change using EcoVoice datasets.</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{TESTIMONIALS.map((t, idx) => (
						<div key={idx} className="bg-white rounded-2xl p-6 border border-gray-150 shadow-xs flex flex-col justify-between relative">
							<span className="absolute -top-3 left-6 text-green-600/10"><Quote className="w-10 h-10 fill-green-600/10" /></span>
							<div className="space-y-4 relative z-10">
								<div className="flex gap-0.5">
									{[...Array(t.stars)].map((_, sIdx) => (
										<Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
									))}
								</div>
								<p className="text-gray-600 italic text-xs leading-relaxed">
									"{t.quote}"
								</p>
							</div>
							<div className="flex items-center gap-3 pt-6 border-t border-gray-100 mt-6">
								<span className="text-3xl">{t.avatar}</span>
								<div>
									<h4 className="font-bold text-gray-900 text-xs">{t.author}</h4>
									<p className="text-[10px] text-gray-400 font-semibold">{t.role}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* PARTNERSHIP FORM INQUIRY (CTA) */}
			<div id="partner-form" className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200/80 p-8 sm:p-12 relative z-10 scroll-mt-24">
				
				{/* Success state */}
				{isSubmitted && (
					<div className="text-center py-6 animate-scale-up">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 animate-bounce">
							<CheckCircle className="w-9 h-9" />
						</div>
						<h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
						<p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
							Our partnership coordination desk will reach out to you within 24 hours with custom integration details for the <strong>{selectedTier}</strong> program.
						</p>
						<button
							onClick={() => setIsSubmitted(false)}
							className="mt-6 text-green-700 hover:text-green-800 font-bold text-xs underline cursor-pointer"
						>
							Submit another request
						</button>
					</div>
				)}

				{!isSubmitted && (
					<div className="space-y-6">
						<div className="text-center max-w-md mx-auto">
							<Building2 className="w-10 h-10 text-green-700 mx-auto mb-3" />
							<h3 className="text-2xl font-extrabold text-gray-950">Organization Partnership</h3>
							<p className="text-gray-500 text-xs mt-1.5">
								Complete the form to request dashboard credentials, API tokens, or to fund local tree-planting CSR drives.
							</p>
						</div>

						<form onSubmit={handleFormSubmit} className="space-y-5">
							
							{/* Form select tier */}
							<div className="space-y-1.5">
								<label className="text-xs font-semibold text-gray-700 block">Select Partnership Plan</label>
								<select
									value={selectedTier}
									onChange={(e) => setSelectedTier(e.target.value)}
									className="block w-full border border-gray-250 rounded-xl p-3 bg-gray-50/50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-colors"
								>
									<option value="Municipalities">Municipalities (City Councils)</option>
									<option value="Corporate CSR">Corporate CSR & Carbon Offsets</option>
									<option value="NGO / Activists">NGO Partner Program</option>
								</select>
							</div>

							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-1.5">
									<label className="text-xs font-semibold text-gray-700 block">Organization Name</label>
									<input
										type="text"
										value={companyName}
										onChange={(e) => setCompanyName(e.target.value)}
										className={`block w-full px-3.5 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
											errors.companyName ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-250'
										}`}
										placeholder="e.g. WWF India / Seattle Council"
									/>
									{errors.companyName && (
										<p className="text-[10px] text-red-600 flex items-center gap-1 mt-1">
											<AlertCircle className="w-3.5 h-3.5" /> {errors.companyName}
										</p>
									)}
								</div>

								<div className="space-y-1.5">
									<label className="text-xs font-semibold text-gray-700 block">Contact Name</label>
									<input
										type="text"
										value={contactName}
										onChange={(e) => setContactName(e.target.value)}
										className={`block w-full px-3.5 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
											errors.contactName ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-250'
										}`}
										placeholder="e.g. John Doe"
									/>
									{errors.contactName && (
										<p className="text-[10px] text-red-600 flex items-center gap-1 mt-1">
											<AlertCircle className="w-3.5 h-3.5" /> {errors.contactName}
										</p>
									)}
								</div>
							</div>

							<div className="space-y-1.5">
								<label className="text-xs font-semibold text-gray-700 block">Work Email Address</label>
								<input
									type="email"
									value={contactEmail}
									onChange={(e) => setContactEmail(e.target.value)}
									className={`block w-full px-3.5 py-3 border rounded-xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all duration-200 text-sm ${
										errors.contactEmail ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-gray-250'
									}`}
									placeholder="e.g. contact@org.org"
								/>
								{errors.contactEmail && (
									<p className="text-[10px] text-red-600 flex items-center gap-1 mt-1">
										<AlertCircle className="w-3.5 h-3.5" /> {errors.contactEmail}
									</p>
								)}
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-green-700 hover:bg-green-800 text-white rounded-xl py-3.5 font-semibold text-xs transition-all duration-300 flex justify-center items-center gap-2 shadow-lg shadow-green-700/20 hover:shadow-green-700/35 focus:ring-4 focus:ring-green-500/20 outline-none disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
							>
								{isSubmitting ? (
									<>
										<Loader2 className="w-4 h-4 animate-spin" />
										<span>Sending Request...</span>
									</>
								) : (
									<>
										<span>Submit Partnership Request</span>
										<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</>
								)}
							</button>

						</form>
					</div>
				)}

			</div>

		</div>
	);
};

export default About;