const Prediction = ({ prediction = [] }) => {
  const handleProbability = (probability) => {
    const percentage = (probability * 100).toFixed(2);
    return `${percentage}%`;
  };

  // Safely extract first probability
  const firstDiseaseProbability =
    prediction?.[0]?.diseases_prob?.[0] ?? null;

  // Show alert if probability > 50%
  const showNotice =
    firstDiseaseProbability !== null &&
    firstDiseaseProbability >= 0.5;

  return (
    <>
      {/* Prediction Results */}
      <div className="bg-teal-50 p-3 mt-2 rounded-lg flex flex-col gap-2">
        {prediction.length > 0 ? (
          prediction[0].diseases.map((disease, index) => (
            <div
              key={index}
              className="flex justify-between items-center rounded-md px-3 py-2 bg-sky-100 text-gray-800"
            >
              <div className="font-medium">{disease}</div>
              <div className="text-sm font-semibold">
                {handleProbability(
                  prediction[0].diseases_prob[index]
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">
            No prediction available.
          </p>
        )}
      </div>

      {/* Notice */}
      {firstDiseaseProbability !== null && (
        <div
          className={`p-3 mt-3 rounded-md text-center font-semibold uppercase tracking-wide ${
            showNotice
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {showNotice
            ? "Consult a doctor"
            : "No immediate concern"}
        </div>
      )}
    </>
  );
};

export default Prediction;
