import { useAppStore } from '@/lib/store';
import { SIDEBAR_MENU } from '@/lib/data/static';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Plus,
  Search,
  Library,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();
  const isMobile = useIsMobile();

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            PB
          </div>
          {isSidebarOpen && <span className="font-semibold">PB.ai</span>}
        </div>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      <Separator />

      {/* Menu Items */}
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            size={isSidebarOpen ? 'default' : 'icon'}
          >
            <Plus className="h-4 w-4" />
            {isSidebarOpen && <span>{SIDEBAR_MENU.newReport}</span>}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            size={isSidebarOpen ? 'default' : 'icon'}
          >
            <Search className="h-4 w-4" />
            {isSidebarOpen && <span>{SIDEBAR_MENU.search}</span>}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            size={isSidebarOpen ? 'default' : 'icon'}
          >
            <Library className="h-4 w-4" />
            {isSidebarOpen && <span>{SIDEBAR_MENU.library}</span>}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            size={isSidebarOpen ? 'default' : 'icon'}
          >
            <TrendingUp className="h-4 w-4" />
            {isSidebarOpen && <span>{SIDEBAR_MENU.portfolio}</span>}
          </Button>
        </div>

        {isSidebarOpen && (
          <>
            <Separator className="my-4" />

            {/* Recent Reports */}
            <div className="space-y-2">
              <p className="px-2 text-xs font-medium text-muted-foreground">
                {SIDEBAR_MENU.recentReports}
              </p>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  {SIDEBAR_MENU.agriculture}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  {SIDEBAR_MENU.electronics}
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Suggestions */}
            <div className="space-y-2">
              <p className="px-2 text-xs font-medium text-muted-foreground">
                {SIDEBAR_MENU.suggestions}
              </p>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
              >
                {SIDEBAR_MENU.suggestions}
              </Button>
            </div>
          </>
        )}
      </ScrollArea>

      {/* User Section */}
      <Separator />
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          size={isSidebarOpen ? 'default' : 'icon'}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            U
          </div>
          {isSidebarOpen && <span>User</span>}
        </Button>
      </div>
    </div>
  );

  // Mobile: render as sheet/drawer
  if (isMobile) {
    return (
      <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[240px] p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: render as fixed sidebar with transition
  return (
    <aside
      className={`border-r bg-background transition-all duration-300 ${
        isSidebarOpen ? 'w-[240px]' : 'w-[60px]'
      }`}
    >
      {sidebarContent}
    </aside>
  );
}
