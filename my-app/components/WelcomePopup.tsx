import { X, Activity, Brain } from 'lucide-react';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionClick: (question: string) => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose, onQuestionClick }) => {
  if (!isOpen) return null;

  const sampleQuestions = [
    "What does high hemoglobin mean?",
    "Is my WBC count of 11500 normal?",
    "What causes low platelets?",
    "How can I improve my hematocrit levels?",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Getting Started</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300">
            I can help you understand your blood test results and provide insights about different blood components.
          </p>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">Try asking:</p>
            {sampleQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onQuestionClick(question);
                  onClose();
                }}
                className="w-full text-left px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 
                         text-gray-300 hover:text-white transition-colors border border-gray-700 
                         hover:border-red-500/50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};