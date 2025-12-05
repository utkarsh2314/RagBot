import { useConflict } from "./ConflictService";
import {
  ArrowPathIcon,
  DocumentPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Props = {
  open: boolean;
  oldFile: string;
  newFile: string;
  onClose: () => void;
  onResolved: (msg: string) => void;
};

export default function ConflictModal({
  open,
  oldFile,
  newFile,
  onClose,
  onResolved,
}: Props) {
  const { loading, oldFileUrl, replaceExisting, uploadSeparate } =
    useConflict(oldFile, newFile, onResolved);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="bg-gray-800 rounded-lg shadow p-6 w-full max-w-3xl">
        <h3 className="text-lg font-semibold mb-4 text-red-500">
          Similar Policy Found
        </h3>

        <div className="mb-4">
          <p className="text-gray-500 font-medium mb-2">Existing Document:</p>

          <div className="border rounded-lg overflow-hidden h-[300px] shadow">
            <iframe
              src={oldFileUrl}
              title="Existing Document"
              className="w-full h-full"
            />
          </div>

          <p className="mt-2 text-sm text-gray-500">
            File name: <span className="font-semibold">{oldFile}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 mt-6">
          {/* Replace Existing */}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2"
            onClick={replaceExisting}
            disabled={loading}
          >
            <ArrowPathIcon className="h-5 w-5" />
            Replace Existing
          </button>

          {/* Upload as New */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
            onClick={uploadSeparate}
            disabled={loading}
          >
            <DocumentPlusIcon className="h-5 w-5" />
            Upload as New
          </button>

          {/* Cancel */}
          <button
            className="ml-auto px-4 bg-gray-900 text-white py-2 border  rounded flex items-center gap-2"
            onClick={onClose}
            disabled={loading}
          >
            <XMarkIcon className="h-5 w-5" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
