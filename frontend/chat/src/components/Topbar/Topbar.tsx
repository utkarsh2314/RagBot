type Props = { onOpenUpload: () => void; collapsed: boolean; onToggle: () => void };

export default function Topbar({ onOpenUpload }: Props) {
  return (
    <div className="flex items-center justify-between  pr-5 py-4 ">

      <div className="text-2xl pl-5 font-bold text-indigo-500">RagBot</div>

      <div className="flex items-center gap-4">

        <button
          onClick={onOpenUpload}
          className="relative inline-flex items-center justify-center px-4 py-2 rounded-full
                     bg-slate-800 text-indigo-500 font-semibold text-sm shadow-md shadow-indigo-900/30
                     hover:bg-slate-700 hover:shadow-lg hover:shadow-indigo-900/40
                     active:bg-slate-800 transition-all duration-200"
        >
          + Add New Document
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-semibold">
            U
          </div>
        </div>
      </div>

    </div>
  );
}
