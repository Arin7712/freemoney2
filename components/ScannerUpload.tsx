import React, { useState } from "react";

interface ScannerUploadProps {
  onImageSelect: (image: string) => void;
}

const ScannerUpload: React.FC<ScannerUploadProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setPreview(result);
        onImageSelect(result); // type-safe
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-4 items-center">

      {/* Open Camera */}
      <label className="cursor-pointer bg-blue-600 px-4 py-2 rounded-lg text-white">
        Open Camera & Scan
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Upload from Gallery */}
      <label className="cursor-pointer bg-gray-700 px-4 py-2 rounded-lg text-white">
        Upload From Device
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-40 rounded-lg border border-gray-600"
        />
      )}
    </div>
  );
};

export default ScannerUpload;
