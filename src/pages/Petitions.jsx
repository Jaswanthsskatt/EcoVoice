import { useState } from 'react';
import { PenTool, CheckCircle, Clock, Users, X, Sparkles, Loader2 } from 'lucide-react';

const INITIAL_PETITIONS = [
  {
    id: 1,
    title: 'Ban Single-Use Plastic Bags in City Markets',
    desc: 'Requesting the local municipal council to enforce a strict ban on single-use plastic carrier bags in all commercial retail hubs and subsidize reusable cloth alternates.',
    currentSignatures: 3412,
    targetSignatures: 5000,
    creator: 'GreenEarth Coalition',
    daysLeft: 14,
    category: 'Waste Management',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    title: 'Protect Adyar Wetlands from Urban Encroachment',
    desc: 'Demand that the state environmental forestry board declares the coastal river basin wetlands as an ecologically protected sanctuary, halting zone mapping for commercial construction.',
    currentSignatures: 7859,
    targetSignatures: 10000,
    creator: 'Adyar Conservation Society',
    daysLeft: 22,
    category: 'Conservation',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    title: 'Mandate Solar Panels on Corporate Roofs',
    desc: 'Petitioning the regional grid utilities board to fast-track residential solar net-metering approvals and mandate rooftop solar configurations on commercial buildings.',
    currentSignatures: 1104,
    targetSignatures: 2500,
    creator: 'SolarFuture Consortium',
    daysLeft: 8,
    category: 'Renewable Energy',
    image: 'https://images.unsplash.com/photo-1617634795446-b5ef87342fb2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 4,
    title: 'Upgrade Public Air Quality Sensors',
    desc: 'Petitioning the city health commission to triple the deployment of PM2.5 air telemetry nodes and institute high-pollution alerts across major residential school grids.',
    currentSignatures: 4185,
    targetSignatures: 5000,
    creator: 'EcoVoice Tech Volunteers',
    daysLeft: 5,
    category: 'Ecology',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=600'
  }
];

function Petitions() {
  const [petitions, setPetitions] = useState(INITIAL_PETITIONS);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [signedPetIds, setSignedPetIds] = useState([]);
  
  // Sign form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Start new petition state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newCreator, setNewCreator] = useState('');
  const [newCategory, setNewCategory] = useState('Conservation');
  const [isCreating, setIsCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const openSignModal = (pet) => {
    setSelectedPet(pet);
    setIsSignModalOpen(true);
    setIsSuccess(false);
  };

  const handleSignSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Increment signatures in state
      setPetitions(prev => prev.map(p => 
        p.id === selectedPet.id ? { ...p, currentSignatures: p.currentSignatures + 1 } : p
      ));
      setSignedPetIds(prev => [...prev, selectedPet.id]);
    }, 1500);
  };

  const handleCreatePetition = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim() || !newTarget || !newCreator.trim()) return;

    setIsCreating(true);
    setTimeout(() => {
      const newPetition = {
        id: petitions.length + 1,
        title: newTitle,
        desc: newDesc,
        currentSignatures: 1, // creator signs first
        targetSignatures: parseInt(newTarget) || 1000,
        creator: newCreator,
        daysLeft: 30,
        category: newCategory,
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600'
      };

      setPetitions(prev => [newPetition, ...prev]);
      setSignedPetIds(prev => [...prev, newPetition.id]);
      setIsCreating(false);
      setCreateSuccess(true);

      // Reset fields
      setNewTitle('');
      setNewDesc('');
      setNewTarget('');
      setNewCreator('');
      
      setTimeout(() => setCreateSuccess(false), 3000);
    }, 1500);
  };

  const closeSignModal = () => {
    setIsSignModalOpen(false);
    setSelectedPet(null);
    setIsSuccess(false);
    setName('');
    setEmail('');
    setReason('');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative font-sans">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-20 right-20 w-80 h-80 bg-green-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Petitions Header */}
        <section className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
            ✍️ Citizens Advocacy
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none">
            Advocacy & Petitions
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mt-1">
            Sign active community petitions or launch your own advocacy campaign to petition local municipal councils.
          </p>
        </section>

        {/* Petitions Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {petitions.map(pet => {
            const progress = Math.min((pet.currentSignatures / pet.targetSignatures) * 100, 100);
            const hasSigned = signedPetIds.includes(pet.id);
            return (
              <div 
                key={pet.id}
                className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs flex flex-col sm:flex-row transition-all duration-300 hover:shadow-lg hover:border-emerald-500/50"
              >
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-gray-100 shrink-0">
                  <img 
                    src={pet.image} 
                    alt={pet.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                  />
                  <span className="absolute top-3 left-3 text-[8px] font-extrabold bg-emerald-950/80 backdrop-blur-md text-white px-2 py-1 rounded-md tracking-wider uppercase">
                    {pet.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-bold block">
                        By {pet.creator}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {pet.daysLeft} days left
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {pet.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {pet.desc}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-emerald-700">{pet.currentSignatures.toLocaleString()} signed</span>
                        <span className="text-gray-400">target: {pet.targetSignatures.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-150 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end">
                    {hasSigned ? (
                      <span className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-250">
                        <CheckCircle className="w-4 h-4" /> Signed & Supported
                      </span>
                    ) : (
                      <button 
                        onClick={() => openSignModal(pet)}
                        className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <PenTool className="w-3.5 h-3.5" /> Sign Petition
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Start a new Petition Form */}
        <section className="max-w-2xl mx-auto bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
          <div className="text-center mb-8 space-y-2">
            <PenTool className="w-8 h-8 text-emerald-700 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-905">Launch a Community Petition</h3>
            <p className="text-gray-500 text-xs leading-relaxed max-w-md mx-auto">
              Notice an environmental hazard, logging drive, or lack of local waste management? Start an advocacy campaign to build citizen consensus.
            </p>
          </div>

          {createSuccess && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-150 rounded-xl text-emerald-800 text-xs font-bold mb-5 animate-scale-up">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Your petition has been successfully created and added to the grid!</span>
            </div>
          )}

          <form onSubmit={handleCreatePetition} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Petition Title</label>
                <input 
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Clean up Adyar River Bed"
                  className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all duration-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="block w-full bg-gray-50 border border-gray-205 rounded-xl px-3.5 py-3 text-xs text-gray-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all duration-200"
                >
                  <option value="Conservation">Conservation</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                  <option value="Waste Management">Waste Management</option>
                  <option value="Ecology">Ecology</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Campaign Description & Demand</label>
              <textarea 
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Detail what is wrong, what the municipal bodies should do, and how citizens will be affected..."
                rows="4"
                className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all duration-200 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Target Signatures</label>
                <input 
                  type="number"
                  required
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="e.g. 5000"
                  className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all duration-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Your Name / Organization</label>
                <input 
                  type="text"
                  required
                  value={newCreator}
                  onChange={(e) => setNewCreator(e.target.value)}
                  placeholder="e.g. Riverbed Protectors"
                  className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all duration-200"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isCreating}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-3.5 font-bold text-xs transition-colors cursor-pointer disabled:opacity-75"
            >
              {isCreating ? 'Creating Campaign...' : 'Launch Petition Campaign'}
            </button>
          </form>
        </section>

      </div>

      {/* Signature Modal */}
      {isSignModalOpen && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" 
          onClick={closeSignModal}
        >
          <div 
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative animate-scale-up" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeSignModal}
              className="absolute top-4 right-4 p-1 hover:bg-gray-150 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 mb-2">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> Advocacy Signature
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    Sign: {selectedPet?.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Your name will be added to the signature list presented to municipal officers.
                  </p>
                </div>

                <form onSubmit={handleSignSubmit} className="space-y-4">
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
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Reason for Signing (Optional)</label>
                    <textarea 
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="I support this because..."
                      rows="3"
                      className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all duration-200 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-3.5 font-bold text-xs transition-colors cursor-pointer flex justify-center items-center gap-1.5 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Signature...</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4" />
                        <span>Support Petition</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-10 space-y-4 animate-scale-up">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 font-sans">Thank You for Supporting!</h4>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed max-w-xs mx-auto">
                    Your signature has been added to <strong>{selectedPet?.title}</strong>. A verification summary receipt has been sent to <strong>{email}</strong>.
                  </p>
                </div>

                <button 
                  onClick={closeSignModal}
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

export default Petitions;
