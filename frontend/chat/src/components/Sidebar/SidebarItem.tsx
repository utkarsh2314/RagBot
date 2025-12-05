import React from "react";
import {
  HomeIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

type IconName = "home" | "doc" | "calendar" | "chat" | "settings";

const iconMap: Record<IconName, React.ElementType> = {
  home: HomeIcon,
  doc: DocumentTextIcon,
  calendar: CalendarDaysIcon,
  chat: ChatBubbleLeftIcon,
  settings: Cog6ToothIcon,
};

type Props = {
  children: React.ReactNode;
  collapsed: boolean;
  icon: IconName;
  active?: boolean;
};

export default function SidebarItem({ children, collapsed, icon, active }: Props) {
  const Icon = iconMap[icon];

  return (
    <button
      className={`w-full flex items-center gap-3 py-3 px-4 rounded-md transition
        hover:bg-slate-800
        ${active ? "bg-slate-800 font-semibold text-indigo-600" : ""}
      `}
    >
      <Icon className="h-6 w-6 text-indigo-500" />

      {!collapsed && (
        <span className="text-sm text-gray-700">
          {children}
        </span>
      )}
    </button>
  );
}
