import React from 'react';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

interface MetricsPanelProps {
  analysisComplete: boolean;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ analysisComplete }) => {
  const metrics = {
    accuracy: 94.2,
    precision: 91.8,
    recall: 89.3,
    f1Score: 90.5,
    auc: 0.96,
    processingTime: 2.3,
    confidence: 92.3
  };

  const MetricCard = ({ 
    title, 
    value, 
    unit = '%', 
    icon: Icon, 
    color, 
    description 
  }: {
    title: string;
    value: number;
    unit?: string;
    icon: any;
    color: string;
    description: string;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" style={{ color }} />
          <h4 className="font-semibold text-gray-900">{title}</h4>
        </div>
      </div>
      
      {analysisComplete ? (
        <>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {value}{unit}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
          
          {/* Progress bar for percentage values */}
          {unit === '%' && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${value}%`,
                    backgroundColor: color
                  }}
                ></div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
          Model Performance Metrics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard
            title="Accuracy"
            value={metrics.accuracy}
            icon={Target}
            color="#059669"
            description="Overall correct predictions"
          />
          
          <MetricCard
            title="Precision"
            value={metrics.precision}
            icon={TrendingUp}
            color="#0EA5E9"
            description="True positive rate"
          />
          
          <MetricCard
            title="Recall"
            value={metrics.recall}
            icon={BarChart3}
            color="#8B5CF6"
            description="Sensitivity measure"
          />
          
          <MetricCard
            title="F1 Score"
            value={metrics.f1Score}
            icon={Zap}
            color="#F59E0B"
            description="Harmonic mean of precision and recall"
          />
        </div>
      </div>

      {/* ROC Curve Visualization */}
      {analysisComplete && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">ROC Curve Analysis</h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="bg-gray-50 rounded-lg p-4 h-48 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">ROC Curve Visualization</p>
                  <p className="text-xs">AUC: {metrics.auc}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-900 mb-2">AUC Score</h5>
                <div className="text-2xl font-bold text-green-800">{metrics.auc}</div>
                <p className="text-sm text-green-700">Excellent discrimination ability</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-900 mb-2">Processing Speed</h5>
                <div className="text-2xl font-bold text-blue-800">{metrics.processingTime}s</div>
                <p className="text-sm text-blue-700">Fast inference time</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Model Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Model Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Architecture</label>
              <p className="text-gray-900">ResNet50 + Transfer Learning</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Training Dataset</label>
              <p className="text-gray-900">Brain MRI Dataset (15,000+ images)</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Validation Method</label>
              <p className="text-gray-900">5-fold Cross Validation</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Optimizer</label>
              <p className="text-gray-900">Adam (lr=0.001)</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Loss Function</label>
              <p className="text-gray-900">Cross Entropy Loss</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Batch Size</label>
              <p className="text-gray-900">32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;