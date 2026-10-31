import React, { useState } from 'react';
import { Upload, Brain, Activity, FileText, BarChart3, AlertCircle, CheckCircle, Clock, Eye } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import DiagnosisResults from './components/DiagnosisResults';
import Heatmap from './components/Heatmap';
import MetricsPanel from './components/MetricsPanel';
import PatientHistory from './components/PatientHistory';

function App() {
  const [currentView, setCurrentView] = useState<'upload' | 'analysis' | 'history'>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentView('analysis');
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysisComplete(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MediScan AI</h1>
                <p className="text-sm text-gray-600">Advanced Medical Imaging Diagnosis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'upload', label: 'Image Upload', icon: Upload },
              { id: 'analysis', label: 'Analysis', icon: Activity },
              { id: 'history', label: 'Patient History', icon: FileText }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentView(id as any)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 font-medium transition-colors ${
                  currentView === id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'upload' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Medical Image</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload CT or MRI scans for AI-powered tumor detection and classification. 
                Supported formats: DICOM, PNG, JPG
              </p>
            </div>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        )}

        {currentView === 'analysis' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
              {!analysisComplete && (
                <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600 animate-spin" />
                  <span className="text-yellow-800 font-medium">Analyzing...</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {uploadedImage && <Heatmap imageUrl={uploadedImage} analysisComplete={analysisComplete} />}
                <MetricsPanel analysisComplete={analysisComplete} />
              </div>
              <div>
                <DiagnosisResults analysisComplete={analysisComplete} />
              </div>
            </div>
          </div>
        )}

        {currentView === 'history' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Patient History</h2>
            <PatientHistory />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;