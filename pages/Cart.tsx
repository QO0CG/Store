
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalAmount, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-40 text-center animate-in fade-in slide-in-from-bottom duration-700">
        <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-slate-300">
          <ShoppingBag size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">سلتك خالية</h2>
        <p className="text-slate-400 mb-10 font-medium">يبدو أنك لم تضف أي شيء بعد. استكشف مجموعتنا الرائعة في متجر سارة!</p>
        <Link to="/products" className="inline-flex items-center px-8 py-5 bg-indigo-600 text-white rounded-[1.8rem] font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
          ابدأ التسوق
          <ArrowRight className="mr-2" size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfd] min-h-screen pt-36 pb-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">حقيبة التسوق <span className="text-slate-300 font-bold">({totalItems})</span></h1>
          <button onClick={() => navigate('/products')} className="text-sm font-bold text-indigo-600 flex items-center hover:underline">
            متابعة التسوق <ChevronRight size={16} className="rotate-180 mr-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-50 flex items-center gap-6 relative group transition-all hover:shadow-xl hover:shadow-slate-200/50">
                <div className="w-28 h-28 bg-slate-50 rounded-[2rem] overflow-hidden shrink-0 shadow-inner">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                
                <div className="flex-grow text-right">
                  <h3 className="text-lg font-black text-slate-900 mb-1 leading-tight">{item.name}</h3>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4">{item.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-slate-50 p-1.5 rounded-2xl">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 hover:text-indigo-600 active:scale-90 transition-all"><Minus size={14} /></button>
                      <span className="w-10 text-center font-black">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 hover:text-indigo-600 active:scale-90 transition-all"><Plus size={14} /></button>
                    </div>
                    <div className="text-xl font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute top-6 left-6 text-slate-200 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:sticky lg:top-36">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/20">
              <h2 className="text-2xl font-black mb-8 tracking-tighter">ملخص الطلب</h2>
              
              <div className="space-y-5 mb-10 border-b border-white/10 pb-10">
                <div className="flex justify-between text-slate-400 font-bold">
                  <span>المجموع الفرعي</span>
                  <span className="text-white">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-bold">
                  <span>التوصيل</span>
                  <span className="text-indigo-400">مجاني</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-10">
                <span className="text-slate-400 font-bold">الإجمالي</span>
                <span className="text-4xl font-black text-white">${totalAmount.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-5 bg-indigo-600 text-white rounded-[1.8rem] font-black text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95 group"
              >
                إتمام الشراء
                <ArrowRight size={20} className="mr-1 group-hover:translate-x-[-4px] transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;