// // components/DetectorForm.jsx
// 'use client';

// import { useState } from 'react';
// import { Upload, AlertCircle, CheckCircle } from 'lucide-react';

// export default function DetectorForm() {
//   const [adInput, setAdInput] = useState('');
//   const [urlInput, setUrlInput] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [detecting, setDetecting] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleDetection = async () => {
//     if (!adInput && !urlInput && !imageFile) return;

//     setDetecting(true);
//     setResult(null); 

//     // Simulate API call and analysis
//     setTimeout(() => {
//       const isFake = Math.random() > 0.6; // Slightly higher chance of being genuine for UX
//       setResult({
//         prediction: isFake ? 'FAKE' : 'GENUINE',
//         confidence: (Math.random() * 20 + 75).toFixed(2), // Higher confidence range
//         risk_factors: isFake 
//           ? ['Unusual domain age', 'High pressure sales language (limited time)', 'Inconsistent branding/logo'] 
//           : ['Domain registered to known entity', 'Clear contact information']
//       });
//       setDetecting(false);
//     }, 2500); // Increased delay for perceived complexity
//   };

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-950 via-purple-950 to-blue-950 pt-32 pb-20 px-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-5xl font-extrabold text-center mb-12 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
//           Multi-Modal Ad Analysis
//         </h1>
//         <div className="bg-gray-900/80 backdrop-blur-md rounded-3xl p-10 border border-cyan-400/30 shadow-2xl shadow-purple-900/50">
          
//           {/* Ad Text Input */}
//           <div className="mb-8">
//             <label className="block text-white text-lg font-semibold mb-3">Ad Text Content</label>
//             <textarea
//               value={adInput}
//               onChange={(e) => setAdInput(e.target.value)}
//               placeholder="Paste advertisement text here (e.g., 'GET 90% OFF on all products! Click now!')"
//               className="w-full h-32 bg-gray-800 border border-cyan-400/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300"
//             />
//           </div>

//           {/* URL Input */}
//           <div className="mb-8">
//             <label className="block text-white text-lg font-semibold mb-3">Ad URL / Link</label>
//             <input
//               type="text"
//               value={urlInput}
//               onChange={(e) => setUrlInput(e.target.value)}
//               placeholder="https://example.com/suspicious-deal"
//               className="w-full bg-gray-800 border border-cyan-400/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300"
//             />
//           </div>

//           {/* Image Upload */}
//           <div className="mb-8">
//             <label className="block text-white text-lg font-semibold mb-3">Ad Image (Optional)</label>
//             <label htmlFor="file-upload" className="block cursor-pointer">
//                 <div className="relative border-2 border-dashed border-purple-400/50 rounded-xl p-8 text-center hover:border-cyan-400 transition-all duration-300">
//                     <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
//                     <p className="text-gray-300">Click to upload image file</p>
//                     <input
//                         id="file-upload"
//                         type="file"
//                         onChange={handleFileChange}
//                         accept="image/*"
//                         className="hidden"
//                     />
//                     {imageFile && (
//                         <p className="text-sm mt-2 text-cyan-400 font-semibold truncate">
//                         File selected: {imageFile.name}
//                         </p>
//                     )}
//                 </div>
//             </label>
//           </div>

//           {/* Detection Button */}
//           <button
//             onClick={handleDetection}
//             disabled={detecting || (!adInput && !urlInput && !imageFile)}
//             className="w-full py-4 bg-linear-to-r from-cyan-500 to-blue-700 text-white rounded-xl font-bold text-lg hover:shadow-3xl hover:shadow-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.01]"
//           >
//             {detecting ? (
//               <span className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
//                 Analyzing Multi-Modal Data...
//               </span>
//             ) : (
//               'Detect Advertisement Authenticity'
//             )}
//           </button>

//           {/* Detection Result */}
//           {result && (
//             <div className={`mt-8 p-6 rounded-2xl border-4 ${
//               result.prediction === 'FAKE' 
//                 ? 'bg-red-900/30 border-red-500 shadow-red-500/20' 
//                 : 'bg-green-900/30 border-green-500 shadow-green-500/20'
//             } animate-fade-in shadow-xl`}>
//               <div className="flex items-center mb-4 border-b border-white/10 pb-3">
//                 {result.prediction === 'FAKE' ? (
//                   <AlertCircle className="w-10 h-10 text-red-400 mr-4" />
//                 ) : (
//                   <CheckCircle className="w-10 h-10 text-green-400 mr-4" />
//                 )}
//                 <h3 className="text-3xl font-extrabold text-white">
//                   RESULT: <span className={`${result.prediction === 'FAKE' ? 'text-red-400' : 'text-green-400'}`}>{result.prediction}</span>
//                 </h3>
//               </div>
//               <p className="text-lg text-gray-300 mb-4">
//                 Model Confidence: <span className="font-extrabold text-cyan-400 text-xl">{result.confidence}%</span>
//               </p>
//               <div>
//                 <p className="text-white font-semibold mb-2 text-lg">Key Analysis Factors:</p>
//                 <ul className="list-disc list-inside text-gray-400 ml-4">
//                   {result.risk_factors.map((factor, idx) => (
//                     <li key={idx} className={`${result.prediction === 'FAKE' ? 'text-red-300' : 'text-green-300'}`}>{factor}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';

export default function DetectorForm() {
  const [adInput, setAdInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "http://127.0.0.1:8000/predict"; // FastAPI URL

  const handleDetection = async () => {
    setError(null);
    setResult(null);

    if (!adInput && !urlInput) {
      setError("Please enter ad text or URL.");
      return;
    }

    setDetecting(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ad_text: adInput,
          url: urlInput
        })
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();
      console.log("API Response:", data);
      setResult(data);

    } catch (err) {
      setError("Unable to connect to backend. Make sure FastAPI is running.");
      console.error(err);

    } finally {
      setDetecting(false);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-purple-950 to-blue-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Multi-Modal Ad Analysis
        </h1>

        <div className="bg-gray-900/80 backdrop-blur-md rounded-3xl p-10 border border-cyan-400/30 shadow-2xl shadow-purple-900/50">

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-center mb-4 font-semibold">{error}</p>
          )}

          {/* Ad Text Input */}
          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-3">Ad Text</label>
            <textarea
              value={adInput}
              onChange={(e) => setAdInput(e.target.value)}
              placeholder="Paste advertisement text here..."
              className="w-full h-32 bg-gray-800 border border-cyan-400/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {/* URL Input */}
          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-3">Ad URL</label>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-gray-800 border border-cyan-400/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {/* Image Upload (optional) */}
          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-3">
              Ad Image (optional)
            </label>
            <label htmlFor="file-upload">
              <div className="cursor-pointer border-2 border-dashed border-purple-400/50 rounded-xl p-8 text-center hover:border-cyan-400 transition-all">
                <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <p className="text-gray-300">Click to upload image</p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {imageFile && (
                  <p className="text-sm mt-2 text-cyan-400 font-semibold truncate">
                    {imageFile.name}
                  </p>
                )}
              </div>
            </label>
          </div>

          {/* Detect Button */}
          <button
            onClick={handleDetection}
            disabled={detecting}
            className="cursor-pointer w-full py-4 bg-linear-to-r from-cyan-500 to-blue-700 text-white rounded-xl text-lg font-bold hover:scale-105 transition-all disabled:opacity-40"
          >
            {detecting ? (
              <span className="flex items-center justify-center ">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                Analyzing...
              </span>
            ) : (
              "Detect Fraud"
            )}
          </button>

          {/* RESULT BLOCK */}


{/* RESULT BLOCK — UI v2 */}
{result && (
  <div
    className={`mt-10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/5 border transition-all duration-500 ${
      result.prediction === "fraud"
        ? "border-red-500/50 shadow-red-900/40"
        : "border-green-500/50 shadow-green-900/40"
    }`}
  >
    {/* Header */}
    <div className="flex items-center mb-6">
      {result.prediction === "fraud" ? (
        <AlertCircle className="w-12 h-12 text-red-400 mr-4" />
      ) : (
        <CheckCircle className="w-12 h-12 text-green-400 mr-4" />
      )}
      <h3 className="text-4xl font-bold text-white tracking-tight">
        {result.prediction === "fraud" ? "⚠️ Fake / Scam Detected" : "✅ Genuine Advertisement"}
      </h3>
    </div>

    {/* RISK METER */}
    <div className="mt-6 mb-8">
      <p className="text-gray-200 font-semibold mb-3 text-lg">Fraud Probability</p>

      <div className="w-full h-4 bg-gray-800/50 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-700 ${
            result.prediction === "fraud"
              ? "bg-red-500"
              : "bg-green-500"
          }`}
          style={{ width: `${(result.probability * 100).toFixed(0)}%` }}
        ></div>
      </div>

      <p className="text-cyan-300 text-xl font-bold mt-2">
        {(result.probability * 100).toFixed(2)}%
      </p>
    </div>

    {/* REASON */}
    <div className="mb-6">
      <p className="text-white font-semibold text-xl mb-2">Reason</p>
      <div className="bg-black/30 p-4 rounded-2xl text-gray-300 leading-relaxed border border-white/10">
        {result.reason || "Model-based analysis applied."}
      </div>
    </div>

    {/* URL TRUST SCORE */}
    {result.url_features && (
      <div className="mb-6">
        <p className="text-white text-xl font-semibold mb-2 flex items-center gap-2">
          🔍 URL Trust Score
        </p>

        <div className="bg-black/20 p-4 rounded-2xl">
          {/* Bar Score */}
          <div className="w-full h-3 bg-gray-700/40 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full transition-all duration-700 ${
                result.prediction === "fraud" ? "bg-red-500" : "bg-green-400"
              }`}
              style={{
                width: `${Math.min(
                  100,
                  result.url_features.domain_age_days / 50
                )}%`,
              }}
            ></div>
          </div>

          {/* Human-readable domain info */}
          <ul className="text-gray-300 space-y-1 text-sm">
            <li><strong>Domain:</strong> {result.url_features.domain}</li>
            <li>
              <strong>HTTPS:</strong>{" "}
              {result.url_features.uses_https ? "Yes (Secure)" : "No (Risky)"}
            </li>
            <li>
              <strong>Domain Age:</strong> {result.url_features.domain_age_days} days
            </li>
            <li>
              <strong>SSL Validity:</strong> {result.url_features.ssl_days_valid} days
            </li>
            <li>
              <strong>Hyphens:</strong> {result.url_features.num_hyphens}
            </li>
            <li>
              <strong>Digits in Domain:</strong> {result.url_features.num_digits} 
              {result.url_features.num_digits > 0 && " ⚠️ suspicious"}
            </li>
            <li>
              <strong>Entropy Score:</strong>{" "}
              {result.url_features.domain_entropy.toFixed(2)} 
              {result.url_features.domain_entropy > 3.5 && " ⚠️ looks random"}
            </li>
          </ul>
        </div>
      </div>
    )}

    {/* SHAP FACTORS */}
    {result.explanation && (
      <div className="mt-6">
        <p className="text-white text-xl font-semibold mb-2">Key Risk Factors</p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          {result.explanation.map((e, i) => (
            <li key={i}>
              <span className="font-semibold">{e.feature}</span>{" "}
              → {e.shap_value.toFixed(3)}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}


        </div>
      </div>
    </div>
  );
}



          // RESULT BLOCK
          // {result && (
          //   <div className={`mt-10 p-6 rounded-2xl border-4 shadow-xl ${
          //     result.prediction === "fraud"
          //       ? "bg-red-900/30 border-red-500 shadow-red-500/30"
          //       : "bg-green-900/30 border-green-500 shadow-green-500/30"
          //   }`}>
          //     <div className="flex items-center mb-4">
          //       {result.prediction === "fraud" 
          //         ? <AlertCircle className="w-10 h-10 text-red-400 mr-4" /> 
          //         : <CheckCircle className="w-10 h-10 text-green-400 mr-4" />
          //       }
          //       <h3 className="text-3xl font-extrabold text-white">
          //         RESULT: 
          //         <span className="ml-2">
          //           {result.prediction === "fraud" ? "Fake" : "Genuine"}
          //         </span>
          //       </h3>
          //     </div>

          //     <p className="text-xl text-cyan-300 font-semibold mb-4">
          //       Confidence: {(result.probability * 100).toFixed(2)}%
          //     </p>

          //     {/* URL Features */}
          //     <div className="mb-6">
          //       <p className="text-white font-semibold text-lg mb-2">URL Analysis:</p>
          //       <pre className="text-gray-300 text-sm bg-black/20 p-3 rounded-xl">
          //         {JSON.stringify(result.rule_feats, null, 2)}
          //       </pre>
          //     </div>

          //     {/* SHAP Explanation */}
          //     {result.explanation && (
          //       <div>
          //         <p className="text-white font-semibold text-lg mb-2">Top Risk Factors:</p>
          //         <ul className="list-disc list-inside text-gray-300">
          //           {result.explanation.map((e, i) => (
          //             <li key={i}>{e.feature} → {e.shap_value.toFixed(3)}</li>
          //           ))}
          //         </ul>
          //       </div>
          //     )}

          //   </div>
          // )}


          //           {result && (
          //   <div
          //     className={`mt-10 p-6 rounded-2xl border-4 shadow-xl ${
          //       result.prediction === "fraud"
          //         ? "bg-red-900/30 border-red-500 shadow-red-500/30"
          //         : "bg-green-900/30 border-green-500 shadow-green-500/30"
          //     }`}
          //   >
          //     <div className="flex items-center mb-4">
          //       {result.prediction === "fraud" ? (
          //         <AlertCircle className="w-10 h-10 text-red-400 mr-4" />
          //       ) : (
          //         <CheckCircle className="w-10 h-10 text-green-400 mr-4" />
          //       )}

          //       <h3 className="text-3xl font-extrabold text-white">
          //         RESULT:
          //         <span className="ml-2">
          //           {result.prediction === "fraud" ? "Fake / Scam" : "Genuine"}
          //         </span>
          //       </h3>
          //     </div>

          //     {/* Confidence */}
          //     <p className="text-xl text-cyan-300 font-semibold mb-4">
          //       Confidence Score: {(result.probability * 100).toFixed(2)}%
          //     </p>

          //     {/* Reason */}
          //     <div className="mb-4">
          //       <p className="text-white font-semibold text-lg">Reason:</p>
          //       <p className="text-gray-300 mt-1 bg-black/20 p-3 rounded-xl">
          //         {result.reason || "Model analysis"}
          //       </p>
          //     </div>

          //     {/* URL Analysis */}
          //     <div className="mb-6">
          //       <p className="text-white font-semibold text-lg mb-2">URL Analysis</p>

          //       {result.url_features ? (
          //         <div className="space-y-1 bg-black/20 p-4 rounded-xl text-gray-300 text-sm">
          //           <p><strong>Domain:</strong> {result.url_features.domain || "N/A"}</p>
          //           <p><strong>HTTPS:</strong> {result.url_features.uses_https ? "Yes" : "No"}</p>
          //           <p><strong>Age of Domain:</strong> {result.url_features.domain_age_days} days</p>
          //           <p><strong>IPs Found:</strong> {result.url_features.num_ips}</p>
          //           <p><strong>Entropy Score:</strong> {result.url_features.domain_entropy.toFixed(2)}</p>
          //           <p><strong>Hyphens in Domain:</strong> {result.url_features.num_hyphens}</p>
          //           <p><strong>Digits in Domain:</strong> {result.url_features.num_digits}</p>
          //           <p><strong>SSL Certificate Validity:</strong> {result.url_features.ssl_days_valid} days left</p>
          //         </div>
          //       ) : (
          //         <p className="text-gray-400">No URL information available.</p>
          //       )}
          //     </div>

          //     {/* SHAP Explanation */}
          //     {result.explanation && (
          //       <div>
          //         <p className="text-white font-semibold text-lg mb-2">Top Risk Factors:</p>
          //         <ul className="list-disc list-inside text-gray-300">
          //           {result.explanation.map((e, i) => (
          //             <li key={i}>
          //               {e.feature} → {e.shap_value.toFixed(3)}
          //             </li>
          //           ))}
          //         </ul>
          //       </div>
          //     )}
          //   </div>
          // )}