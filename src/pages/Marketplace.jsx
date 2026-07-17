import { useState } from 'react';
import { Search, ShoppingCart, Star, Check, ShieldCheck, X, Heart } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    title: 'Reusable Bamboo Water Bottle',
    desc: 'Vacuum-insulated organic bamboo bottle that keeps beverages cold for 24h and hot for 12h.',
    price: 799,
    category: 'Home & Kitchen',
    rating: 4.8,
    reviews: 142,
    badge: 'Zero Waste',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
    impact: 'Replaces ~300 single-use plastic bottles/year'
  },
  {
    id: 2,
    title: 'Solar-Powered Power Bank',
    desc: '20,000mAh external charger with integrated high-efficiency solar panels for clean outdoor charging.',
    price: 1899,
    category: 'Tech',
    rating: 4.6,
    reviews: 95,
    badge: 'Carbon Neutral',
    image: 'https://images.unsplash.com/photo-1617634795446-b5ef87342fb2?auto=format&fit=crop&q=80&w=600',
    impact: 'Utilizes 100% clean solar energy'
  },
  {
    id: 3,
    title: 'Organic Cotton Mesh Tote Bags',
    desc: 'Set of 5 lightweight, durable, and expandable mesh bags perfect for grocery shopping.',
    price: 349,
    category: 'Bags & Accessories',
    rating: 4.9,
    reviews: 218,
    badge: '100% Organic',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    impact: 'Replaces plastic grocery bags'
  },
  {
    id: 4,
    title: 'Bokashi Kitchen Compost Bin',
    desc: 'Odorless indoor composting system that ferments organic kitchen scraps into nutrient-rich soil fertilizer.',
    price: 1499,
    category: 'Home & Kitchen',
    rating: 4.7,
    reviews: 64,
    badge: 'Circular Economy',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600',
    impact: 'Diverts kitchen waste from landfills'
  },
  {
    id: 5,
    title: 'Zero-Waste Personal Care Kit',
    desc: 'Includes 4 bamboo toothbrushes, biodegradable silk floss, and 3 organic shampoo bar discs.',
    price: 599,
    category: 'Personal Care',
    rating: 4.8,
    reviews: 120,
    badge: 'Plastic Free',
    image: 'https://images.unsplash.com/photo-1607006342411-91f11f05781a?auto=format&fit=crop&q=80&w=600',
    impact: 'Prevents plastic packaging waste'
  },
  {
    id: 6,
    title: 'Natural Coconut Fiber Scrubbers',
    desc: 'Pack of 6 eco-friendly, scratch-free biodegradable scrub pads made from natural coconut coir.',
    price: 249,
    category: 'Home & Kitchen',
    rating: 4.5,
    reviews: 87,
    badge: '100% Biodegradable',
    image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&q=80&w=600',
    impact: 'Decomposes naturally in compost piles'
  }
];

function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0 = Idle, 1 = Processing, 2 = Success
  
  // Checkout fields
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const categories = ['All', 'Home & Kitchen', 'Tech', 'Bags & Accessories', 'Personal Care'];

  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesCategory = activeCategory === 'All' || prod.category === activeCategory;
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;

    setCheckoutStep(1);
    setTimeout(() => {
      setCheckoutStep(2);
      setCart([]);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative font-sans">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Marketplace Header */}
        <section className="text-center mb-12 max-w-3xl mx-auto flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
            🌱 EcoVoice Sustainable Store
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none">
            Eco-Friendly Marketplace
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mt-1">
            Carefully curated items to reduce your daily carbon footprint and promote circular consumption.
          </p>

          {/* Search Bar & Cart Button */}
          <div className="mt-8 flex gap-4 w-full justify-center flex-col sm:flex-row items-center">
            <div className="relative flex-1 max-w-md w-full bg-white border border-gray-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-3 transition-all duration-300">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search eco products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-sm text-gray-800 placeholder:text-gray-400 py-0.5"
              />
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-semibold text-sm transition-all duration-300 shadow-md shadow-emerald-700/10 cursor-pointer flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({cartItemCount})</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5.5 h-5.5 bg-rose-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold border border-white animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
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

        {/* Products Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(prod => (
              <div 
                key={prod.id} 
                className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/50"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100 shrink-0">
                  <img 
                    src={prod.image} 
                    alt={prod.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                  />
                  <span className="absolute top-4 left-4 text-[10px] px-3 py-1.5 rounded-full font-bold bg-emerald-800 text-white shadow-sm tracking-wide uppercase">
                    {prod.badge}
                  </span>
                  <button 
                    onClick={() => toggleFavorite(prod.id)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-xs text-gray-500 hover:text-rose-500 hover:bg-white transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(prod.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
                
                <div className="p-6 flex flex-col grow justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      {prod.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-1.5 bg-emerald-50/30 p-3 rounded-xl">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Eco Impact:</span>
                    <span className="text-xs text-emerald-950 font-medium">{prod.impact}</span>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-gray-900">₹{prod.price}</span>
                      <div className="flex items-center gap-1 mt-1 text-xs text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-gray-800">{prod.rating}</span>
                        <span className="text-gray-400">({prod.reviews})</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => addToCart(prod)}
                      className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-400 col-span-full font-medium">
              <p>No products found matching your query.</p>
            </div>
          )}
        </section>
      </div>

      {/* Cart Sidebar Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in" onClick={() => setIsCartOpen(false)}>
          <div 
            className="w-full max-w-md h-full bg-white shadow-2xl p-6 flex flex-col justify-between" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-700" />
                  Your Shopping Cart
                </h3>
                <button 
                  onClick={() => { setIsCartOpen(false); setCheckoutStep(0); }}
                  className="p-1 hover:bg-gray-150 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List */}
              {checkoutStep === 0 && (
                <div className="overflow-y-auto max-h-[60vh] mt-4 space-y-4 pr-1">
                  {cart.length > 0 ? (
                    cart.map(item => (
                      <div key={item.id} className="flex gap-4 p-3 bg-gray-50 border border-gray-150 rounded-2xl items-center justify-between">
                        <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-gray-900 truncate">{item.title}</h4>
                          <span className="text-[10px] text-gray-400 block font-semibold mt-0.5">₹{item.price} × {item.quantity}</span>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-gray-250 text-gray-400 hover:text-rose-600 rounded-lg cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 text-gray-400 text-sm">
                      Your cart is empty. Add eco-products to get started!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && checkoutStep === 0 && (
              <div className="border-t border-gray-150 pt-4 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-500">Order Subtotal:</span>
                  <span className="text-2xl font-black text-gray-900">₹{cartTotal}</span>
                </div>
                
                {/* Checkout Mini Form */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Shipping Address</label>
                    <input 
                      type="text" 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street name, City, ZIP"
                      className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-3.5 font-bold text-xs transition-colors cursor-pointer shadow-md shadow-emerald-700/10 flex justify-center items-center gap-1.5"
                  >
                    Place Secure Order
                  </button>
                </form>
              </div>
            )}

            {/* Checkout States */}
            {checkoutStep === 1 && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-3 py-20 text-center">
                <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-semibold text-gray-600">Processing carbon-offset order...</span>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-16 text-center animate-scale-up">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Order Confirmed!</h4>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed max-w-xs mx-auto">
                    Thanks for shopping sustainably! Your request has been dispatched. A shipping confirmation will be sent to your registered account email.
                  </p>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-2 text-left text-xs max-w-xs mx-auto">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-900">Eco Guarantee</span>
                    <p className="text-emerald-700 text-[10px] mt-0.5">This shipment uses carbon-neutral carrier transport routes.</p>
                  </div>
                </div>

                <button 
                  onClick={() => { setIsCartOpen(false); setCheckoutStep(0); setName(''); setAddress(''); }}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default Marketplace;
