import React, { useRef, useState } from 'react';
import { Upload, Image, AlertCircle, CheckCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      onImageUpload(imageUrl);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Sample medical images for demo
  const sampleImages = [
    {
      name: 'Brain MRI - Tumor Detection',
      url: 'https://images.pexels.com/photos/8488725/pexels-photo-8488725.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Brain MRI'
    },
    {
      name: 'Chest CT - Lung Analysis',
      url: 'https://images.pexels.com/photos/8488728/pexels-photo-8488728.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Chest CT'
    },
    {
      name: 'Brain MRI - Normal',
      url: 'https://images.pexels.com/photos/8488659/pexels-photo-8488659.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Brain MRI'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-500 bg-blue-50 scale-105'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,.dcm"
          onChange={handleChange}
        />
        
        {uploading ? (
          <div className="animate-pulse">
            <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Uploading Image...</h3>
            <p className="text-gray-600">Processing medical scan</p>
          </div>
        ) : (
          <>
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload Medical Image</h3>
            <p className="text-gray-500 mb-6">
              Drag and drop your CT or MRI scan here, or click to browse
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Select Image
            </button>
          </>
        )}
      </div>

      {/* File Format Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Supported Formats</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• DICOM files (.dcm) - Medical imaging standard</li>
              <li>• PNG/JPG images - For processed scans</li>
              <li>• Maximum file size: 50MB</li>
              <li>• Recommended resolution: 512x512 or higher</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sample Images */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Try Sample Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleImages.map((sample, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => onImageUpload(sample.url)}
            >
              <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                <img
                  src={sample.url}
                  alt={sample.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {sample.type}
                  </span>
                  <Image className="w-4 h-4 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-900 text-sm">{sample.name}</h4>
                <p className="text-xs text-gray-500 mt-1">Click to analyze</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;