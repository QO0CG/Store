
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block relative">
      <div className="relative bg-white rounded-[2.5rem] p-3 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 border border-slate-50">
        
        {/* Image Container with Internal Spacing */}
        <div className="aspect-[4/5] bg-[#f8f9fb] rounded-[2rem] overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Status Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {product.isNew && (
              <div className="glass px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-indigo-600 shadow-sm border border-white/50">جديد</div>
            )}
            {product.isFeatured && (
              <div className="bg-amber-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-white shadow-sm">مميز</div>
            )}
          </div>

          {/* Floating Actions (Always visible slightly, pop on hover) */}
          <button className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-slate-400 hover:text-red-500 hover:bg-white flex items-center justify-center transition-all shadow-sm active:scale-90">
            <Heart size={18} />
          </button>

          {/* Hover Quick Add Button */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <button 
              onClick={handleQuickAdd}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95"
            >
              <ShoppingBag size={18} />
              أضف للسلة
            </button>
          </div>
        </div>

        {/* Content Section with more breathing room */}
        <div className="pt-6 pb-2 px-3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1 text-base leading-tight">
              {product.name}
            </h3>
          </div>
          
          <div className="flex items-center justify-between mt-4">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{product.category}</span>
                <span className="font-black text-xl text-slate-900 tracking-tighter">${product.price}</span>
             </div>
             
             <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                <Star size={12} className="fill-amber-400 text-amber-400 ml-1.5" />
                <span className="text-xs font-black text-slate-700">{product.rating}</span>
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
