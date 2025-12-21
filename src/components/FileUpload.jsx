import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Plus } from 'lucide-react';

const FileUpload = ({ items = [], onItemsChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleFileProcess = (file) => {
    if (items.length >= 5) return;
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAddItem = () => {
    if (preview && items.length < 5) {
      const newItem = {
        id: Date.now(),
        image: preview
      };
      onItemsChange([...items, newItem]);
      setPreview(null);
    }
  };

  const handleRemoveItem = (id) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const handleCancelPreview = () => {
    setPreview(null);
  };

  return (
    <div className="upload-container">
      <div className="items-grid">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="item-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
            >
              <img src={item.image} alt="Uploaded item" />
              <button onClick={() => handleRemoveItem(item.id)} className="delete-btn">
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length < 5 && !preview && (
          <div className="add-item-placeholder">
            <motion.div
              className={`drop-zone small ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="file"
                id="file-upload"
                className="file-input"
                onChange={handleChange}
                accept="image/*"
              />
              <label htmlFor="file-upload" className="upload-label small">
                <Plus size={24} />
                <span>Add Photo</span>
              </label>
            </motion.div>
          </div>
        )}
      </div>

      {/* Modal for Preview Confirmation */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="preview-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="preview-modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <h3>Looks good?</h3>
              <div className="preview-image-wrapper">
                <img src={preview} alt="Preview" />
              </div>
              <div className="modal-actions">
                <button onClick={handleCancelPreview} className="cancel-btn">Cancel</button>
                <button onClick={handleAddItem} className="confirm-btn">Add Item</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="counter-badge">
        {items.length} / 5 Items
      </div>

      <style>{`
                .upload-container {
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .items-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .item-card {
                    background: var(--bg-main);
                    border-radius: 2px;
                    overflow: hidden;
                    position: relative;
                    aspect-ratio: 1;
                    border: 4px double var(--secondary);
                    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                    padding: 4px; /* Frame effect */
                }

                .item-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border: 1px solid rgba(0,0,0,0.1);
                    filter: sepia(30%); /* Subtle aged look */
                }

                .delete-btn {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: var(--primary);
                    border: 1px solid var(--accent);
                    color: var(--accent);
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                
                .delete-btn:hover {
                    background: #800000;
                    color: white;
                }

                .add-item-placeholder {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    height: 100%;
                }

                .drop-zone.small {
                    border: 2px dashed var(--secondary);
                    background-color: rgba(255, 255, 255, 0.4);
                    border-radius: 4px;
                    aspect-ratio: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .drop-zone.small:hover {
                    background-color: rgba(197, 160, 89, 0.2); /* Accent gold hover */
                    border-color: var(--primary);
                }

                .upload-label.small {
                     display: flex;
                     flex-direction: column;
                     align-items: center;
                     gap: 0.5rem;
                     color: var(--secondary);
                     font-weight: 700;
                     font-family: var(--font-heading);
                }

                .file-input {
                    display: none;
                }

                .preview-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(43, 29, 14, 0.8); /* Dark brown overlay */
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                .preview-modal {
                    background: var(--bg-main);
                    padding: 2rem;
                    border: 8px double var(--secondary);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    width: 100%;
                    max-width: 400px;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    position: relative;
                }
                
                .preview-modal h3 {
                    margin-top: 0;
                    text-align: center;
                    color: var(--primary);
                    font-family: var(--font-heading);
                }

                .preview-image-wrapper {
                    width: 100%;
                    aspect-ratio: 1;
                    border: 2px solid var(--primary);
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px;
                }

                .preview-image-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    filter: sepia(20%);
                }

                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }

                .cancel-btn {
                    padding: 0.5rem 1rem;
                    background: transparent;
                    border: 2px solid var(--secondary);
                    color: var(--secondary);
                    font-weight: bold;
                    cursor: pointer;
                    font-family: var(--font-heading);
                }
                
                .cancel-btn:hover {
                    background: rgba(0,0,0,0.05);
                }

                .confirm-btn {
                    padding: 0.5rem 1.5rem;
                    background: var(--primary);
                    border: 2px solid var(--primary);
                    color: var(--bg-main);
                    font-weight: bold;
                    cursor: pointer;
                    font-family: var(--font-heading);
                    box-shadow: 0 4px 0 var(--secondary);
                }

                .confirm-btn:hover {
                    transform: translateY(2px);
                    box-shadow: 0 2px 0 var(--secondary);
                }

                .counter-badge {
                    text-align: center;
                    color: var(--secondary);
                    margin-top: 1rem;
                    font-family: var(--font-heading);
                    font-weight: bold;
                }
            `}</style>
    </div>
  );
};

export default FileUpload;
