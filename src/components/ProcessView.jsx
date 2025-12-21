import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shirt, Ruler, Sparkles } from 'lucide-react';

const steps = [
  "Memproses Outfitmu...",
  "Memberikan Suggestion...",
  "Berfikir dengan keras...",
  "Memfinalisasi opini...",
  "Sedikit lagi..."
];

const ProcessView = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="process-view">
      <div className="scanner-container">
        <motion.div
          className="shirt-icon"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shirt size={80} color="var(--secondary)" />
        </motion.div>
      </div>

      <motion.div
        className="status-text"
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {steps[currentStep]}
      </motion.div>

      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <style>{`
        .process-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          width: 100%;
        }

        .scanner-container {
          width: 300px; /* Horizontal shape */
          height: 180px;
          border: 4px double var(--secondary);
          border-radius: 100px; /* Stadium/Oval shape */
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          margin-bottom: 2rem;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .icon-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .shirt-icon {
            z-index: 2;
        }

        .status-text {
          font-size: 1.5rem;
          font-family: var(--font-heading);
          color: var(--primary);
          margin-bottom: 1rem;
          text-align: center;
        }

        .progress-bar {
          width: 300px;
          height: 8px;
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--secondary);
        }

        .progress-fill {
          height: 100%;
          background: var(--primary);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default ProcessView;
