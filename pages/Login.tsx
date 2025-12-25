
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, Sparkles, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6 bg-[#fcfcfd]">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className="relative w-20 h-20 mx-auto mb-6 group">
            <div className="absolute inset-0 bg-slate-900 rounded-[2.2rem] rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-indigo-500/10 border border-slate-700"></div>
            <div className="absolute inset-0 bg-white rounded-[2.2rem] flex items-center justify-center text-slate-900 z-10 border-2 border-slate-900">
               <Sparkles size={32} className="text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">تسجيل الدخول</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">عالم الأناقة الرقمية بانتظارك في متجر سارة</p>
        </div>

        <div className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-slate-50 relative overflow-hidden">
          
          {/* Social Login Reordered to Top */}
          <button className="w-full py-5 border-2 border-slate-100 bg-white rounded-3xl flex items-center justify-center gap-4 font-black text-slate-700 hover:bg-slate-50 hover:border-indigo-100 transition-all active:scale-[0.98] shadow-sm mb-10 group">
            <img 
              src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" 
              alt="Google Icon" 
              className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-700"
            />
            المتابعة باستخدام جوجل
          </button>

          <div className="relative mb-10 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative px-6 bg-white text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">أو المتابعة بالبريد</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-3">البريد الإلكتروني</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[1.8rem] px-6 py-4 pr-12 font-black transition-all outline-none" 
                  placeholder="name@aura.com"
                  required
                />
                <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-3">كلمة المرور</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[1.8rem] px-6 py-4 pr-12 font-black transition-all outline-none" 
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <label className="flex items-center group cursor-pointer">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only" 
                  />
                  <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${rememberMe ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200 group-hover:border-indigo-300'}`}>
                    {rememberMe && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-500 mr-2 select-none">تذكرني</span>
              </label>
              <button type="button" className="text-sm font-bold text-indigo-600 hover:underline underline-offset-4">نسيت كلمة المرور؟</button>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-indigo-600 text-white rounded-[2.2rem] font-black text-lg shadow-2xl shadow-indigo-500/20 active:scale-[0.97] transition-all flex items-center justify-center gap-4 group"
            >
              تسجيل الدخول
              <ArrowRight size={22} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Enhanced Professional Create Account Button */}
        <div className="mt-14 text-center">
          <p className="text-slate-400 font-bold text-sm mb-6">ليس لديك عضوية بعد؟</p>
          <Link 
            to="/register" 
            className="inline-flex items-center justify-center gap-4 w-full max-w-[320px] py-5 bg-white border-2 border-slate-100 rounded-[2rem] text-slate-900 font-black hover:border-indigo-600 hover:text-indigo-600 hover:shadow-xl hover:shadow-indigo-500/5 transition-all active:scale-[0.97]"
          >
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-50 transition-colors">
              <UserPlus size={16} />
            </div>
            انضم إلى عائلة متجر سارة مجاناً
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;