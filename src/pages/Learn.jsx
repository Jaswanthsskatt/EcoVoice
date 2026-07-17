import { useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpeg';
import img4 from '../assets/4.jpeg';
import img5 from '../assets/5.jpeg';
import img6 from '../assets/6.jpeg';

function Learn({ onArticleClick }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: 'Understanding Climate Change',
      desc: 'Learn the causes, effects, and global solutions for our rising temperatures.',
      category: 'Climate Change',
      image: img1,
      readTime: '6 min read',
      content: 'Climate change represents one of the defining challenges of our era. The primary driver is the greenhouse effect, where gases like carbon dioxide (CO2), methane (CH4), and nitrous oxide (N2O) trap heat in the earth\'s atmosphere, preventing it from escaping into space.\n\nIndustrial activities, deforestation, and the burning of fossil fuels have exponentially increased greenhouse gas concentrations. The consequences include rising sea levels, melting glaciers, severe droughts, and intense heatwaves. Mitigation requires global coordination: moving to renewable energy grids, re-foresting regional valleys, and transitioning to circular carbon economies.',
      tips: ['Support wind and solar utility integrations.', 'Reduce home electricity wastage by switching to LED bulbs.', 'Participate in local tree plantation drives.', 'Advocate for clean transit systems in your municipality.']
    },
    {
      id: 2,
      title: 'Recycling 101',
      desc: 'A complete guide to recycling at home, understanding symbols, and avoiding mistakes.',
      category: 'Sustainable Living',
      image: img2,
      readTime: '4 min read',
      content: 'Recycling prevents valuable resources from turning into toxic landfill waste. However, incorrect recycling (often called "wishcycling") can contaminate entire batches of clean materials, forcing sorting facilities to dump them.\n\nUnderstanding plastic codes (such as PET 1, HDPE 2) and separating wet waste from dry paper/cardboard are the basic tenets of domestic waste management. Always rinse food containers before tossing them in the recycling bin, as grease and organic matter ruin the recycling process for paper and plastics.',
      tips: ['Separate organic wet waste from recyclable dry waste.', 'Rinse containers to eliminate food grease contamination.', 'Check local code charts for plastic categorization.', 'Avoid recycling plastic bags in standard curbside bins.']
    },
    {
      id: 3,
      title: 'Renewable Energy',
      desc: 'Sources of clean energy (solar, wind, hydro) and how they power a better future.',
      category: 'Renewable Energy',
      image: img3,
      readTime: '5 min read',
      content: 'Transitioning from coal and gas to clean, renewable sources is key to carbon reduction. Solar power harvests photons using photovoltaic cells, wind energy turns massive turbine blades to spin generators, and hydroelectric stations capture the energy of moving water.\n\nAs battery storage technologies improve, grid stability issues are being resolved. Decentralized community grids allow neighborhoods to produce and share their own clean electricity, reducing transmission losses and empowering citizens.',
      tips: ['Install solar panels on residential roofs if feasible.', 'Choose renewable energy tariffs from utility providers.', 'Optimize electricity usage during peak solar generation hours.', 'Support community-led clean energy cooperative projects.']
    },
    {
      id: 4,
      title: 'Wildlife Conservation',
      desc: 'Protecting our wildlife, endangered species, and maintaining rich global biodiversity.',
      category: 'Conservation',
      image: img4,
      readTime: '7 min read',
      content: 'Biodiversity maintains vital ecological balances. When a single keystone species goes extinct, it triggers a chain reaction that can collapse local food webs, damage soil fertility, and disrupt water purification cycles.\n\nHabitat fragmentation due to urban sprawl and agricultural encroachment is the largest threat to wildlife. Creating wildlife corridors, establishing protected forest reserves, and eliminating illegal poaching are critical to conservation efforts.',
      tips: ['Avoid purchasing products made from endangered wildlife.', 'Plant native shrubs in gardens to support local birds and bees.', 'Support regional wildlife sanctuaries and conservation NGOs.', 'Report local wildlife distress incidents using hotlines.']
    },
    {
      id: 5,
      title: 'Sustainable Living',
      desc: 'Simple steps and daily swaps to transition toward a low-waste and sustainable lifestyle.',
      category: 'Sustainable Living',
      image: img5,
      readTime: '5 min read',
      content: 'Adopting sustainable habits doesn\'t require radical change overnight; it is built on simple daily choices. Swapping single-use plastics for durable alternatives, reducing meat consumption, and choosing organic local produce are powerful first steps.\n\nBy practicing the five R\'s—Refuse, Reduce, Reuse, Repurpose, and Recycle—we minimize our landfill contributions and encourage manufacturers to adopt sustainable packaging standards.',
      tips: ['Carry reusable cloth bags and steel water bottles.', 'Opt for compostable or minimal product packaging.', 'Repurpose glass jars and plastic containers for storage.', 'Compost organic kitchen scraps to enrich local soil.']
    },
    {
      id: 6,
      title: 'Water Conservation',
      desc: 'Save water, save the future. Methods to reduce domestic water waste effectively.',
      category: 'Conservation',
      image: img6,
      readTime: '3 min read',
      content: 'Fresh water is a finite resource. Over-extraction of groundwater aquifers has led to severe water scarcity in major urban centers globally, lowering water tables and threatening agriculture.\n\nDomestic water conservation is highly effective. Fixing leaky faucets, setting up rainwater harvesting barrels, and using greywater (from washing machines) for gardening significantly reduces municipal water demand.',
      tips: ['Fix leaking faucets and pipe connections immediately.', 'Install aerators on taps to restrict water flow volume.', 'Set up rainwater collection systems for garden irrigation.', 'Use bucket systems instead of hose pipes for vehicle washing.']
    }
  ];

  const categories = ['All', 'Climate Change', 'Sustainable Living', 'Renewable Energy', 'Conservation'];

  const filteredArticles = articles.filter(art => {
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openArticle = (article) => {
    setSelectedArticle(article);
    if (onArticleClick) {
      onArticleClick(article);
    }
  };

  const closeArticle = () => setSelectedArticle(null);

  return (
    <div className="max-w-300 mx-auto px-4 py-8">
      {/* Learn Header */}
      <section className="text-center mb-10 flex flex-col items-center gap-2 max-w-300 mx-auto pt-14 px-4 pb-4">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black mb-2 leading-[1.05]">Learn for a Sustainable Future</h2>
        <p className="text-black/75 text-lg mb-4">Explore topics and resources to understand our environment better.</p>
        <Link 
          to="/knowledge" 
          className="px-6 py-2.5 rounded-full font-semibold text-sm bg-[#2d6a4f] hover:bg-[#1b4332] text-white transition-all duration-300 shadow-md shadow-green-900/10 cursor-pointer"
        >
          Explore Knowledge Base &rarr;
        </Link>
        
        {/* Search */}
        <div className="mt-6 border border-slate-200 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-400/20 rounded-lg px-5 py-2.5 w-full max-w-112.5 bg-white shadow-sm flex items-center gap-3 transition-all duration-300">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-base text-slate-800 placeholder:text-slate-400 py-0.5"
          />
        </div>
      </section>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full font-medium text-sm border cursor-pointer transition-all duration-200 ${
              activeCategory === cat 
                ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-[#2d6a4f] hover:text-white hover:border-[#2d6a4f]'
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(art => (
            <article 
              key={art.id} 
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-400 cursor-pointer" 
              onClick={() => openArticle(art)}
            >
              <div className="relative h-55 overflow-hidden">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold bg-[#1b4332] text-white shadow-sm">{art.category}</span>
              </div>
              <div className="p-6 flex flex-col grow">
                <span className="text-xs text-slate-400 mb-2 font-medium">{art.readTime}</span>
                <h3 className="text-lg font-bold mb-3 text-slate-900 leading-snug group-hover:text-[#2d6a4f] transition-colors">{art.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 grow">{art.desc}</p>
                <button 
                  className="font-semibold text-sm text-[#2d6a4f] text-left border-none bg-transparent cursor-pointer transition-colors duration-200 group-hover:text-green-500 flex items-center gap-1"
                  onClick={(e) => { e.stopPropagation(); openArticle(art); }}
                >
                  Read Article &rarr;
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-16 text-slate-400 col-span-full font-medium">
            <p>No articles found matching your search.</p>
          </div>
        )}
      </section>

      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-[#0f172a]/78 backdrop-blur-sm flex justify-center items-center p-4 md:p-8" onClick={closeArticle}>
          <div className="w-full max-w-240 max-h-[90vh] md:max-h-225 overflow-y-auto bg-white rounded-3xl shadow-[0_30px_80px_rgba(15,23,42,0.35)] relative flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute right-4 top-4 w-10 h-10 border-none rounded-full bg-[#0f172a]/8 text-[#0f172a] text-2xl flex items-center justify-center cursor-pointer hover:bg-[#0f172a]/15 transition-colors z-10" 
              onClick={closeArticle} 
              aria-label="Close article"
            >
              ×
            </button>
            <div className="relative max-h-80 overflow-hidden rounded-t-3xl shrink-0">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-auto block object-cover" />
              <span className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold bg-[#1b4332] text-white shadow-sm">{selectedArticle.category}</span>
            </div>
            <div className="p-8">
              <p className="text-xs text-slate-400 mb-2 font-medium">{selectedArticle.readTime}</p>
              <h2 className="text-3xl font-extrabold mb-4 text-[#0f172a] leading-tight">{selectedArticle.title}</h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-base">{selectedArticle.content}</p>
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-lg font-bold mb-3 text-[#0f172a]">Tips</h3>
                <ul className="list-disc list-inside text-slate-600 m-0 p-0 space-y-2">
                  {selectedArticle.tips.map((tip, index) => (
                    <li key={index} className="text-sm">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Learn;