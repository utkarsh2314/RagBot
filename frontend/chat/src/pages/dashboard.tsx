import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Chatbot from "../components/Chatbot/Chatbot";
import UploadModal from "../components/UploadModal/UploadModal";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      {/* Sidebar */}
      <Topbar
          collapsed={collapsed}
          onToggle={toggleSidebar}
          onOpenUpload={() => setUploadOpen(true)}
        />


      {/* Main Layout */}
      <div className="flex flex-row flex-1">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
        
        <main className="flex-1 p-6 overflow-hidden">
          <div className="flex h-full gap-6">
            <section className="flex flex-col flex-1">
              <Chatbot />
            </section>
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}
