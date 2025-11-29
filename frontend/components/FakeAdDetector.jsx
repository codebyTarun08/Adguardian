// components/FakeAdDetector.jsx
'use client'; // This directive makes it a Client Component

import React, { useState, useEffect } from 'react';
import { Shield, Target, Users, Zap, Upload, AlertCircle, CheckCircle, TrendingUp, Eye, Lock } from 'lucide-react';

const FakeAdDetector = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [adInput, setAdInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  // Note: File handling needs refinement for a real-world app, but we keep the state for UI.
  const [imageFile, setImageFile] = useState(null); 
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // useEffect runs only in the browser, making this component a Client Component.
  useEffect(() => {
    // Check if window is defined to safely run the scroll listener
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const teamMembers = [
    { name: 'Prateek Giri', role: 'ML Engineer', id: '2200971530043' },
    { name: 'Shivang Tiwari', role: 'Backend Developer', id: '2200971530054' },
    { name: 'Tarun Kumar', role: 'Frontend Developer', id: '2200971530056' }
  ];

  const handleDetection = async () => {
    if (!adInput && !urlInput && !imageFile) return;

    setDetecting(true);
    setResult(null); // Clear previous result

    // Simulate API call
    setTimeout(() => {
      const isFake = Math.random() > 0.5;
      setResult({
        prediction: isFake ? 'FAKE' : 'GENUINE',
        confidence: (Math.random() * 30 + 70).toFixed(2),
        risk_factors: isFake 
          ? ['Suspicious URL pattern detected', 'Unrealistic discount offer (90% off)', 'Low-resolution or suspicious image'] 
          : ['Verified domain trust score', 'Realistic pricing range']
      });
      setDetecting(false);
    }, 2000);
  };

  const Navigation = () => (
    <nav className="fixed top-0 w-full z-50 bg-linear-to-r from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AdGuardian
            </span>
          </div>
          <div className="flex space-x-6">
            {['home', 'about', 'detector'].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div 
             className="text-center mb-16 animate-fade-in"
            // Scroll Parallax Effect - wrapped in a check for safety in SSR/build
            style={typeof window !== 'undefined' ? { transform: `translateY(${scrollY * 0.1}px)` } : {}}
          >
            <h1 className="text-7xl font-extrabold mb-6 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Fake E-Commerce Ad Detection
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Protecting users from fraudulent advertisements using advanced Machine Learning and NLP
            </p>
            <button
              onClick={() => setCurrentPage('detector')}
              className="group relative px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                Try Detector Now
                <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              { icon: Shield, title: 'User Protection', desc: 'Prevents financial loss and identity theft from fake ads', color: 'from-cyan-500 to-blue-500' },
              { icon: TrendingUp, title: 'Real-time Detection', desc: 'Instant classification using ML algorithms', color: 'from-blue-500 to-purple-500' },
              { icon: Lock, title: 'Enhanced Security', desc: 'Proactive moderation for safer digital platforms', color: 'from-purple-500 to-pink-500' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-linear-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 mb-6 rounded-xl bg-linear-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-32 text-center">
            <div className="inline-block bg-linear-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-12 border border-cyan-400/30">
              <h2 className="text-4xl font-bold text-white mb-6">The Problem</h2>
              <p className="text-xl text-gray-300 max-w-4xl">
                India has witnessed financial losses exceeding <span className="text-cyan-400 font-bold">₹1,500 crores</span> due to fake online ads. 
                Current moderation systems are reactive and unable to keep pace with sophisticated scams spreading across social media platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-extrabold text-center mb-16 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          About Our Project
        </h1>
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-linear-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg rounded-3xl p-10 border border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Eye className="w-10 h-10 text-cyan-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Vision</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To create a safer digital marketplace by developing intelligent systems that proactively identify and prevent fraudulent advertisements, 
              protecting millions of users from online scams and building trust in e-commerce platforms.
            </p>
          </div>
          <div className="bg-linear-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-3xl p-10 border border-purple-400/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Target className="w-10 h-10 text-purple-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To leverage advanced machine learning and NLP techniques to automatically detect fake e-commerce advertisements across social media platforms, 
              providing real-time protection and enabling proactive content moderation.
            </p>
          </div>
        </div>
        <div className="bg-linear-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 mb-20">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">How We Solve It</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Multi-Modal Analysis', desc: 'Extract features from text, images, and URLs using NLP and computer vision' },
              { step: '02', title: 'ML Classification', desc: 'Train models (Logistic Regression, SVM, Random Forest) on labeled dataset' },
              { step: '03', title: 'Real-Time Detection', desc: 'Deploy scalable system with React frontend and Flask/FastAPI backend' }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="text-6xl font-bold text-cyan-400/20 mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-cyan-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-linear-to-r from-red-500/10 to-orange-500/10 backdrop-blur-lg rounded-3xl p-12 border border-red-400/30 mb-20">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Problem Statement</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-5xl mx-auto">
            Social media platforms like Facebook and Instagram are flooded with fraudulent advertisements that mimic trusted brands, 
            causing significant financial losses. Current reactive moderation systems are insufficient, creating a critical need for an 
            intelligent, automated solution that analyzes multimodal features in real-time to distinguish authentic from fraudulent ads.
          </p>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="group bg-linear-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-cyan-400 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.id}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-gray-400 mt-16">
          <p className="text-sm">Under the supervision of <span className="text-cyan-400">Mr. Kumar Pal Singh</span></p>
          <p className="text-sm mt-2">Galgotias College of Engineering & Technology</p>
        </div>
      </div>
    </div>
  );

  const DetectorPage = () => (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-blue-900 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Ad Detection System
        </h1>
        <div className="bg-linear-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-3">Ad Text Content</label>
            <textarea
              value={adInput}
              onChange={(e) => setAdInput(e.target.value)}
              placeholder="Paste advertisement text here..."
              className="w-full h-32 bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
            />
          </div>
          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-3">Ad URL</label>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/ad"
              className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
            />
          </div>
          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-3">Ad Image (Optional)</label>
            <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-cyan-400/50 transition-all duration-300 cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-300">Click to upload or drag and drop</p>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" // Make input cover the div
              />
              {imageFile && (
                <p className="text-sm mt-2 text-cyan-400 font-semibold">
                  File selected: {imageFile.name}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleDetection}
            // Disabled if detecting, or if ALL inputs are empty (allowing detection with any single input)
            disabled={detecting || (!adInput && !urlInput && !imageFile)} 
            className="w-full py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            {detecting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                Analyzing...
              </span>
            ) : (
              'Detect Advertisement'
            )}
          </button>
          {result && (
            <div className={`mt-8 p-6 rounded-2xl border-2 ${
              result.prediction === 'FAKE' 
                ? 'bg-red-500/10 border-red-400/50' 
                : 'bg-green-500/10 border-green-400/50'
            } animate-fade-in`}>
              <div className="flex items-center mb-4">
                {result.prediction === 'FAKE' ? (
                  <AlertCircle className="w-8 h-8 text-red-400 mr-3" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                )}
                <h3 className="text-2xl font-bold text-white">
                  {result.prediction} ADVERTISEMENT
                </h3>
              </div>
              <p className="text-lg text-gray-300 mb-4">
                Confidence: <span className="font-bold text-cyan-400">{result.confidence}%</span>
              </p>
              <div>
                <p className="text-white font-semibold mb-2">Analysis Factors:</p>
                <ul className="list-disc list-inside text-gray-300">
                  {result.risk_factors.map((factor, idx) => (
                    <li key={idx}>{factor}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      {/* Global CSS for animations is safe here in a client component */}
      <style global jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'detector' && <DetectorPage />}
    </div>
  );
};

export default FakeAdDetector;