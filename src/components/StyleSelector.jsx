import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Activity, Briefcase, Zap } from 'lucide-react';

const styles = [
  { id: 'casual', name: 'Casual', icon: Coffee, color: '#e0c097', desc: 'Relaxed & Comfortable' }, // Pastel Earthy
  { id: 'sporty', name: 'Sporty', icon: Activity, color: '#b0c4b1', desc: 'Active & Dynamic' }, // Pastel Sage
  { id: 'formal', name: 'Formal', icon: Briefcase, color: '#b8c0ff', desc: 'Elegant & Professional' }, // Pastel Periwinkle
  { id: 'streetwear', name: 'Streetwear', icon: Zap, color: '#ffc8dd', desc: 'Bold & Trendy' }, // Pastel Pink
];

const StyleSelector = ({ selectedStyle, onSelect }) => {
  return (
    <div className="style-selector">
      <h2>Choose your vibe</h2>
      <div className="cards-grid">
        {styles.map((style, index) => {
          const Icon = style.icon;
          const isSelected = selectedStyle === style.id;

          return (
            <motion.div
              key={style.id}
              className={`style-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(style.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="card-icon" style={{ backgroundColor: style.color }}>
                <Icon size={24} color="white" />
              </div>
              <h3>{style.name}</h3>
              <p>{style.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .style-selector {
          width: 100%;
          max-width: 800px;
          text-align: center;
        }

        .style-selector h2 {
          margin-bottom: 2rem;
          font-weight: 300;
          font-size: 2rem;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1.5rem;
        }

        .style-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .style-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .style-card.selected {
          background: rgba(99, 102, 241, 0.2);
          border-color: var(--primary);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }

        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .style-card h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .style-card p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default StyleSelector;
