import React from 'react';
import { motion } from 'framer-motion';
import { Star, RotateCcw, Share2, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

const ResultView = ({ items, result, mannequinImage, onReset }) => {
  return (
    <div className="result-container">
      {/* Top Left Back Button */}
      <motion.button
        className="back-btn-small"
        onClick={onReset}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ x: -2 }}
      >
        <RotateCcw size={18} />
        <span>Kembali</span>
      </motion.button>
      <div className="ss-layout-grid">
        {/* LEFT COLUMN: Visuals (Collage + Mannequin) */}
        <div className="left-column">
          {/* Bento Grid Collage */}
          <motion.div
            className="bento-collage"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {items.length > 0 && (
              <div className="bento-hero">
                <img src={items[0].image} alt="Main Item" />
                <span className="item-label">Foto 1</span>
              </div>
            )}
            <div className="bento-subgrid">
              {items.slice(1).map((item, index) => (
                <div key={item.id} className="bento-item">
                  <img src={item.image} alt={`Item ${index + 2}`} />
                  <span className="item-label">Foto {index + 2}</span>
                </div>
              ))}
              {/* Fillers if less than 5 items to keep structure if needed, or just let grid handle it */}
            </div>
          </motion.div>

          {/* Mannequin below bento grid */}
          {mannequinImage && (
            <motion.div
              className="mannequin-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img src={mannequinImage} alt="Mannequin" />
              <div className="mannequin-badge">Nano Banana Gen</div>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: Stats & Analysis */}
        <div className="right-column">
          {/* 1. Nilai Keselarasan (HUGE) */}
          <motion.div
            className="rating-section-huge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Nilai Keselarasan</h2>
            <div className="stars-huge">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  fill={i < (result?.rating || 0) ? "#c5a059" : "none"}
                  color={i < (result?.rating || 0) ? "#c5a059" : "#5d4037"}
                  size={45} /* Reduced size */
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <div className="rating-number-huge">{result?.rating || 0}/5.0</div>
          </motion.div>

          {/* 2. Review & Saran (Side by Side) */}
          <motion.div
            className="analysis-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="analysis-box review-box">
              <h3><CheckCircle2 size={32} className="inline-icon" /> Review</h3>
              <p>"{result?.review || "Analisis belum tersedia."}"</p>
            </div>
            <div className="analysis-box tips-box">
              <h3><Sparkles size={32} className="inline-icon" /> Saran</h3>
              <p>{result?.tips || "Tidak ada saran khusus."}</p>
            </div>
          </motion.div>


        </div>
      </div>

      <style>{`
        .result-container {
          width: 100%;
          padding: 2rem;
          max-width: 100%; /* Fill available space */
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .back-btn-small {
            align-self: flex-start;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            color: var(--secondary);
            border: 1px solid var(--secondary);
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            transition: all 0.2s;
        }
        .back-btn-small:hover {
            background: var(--secondary);
            color: #000;
        }

        .ss-layout-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr; /* Reduced left column size */
            gap: 3rem;
            align-items: min-content;
        }

        /* --- LEFT COLUMN --- */
        .left-column {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .bento-collage {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background: rgba(255,255,255,0.05);
            padding: 1rem;
            border-radius: 1rem;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .bento-hero {
            position: relative;
            width: 100%;
            aspect-ratio: 1; /* Square ratio */
            border-radius: 0.5rem;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.2);
        }

        .bento-hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .bento-subgrid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .bento-item {
            position: relative;
            aspect-ratio: 1;
            border-radius: 0.5rem;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .bento-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .item-label {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.6);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
        }

        .mannequin-wrapper {
             border: 4px double var(--secondary);
             border-radius: 8px;
             overflow: hidden;
             position: relative;
             min-height: 400px; /* Taller */
             background: var(--bg-card);
        }
        .mannequin-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .mannequin-badge {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            background: rgba(0,0,0,0.8);
            color: #c5a059;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-weight: bold;
        }

        /* --- RIGHT COLUMN --- */
        .right-column {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            width: 100%;
        }

        .rating-section-huge {
            background: var(--bg-card);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 2rem; /* Reduced padding */
            border-radius: 1rem;
            text-align: center;
            display: flex;
            flex-direction: row; /* Horizontal "Long" Box */
            align-items: center;
            justify-content: space-between; /* Spread content */
            gap: 2rem;
            width: 100%;
        }

        .rating-section-huge h2 {
            font-size: 1rem; /* Increased by 30% from 0.75rem */
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin: 0;
            text-align: left;
        }

        .stars-huge {
            display: flex;
            gap: 0.25rem;
        }

        .rating-number-huge {
            font-size: 3.5rem; /* 5rem * 0.7 = 3.5rem */
            font-weight: 800;
            color: #000;
            line-height: 1;
        }

        .analysis-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .analysis-box {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .analysis-box h3 {
            font-size: 1.8rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin: 0;
            color: var(--secondary);
            text-transform: uppercase;
        }

        .analysis-box p {
            font-size: 1.25rem;
            line-height: 1.6;
            margin: 0;
        }
        
        .review-box {
             background: linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.05));
             border-color: var(--primary);
        }

        @media (max-width: 1024px) {
            .ss-layout-grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </div >
  );
};

export default ResultView;
