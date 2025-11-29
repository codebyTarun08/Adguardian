// // components/AboutContent.jsx
// import { Target, Eye, Users } from 'lucide-react';

// const teamMembers = [
//   { name: 'Prateek Giri', role: 'ML Engineer', id: '2200971530043' },
//   { name: 'Shivang Tiwari', role: 'Backend Developer', id: '2200971530054' },
//   { name: 'Tarun Kumar', role: 'Frontend Developer', id: '2200971530056' }
// ];

// export default function AboutContent() {
//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-950 via-blue-950 to-purple-950 pt-32 pb-20 px-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-6xl font-extrabold text-center mb-16 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
//           Project Vision and Team
//         </h1>

//         <div className="grid md:grid-cols-2 gap-12 mb-20">
//           {/* Vision Card */}
//           <div className="bg-linear-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-10 border border-cyan-400/50 shadow-xl hover:shadow-cyan-500/40 transition-shadow duration-300">
//             <div className="flex items-center mb-6">
//               <Eye className="w-10 h-10 text-cyan-400 mr-4" />
//               <h2 className="text-3xl font-bold text-white">Vision</h2>
//             </div>
//             <p className="text-gray-300 text-lg leading-relaxed">
//               To create a safer digital marketplace by developing intelligent systems that proactively identify and prevent fraudulent advertisements, 
//               protecting millions of users from online scams and building trust in e-commerce platforms.
//             </p>
//           </div>
//           {/* Mission Card */}
//           <div className="bg-linear-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-10 border border-purple-400/50 shadow-xl hover:shadow-purple-500/40 transition-shadow duration-300">
//             <div className="flex items-center mb-6">
//               <Target className="w-10 h-10 text-purple-400 mr-4" />
//               <h2 className="text-3xl font-bold text-white">Mission</h2>
//             </div>
//             <p className="text-gray-300 text-lg leading-relaxed">
//               To leverage advanced **machine learning** and **NLP** techniques to automatically detect fake e-commerce advertisements across social media platforms, 
//               providing real-time protection and enabling proactive content moderation.
//             </p>
//           </div>
//         </div>

//         {/* Methodology Section */}
//         <div className="bg-linear-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 mb-20 shadow-2xl">
//           <h2 className="text-4xl font-bold text-white mb-8 text-center">How We Solve It</h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { step: '01', title: 'Multi-Modal Analysis', desc: 'Extract features from text, images, and URLs using NLP and computer vision' },
//               { step: '02', title: 'ML Classification', desc: 'Train models (Logistic Regression, SVM, Random Forest) on labeled dataset' },
//               { step: '03', title: 'Real-Time Deployment', desc: 'Deploy scalable system with React frontend and Flask/FastAPI backend' }
//             ].map((item, idx) => (
//               <div key={idx} className="relative group p-4 hover:bg-white/5 rounded-xl transition-colors duration-200">
//                 <div className="text-6xl font-extrabold text-cyan-400/20 mb-2">{item.step}</div>
//                 <h3 className="text-xl font-bold text-white mb-3 border-l-4 border-cyan-500 pl-3">{item.title}</h3>
//                 <p className="text-gray-400">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* Team Section */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-white mb-12 flex items-center justify-center">
//             <Users className="w-8 h-8 text-cyan-400 mr-3" /> Meet Our Team
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {teamMembers.map((member, idx) => (
//               <div
//                 key={idx}
//                 className="group bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
//               >
//                 <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-white/30">
//                   {member.name.charAt(0)}
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
//                 <p className="text-cyan-400 mb-3 font-semibold">{member.role}</p>
//                 <p className="text-gray-400 text-sm italic">{member.id}</p>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="text-center text-gray-500 mt-16">
//           <p className="text-sm">Under the supervision of <span className="text-cyan-400">Mr. Kumar Pal Singh</span></p>
//           <p className="text-sm mt-2">Galgotias College of Engineering & Technology</p>
//         </div>
//       </div>
//     </div>
//   );
// }


// components/AboutContent.jsx
import { Target, Eye, Users, Cpu, Rocket } from 'lucide-react'; // Added Cpu, Rocket
import { teamMembers } from '@/data/teamMembers'; // Importing team members data

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-blue-950 to-purple-950 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-extrabold text-center mb-16 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Project Vision and Team
        </h1>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Vision Card */}
          <div className="bg-linear-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-10 border border-cyan-400/50 shadow-xl hover:shadow-cyan-500/40 transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <Eye className="w-10 h-10 text-cyan-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Vision</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To create a safer digital marketplace by developing intelligent systems that proactively identify and prevent fraudulent advertisements, 
              protecting millions of users from online scams and building trust in e-commerce platforms.
            </p>
          </div>
          {/* Mission Card */}
          <div className="bg-linear-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-10 border border-purple-400/50 shadow-xl hover:shadow-purple-500/40 transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <Target className="w-10 h-10 text-purple-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To leverage advanced <b className='text-cyan-300'>Machine learning</b> and <b className='text-violet-400'>NLP</b> techniques to automatically detect fake e-commerce advertisements across social media platforms, 
              providing real-time protection and enabling proactive content moderation.
            </p>
          </div>
        </div>

        {/* NEW SECTION: Dataset and Data Points */}
        <div className="bg-linear-to-br from-purple-900/40 to-red-900/40 backdrop-blur-md rounded-3xl p-12 border border-purple-500/50 mb-20 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center">
                <Cpu className="w-8 h-8 text-purple-400 mr-3" /> Machine Learning Data
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-400 mb-3">Dataset Overview</h3>
                    <p className="text-gray-300 mb-4">
                        We compiled a proprietary dataset of over 500 labeled advertisements scraped from social media, 
                        categorized into Fake and Genuine classes for binary classification. Data augmentation techniques were applied to balance the classes.
                    </p>
                    
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-cyan-400 mb-3">Extracted Data Points (Features)</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                        <li><b>Text Features:</b> Presence of extreme discounts (50%), urgency keywords ("Hurry!", "Limited Stock"), and sentiment score (NLP).</li>
                        <li><b>URL Features: </b>Domain age, TLD (Top-Level Domain) reputation, and URL character entropy.</li>
                        <li><b>Image Features (CV):</b> Object detection (Brand logo presence), image resolution/quality, and color histogram analysis.</li>
                        <li><b>Meta Features:</b> Engagement metrics (simulated), posting platform.</li>
                    </ul>
                </div>
            </div>
        </div>
        {/* END NEW SECTION */}

        {/* Methodology Section (Kept from previous) */}
        <div className="bg-linear-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 mb-20 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">How We Solve It</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Multi-Modal Analysis', desc: 'Extract features from text, images, and URLs using NLP and computer vision' },
              { step: '02', title: 'ML Classification', desc: 'Train models (Logistic Regression, SVM, Random Forest) on labeled dataset' },
              { step: '03', title: 'Real-Time Deployment', desc: 'Deploy scalable system with React frontend and Flask/FastAPI backend' }
            ].map((item, idx) => (
              <div key={idx} className="relative group p-4 hover:bg-white/5 rounded-xl transition-colors duration-200">
                <div className="text-6xl font-extrabold text-cyan-400/20 mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3 border-l-4 border-cyan-500 pl-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* NEW SECTION: Future Scope */}
        <div className="bg-linear-to-r from-blue-900/40 to-cyan-900/40 backdrop-blur-md rounded-3xl p-12 border border-blue-500/50 mb-20 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center">
                <Rocket className="w-8 h-8 text-blue-400 mr-3" /> Future Scope
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-300">
                <ul className="list-disc list-inside space-y-3 ml-4">
                    <li><b className='text-sky-300'>Deep Learning Integration:</b> Implement CNNs for more robust image feature extraction and RNNs/Transformers for advanced NLP.</li>
                    <li><b className='text-sky-300'>Ad Campaign Monitoring:</b> Integrate with social media APIs for automated, large-scale ad campaign screening before approval.</li>
                </ul>
                <ul className="list-disc list-inside space-y-3 ml-4">
                    <li><b className='text-sky-300'>Explainable AI (XAI):</b> Provide detailed justification for the fraud prediction (e.g., highlighting suspicious text areas or image regions).</li>
                    <li><b className='text-sky-300'>Live Feedback Loop:</b> Implement a user feedback mechanism to continuously retrain and improve the model's accuracy.</li>
                </ul>
            </div>
        </div>
        {/* END NEW SECTION */}
        
        {/* Team Section (Kept from previous) */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-12 flex items-center justify-center">
            <Users className="w-8 h-8 text-cyan-400 mr-3" /> Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="group bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-white/30">
                  {member.name.charAt(0)}
                  
                </div>
                {/* <img className="w-24 h-24 mx-auto mb-6 rounded-full  flex items-center justify-center text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-white/30" src={"/tarun.jpeg"}/> */}
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-cyan-400 mb-3 font-semibold">{member.role}</p>
                <p className="text-gray-400 text-sm italic">{member.id}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center text-gray-500 mt-16">
          <p className="text-sm">Under the supervision of <span className="text-cyan-400">Mr. Kumar Pal Singh</span></p>
          <p className="text-sm mt-2">Galgotias College of Engineering & Technology</p>
        </div>
      </div>
    </div>
  );
}