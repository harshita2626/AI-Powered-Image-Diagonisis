import React, { useState, useEffect } from 'react';
import { Eye, Layers, Maximize, RotateCcw } from 'lucide-react';

interface HeatmapProps {
  imageUrl: string;
  analysisComplete: boolean;
}

const Heatmap: React.FC<HeatmapProps> = ({ imageUrl, analysisComplete }) => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [opacity, setOpacity] = useState(0.7);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Simulate heatmap generation
  const generateHeatmapOverlay = () => {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Simulated tumor region - high attention */}
        <div 
          className="absolute bg-red-500 rounded-full opacity-60 animate-pulse"
          style={{
            top: '35%',
            left: '40%',
            width: '80px',
            height: '60px',
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)',
            opacity: opacity
          }}
        ></div>
        
        {/* Secondary attention areas */}
        <div 
          className="absolute bg-yellow-400 rounded-full opacity-40"
          style={{
            top: '25%',
            left: '35%',
            width: '40px',
            height: '40px',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)',
            opacity: opacity * 0.7
          }}
        ></div>
        
        <div 
          className="absolute bg-orange-400 rounded-full opacity-40"
          style={{
            top: '50%',
            left: '50%',
            width: '30px',
            height: '30px',
            boxShadow: '0 0 15px rgba(251, 146, 60, 0.4)',
            opacity: opacity * 0.5
          }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Eye className="w-6 h-6 mr-2 text-blue-600" />
            Medical Image Analysis
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Grad-CAM Visualization</span>
            <div className={`w-3 h-3 rounded-full ${analysisComplete ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Image Container */}
        <div className="relative bg-black rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '1/1' }}>
          <img
            src={imageUrl}
            alt="Medical scan"
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          />
          
          {/* Heatmap Overlay */}
          {analysisComplete && showHeatmap && generateHeatmapOverlay()}
          
          {/* Analysis Progress */}
          {!analysisComplete && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
                <p className="text-lg font-medium">Analyzing regions of interest...</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        {analysisComplete && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    showHeatmap
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Heatmap</span>
                </button>
                
                <button
                  onClick={() => setZoomLevel(zoomLevel === 1 ? 2 : 1)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                  <span>{zoomLevel === 1 ? 'Zoom In' : 'Reset'}</span>
                </button>
              </div>
            </div>

            {/* Opacity Slider */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Heatmap Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Transparent</span>
                <span>Opaque</span>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Attention Map Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">High attention (tumor region)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-gray-700">Medium attention (suspicious area)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                  <span className="text-sm text-gray-700">Low attention (normal tissue)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Heatmap;