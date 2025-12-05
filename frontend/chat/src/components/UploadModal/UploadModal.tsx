import { useEffect } from "react";
import ConflictModal from "./ConflictModal";
import { useUpload } from "./UploadService";

type Props = { open: boolean; onClose: () => void };

export default function UploadModal({ open, onClose }: Props) {
  const {
    file,
    setFile,
    status,
    uploading,
    conflict,
    setConflict,
    handleUpload,
    reset,
    setStatus
  } = useUpload(onClose);

  useEffect(() => {
    if (!status) return;
    onClose();
  }, [status]);

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        {/* Modal */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6 w-full max-w-lg">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-100">Upload Policy Document</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition">
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4">

            {/* File input */}
            <div>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="text-gray-300 bg-slate-800 border border-slate-700 rounded-lg p-2 w-full cursor-pointer 
                           file:bg-slate-700 file:text-gray-200 file:border-none file:px-3 file:py-1 
                           file:rounded file:cursor-pointer"
              />

              {file && (
                <div className="text-sm text-gray-400 mt-1">
                  Selected: {file.name}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">

              {/* Upload */}
              <button
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition 
                           text-white rounded-lg shadow shadow-indigo-900/20 disabled:opacity-50"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>

              {/* Cancel */}
              <button
                className="px-4 py-2 border border-slate-700 text-gray-300 rounded-lg 
                           hover:bg-slate-800 transition disabled:opacity-50"
                onClick={onClose}
                disabled={uploading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conflict Modal */}
      {conflict && file && (
        <ConflictModal
          open={true}
          oldFile={conflict.oldFile}
          newFile={conflict.newFile}
          onClose={() => setConflict(null)}
          onResolved={(msg) => {
            setConflict(null);
            setStatus({ ok: true, msg });
          }}
        />
      )}
    </>
  );
}
