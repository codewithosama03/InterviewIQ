const InterviewCard = ({ question }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-8">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">
        Generated Question
      </h2>

      <p className="text-slate-700 text-lg leading-relaxed">
        {question}
      </p>
    </div>
  );
};

export default InterviewCard;
