import React, { useState } from 'react';
import { X } from 'lucide-react';
interface Lead {
  id: string;
  name: string;
}
interface AddNoteModalProps {
  lead: Lead;
  onClose: () => void;
}
export function AddNoteModal({ lead, onClose }: AddNoteModalProps) {
  const [note, setNote] = useState('');
  const handleSave = () => {
    // Mock save
    console.log('Saving note for lead:', lead.id, note);
    onClose();
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
        onClick={onClose}>
        
        <div
          className="bg-white rounded-[12px] w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}>
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title">Add TO-DO Note</h2>
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text)]">
              
              <X size={20} />
            </button>
          </div>

          <div className="mb-4">
            <div className="text-sm text-[var(--text-muted)] mb-2">
              Lead:{' '}
              <span className="font-medium text-[var(--text)]">
                {lead.name}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="field-label mb-1.5 block">Note</label>
            <textarea
              rows={4}
              placeholder="Enter your note or to-do item..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full" />
            
          </div>

          <div className="flex gap-3 justify-end">
            <button className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleSave}>
              Save Note
            </button>
          </div>
        </div>
      </div>
    </>);

}