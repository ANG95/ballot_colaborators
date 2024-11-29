import React, { useState } from 'react';
import './styles.css';
import { MdDelete } from 'react-icons/md';

interface PDFFile {
  id: number;
  name: string;
  file: File;
}

interface InputMultipleFilesProps {
  onFilesChange: (files: File[]) => void; // Cambié para pasar solo los archivos
}

const InputMultipleFiles: React.FC<InputMultipleFilesProps> = ({ onFilesChange }) => {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
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
    setPdfFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles];
      onFilesChange(updatedFiles.map((file) => file.file)); // Solo pasar los archivos, no los objetos
      return updatedFiles;
    });
  };

  const handleRemoveFile = (id: number) => {
    setPdfFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.id !== id);
      onFilesChange(updatedFiles.map((file) => file.file)); // Actualizar el padre con solo los archivos
      return updatedFiles;
    });
  };

  return (
    <div className="input-multiple-files">
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p>Arrastra y suelta tus boletas</p>
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
            <li key={file.id}>
              {file.name}
              <button
                className="remove-btn"
                onClick={() => handleRemoveFile(file.id)}
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
