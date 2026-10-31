import React from 'react';
import { AlertTriangle, CheckCircle, Brain, Activity, FileText, Download, Eye } from 'lucide-react';

interface DiagnosisResultsProps {
  analysisComplete: boolean;
}

const DiagnosisResults: React.FC<DiagnosisResultsProps> = ({ analysisComplete }) => {
  const results = {
    primary: {
      classification: 'Tumor Detected',
      confidence: 92.3,
      type: 'Glioblastoma (Grade IV)',
      malignancy: 'Malignant',
      size: '3.2 cm x 2.8 cm',
      location: 'Left frontal lobe'
    },
    secondary: [
      { label: 'Tumor probability', value: '92.3%', status: 'high' },
      { label: 'Edema presence', value: '78.1%', status: 'medium' },
      { label: 'Necrosis detected', value: '85.7%', status: 'high' },
      { label: 'Enhancement pattern', value: 'Ring-enhancing', status: 'concerning' }
    ],
    metrics: {
      processingTime: '2.3s',
      modelVersion: 'ResNet50-Medical v2.1',
      lastUpdated: '2025-01-13'
    }
  };

  if (!analysisComplete) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Primary Results */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8" />
            <div>
              <h3 className="text-2xl font-bold">{results.primary.classification}</h3>
              <p className="text-red-100">High confidence detection</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Confidence Score</label>
              <div className="mt-2">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${results.primary.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-2xl font-bold text-red-600">{results.primary.confidence}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tumor Type</label>
              <p className="text-lg font-semibold text-gray-900 mt-2">{results.primary.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <label className="text-sm font-medium text-red-600 uppercase tracking-wider">Malignancy</label>
              <p className="text-lg font-semibold text-red-800 mt-1">{results.primary.malignancy}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <label className="text-sm font-medium text-blue-600 uppercase tracking-wider">Size</label>
              <p className="text-lg font-semibold text-blue-800 mt-1">{results.primary.size}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <label className="text-sm font-medium text-purple-600 uppercase tracking-wider">Location</label>
              <p className="text-lg font-semibold text-purple-800 mt-1">{results.primary.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-blue-600" />
          Detailed Analysis
        </h4>
        
        <div className="space-y-4">
          {results.secondary.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{item.label}</span>
              <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold text-gray-900">{item.value}</span>
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'high' ? 'bg-red-500' :
                  item.status === 'medium' ? 'bg-yellow-500' :
                  item.status === 'concerning' ? 'bg-orange-500' : 'bg-green-500'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions & Metadata */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-semibold text-gray-900 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-green-600" />
            Actions & Report
          </h4>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
            <span>View 3D Model</span>
          </button>
          <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Brain className="w-4 h-4" />
            <span>Second Opinion</span>
          </button>
        </div>

        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Processing Time:</span>
              <p className="text-gray-900">{results.metrics.processingTime}</p>
            </div>
            <div>
              <span className="font-medium">Model Version:</span>
              <p className="text-gray-900">{results.metrics.modelVersion}</p>
            </div>
            <div>
              <span className="font-medium">Last Updated:</span>
              <p className="text-gray-900">{results.metrics.lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResults;