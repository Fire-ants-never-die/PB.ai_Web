
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Performance from "./pages/Performance";
import ChartDemo from "./pages/ChartDemo";

// 임시 컴포넌트
const Index = () => <div className="p-8"><h1 className="text-3xl font-bold">홈</h1></div>;
const NotFound = () => <div className="p-8"><h1 className="text-3xl font-bold">404 Not Found</h1></div>;
const MarketNews = () => <div className="p-8"><h1 className="text-3xl font-bold">시장 뉴스</h1></div>;
const Stocks = () => <div className="p-8"><h1 className="text-3xl font-bold">주식</h1></div>;
const Markets = () => <div className="p-8"><h1 className="text-3xl font-bold">시장</h1></div>;
const Currencies = () => <div className="p-8"><h1 className="text-3xl font-bold">통화</h1></div>;
const Global = () => <div className="p-8"><h1 className="text-3xl font-bold">글로벌</h1></div>;
const Portfolio = () => <div className="p-8"><h1 className="text-3xl font-bold">포트폴리오</h1></div>;
const Analysis = () => <div className="p-8"><h1 className="text-3xl font-bold">분석</h1></div>;
const Settings = () => <div className="p-8"><h1 className="text-3xl font-bold">설정</h1></div>;

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chart-demo" element={<ChartDemo />} />
          <Route path="/market-news" element={<MarketNews />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/currencies" element={<Currencies />} />
          <Route path="/global" element={<Global />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
