import { useState } from 'react';
import { Search, BookOpen, Clock, Heart, ArrowLeft, X, CheckCircle, Sparkles } from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    title: 'Understanding Biodiversity Loss',
    desc: 'Why rapid species extinction collapses food webs and ruins soil fertility.',
    category: 'Ecology',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=600',
    content: 'Biodiversity represents the biological variety and variability of life on Earth. From micro-bacteria in topsoils to vast canopy layers in rainforests, every organism plays a crucial role in maintaining ecological equilibrium. Healthy biodiversity ensures clean water filtration, crop pollination, and weather buffering.\n\nDriven by urban sprawl and chemical runoffs, modern extinction rates are 100 to 1,000 times higher than geological baselines. The collapse of keystone species triggers cascading disruptions across agricultural outputs and water safety.',
    facts: [
      'Over 75% of global food crops rely on animal pollination.',
      'Wetlands capture and filter fresh water at 1/10th the cost of industrial filtration plants.',
      'A single ecosystem collapse can disrupt regional climate grids for decades.'
    ],
    tips: [
      'Plant native shrubs to support local bee populations.',
      'Reduce the use of chemical pesticides in household gardens.',
      'Support conservation reserves and ecological corridors.'
    ]
  },
  {
    id: 2,
    title: 'The Circular Economy & Zero Waste',
    desc: 'How the 5 Rs cut landfill output and reshape resource consumption cycles.',
    category: 'Conservation Guides',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600',
    content: 'A circular economy is an economic model that targets zero waste and greenhouse gas reductions. Rather than the traditional "take-make-waste" linear system, circularity keeps products, materials, and resources in use for as long as possible.\n\nTransitioning to zero waste begins by practicing the five Rs in strict order: Refuse items you do not need, Reduce necessary purchases, Reuse items instead of discarding them, Rot (compost) organic kitchen scraps, and Recycle only what cannot be saved.',
    facts: [
      'An average person generates over 1.5 kilograms of trash daily.',
      'Organic kitchen waste trapped in landfills creates methane, which is 28x more potent than CO2.',
      '91% of plastics produced globally are never recycled and end up in ocean trenches.'
    ],
    tips: [
      'Refuse single-use plastic cups, straws, and carrier bags.',
      'Use a home compost container for fruit and vegetable peels.',
      'Choose items packaged in glass or cardboard instead of plastic.'
    ]
  },
  {
    id: 3,
    title: 'Demystifying Carbon Footprints',
    desc: 'How transport, power grids, and diets impact greenhouse gas concentrations.',
    category: 'Carbon Footprint',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=600',
    content: 'A carbon footprint is the total amount of greenhouse gases—principally carbon dioxide and methane—emitted directly or indirectly by our human and industrial actions. From commuting to charging devices, every energy draw has an ecological consequence.\n\nThe global energy mix remains fossil-fuel intensive. Shifting personal footprints involves optimizing home insulation, utilizing municipal public transit, choosing solar-friendly utility tariffs, and adopting plant-heavy dietary regimes.',
    facts: [
      'Transportation accounts for nearly 29% of greenhouse gas emissions worldwide.',
      'Adopting a plant-based diet reduces individual footprint metrics by up to 50%.',
      'One mature tree absorbs around 22 kilograms of carbon dioxide annually.'
    ],
    tips: [
      'Carpool, bike, or use electric public transit for short commutes.',
      'Unplug electrical chargers and turn off appliances when not in use.',
      'Choose local, seasonal ingredients to reduce transportation offsets.'
    ]
  },
  {
    id: 4,
    title: 'Regenerative Agriculture Practices',
    desc: 'Using cover crops, crop rotation, and zero-tillage to store carbon in soil.',
    category: 'Sustainable Agriculture',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=600',
    content: 'Regenerative agriculture focuses on rehabilitating topsoils, boosting biodiversity, and securing regional water cycles. By focusing on soil health, this farming methodology traps atmospheric carbon dioxide deep underground naturally.\n\nTraditional mechanical tilling shears soil microbiomes and releases stored carbon into the air. Regenerative farms keep living roots in the ground year-round using cover cropping and crop rotation. This locks nutrients in place, preventing soil degradation and reducing the need for chemical fertilizers.',
    facts: [
      'Soil holds three times more carbon than the Earth\'s atmosphere.',
      'Regenerative soils absorb rainfall 10x faster, reducing agricultural flooding risks.',
      'Rotating crops breaks pest breeding cycles naturally without toxic chemical sprays.'
    ],
    tips: [
      'Buy produce from certified local regenerative farms.',
      'Avoid planting monoculture lawns; grow clover or diverse ground cover instead.',
      'Support community afforestation projects that enrich topsoil.'
    ]
  }
];

function Knowledge() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [likes, setLikes] = useState({});

  // Topic suggestion state
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = ['All', 'Ecology', 'Carbon Footprint', 'Sustainable Agriculture', 'Conservation Guides'];

  const filteredArticles = ARTICLES.filter(art => {
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSuggestion('');
      
      // Auto-clear success message
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative font-sans">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-green-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Knowledge Header */}
        <section className="text-center mb-12 max-w-3xl mx-auto flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
            📚 EcoVoice Knowledge Base
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none">
            Environmental Resource Hub
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mt-1">
            Deep dive into environmental science, sustainability frameworks, and action guides.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex gap-4 w-full justify-center max-w-md">
            <div className="relative flex-1 bg-white border border-gray-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-3 transition-all duration-300">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search articles and topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-sm text-gray-800 placeholder:text-gray-400 py-0.5"
              />
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-semibold text-xs border cursor-pointer transition-all duration-200 ${
                activeCategory === cat 
                  ? 'bg-emerald-700 text-white border-transparent shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(art => (
              <div 
                key={art.id} 
                onClick={() => setSelectedArticle(art)}
                className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/50 cursor-pointer"
              >
                <div className="relative w-full md:w-48 h-48 md:h-full overflow-hidden bg-gray-100 shrink-0">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                  />
                  <span className="absolute top-4 left-4 text-[9px] px-2.5 py-1 rounded-full font-bold bg-emerald-800 text-white shadow-sm tracking-wide uppercase">
                    {art.category}
                  </span>
                </div>
                
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {art.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <button 
                      className="font-bold text-xs text-emerald-700 group-hover:text-emerald-600 flex items-center gap-1 bg-transparent border-none cursor-pointer"
                    >
                      Read Guide &rarr;
                    </button>
                    
                    <button 
                      onClick={(e) => toggleLike(art.id, e)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${likes[art.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-400 col-span-full font-medium">
              <p>No articles found matching your search.</p>
            </div>
          )}
        </section>

        {/* Suggest a Topic Section */}
        <section className="max-w-xl mx-auto bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
          <div className="text-center mb-6 space-y-2">
            <BookOpen className="w-8 h-8 text-emerald-700 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900">Want to learn about something else?</h3>
            <p className="text-gray-500 text-xs leading-relaxed max-w-sm mx-auto">
              Suggest an environmental topic, conservation project, or sustainability question for our writers to investigate.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-4 space-y-2 animate-scale-up">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
              <span className="text-xs font-bold text-emerald-800 block">Suggestion Received!</span>
              <p className="text-gray-400 text-[10px]">We will notify our editing board for future article scheduling.</p>
            </div>
          ) : (
            <form onSubmit={handleSuggestionSubmit} className="space-y-4">
              <input
                type="text"
                required
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="e.g. How does ocean acidification impact local coastlines?"
                className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
              </button>
            </form>
          )}
        </section>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-8 animate-fade-in" 
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto flex flex-col animate-scale-up" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Banner */}
            <div className="relative h-60 shrink-0 bg-gray-150">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover" 
              />
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-4 left-4 text-[10px] px-3 py-1.5 rounded-full font-bold bg-emerald-800 text-white shadow-sm tracking-wide uppercase">
                {selectedArticle.category}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>

              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>

              {/* Fast Facts */}
              <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> Key Ecological Facts
                </h4>
                <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                  {selectedArticle.facts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actionable Advice */}
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-700" /> Actionable Sustainability Advice
                </h4>
                <ul className="space-y-2 text-xs text-gray-700 font-medium">
                  {selectedArticle.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer back button */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-600 flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Knowledge Base
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Knowledge;
