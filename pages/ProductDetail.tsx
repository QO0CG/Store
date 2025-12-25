
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingBag, Sparkles, ChevronRight, Heart, Share2, X, Copy, Check } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { getSmartProductInsight } from '../services/geminiService';

const ShareModal = ({ isOpen, onClose, productName }: { isOpen: boolean, onClose: () => void, productName: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const shareOptions = [
    { name: 'واتساب', icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png', color: 'bg-[#25D366]/10' },
    { name: 'إنستقرام', icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png', color: 'bg-[#E1306C]/10' },
    { name: 'تيك توك', icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', color: 'bg-black/5' },
    { name: 'تويتر (X)', icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png', color: 'bg-black/5' },
    { name: 'جيميل', icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png', color: 'bg-[#EA4335]/10' },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Content Sheet */}
      <div className="relative w-full max-w-lg bg-white rounded-t-[3rem] sm:rounded-[3rem] p-10 shadow-2xl animate-in slide-in-from-bottom duration-500">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-100 rounded-full sm:hidden"></div>
        
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-black text-slate-900 tracking-tighter">مشاركة المنتج</h3>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <p className="text-slate-400 font-bold mb-8 text-sm text-right">أخبر أصدقائك عن هذا الجمال من متجر سارة!</p>

        {/* Social Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 mb-12">
          {shareOptions.map((option) => (
            <button key={option.name} className="flex flex-col items-center group">
              <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-3 transition-all group-hover:scale-110 active:scale-95 ${option.color} shadow-sm border border-slate-50`}>
                <img src={option.icon} alt={option.name} className="w-8 h-8 object-contain" />
              </div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{option.name}</span>
            </button>
          ))}
        </div>

        {/* Copy Link Section */}
        <div className="bg-slate-50 rounded-[2rem] p-2 flex items-center gap-4 border border-slate-100">
          <div className="flex-grow pr-6 text-sm font-bold text-slate-400 truncate text-left ltr">
            {window.location.href}
          </div>
          <button 
            onClick={handleCopy}
            className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] font-black text-sm transition-all shadow-sm ${
              copied ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-indigo-600'
            }`}
          >
            {copied ? (
              <>
                تم النسخ <Check size={18} />
              </>
            ) : (
              <>
                نسخ الرابط <Copy size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setLoadingAi(true);
      getSmartProductInsight(product.name, product.description).then(res => {
        setAiInsight(res);
        setLoadingAi(false);
      });
    }
  }, [product]);

  if (!product) return <div className="py-40 text-center font-bold">المنتج غير موجود</div>;

  return (
    <div className="bg-[#fcfcfd] min-h-screen pb-40 pt-36 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation Actions */}
        <div className="flex items-center justify-between mb-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white transition-all active:scale-90 shadow-sm">
            <ChevronRight size={20} />
          </button>
          <div className="flex space-x-2 space-x-reverse">
            <button className="w-10 h-10 flex items-center justify-center rounded-full glass text-slate-400 hover:text-red-500 transition-all shadow-sm">
              <Heart size={18} />
            </button>
            <button 
              onClick={() => setIsShareOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full glass text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Main Visual */}
          <div className="relative group">
            <div className="aspect-[1/1] rounded-[3rem] overflow-hidden bg-slate-50 shadow-2xl shadow-indigo-500/5 group-hover:shadow-indigo-500/10 transition-all duration-700">
              <img src={product.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt={product.name} />
            </div>
          </div>

          {/* Content */}
          <div className="lg:pt-4">
            <div className="mb-10">
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">{product.category}</span>
                {product.isNew && <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">جديد</span>}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">{product.name}</h1>
              
              <div className="flex items-center justify-between mb-10">
                <div className="text-4xl font-black text-indigo-600">${product.price}</div>
                <div className="flex items-center glass px-4 py-2 rounded-2xl shadow-sm">
                  <Star size={16} className="fill-amber-400 text-amber-400 ml-2" />
                  <span className="font-black text-slate-900">{product.rating}</span>
                </div>
              </div>

              <p className="text-slate-500 text-lg leading-relaxed font-medium mb-10 opacity-80 text-right">
                {product.description}
              </p>

              {/* Smart AI Card */}
              {(aiInsight || loadingAi) && (
                <div className="relative p-7 rounded-[2.5rem] bg-slate-900 text-white overflow-hidden mb-12 group transition-all hover:shadow-2xl hover:shadow-indigo-500/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                  <Sparkles size={24} className="mb-4 text-indigo-400" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-indigo-300">رؤية متجر سارة الذكية</h4>
                  {loadingAi ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-4 bg-white/10 rounded-full w-full"></div>
                      <div className="h-4 bg-white/10 rounded-full w-2/3"></div>
                    </div>
                  ) : (
                    <p className="text-xl font-bold italic leading-tight">"{aiInsight}"</p>
                  )}
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center justify-between bg-slate-100 p-2 rounded-[1.8rem] min-w-[140px]">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-2xl shadow-sm hover:scale-110 active:scale-90 transition-all"><Minus size={16} /></button>
                <span className="font-black text-lg">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-2xl shadow-sm hover:scale-110 active:scale-90 transition-all"><Plus size={16} /></button>
              </div>
              <button 
                onClick={() => addItem(product, quantity)}
                className="flex-grow py-5 bg-indigo-600 text-white rounded-[1.8rem] font-black text-lg flex items-center justify-center gap-3 transition-all hover:bg-indigo-700 active:scale-95 shadow-xl shadow-indigo-500/20 group"
              >
                <ShoppingBag size={22} className="group-hover:rotate-12 transition-transform" />
                أضف للسلة
              </button>
            </div>
          </div>
        </div>
      </div>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        productName={product.name} 
      />
    </div>
  );
};

export default ProductDetail;
