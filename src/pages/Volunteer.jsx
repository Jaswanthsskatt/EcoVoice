import { useState } from 'react';
import { Calendar, MapPin, Users, Heart, Check, X, Sparkles, Loader2 } from 'lucide-react';

const OPPORTUNITIES = [
  {
    id: 1,
    title: 'Urban Canopy Afforestation',
    desc: 'Help plant native saplings and install protective guard meshes to restore urban canopy grids.',
    date: 'Saturday, July 25 • 8:00 AM',
    location: 'Central Valley Parklands',
    spotsLeft: 12,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
    tags: ['Afforestation', 'Physical']
  },
  {
    id: 2,
    title: 'Riverbed Cleanup Drive',
    desc: 'Remove plastics and waste dumps along the coastal basin, and support local water toxicity testing.',
    date: 'Sunday, July 26 • 7:00 AM',
    location: 'East Riverbed Wetland',
    spotsLeft: 8,
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=600',
    tags: ['Sanitation', 'Water Testing']
  },
  {
    id: 3,
    title: 'E-Waste Collection Campaign',
    desc: 'Help sort and inventory household electronic waste for certified recycling and refurbishment paths.',
    date: 'Wednesday, July 29 • 4:00 PM',
    location: 'Community Science Hall',
    spotsLeft: 15,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600',
    tags: ['Recycling', 'Inventory']
  },
  {
    id: 4,
    title: 'Air Quality Node Assembly',
    desc: 'Join our hardware team to assemble, wire, and calibrate localized PM2.5 air telemetry sensor nodes.',
    date: 'Thursday, July 30 • 2:00 PM',
    location: 'EcoVoice Hardware Lab',
    spotsLeft: 5,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    tags: ['Hardware', 'Calibration']
  }
];

function Volunteer() {
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredOppIds, setRegisteredOppIds] = useState([]);
  
  // Registration form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openRegistration = (opp) => {
    setSelectedOpp(opp);
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setRegisteredOppIds(prev => [...prev, selectedOpp.id]);
    }, 1500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOpp(null);
    setIsSuccess(false);
    setName('');
    setEmail('');
    setPhone('');
    setSkills('');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative font-sans">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-green-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Volunteer Header */}
        <section className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
            🙋 Join The Movement
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none">
            Volunteer Opportunities
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mt-1">
            Sign up for local conservation projects, cleanup drives, and community hardware assemblies.
          </p>
        </section>

        {/* Opportunities Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OPPORTUNITIES.map(opp => {
            const hasJoined = registeredOppIds.includes(opp.id);
            return (
              <div 
                key={opp.id} 
                className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs flex flex-col sm:flex-row transition-all duration-300 hover:shadow-lg hover:border-emerald-500/50"
              >
                {/* Opportunity Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-gray-100 shrink-0">
                  <img 
                    src={opp.image} 
                    alt={opp.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {opp.tags.map((tag, idx) => (
                      <span key={idx} className="text-[8px] font-extrabold bg-emerald-950/80 backdrop-blur-md text-white px-2 py-1 rounded-md tracking-wider uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Opportunity Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {opp.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {opp.desc}
                    </p>

                    <div className="space-y-1.5 pt-2 text-xs text-gray-500 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{opp.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{opp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{opp.spotsLeft - (hasJoined ? 1 : 0)} spots remaining</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end">
                    {hasJoined ? (
                      <span className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-250">
                        <Check className="w-4 h-4" /> Registered
                      </span>
                    ) : (
                      <button 
                        onClick={() => openRegistration(opp)}
                        className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white/20" /> Register Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

      </div>

      {/* Registration Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" 
          onClick={closeModal}
        >
          <div 
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative animate-scale-up" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-1 hover:bg-gray-150 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            {!isSuccess ? (
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 mb-2">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> Volunteer Application
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    Register for {selectedOpp?.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Fill out your contact details to secure your spot.
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 9876543210"
                      className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Special Skills or Notes (Optional)</label>
                    <textarea 
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="e.g. First aid certified, tree care experience..."
                      rows="3"
                      className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all duration-200 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-3.5 font-bold text-xs transition-colors cursor-pointer shadow-md shadow-emerald-700/10 flex justify-center items-center gap-1.5 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Registration...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Confirm Registration</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-10 space-y-4 animate-scale-up">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Registration Success!</h4>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed max-w-xs mx-auto">
                    You have successfully secured your volunteer spot for <strong>{selectedOpp?.title}</strong>. A confirmation email with parking, dress code, and supervisor details has been sent to <strong>{email}</strong>.
                  </p>
                </div>

                <button 
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                >
                  Return to Portal
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default Volunteer;
