import SidebarItem from './SidebarItem'

type Props = {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: Props) {
  return (
    <div
      className={`bg-slate-900 h-full transition-all duration-200 
      ${collapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex flex-col h-full">


        {/* Navigation */}
        <nav className="flex-1 align-middle px-2 py-4 text-slate-200">
          <SidebarItem collapsed={collapsed} icon="home">Dashboard</SidebarItem>
          <SidebarItem collapsed={collapsed} icon="chat" active>Chatbot</SidebarItem>
          <SidebarItem collapsed={collapsed} icon="settings">Settings</SidebarItem>
        </nav>

        {/* Collapse Button */}
        <div className="p-3 ">
          <button
            onClick={onToggle}
            className="w-full py-2 rounded-lg bg-slate-800 text-slate-200 
                       hover:bg-slate-700 hover:text-indigo-400 transition flex items-center justify-center gap-2 font-medium"
          >
            <span
              className={`inline-block transform transition-transform duration-300 ${
                collapsed ? 'rotate-0' : 'rotate-180'
              }`}
            >
              ➤
            </span>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>

      </div>
    </div>
  )
}
