
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { NewsCard } from '@/components/news/NewsCard';
import { mockNews } from '@/utils/stocksApi';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const MarketNews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Stocks', 'Markets', 'Economy', 'Technology', 'Crypto'];

  const filteredNews = mockNews.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' ||
    news.relatedSymbols?.some(() =>
    categories.includes(selectedCategory)
    );
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout title="Market News">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Market News</h1>
            <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
              Stay updated with the latest market developments and financial news
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64" />

            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) =>
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer transition-colors"
            onClick={() => setSelectedCategory(category)}>

              {category}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl -ml-[3px] pt-[16px] pl-[0px] pr-[16px] pb-[16px]">
            <div className="flex items-center gap-3">

              <div>
                <p className="font-medium" style={{ fontSize: '14px' }}>Today's Articles</p>
                <p className="text-2xl font-semibold">{filteredNews.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl pt-[16px] pl-[0px] pr-[16px] pb-[16px]">
            <div className="flex items-center gap-3">

              <div>
                <p className="font-medium" style={{ fontSize: '14px' }}>Active Sources</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl pt-[16px] pl-[0px] pr-[16px] pb-[16px]">
            <div className="flex items-center gap-3">

              <div>
                <p className="font-medium" style={{ fontSize: '14px' }}>Breaking News</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* News Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <NewsCard news={filteredNews} />
          </div>
        </div>

        {/* Load More */}
        <div className="text-center pt-6">
          <Button variant="outline" className="w-full sm:w-auto">
            Load More Articles
          </Button>
        </div>
      </div>
    </PageLayout>);

};

export default MarketNews;
