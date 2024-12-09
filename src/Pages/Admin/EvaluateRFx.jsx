import React, { useState, useEffect } from "react";
import axios from "axios";

const EvaluateRFx = ({ rfxId }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evaluation, setEvaluation] = useState({});

  // Fetch vendor responses for the specific RFx
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`/api/rfx/${rfxId}/responses`);
        setResponses(response.data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [rfxId]);

  // Handle input changes for evaluation
  const handleInputChange = (vendorId, field, value) => {
    setEvaluation((prev) => ({
      ...prev,
      [vendorId]: {
        ...(prev[vendorId] || {}),
        [field]: value,
      },
    }));
  };

  // Submit evaluation
  const handleSubmit = async () => {
    try {
      await axios.post(`/api/rfx/${rfxId}/evaluate`, evaluation);
      alert("Evaluation submitted successfully!");
    } catch (error) {
      console.error("Error submitting evaluation:", error);
      alert("Failed to submit evaluation.");
    }
  };

  if (loading) {
    return <div>Loading vendor responses...</div>;
  }

  return (
    <div className="rfx-evaluate">
      <h1>Evaluate RFx Submissions</h1>
      <h2>RFx ID: {rfxId}</h2>

      {responses.length === 0 ? (
        <p>No vendor responses found for this RFx.</p>
      ) : (
        responses.map((response) => (
          <div key={response.vendorId} className="response-card">
            <h3>Vendor: {response.vendorName}</h3>
            <p><strong>Submitted At:</strong> {new Date(response.submittedAt).toLocaleString()}</p>

            <div className="response-details">
              {response.responseDetails.map((detail, index) => (
                <div key={index}>
                  <p><strong>Requirement:</strong> {detail.requirementName}</p>
                  <p><strong>Response:</strong> {detail.response}</p>
                </div>
              ))}
            </div>

            <div className="evaluation-form">
              <label>
                <strong>Score (1-10):</strong>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={evaluation[response.vendorId]?.score || ""}
                  onChange={(e) =>
                    handleInputChange(response.vendorId, "score", e.target.value)
                  }
                />
              </label>
              <label>
                <strong>Comments:</strong>
                <textarea
                  value={evaluation[response.vendorId]?.comments || ""}
                  onChange={(e) =>
                    handleInputChange(response.vendorId, "comments", e.target.value)
                  }
                ></textarea>
              </label>
            </div>
          </div>
        ))
      )}

      {responses.length > 0 && (
        <button onClick={handleSubmit} className="submit-button">
          Submit Evaluation
        </button>
      )}
    </div>
  );
};

export default EvaluateRFx;
