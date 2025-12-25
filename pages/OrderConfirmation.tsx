
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Download } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-40 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-10 text-green-600">
        <CheckCircle size={48} />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tighter">تم تأكيد طلبك بنجاح!</h1>
      <p className="text-lg text-slate-500 mb-10 leading-relaxed">
        شكراً لشرائك من متجر سارة. لقد أرسلنا بريداً إلكترونياً لتأكيد الطلب. رقم طلبك هو <span className="text-slate-900 font-bold">#SARA-98234</span>.
      </p>
      
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 mb-12 flex flex-col sm:flex-row items-center justify-between text-right">
        <div className="flex space-x-4 space-x-reverse mb-6 sm:mb-0">
           <button className="flex items-center px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">
            <Download size={16} className="ml-2" />
            تحميل الفاتورة
          </button>
          <Link to="/profile" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
            تتبع الطلب
          </Link>
        </div>
        <div className="flex items-center">
          <div className="text-right ml-4">
            <h4 className="font-bold text-slate-900">التوصيل المتوقع</h4>
            <p className="text-sm text-slate-500">24 أكتوبر - 26 أكتوبر، 2024</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Package size={24} />
          </div>
        </div>
      </div>
      
      <Link to="/products" className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-700 group">
        العودة للتسوق <ArrowRight className="mr-2 rotate-180 group-hover:translate-x-1 transition-transform" size={20} />
      </Link>
    </div>
  );
};

export default OrderConfirmation;