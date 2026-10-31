import React, { useState } from 'react';
import { User, Calendar, FileText, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const PatientHistory: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const patients = [
    {
      id: 1,
      name: 'John Anderson',
      age: 45,
      gender: 'Male',
      lastScan: '2025-01-10',
      diagnosis: 'Glioblastoma Grade IV',
      status: 'critical',
      confidence: 94.2,
      scans: [
        { date: '2025-01-10', type: 'Brain MRI', result: 'Tumor detected', confidence: 94.2 },
        { date: '2024-12-15', type: 'Brain MRI', result: 'Suspicious mass', confidence: 87.3 },
        { date: '2024-11-20', type: 'Brain MRI', result: 'Normal', confidence: 92.1 }
      ]
    },
    {
      id: 2,
      name: 'Sarah Williams',
      age: 38,
      gender: 'Female',
      lastScan: '2025-01-12',
      diagnosis: 'Normal',
      status: 'normal',
      confidence: 98.7,
      scans: [
        { date: '2025-01-12', type: 'Chest CT', result: 'Normal', confidence: 98.7 },
        { date: '2024-12-20', type: 'Chest CT', result: 'Normal', confidence: 97.2 }
      ]
    },
    {
      id: 3,
      name: 'Michael Chen',
      age: 52,
      gender: 'Male',
      lastScan: '2025-01-11',
      diagnosis: 'Benign mass',
      status: 'benign',
      confidence: 89.4,
      scans: [
        { date: '2025-01-11', type: 'Brain MRI', result: 'Benign mass', confidence: 89.4 },
        { date: '2024-11-30', type: 'Brain MRI', result: 'Small lesion', confidence: 78.2 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'benign': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'normal': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertCircle className="w-5 h-5" />;
      case 'benign': return <Clock className="w-5 h-5" />;
      case 'normal': return <CheckCircle className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Patient List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              Patient Records
            </h3>
          </div>
          
          <div className="divide-y">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedPatient === patient.id ? 'bg-blue-50 border-r-4 border-blue-600' : ''
                }`}
                onClick={() => setSelectedPatient(patient.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                    {getStatusIcon(patient.status)}
                    <span className="ml-1 capitalize">{patient.status}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Age: {patient.age} • {patient.gender}</p>
                  <p>Last scan: {patient.lastScan}</p>
                  <p>Diagnosis: {patient.diagnosis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Details */}
      <div className="lg:col-span-2">
        {selectedPatient ? (
          <div className="space-y-6">
            {(() => {
              const patient = patients.find(p => p.id === selectedPatient);
              if (!patient) return null;

              return (
                <>
                  {/* Patient Overview */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{patient.name}</h3>
                        <p className="text-gray-600">{patient.age} years old • {patient.gender}</p>
                      </div>
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${getStatusColor(patient.status)}`}>
                        {getStatusIcon(patient.status)}
                        <span className="font-semibold capitalize">{patient.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-sm font-medium text-gray-500">Current Diagnosis</label>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{patient.diagnosis}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-sm font-medium text-gray-500">Latest Confidence</label>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{patient.confidence}%</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-sm font-medium text-gray-500">Total Scans</label>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{patient.scans.length}</p>
                      </div>
                    </div>
                  </div>

                  {/* Scan History */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <Calendar className="w-6 h-6 mr-2 text-green-600" />
                      Scan History
                    </h4>
                    
                    <div className="space-y-4">
                      {patient.scans.map((scan, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">{scan.type}</h5>
                              <p className="text-sm text-gray-600">{scan.date}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{scan.result}</p>
                            <p className="text-sm text-gray-600">Confidence: {scan.confidence}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trend Analysis */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
                      Trend Analysis
                    </h4>
                    
                    <div className="bg-gray-50 rounded-lg p-6 h-48 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Confidence Score Trend</p>
                        <p className="text-xs">Track progression over time</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Select a Patient</h3>
            <p className="text-gray-400">Choose a patient from the list to view their medical history and scan results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHistory;