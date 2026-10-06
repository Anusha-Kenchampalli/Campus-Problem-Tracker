import React, { useState } from 'react';
import { UploadCloud, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

const ImageUpload = ({ value, onChange, maxSizeMB = 5 }) => {
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');

    // File type validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    // File size validation
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    // Convert to DataURL for preview demonstration
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange(null);
    setError('');
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative group max-w-sm overflow-hidden rounded-2xl border border-indigo-500/30 bg-slate-950 p-2">
          <img
            src={value}
            alt="Uploaded Evidence Preview"
            className="w-full h-48 object-cover rounded-xl"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-rose-600 text-white rounded-xl shadow-lg border border-slate-700 transition"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="pt-2 px-2 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 font-semibold text-emerald-400">
              <ImageIcon className="w-3.5 h-3.5" /> Image Attached
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-rose-400 hover:underline font-semibold"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-2xl cursor-pointer bg-slate-950/60 hover:bg-slate-900/60 transition group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
              <div className="w-12 h-12 mb-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition duration-200">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-slate-200">
                Click to upload or drag & drop evidence photo
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                JPG, PNG, WEBP (Max {maxSizeMB}MB) — Optional
              </p>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {error && (
            <p className="text-xs text-rose-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
