
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout: React.FC = () => {
  const { totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigate('/confirmation');
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-32 md:py-40">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress */}
        <div className="flex items-center justify-center mb-16">
          <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-slate-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 1 ? 'border-indigo-600 bg-indigo-50' : 'border-slate-300'}`}>1</span>
            <span className="mr-3 font-bold text-sm">الشحن</span>
          </div>
          <div className="w-16 h-0.5 bg-slate-200 mx-4" />
          <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 2 ? 'border-indigo-600 bg-indigo-50' : 'border-slate-300'}`}>2</span>
            <span className="mr-3 font-bold text-sm">الدفع</span>
          </div>
          <div className="w-16 h-0.5 bg-slate-200 mx-4" />
          <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 3 ? 'border-indigo-600 bg-indigo-50' : 'border-slate-300'}`}>3</span>
            <span className="mr-3 font-bold text-sm">المراجعة</span>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
          {step === 1 && (
            <div className="animate-in slide-in-from-right duration-300 text-right">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center justify-start">
                <Truck className="ml-3 text-indigo-600" size={24} />
                معلومات الشحن
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">الاسم الأول</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 text-right" placeholder="أحمد" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">الاسم الأخير</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 text-right" placeholder="محمد" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">العنوان</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 text-right" placeholder="شارع التحلية، جدة" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">المدينة</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 text-right" placeholder="جدة" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">الرمز البريدي</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 text-right" placeholder="12345" />
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                className="mt-12 w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center hover:bg-indigo-700 transition-colors"
              >
                الاستمرار للدفع <ChevronRight className="mr-2 rotate-180" size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right duration-300 text-right">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center justify-start">
                <CreditCard className="ml-3 text-indigo-600" size={24} />
                طريقة الدفع
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border-2 border-indigo-600 bg-indigo-50 flex items-center justify-between">
                   <div className="w-5 h-5 rounded-full border-4 border-indigo-600 bg-white"></div>
                  <div className="flex items-center">
                    <div className="mr-4 text-right">
                      <p className="font-bold text-slate-900">بطاقة ائتمان</p>
                      <p className="text-xs text-slate-500">دفع آمن عبر سترايب</p>
                    </div>
                    <div className="w-12 h-8 bg-slate-900 rounded-md ml-4 flex items-center justify-center text-[10px] text-white font-bold">VISA</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                   <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">رقم البطاقة</label>
                    <div className="relative">
                      <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 text-right" placeholder="0000 0000 0000 0000" />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">تاريخ الانتهاء</label>
                      <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 text-right" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">CVV</label>
                      <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 text-right" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 space-x-reverse mt-12">
                <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">رجوع</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">مراجعة الطلب</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in slide-in-from-right duration-300 text-right">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center justify-start">
                <ShieldCheck className="ml-3 text-indigo-600" size={24} />
                المراجعة والتأكيد
              </h2>
              <div className="space-y-8">
                <div className="p-6 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <Lock className="text-slate-300" size={32} />
                  <div className="text-right">
                    <h4 className="text-sm font-bold text-slate-900 mb-1">المبلغ المطلوب دفعه</h4>
                    <p className="text-2xl font-extrabold text-indigo-600">${(totalAmount * 1.08).toFixed(2)}</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 text-center px-4 leading-relaxed">
                  بالنقر على "تأكيد الطلب"، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بمتجر سارة. يتم تشفير معلومات الدفع ومعالجتها بشكل آمن.
                </p>
              </div>
              <div className="flex space-x-4 space-x-reverse mt-12">
                <button onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">رجوع</button>
                <button 
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : 'تأكيد الطلب'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;