
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';

const categoryImages: Record<string, string> = {
  'الكل': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200&auto=format&fit=crop',
  'إلكترونيات': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=200&auto=format&fit=crop',
  'لايف ستايل': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop',
  'أزياء': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=200&auto=format&fit=crop',
  'منزل': 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=200&auto=format&fit=crop'
};

const Stories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-16 overflow-hidden">
      <div className="flex space-x-6 space-x-reverse overflow-x-auto no-scrollbar py-4 px-2">
        {CATEGORIES.map((cat) => (
          <Link key={cat} to={`/products?cat=${cat}`} className="flex flex-col items-center shrink-0 group">
            {/* Purple Style Story Circle */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-purple-600 transition-all duration-300 group-hover:scale-105 group-active:scale-95 shadow-lg group-hover:shadow-purple-500/20">
              <div className="w-full h-full rounded-full border-[3px] border-white overflow-hidden bg-white flex items-center justify-center">
                 <img 
                    src={categoryImages[cat] || categoryImages['الكل']} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    alt={cat}
                 />
              </div>
            </div>
            <span className="text-[11px] font-black mt-3 text-slate-800 uppercase tracking-widest">{cat}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-24">
      <div className="relative h-[500px] md:h-[600px] rounded-[3.5rem] overflow-hidden group shadow-2xl shadow-slate-200">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1999&auto=format&fit=crop" 
          className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105"
          alt="سارة ستور هيرو"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-10 md:p-20">
          <div className="max-w-2xl text-white">
            <div className="bg-indigo-600/90 backdrop-blur-md px-6 py-2 rounded-full text-xs font-black mb-8 inline-block shadow-lg">تخفيضات سارة الكبرى - 40%</div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">أناقتك تبدأ <br/> <span className="text-indigo-400">من هنا.</span></h1>
            <p className="text-slate-200 text-xl mb-10 max-w-md font-medium opacity-90 leading-relaxed">اكتشف تشكيلة مختارة بعناية من أرقى المنتجات العالمية في مكان واحد.</p>
            <Link to="/products" className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black flex items-center w-fit hover:bg-indigo-50 transition-all btn-glow active:scale-95 text-lg shadow-2xl shadow-white/10">
              تسوق الآن <ArrowRight className="mr-3" size={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const featured = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="animate-in fade-in duration-1000 pt-32">
      <Stories />
      <Hero />
      
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex items-center justify-between mb-14 px-2">
          <div>
            <h2 className="text-3xl font-black flex items-center tracking-tighter text-slate-900">
              <TrendingUp className="ml-4 text-indigo-500" size={32} /> المختارات المميزة
            </h2>
            <p className="text-slate-400 font-bold mt-2 mr-12 text-sm uppercase tracking-widest">أفضل المنتجات مبيعاً لهذا الأسبوع</p>
          </div>
          <Link to="/products" className="text-sm font-black text-indigo-600 bg-indigo-50 px-6 py-3 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all">مشاهدة المتجر بالكامل</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-slate-900 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]"></div>
          
          <div className="relative z-10">
            <Sparkles className="mx-auto text-indigo-400 mb-8" size={50} />
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tighter">انضم إلى مجتمع سارة</h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-medium text-lg leading-relaxed">
              اشترك في نشرتنا البريدية لتصلك أحدث الصيحات والعروض الحصرية قبل الجميع بخصم <span className="text-white font-black underline decoration-indigo-500">50% لأول طلب.</span>
            </p>
            <div className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4">
              <input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني هنا..." 
                className="flex-grow bg-white/5 border-2 border-white/10 rounded-[2rem] px-8 py-5 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-white text-right outline-none" 
              />
              <button className="bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-black hover:bg-indigo-500 transition-all active:scale-95 shadow-xl shadow-indigo-600/30">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
