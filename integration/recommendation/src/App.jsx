// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [queries, setQueries] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const exampleQueries = [
//     "I want credit support for purchasing farming equipment.",
//     "I need irrigation and financial support.",
//     "I want insurance for my crops against natural disasters.",
//     "I am a loanee farmer; is there any mandatory insurance?",
//     "I want subsidies for farm mechanization and tools.",
//     "I need help selling my crops online at a better price.",
//     "How can I get a soil health card and advisory support?",
//     "I need price assurance and direct procurement at MSP.",
//     "I want to improve sustainable farming practices with training.",
//     "I need a subsidy for micro-irrigation and water conservation."
//   ];

//   const handleQuerySubmit = async () => {
//     if (queries.length === 0) {
//       alert("Please select at least one query.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/recommend-schemes/", {
//         queries: queries,
//       });
//       setRecommendations(response.data.recommendations);
//     } catch (error) {
//       console.error("Error fetching recommendations:", error);
//       alert("Failed to fetch recommendations. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuerySelection = (query) => {
//     if (queries.includes(query)) {
//       setQueries(queries.filter(q => q !== query));
//     } else {
//       setQueries([...queries, query]);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>Scheme Recommender</h1>
//       <div style={{ marginBottom: "20px" }}>
//         <h3>Select Queries</h3>
//         {exampleQueries.map((example, index) => (
//           <div key={index} style={{ margin: "5px" }}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={queries.includes(example)}
//                 onChange={() => handleQuerySelection(example)}
//                 style={{ marginRight: "10px" }}
//               />
//               {example}
//             </label>
//           </div>
//         ))}
//       </div>

//       <button onClick={handleQuerySubmit} disabled={loading}>
//         {loading ? "Loading..." : "Get Recommendations"}
//       </button>

//       {recommendations.length > 0 && (
//         <div>
//           <h2>Recommendations</h2>
//           <ul style={{ listStyleType: "none", padding: 0 }}>
//             {recommendations.map((scheme, index) => (
//               <li key={index} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
//                 <h3>{scheme["Scheme Name"]}</h3>
//                 <p><strong>Purpose:</strong> {scheme["Purpose"]}</p>
//                 <p><strong>Financial Support:</strong> {scheme["Financial Support"]}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";

function App() {
  const [queries, setQueries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compareMode, setCompareMode] = useState(false);

  const exampleQueries = [
    "I want credit support for purchasing farming equipment.",
    "I need irrigation and financial support.",
    "I want insurance for my crops against natural disasters.",
    "I am a loanee farmer; is there any mandatory insurance?",
    "I want subsidies for farm mechanization and tools.",
    "I need help selling my crops online at a better price.",
    "How can I get a soil health card and advisory support?",
    "I need price assurance and direct procurement at MSP.",
    "I want to improve sustainable farming practices with training.",
    "I need a subsidy for micro-irrigation and water conservation."
  ];

  const handleQuerySubmit = async () => {
    if (queries.length === 0) {
      alert("Please select at least one query.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/recommend-schemes/", {
        queries: queries,
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuerySelection = (query) => {
    if (queries.includes(query)) {
      setQueries(queries.filter(q => q !== query));
    } else {
      setQueries([...queries, query]);
    }
  };

  const handleSchemeSelection = (scheme) => {
    if (selectedSchemes.includes(scheme)) {
      setSelectedSchemes(selectedSchemes.filter(s => s !== scheme));
    } else {
      setSelectedSchemes([...selectedSchemes, scheme]);
    }
  };

  const handleCompare = () => {
    if (selectedSchemes.length < 2) {
      alert("Please select at least two schemes to compare.");
      return;
    }
    setCompareMode(true);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Scheme Recommender</h1>
      <div style={{ marginBottom: "20px" }}>
        <h3>Select Queries</h3>
        {exampleQueries.map((example, index) => (
          <div key={index} style={{ margin: "5px" }}>
            <label>
              <input
                type="checkbox"
                checked={queries.includes(example)}
                onChange={() => handleQuerySelection(example)}
                style={{ marginRight: "10px" }}
              />
              {example}
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleQuerySubmit} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {recommendations.length > 0 && (
        <div>
          <h2>Recommendations</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {recommendations.map((scheme, index) => (
              <li key={index} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedSchemes.includes(scheme)}
                    onChange={() => handleSchemeSelection(scheme)}
                    style={{ marginRight: "10px" }}
                  />
                  <h3>{scheme["Scheme Name"]}</h3>
                </label>
                <p><strong>Purpose:</strong> {scheme["Purpose"]}</p>
                <p><strong>Financial Support:</strong> {scheme["Financial Support"]}</p>
                <p><strong>Eligibility Criteria:</strong> {scheme["Eligibility Criteria"]}</p>
                <p><strong>Target Group:</strong> {scheme["Target Group"]}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleCompare} disabled={selectedSchemes.length < 2}>
            Compare Selected Schemes
          </button>
        </div>
      )}

      {compareMode && (
        <div>
          <h2>Comparison</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Attribute</th>
                {selectedSchemes.map((scheme, index) => (
                  <th key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>{scheme["Scheme Name"]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>Purpose</td>
                {selectedSchemes.map((scheme, index) => (
                  <td key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>{scheme["Purpose"]}</td>
                ))}
              </tr>
              <tr>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>Financial Support</td>
                {selectedSchemes.map((scheme, index) => (
                  <td key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>{scheme["Financial Support"]}</td>
                ))}
              </tr>
              <tr>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>Eligibility Criteria</td>
                {selectedSchemes.map((scheme, index) => (
                  <td key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>{scheme["Eligibility Criteria"]}</td>
                ))}
              </tr>
              <tr>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>Target Group</td>
                {selectedSchemes.map((scheme, index) => (
                  <td key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>{scheme["Target Group"]}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
