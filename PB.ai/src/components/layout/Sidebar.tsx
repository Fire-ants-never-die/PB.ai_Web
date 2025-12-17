
import { Plus, Search, Folder, BarChart, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { SIDEBAR_MENU, CHAT_LABELS } from '@/lib/data/static/labels';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export function Sidebar({ isCollapsed, onToggle, className }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const mainNavItems = [
    {
      title: SIDEBAR_MENU.newReport,
      icon: Plus,
    },
    {
      title: SIDEBAR_MENU.search,
      icon: Search,
    },
    {
      title: SIDEBAR_MENU.library,
      icon: Folder,
    },
    {
      title: SIDEBAR_MENU.portfolio,
      icon: BarChart,
    },
  ];

  const recentReports = [
    {
      name: SIDEBAR_MENU.agriculture,
      code: '004370',
    },
    {
      name: SIDEBAR_MENU.electronics,
      code: '',
    },
  ];

  const chatHistory = CHAT_LABELS.suggestions;

  const handleReportClick = (report: { name: string; code: string }) => {
    if (report.code) {
      navigate(`/company?code=${report.code}&name=${encodeURIComponent(report.name)}`);
    }
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full z-10 transition-all duration-300 ease-in-out flex flex-col",
      isCollapsed ? "w-20 bg-white" : "w-64 bg-[#F8F8F8]",
      className
    )}>
      {/* Header */}
      <div className="flex h-16 items-center relative border-b border-gray-200" style={{ top: '1.25rem' }}>
        {!isCollapsed && (
          <div className="flex items-center justify-between w-full px-4">
            <img
              src="/pb_logo.svg"
              alt="PB.ai Logo"
              className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            />
            <img
              src="/Sidebar.svg"
              alt="Sidebar Toggle"
              className="h-6 w-6 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={onToggle}
              style={{ marginRight: '1.25rem' }}
            />
          </div>
        )}
        {isCollapsed && (
          <div className="flex items-center justify-center w-full gap-3">
            <img
              src="/pb_logo.svg"
              alt="PB.ai Logo"
              className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            />
            <img
              src="/Sidebar.svg"
              alt="Sidebar Toggle"
              className="h-5 w-5 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={onToggle}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <nav className={cn(
          "flex flex-col",
          isCollapsed ? "px-2 gap-4" : "px-4 gap-1"
        )} style={!isCollapsed ? { paddingTop: '5.12rem' } : { paddingTop: '1rem', paddingBottom: '1rem' }}>
          {/* Main Navigation */}
          {mainNavItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={cn(
                  "group relative flex items-center rounded-lg transition-all duration-200 cursor-pointer",
                  isCollapsed
                    ? "justify-center px-3 py-3 hover:bg-gray-100"
                    : "px-4 py-3 hover:bg-gray-200"
                )} style={!isCollapsed ? { gap: '0.5rem' } : {}}>
                <div className="flex items-center justify-center shrink-0 text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                {!isCollapsed && (
                  <span className="font-medium text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {item.title}
                  </span>
                )}
                {/* Collapsed Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {item.title}
                  </div>
                )}
              </div>
            );
          })}

          {/* Recent Reports Section */}
          {!isCollapsed && (
            <div className="mt-6">
              <div className="px-4 mb-2">
                <span className="text-xs text-gray-500 font-medium">{SIDEBAR_MENU.recentReports}</span>
              </div>
              {recentReports.map((report, index) => (
                <div
                  key={index}
                  onClick={() => handleReportClick(report)}
                  className="group relative flex items-center gap-3 rounded-lg transition-all duration-200 cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  <span className="font-medium text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {report.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Chat Section */}
          {!isCollapsed && (
            <div className="mt-6">
              <div className="px-4 mb-2">
                <span className="text-xs text-gray-500 font-medium">{CHAT_LABELS.title}</span>
              </div>
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className="group relative flex items-center gap-3 rounded-lg transition-all duration-200 cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200 line-clamp-1">
                    {chat}
                  </span>
                </div>
              ))}
            </div>
          )}
        </nav>
      </div>

      {/* Footer - User and Logout */}
      <div className={cn(
        "border-t border-gray-200",
        isCollapsed ? "p-4 flex justify-center" : "p-4"
      )}>
        {!isCollapsed && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-default">
              <div className="flex items-center justify-center shrink-0 text-gray-600">
                <User className="h-5 w-5" strokeWidth={2} />
              </div>
              <span className="font-medium text-sm text-gray-700">User</span>
            </div>
            <div className="flex items-center justify-center shrink-0 text-gray-600 cursor-default">
              <LogOut className="h-5 w-5" strokeWidth={2} />
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="flex items-center justify-center cursor-default">
            <User className="h-5 w-5 text-gray-600" strokeWidth={2} />
          </div>
        )}
      </div>
    </aside>
  );
}
