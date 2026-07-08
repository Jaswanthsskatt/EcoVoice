import React from "react";
import { Leaf, Eye, ShieldCheck, Heart } from "lucide-react";

import globe from "../assets/globe.jpg";
import planting from "../assets/planting.png";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-white py-10 px-10">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-bold text-green-800 mb-6">
            About EcoVoice
          </h1>

          <p className="text-xl text-gray-600 leading-9 mb-8">
            Eco Voice Global is a community-driven environmental platform
            dedicated to protecting nature and promoting sustainable living.
            Our mission is to empower individuals, communities, and organizations to report environmental issues, 
            spread awareness, and take meaningful action toward a cleaner and healthier planet.
          </p>

          <button className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-lg text-xl">
            Join Our Mission
          </button>
        </div>

        <img
          src={globe}
          alt="Earth"
          className="w-full h-[450px] rounded-xl object-cover"
        />
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center mt-16">
        <div>
          <Leaf size={50} className="mx-auto text-green-700 mb-4" />
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-lg text-gray-600 mt-3">
            To promote awareness and actions for a cleaner planet.
          </p>
        </div>

        <div>
          <Eye size={50} className="mx-auto text-green-700 mb-4" />
          <h2 className="text-2xl font-bold">Our Vision</h2>
          <p className="text-lg text-gray-600 mt-3">
            A sustainable and greener future for all.
          </p>
        </div>

        <div>
          <ShieldCheck size={50} className="mx-auto text-green-700 mb-4" />
          <h2 className="text-2xl font-bold">What We Do</h2>
          <p className="text-lg text-gray-600 mt-3">
            Provide information, tools and community support.
          </p>
        </div>

        <div>
          <Heart size={50} className="mx-auto text-green-700 mb-4" />
          <h2 className="text-2xl font-bold">Why It Matters</h2>
          <p className="text-lg text-gray-600 mt-3">
            Small actions today create a better tomorrow.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <div className="bg-green-50 rounded-xl p-8 text-center shadow">
          <h2 className="text-5xl font-bold text-green-700">10K+</h2>
          <p className="text-lg mt-3">Active Users</p>
        </div>

        <div className="bg-green-50 rounded-xl p-8 text-center shadow">
          <h2 className="text-5xl font-bold text-green-700">5K+</h2>
          <p className="text-lg mt-3">Reports Resolved</p>
        </div>

        <div className="bg-green-50 rounded-xl p-8 text-center shadow">
          <h2 className="text-5xl font-bold text-green-700">100+</h2>
          <p className="text-lg mt-3">Communities</p>
        </div>

        <div className="bg-green-50 rounded-xl p-8 text-center shadow">
          <h2 className="text-5xl font-bold text-green-700">50K+</h2>
          <p className="text-lg mt-3">Trees Planted</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mt-20 bg-green-50 rounded-2xl p-10">
        <div>
          <h2 className="text-5xl font-bold text-green-900 leading-tight">
            protect nature, preserve life. inspire change
          </h2>

          <button className="mt-10 bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-lg text-xl">
            Get Involved Now
          </button>
        </div>

        <img
          src={planting}
          alt="Planting"
          className="w-full h-[420px] object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default About;