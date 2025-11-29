// // components/HomeContent.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Shield, TrendingUp, Lock, Zap } from 'lucide-react';

// export default function HomeContent() {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     // Only run scroll listener in the browser
//     if (typeof window !== 'undefined') {
//       const handleScroll = () => setScrollY(window.scrollY);
//       window.addEventListener('scroll', handleScroll);
//       return () => window.removeEventListener('scroll', handleScroll);
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950">
//       <div className="pt-32 pb-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div 
//              className="text-center mb-16 animate-fade-in"
//              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
//           >
//             <h1 className="text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
//               Fake E-Commerce Ad Detection
//             </h1>
//             <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
//               Protecting users from fraudulent advertisements using **advanced Machine Learning** and NLP
//             </p>
//             <Link
//               href="/detector"
//               className="group relative inline-flex px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-700 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-95"
//             >
//               <span className="relative z-10 flex items-center">
//                 Try Detector Now
//                 <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </Link>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8 mt-20">
//             {[
//               { icon: Shield, title: 'User Protection', desc: 'Prevents financial loss and identity theft from fake ads', color: 'from-cyan-600 to-blue-600' },
//               { icon: TrendingUp, title: 'Real-time Detection', desc: 'Instant classification using ML algorithms', color: 'from-blue-600 to-purple-600' },
//               { icon: Lock, title: 'Enhanced Security', desc: 'Proactive moderation for safer digital platforms', color: 'from-purple-600 to-pink-600' }
//             ].map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-2 transform perspective-1000"
//               >
//                 <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
//                 <p className="text-gray-400">{feature.desc}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-32 text-center">
//             <div className="inline-block bg-gradient-to-r from-cyan-900/40 to-blue-900/40 backdrop-blur-md rounded-3xl p-12 border-4 border-double border-cyan-500/50 shadow-2xl">
//               <h2 className="text-4xl font-bold text-white mb-6">The Problem</h2>
//               <p className="text-xl text-gray-300 max-w-4xl">
//                 India has witnessed financial losses exceeding <span className="text-cyan-400 font-extrabold">₹1,500 crores</span> due to fake online ads. 
//                 Current moderation systems are reactive and unable to keep pace with sophisticated scams spreading across social media platforms.
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// components/HomeContent.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, TrendingUp, Lock, Zap, Code, Database, Clock } from 'lucide-react'; // Added Code, Database, Clock
import * as Icons from 'lucide-react'; // Importing all icons for dynamic usage
import {featureFields , stackFields} from '@/data/homeFields'; // Importing homeFields from data file

export default function HomeContent() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-purple-950 to-blue-950">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div 
             className="text-center mb-16 animate-fade-in"
             style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <h1 className="text-7xl font-extrabold mb-6 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Fake E-Commerce Ad Detection
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Protecting users from fraudulent advertisements using <b className='text-sky-300'>Advanced Machine Learning</b> and <b className='text-pink-400'>NLP</b>
            </p>
            <Link
              href="/detector"
              className="group relative inline-flex px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-700 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-95"
            >
              <span className="relative z-10 flex items-center">
                Try Detector Now
                <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {featureFields.map((feature, idx) => {
              const Icon = Icons[feature.icon]; // Dynamically get the icon component
              return (  
              <div
                key={idx}
                className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-2 transform perspective-1000"
              >
                <div className={`w-16 h-16 mb-6 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                 
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            )})}
          </div>

          {/* NEW SECTION: Technology Stack */}
          {/* <div className="mt-32 text-center">
            <h2 className="text-4xl font-bold text-white mb-10">
                <Code className="inline w-8 h-8 text-cyan-400 mr-3 mb-1" /> Technology Stack
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {stackFields.map((stack, idx) => {
                    const Icon = Icons[stack.icon]; // Dynamically get the icon component
                    return (
                    <div key={idx} className="bg-gray-800/70 p-6 rounded-xl border border-purple-400/30 text-left shadow-xl hover:shadow-purple-500/30 transition-shadow">
                        <h4 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                            <Icon className="w-6 h-6 mr-2" /> {stack.title}
                        </h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                            {stack.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    )
                })}
            </div>
          </div> */}
            <div className="mt-32 text-center">
                <h2 className="text-4xl font-bold text-white mb-10">
                    <Code className="inline w-8 h-8 text-cyan-400 mr-3 mb-1" /> Technology Stack
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {stackFields.map((stack, idx) => {
                        const Icon = Icons[stack.icon]; // Dynamically get the icon component
                        return (
                            <div 
                                key={idx} 
                                // Enhanced Card Design: Darker background, strong border, subtle glow on hover
                                className="relative bg-gray-900/90 p-8 rounded-2xl border border-blue-400/30 text-left shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
                            >
                                {/* Background gradient for subtle lighting effect */}
                                <div className="absolute inset-0 bg-linear-to-br from-gray-800/50 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <h4 className="relative z-10 text-2xl font-extrabold mb-5 flex items-center text-cyan-400 border-b border-cyan-400/20 pb-3">
                                    <Icon className="w-7 h-7 mr-3 text-purple-400 group-hover:text-white transition-colors" /> {stack.title}
                                </h4>
                                
                                <ul className="relative z-10 text-gray-300 space-y-3">
                                    {stack.items.map((item, i) => (
                                        // Redesigned List Item: Custom bullet point and hover highlight
                                        <li 
                                            key={i} 
                                            className="flex items-start text-base group-hover:text-white transition-colors duration-200"
                                        >
                                            <span className="text-purple-400 mr-3 mt-1 font-extrabold text-sm">&#9679;</span> {/* Custom Bullet */}
                                            <span className="flex-1 hover:text-cyan-300 transition-colors duration-200 text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
          {/* END NEW SECTION */}

          <div className="mt-32 text-center">
            <div className="inline-block bg-linear-to-r from-cyan-900/40 to-blue-900/40 backdrop-blur-md rounded-3xl p-12 border-4 border-double border-cyan-500/50 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-6">The Problem</h2>
              <p className="text-xl text-gray-300 max-w-4xl">
                India has witnessed financial losses exceeding <span className="text-cyan-400 font-extrabold">₹1,500 crores</span> due to fake online ads. 
                Current moderation systems are reactive and unable to keep pace with sophisticated scams spreading across social media platforms.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
