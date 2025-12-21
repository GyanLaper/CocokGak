import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import FileUpload from './components/FileUpload';
import StyleSelector from './components/StyleSelector';
import ProcessView from './components/ProcessView';
import ResultView from './components/ResultView';

// Mock Data Service
import { generateOutfitReview, generateMannequin } from './services/gemini';

// ... (Mock Data Service removed or unused)

function App() {
    const [step, setStep] = useState('upload'); // upload, style, process, result
    const [outfitItems, setOutfitItems] = useState([]); // Array of {id, type, image}
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [resultData, setResultData] = useState(null);
    const [mannequinImage, setMannequinImage] = useState(null);

    const handleItemsChange = (items) => {
        setOutfitItems(items);
    };

    const handleNextToStyle = () => {
        if (outfitItems.length > 0) setStep('style');
    };

    const handleStyleSelect = (styleId) => {
        setSelectedStyle(styleId);
    };

    const handleGenerate = () => {
        if (selectedStyle) setStep('process');
    };

    const handleProcessComplete = async () => {
        try {
            // Run both requests in parallel
            const [reviewResult, mannequinResult] = await Promise.all([
                generateOutfitReview(outfitItems, selectedStyle),
                generateMannequin(outfitItems, selectedStyle)
            ]);

            setResultData(reviewResult);
            setMannequinImage(mannequinResult);
            setStep('result');
        } catch (error) {
            console.error(error);
            // In a real app we would show an error state
            alert("Something went wrong with the AI evaluation. Please try again.");
            setStep('style'); // Go back
        }
    };

    const handleReset = () => {
        setStep('upload');
        setOutfitItems([]);
        setSelectedStyle(null);
        setResultData(null);
        setMannequinImage(null);
    };

    // Main Action Button Component
    const ActionButton = ({ onClick, disabled, text }) => (
        <motion.button
            className="action-btn"
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {text}
        </motion.button>
    );

    return (
        <Layout>
            <div className="app-content">
                <AnimatePresence mode="wait">

                    {step === 'upload' && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="step-container"
                        >
                            <h2 className="step-title">Step 1: Upload Your Outfit Items</h2>
                            <p className="step-subtitle">Add up to 5 items (Shirt, Pants, Shoes, etc.)</p>
                            <FileUpload items={outfitItems} onItemsChange={handleItemsChange} />

                            {outfitItems.length > 0 && (
                                <div className="actions">
                                    <ActionButton onClick={handleNextToStyle} text="Next: Choose Style" />
                                </div>
                            )}
                        </motion.div>
                    )}

                    {step === 'style' && (
                        <motion.div
                            key="style"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="step-container"
                        >
                            <h2 className="step-title">Step 2: Select Target Style</h2>
                            <StyleSelector selectedStyle={selectedStyle} onSelect={handleStyleSelect} />

                            {selectedStyle && (
                                <div className="actions">
                                    <ActionButton onClick={handleGenerate} text="✨ Generate Match Analysis" />
                                </div>
                            )}
                        </motion.div>
                    )}

                    {step === 'process' && (
                        <motion.div
                            key="process"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="step-container"
                        >
                            <ProcessView onComplete={handleProcessComplete} />
                        </motion.div>
                    )}

                    {step === 'result' && resultData && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="step-container full-width"
                        >
                            <ResultView
                                items={outfitItems}
                                result={resultData}
                                mannequinImage={mannequinImage}
                                onReset={handleReset}
                            />
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            <style>{`
        .app-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .step-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .step-container.full-width {
          max-width: 1800px;
        }

        .step-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: var(--primary);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          border-bottom: 2px solid var(--accent);
          display: inline-block;
          padding: 0 1rem 0.5rem 1rem;
          letter-spacing: 0.1em;
        }

        .step-subtitle {
          color: var(--text-muted);
          margin-top: -1rem;
          margin-bottom: 2rem;
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-style: italic;
        }

        .actions {
          margin-top: 2rem;
        }

        .action-btn {
          background: var(--primary);
          color: var(--bg-main);
          padding: 1rem 3rem;
          font-size: 1.2rem;
          font-weight: 700;
          font-family: var(--font-heading);
          border: 2px solid var(--accent);
          border-radius: 4px;
          box-shadow: 0 4px 0 var(--secondary);
          transition: transform 0.1s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .action-btn:hover {
          transform: translateY(2px);
          box-shadow: 0 2px 0 var(--secondary);
          background: var(--primary-hover);
        }
        
        .action-btn:active {
            transform: translateY(4px);
            box-shadow: none;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
          background: var(--text-muted);
        }
      `}</style>
        </Layout>
    );
}

export default App;
