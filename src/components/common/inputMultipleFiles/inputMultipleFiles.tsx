import React, { useState } from 'react';
import './styles.css';
import { MdDelete } from 'react-icons/md';

interface InputMultipleFilesProps {
  onFilesChange: (files: File[]) => void;
  pdfFiles: File[]
  handleRemoveFile:(name: string)=>void
}

const InputMultipleFiles: React.FC<InputMultipleFilesProps> = ({ onFilesChange, pdfFiles, handleRemoveFile }) => {
  const [nextId, setNextId] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    addFiles(Array.from(files));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files) {
      addFiles(Array.from(event.dataTransfer.files));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const addFiles = (files: File[]) => {
    const newFiles = files
      .filter((file) => file.type === 'application/pdf')
      .map((file) => ({
        id: nextId + Math.random(),
        name: file.name,
        file,
      }));

    setNextId((prevId) => prevId + newFiles.length);
      const updatedFiles = [...newFiles];
      onFilesChange(updatedFiles.map((file) => file.file));
      return updatedFiles;
  };

  return (
    <div className="input-multiple-files">
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p>Arrastra y suelta tus boletas aquí</p>
        <input
          type="file"
          id="pdfUploader"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          hidden
        />
        <label htmlFor="pdfUploader" className="upload-btn">
          Seleccionar boletas
        </label>
      </div>
      <div className="file-list">
        <b>Boletas seleccionadas:</b>
        <ul>
          {pdfFiles.map((file) => (
            <li key={file.name}>
              {file.name}
              <button
                className="remove-btn"
                onClick={() => handleRemoveFile(file.name)}
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InputMultipleFiles;
