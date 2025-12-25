
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal, Search, X, Check, RotateCcw, Filter, LayoutGrid, ArrowRight, DollarSign, TrendingUp, Clock, Star, ArrowUpNarrowWide, ArrowDownNarrowWide } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('cat') || 'الكل';
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState<string>('0');
  const [maxPrice, setMaxPrice] = useState<string>('1000');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    if (currentCategory !== 'الكل') {
      result = result.filter(p => p.category === currentCategory);
    }
    
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    
    result = result.filter(p => p.price >= min && p.price <= max);

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [currentCategory, sortBy, minPrice, maxPrice]);

  const resetFilters = () => {
    setSearchParams({ cat: 'الكل' });
    setMinPrice('0');
    setMaxPrice('1000');
    setSortBy('newest');
  };

  const sortOptions = [
    { id: 'newest', label: 'الأحدث', icon: Clock },
    { id: 'price-low', label: 'السعر: من الأقل', icon: ArrowUpNarrowWide },
    { id: 'price-high', label: 'السعر: من الأعلى', icon: ArrowDownNarrowWide },
    { id: 'rating', label: 'الأعلى تقييماً', icon: Star },
  ];

  return (
    <div className="bg-[#fcfcfd] min-h-screen pt-36 pb-40 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Navigation & Fast Access Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="flex items-center space-x-4 space-x-reverse overflow-x-auto no-scrollbar w-full md:w-auto py-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSearchParams({ cat })}
                className={`px-8 py-4 rounded-full text-sm font-black transition-all whitespace-nowrap shadow-sm border ${
                  currentCategory === cat 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200' 
                  : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3 space-x-reverse shrink-0 w-full md:w-auto">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="w-full md:w-auto p-4 px-10 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-900 hover:text-indigo-600 transition-all flex items-center justify-center gap-3 group active:scale-95"
            >
              <SlidersHorizontal size={20} className="group-hover:rotate-90 transition-transform duration-500 text-indigo-600" />
              <span className="text-sm font-black">تخصيص البحث</span>
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-12 px-2">
          <p className="text-slate-400 text-sm font-bold">وجدنا <span className="text-slate-900 font-black">{filteredProducts.length}</span> منتج يناسب ذوقك</p>
          {(currentCategory !== 'الكل' || minPrice !== '0' || maxPrice !== '1000') && (
            <button onClick={resetFilters} className="text-indigo-600 text-xs font-black flex items-center gap-2 hover:underline group">
              <RotateCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" /> إعادة تعيين الفلاتر
            </button>
          )}
        </div>

        {/* Results Grid - Enhanced Spacing (gap-10) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-12 animate-in fade-in duration-1000">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-slate-200 border border-slate-100">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">لم نجد أي نتائج</h3>
            <p className="text-slate-400 mt-3 font-medium max-w-xs mx-auto">جرب تغيير الفلاتر أو التصنيف للوصول إلى ما تبحث عنه.</p>
          </div>
        )}
      </div>

      {/* ENHANCED PROFESSIONAL SIDEBAR */}
      <div className={`fixed inset-0 z-[200] transition-all duration-700 ${isFilterOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-700 ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsFilterOpen(false)}
        />
        
        <div className={`absolute top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full flex flex-col relative bg-gradient-to-b from-white to-[#fafaff]">
            
            {/* Sidebar Header */}
            <div className="p-8 pb-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
                  <Filter size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tighter">الفلاتر الذكية</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">تحكم كامل في خيارات العرض</p>
                </div>
              </div>
              <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto no-scrollbar p-8 space-y-12">
              
              {/* Premium Sorting Selection */}
              <section>
                <div className="flex items-center gap-2 mb-8">
                   <TrendingUp size={16} className="text-indigo-600" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">ترتيب النتائج</h4>
                </div>
                <div className="space-y-3">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = sortBy === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`w-full group p-5 rounded-3xl flex items-center justify-between border-2 transition-all active:scale-[0.98] ${
                          isActive 
                          ? 'border-indigo-600 bg-white text-indigo-700 shadow-2xl shadow-indigo-100' 
                          : 'border-slate-50 bg-slate-50/50 text-slate-500 hover:border-indigo-50'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-400 group-hover:text-indigo-600'}`}>
                            <Icon size={20} />
                          </div>
                          <span className={`text-sm font-black ${isActive ? 'text-indigo-900' : 'text-slate-600 group-hover:text-indigo-600'}`}>{option.label}</span>
                        </div>
                        {isActive && (
                          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Functional Price Range Inputs */}
              <section>
                <div className="flex items-center gap-2 mb-8">
                   <DollarSign size={16} className="text-indigo-600" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">نطاق السعر</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 mr-2">من ($)</label>
                    <input 
                      type="number" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full bg-slate-50/80 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl px-6 py-5 font-black text-slate-900 transition-all outline-none text-center shadow-inner"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 mr-2">إلى ($)</label>
                    <input 
                      type="number" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full bg-slate-50/80 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl px-6 py-5 font-black text-slate-900 transition-all outline-none text-center shadow-inner"
                      placeholder="1000"
                    />
                  </div>
                </div>
                <div className="mt-6 p-5 rounded-[2rem] bg-indigo-50/50 border border-indigo-100/50 flex items-center justify-between">
                  <div className="text-[10px] font-black text-indigo-600/50 uppercase">الميزانية الحالية</div>
                  <div className="text-sm font-black text-indigo-600">${minPrice || 0} — ${maxPrice || '∞'}</div>
                </div>
              </section>

              {/* Categories Navigation */}
              <section>
                <div className="flex items-center gap-2 mb-8">
                   <LayoutGrid size={16} className="text-indigo-600" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">التصنيفات</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSearchParams({ cat })}
                      className={`px-6 py-3.5 rounded-2xl text-xs font-black transition-all border-2 ${
                        currentCategory === cat 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200' 
                        : 'bg-white border-slate-50 text-slate-500 hover:border-indigo-100 hover:text-indigo-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Bottom Actions */}
            <div className="p-8 border-t border-slate-100 bg-white sticky bottom-0 z-20 space-y-4">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-500/20 active:scale-[0.97] transition-all flex items-center justify-center gap-3 group"
              >
                تطبيق التغييرات
                <ArrowRight size={22} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={resetFilters}
                className="w-full py-5 bg-slate-50 text-slate-400 rounded-[2rem] font-black hover:text-slate-900 transition-all active:scale-[0.97]"
              >
                إعادة تعيين الكل
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
