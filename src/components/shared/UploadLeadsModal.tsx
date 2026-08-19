import React, { useState, useRef, Fragment } from 'react';
import {
  X,
  Upload,
  FileSpreadsheet,
  Facebook,
  ChevronRight,
  Check,
  Download,
  AlertCircle,
  Sparkles,
  ArrowLeft } from
'lucide-react';
interface UploadLeadsModalProps {
  onClose: () => void;
  onComplete?: (count: number) => void;
}
type Source = 'csv' | 'excel' | 'facebook' | 'google' | 'crm';
type Step = 'source' | 'map' | 'done';
const SOURCES: {
  id: Source;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}[] = [
{
  id: 'csv',
  label: 'CSV file',
  description: 'Upload a comma-separated file',
  icon: <FileSpreadsheet size={18} />,
  accent: 'text-emerald-600 bg-emerald-50 border-emerald-200'
},
{
  id: 'excel',
  label: 'Excel (.xlsx)',
  description: 'Upload an Excel spreadsheet',
  icon: <FileSpreadsheet size={18} />,
  accent: 'text-green-700 bg-green-50 border-green-200'
},
{
  id: 'facebook',
  label: 'Facebook Lead Ads',
  description: 'Sync leads from Meta forms',
  icon: <Facebook size={18} />,
  accent: 'text-blue-600 bg-blue-50 border-blue-200'
},
{
  id: 'google',
  label: 'Google Forms',
  description: 'Import responses from Google',
  icon: <FileSpreadsheet size={18} />,
  accent: 'text-amber-600 bg-amber-50 border-amber-200'
},
{
  id: 'crm',
  label: 'Other CRM',
  description: 'Export from Salesforce, Zoho, etc.',
  icon: <Sparkles size={18} />,
  accent: 'text-purple-600 bg-purple-50 border-purple-200'
}];

const SAMPLE_PREVIEW = [
{
  name: 'Aarav Sharma',
  phone: '+91 98213 45678',
  email: 'aarav.s@gmail.com',
  model: 'Galaxy Z Flip8 5G'
},
{
  name: 'Priya Menon',
  phone: '+91 99304 12389',
  email: 'priya.m@yahoo.in',
  model: 'Galaxy S24 Ultra 5G'
},
{
  name: 'Rahul Kapoor',
  phone: '+91 98765 43210',
  email: 'rahul.k@gmail.com',
  model: 'Galaxy Z Fold8 Ultra 5G'
},
{
  name: 'Sneha Iyer',
  phone: '+91 90040 11223',
  email: 'sneha.iyer@outlook.com',
  model: 'Neo QLED 8K QN900D'
}];

const FIELD_MAP = [
{
  source: 'Full Name',
  target: 'name',
  required: true
},
{
  source: 'Mobile Number',
  target: 'phone',
  required: true
},
{
  source: 'Email Address',
  target: 'email',
  required: false
},
{
  source: 'Product Interest',
  target: 'model',
  required: false
},
{
  source: 'City',
  target: 'dealer.city',
  required: false
}];

export function UploadLeadsModal({
  onClose,
  onComplete
}: UploadLeadsModalProps) {
  const [step, setStep] = useState<Step>('source');
  const [source, setSource] = useState<Source | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [assignDealer, setAssignDealer] = useState('auto');
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [notifyAi, setNotifyAi] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileNeeded = source === 'csv' || source === 'excel';
  const canContinue =
  step === 'source' && source !== null && (!fileNeeded || file !== null);
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFile(files[0]);
  };
  const handleContinue = () => {
    if (step === 'source') setStep('map');else
    if (step === 'map') {
      setStep('done');
      onComplete?.(SAMPLE_PREVIEW.length);
    }
  };
  const handleBack = () => {
    if (step === 'map') setStep('source');
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[680px] max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Upload size={18} className="text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Upload Leads
              </h2>
            </div>
            <p className="text-xs text-gray-500 max-w-[480px]">
              Bring leads from other sources into Spotlight LMS so you can
              manage every lead — from campaigns and elsewhere — in one place.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
            aria-label="Close">
            
            <X size={18} />
          </button>
        </div>

        {/* Stepper */}
        {step !== 'done' &&
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2 text-xs">
            {[
          {
            id: 'source',
            label: 'Source'
          },
          {
            id: 'map',
            label: 'Review & Assign'
          },
          {
            id: 'done',
            label: 'Import'
          }].
          map((s, i, arr) => {
            const stepIndex = ['source', 'map', 'done'].indexOf(step);
            const myIndex = ['source', 'map', 'done'].indexOf(s.id);
            const isActive = stepIndex === myIndex;
            const isDone = stepIndex > myIndex;
            return (
              <Fragment key={s.id}>
                  <div className="flex items-center gap-2">
                    <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${isActive ? 'bg-blue-500 text-white' : isDone ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                    
                      {isDone ? <Check size={10} /> : myIndex + 1}
                    </span>
                    <span
                    className={`font-medium ${isActive ? 'text-gray-900' : isDone ? 'text-blue-600' : 'text-gray-400'}`}>
                    
                      {s.label}
                    </span>
                  </div>
                  {i < arr.length - 1 &&
                <ChevronRight size={14} className="text-gray-300" />
                }
                </Fragment>);

          })}
          </div>
        }

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* STEP 1: SOURCE */}
          {step === 'source' &&
          <div className="flex flex-col gap-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">
                  1. Choose source
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {SOURCES.map((s) => {
                  const selected = source === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSource(s.id);
                        if (s.id !== 'csv' && s.id !== 'excel') setFile(null);
                      }}
                      className={`text-left p-3 rounded-lg border-2 transition-all flex items-start gap-3 ${selected ? 'border-blue-500 bg-blue-50/40' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                      
                        <span
                        className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${s.accent}`}>
                        
                          {s.icon}
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-semibold text-gray-900">
                            {s.label}
                          </span>
                          <span className="block text-[11px] text-gray-500 mt-0.5 leading-snug">
                            {s.description}
                          </span>
                        </span>
                        {selected &&
                      <Check
                        size={14}
                        className="text-blue-500 flex-shrink-0 mt-0.5" />

                      }
                      </button>);

                })}
                </div>
              </div>

              {fileNeeded &&
            <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      2. Upload file
                    </div>
                    <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      <Download size={11} /> Download sample template
                    </button>
                  </div>
                  <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : file ? 'border-emerald-300 bg-emerald-50/40' : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'}`}>
                
                    <input
                  ref={fileInputRef}
                  type="file"
                  accept={source === 'csv' ? '.csv' : '.xlsx,.xls'}
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)} />
                
                    {file ?
                <div className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <FileSpreadsheet
                      size={18}
                      className="text-emerald-600" />
                    
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB · Click to replace
                        </div>
                      </div> :

                <div className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Upload size={18} className="text-blue-600" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          Drop your file here, or click to browse
                        </div>
                        <div className="text-xs text-gray-500">
                          {source === 'csv' ?
                    '.csv files only · Max 10 MB' :
                    '.xlsx, .xls files · Max 10 MB'}
                        </div>
                      </div>
                }
                  </div>
                </div>
            }

              {source && !fileNeeded &&
            <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-3.5 flex items-start gap-2.5">
                  <AlertCircle
                size={14}
                className="text-blue-500 mt-0.5 flex-shrink-0" />
              
                  <div className="text-xs text-gray-700 leading-relaxed">
                    You'll be redirected to connect your{' '}
                    <span className="font-semibold">
                      {SOURCES.find((s) => s.id === source)?.label}
                    </span>{' '}
                    account on the next step. Leads will sync automatically once
                    the connection is approved.
                  </div>
                </div>
            }
            </div>
          }

          {/* STEP 2: MAP & ASSIGN */}
          {step === 'map' &&
          <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Field mapping
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 font-medium">
                    Auto-detected
                  </span>
                </div>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-[1fr_24px_1fr_72px] gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                    <span>Source column</span>
                    <span></span>
                    <span>LMS field</span>
                    <span className="text-right">Required</span>
                  </div>
                  {FIELD_MAP.map((f) =>
                <div
                  key={f.target}
                  className="grid grid-cols-[1fr_24px_1fr_72px] gap-2 px-3 py-2 border-b border-gray-100 last:border-b-0 items-center text-xs">
                  
                      <span className="text-gray-900 font-medium">
                        {f.source}
                      </span>
                      <ChevronRight size={12} className="text-gray-300" />
                      <span className="text-gray-700 font-mono">
                        {f.target}
                      </span>
                      <span className="text-right">
                        {f.required ?
                    <span className="text-red-600 font-medium">
                            Required
                          </span> :

                    <span className="text-gray-400">Optional</span>
                    }
                      </span>
                    </div>
                )}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">
                  Preview · first 4 rows
                </div>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                    <span>Name</span>
                    <span>Phone</span>
                    <span>Email</span>
                    <span>Product</span>
                  </div>
                  {SAMPLE_PREVIEW.map((row, i) =>
                <div
                  key={i}
                  className="grid grid-cols-4 gap-2 px-3 py-2 border-b border-gray-100 last:border-b-0 text-xs text-gray-700">
                  
                      <span className="font-medium text-gray-900 truncate">
                        {row.name}
                      </span>
                      <span className="truncate">{row.phone}</span>
                      <span className="truncate">{row.email}</span>
                      <span className="truncate">{row.model}</span>
                    </div>
                )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 block">
                    Assign to store
                  </label>
                  <select
                  value={assignDealer}
                  onChange={(e) => setAssignDealer(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white">

                    <option value="auto">Auto-assign by city / pincode</option>
                    <option value="dl069">
                      Samsung SmartPlaza – Sahil Electronics (DL069)
                    </option>
                    <option value="mh412">
                      Samsung SmartPlaza – Pasco Retail (MH412)
                    </option>
                    <option value="ka501">
                      Samsung SmartPlaza – Capital Electronics (KA501)
                    </option>
                    <option value="manual">
                      Leave unassigned — assign later
                    </option>
                  </select>
                </div>

                <label className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                  type="checkbox"
                  checked={skipDuplicates}
                  onChange={(e) => setSkipDuplicates(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded" />
                
                  <span>
                    <span className="block text-sm font-medium text-gray-900">
                      Skip duplicates
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">
                      Detect duplicates by phone or email and skip them.
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                  type="checkbox"
                  checked={notifyAi}
                  onChange={(e) => setNotifyAi(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded" />
                
                  <span>
                    <span className="block text-sm font-medium text-gray-900 flex items-center gap-1.5">
                      Trigger AI Voice Agent follow-up
                      <Sparkles
                      size={12}
                      className="text-blue-500 fill-blue-500" />
                    
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">
                      Auto-call uploaded leads within 5 minutes to qualify
                      intent.
                    </span>
                  </span>
                </label>
              </div>
            </div>
          }

          {/* STEP 3: DONE */}
          {step === 'done' &&
          <div className="py-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <Check size={28} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
                {SAMPLE_PREVIEW.length} leads imported
              </h3>
              <p className="text-sm text-gray-500 max-w-[380px] mb-5">
                Your leads are now in the LMS. They'll appear at the top of the
                list and{' '}
                {notifyAi ?
              'the AI Voice Agent will start calling them shortly.' :
              'are ready for manual outreach.'}
              </p>
              <div className="grid grid-cols-3 gap-3 w-full max-w-[360px]">
                <div className="rounded-lg border border-gray-200 p-2.5 text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {SAMPLE_PREVIEW.length}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Imported
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 p-2.5 text-center">
                  <div className="text-lg font-semibold text-gray-900">0</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Skipped
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 p-2.5 text-center">
                  <div className="text-lg font-semibold text-gray-900">0</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Errors
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          {step === 'done' ?
          <>
              <span className="text-xs text-gray-500">
                Imports are logged in Activity for audit.
              </span>
              <button
              onClick={onClose}
              className="h-9 px-5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors">
              
                Done
              </button>
            </> :

          <>
              {step === 'map' ?
            <button
              onClick={handleBack}
              className="h-9 px-4 rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium flex items-center gap-1.5 transition-colors">
              
                  <ArrowLeft size={14} /> Back
                </button> :

            <button
              onClick={onClose}
              className="h-9 px-4 rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors">
              
                  Cancel
                </button>
            }
              <button
              onClick={handleContinue}
              disabled={step === 'source' && !canContinue}
              className="h-9 px-5 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium flex items-center gap-1.5 transition-colors">
              
                {step === 'map' ? 'Import leads' : 'Continue'}
                <ChevronRight size={14} />
              </button>
            </>
          }
        </div>
      </div>
    </div>);

}