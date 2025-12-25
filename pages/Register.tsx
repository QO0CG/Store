
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, Shield, X, RefreshCw, Camera, User, Sparkles, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: Terms, 3: OTP, 4: Setup
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const [timer, setTimer] = useState(60);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (step === 3 && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleAcceptTerms = () => {
    setStep(3);
    setTimer(60);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (otpError) setOtpError(false);

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    const code = otp.join('');
    if (code === '123456') { 
      setStep(4);
    } else {
      setOtpError(true);
      setTimeout(() => {
        setOtp(['', '', '', '', '', '']);
        setOtpError(false);
        otpRefs.current[0]?.focus();
      }, 600);
    }
  };

  useEffect(() => {
    if (otp.every(v => v !== '')) {
      verifyOtp();
    }
  }, [otp]);

  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 5) return 20;
    if (password.length < 8) return 50;
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 100;
    return 80;
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length >= 8 && password === confirmPassword) {
      login(email, username);
      navigate('/profile');
    }
  };

  const strength = getPasswordStrength();
  const strengthColor = strength < 40 ? 'bg-red-500' : strength < 80 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="min-h-screen pt-32 pb-40 flex items-center justify-center px-6 bg-[#fcfcfd]">
      <div className="max-w-md w-full animate-in fade-in duration-700">
        
        {/* Step 1: Email Input */}
        {step === 1 && (
          <div className="animate-in slide-in-from-bottom-8 duration-500">
            <div className="text-center mb-10">
              <div className="relative w-20 h-20 mx-auto mb-6 group">
                <div className="absolute inset-0 bg-slate-900 rounded-[2.2rem] rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-indigo-500/10 border border-slate-700"></div>
                <div className="absolute inset-0 bg-white rounded-[2.2rem] flex items-center justify-center text-slate-900 z-10 border-2 border-slate-900">
                  <Sparkles size={32} className="text-indigo-600" />
                </div>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">عضوية جديدة</h1>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">انضم لمجتمعنا الحصري والأنيق في متجر سارة</p>
            </div>
            
            <div className="bg-white rounded-[3.5rem] p-10 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-slate-50 relative overflow-hidden">
              
              {/* Social Reordered to Top */}
              <button className="w-full py-5 border-2 border-slate-100 bg-white rounded-3xl flex items-center justify-center gap-4 font-black text-slate-700 hover:bg-slate-50 hover:border-indigo-100 transition-all active:scale-[0.98] shadow-sm mb-10 group">
                <img 
                  src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" 
                  alt="Google Icon" 
                  className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-700"
                />
                التسجيل بواسطة جوجل
              </button>
              
              <div className="relative mb-10 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <span className="relative px-6 bg-white text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">أو التسجيل بالبريد</span>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
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
                <button 
                  type="submit"
                  className="w-full py-5 bg-slate-900 text-white rounded-[2.2rem] font-black text-lg shadow-xl active:scale-[0.97] transition-all flex items-center justify-center gap-4 group"
                >
                  استمرار
                  <ArrowRight size={22} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            <div className="mt-14 text-center">
              <p className="text-slate-400 font-bold text-sm mb-6">لديك حساب بالفعل؟</p>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center gap-4 w-full max-w-[320px] py-5 bg-white border-2 border-slate-100 rounded-[2rem] text-slate-900 font-black hover:border-indigo-600 hover:text-indigo-600 hover:shadow-xl hover:shadow-indigo-500/5 transition-all active:scale-[0.97]"
              >
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                  <LogIn size={16} />
                </div>
                تسجيل الدخول الآن
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: Terms */}
        {step === 2 && (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-indigo-50 relative overflow-hidden">
              <div className="w-16 h-16 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-indigo-600 mb-8 mx-auto">
                <Shield size={32} />
              </div>
              <h2 className="text-2xl font-black text-center mb-6 tracking-tighter text-slate-900">اتفاقية الخدمة والخصوصية</h2>
              <div className="h-48 overflow-y-auto no-scrollbar text-xs text-slate-500 space-y-4 mb-8 text-right p-6 bg-slate-50 rounded-[2rem] leading-relaxed border border-slate-100">
                <p className="font-bold text-slate-900">أهلاً بك في متجر سارة.</p>
                <p>باستخدامك لمنصتنا، أنت توافق على معالجة بياناتك لتحسين جودة الخدمة واقتراح المنتجات التي تناسب ذوقك.</p>
                <p>نحن نستخدم تقنيات التشفير المتقدمة لحماية بياناتك المالية والشخصية.</p>
                <p>جميع حقوق الملكية الفكرية للمنتجات المعروضة محفوظة للمنصة.</p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={handleAcceptTerms} className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black active:scale-[0.97] transition-all shadow-xl shadow-indigo-100">أوافق على الشروط والأحكام</button>
                <button onClick={() => setStep(1)} className="w-full py-5 text-slate-400 font-black hover:text-slate-600 transition-colors">إلغاء والمراجعة</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: OTP */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right duration-500 text-center">
             <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white mb-8 mx-auto shadow-xl shadow-indigo-500/20">
                <Mail size={32} />
              </div>
            <h1 className="text-3xl font-black mb-4 tracking-tighter text-slate-900">تأكيد الهوية</h1>
            <p className="text-slate-400 font-medium mb-10 leading-relaxed px-4">
              لقد أرسلنا رمزاً مكوناً من 6 أرقام إلى: <br/>
              <span className="text-slate-900 font-black text-lg tracking-tight underline decoration-indigo-200 underline-offset-4">{email}</span>
            </p>

            <div className={`flex justify-center gap-3 mb-10 ${otpError ? 'animate-shake' : ''}`}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => otpRefs.current[i] = el}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e) }
                  className={`w-12 h-16 bg-white border-2 rounded-[1.2rem] text-center text-2xl font-black transition-all outline-none focus:ring-4 focus:ring-indigo-100 ${
                    otpError ? 'border-red-500 text-red-500' : digit ? 'border-indigo-600 text-indigo-600 shadow-xl shadow-indigo-100' : 'border-slate-100'
                  }`}
                />
              ))}
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-slate-50 rounded-full text-[11px] font-black text-slate-400">
                <span>انتهاء صلاحية الرمز:</span>
                <span className={`w-8 text-indigo-600 ${timer < 10 ? 'text-red-500 animate-pulse' : ''}`}>
                  {timer}ث
                </span>
              </div>

              {timer === 0 && (
                <button onClick={() => setTimer(60)} className="flex items-center justify-center gap-3 mx-auto text-indigo-600 font-black hover:underline group px-4 py-2 bg-indigo-50 rounded-xl transition-all">
                  <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                  إعادة إرسال الرمز
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Setup */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="text-center mb-10">
              <div className="relative w-32 h-32 mx-auto mb-6 group">
                <div className="w-full h-full rounded-[3rem] bg-slate-100 overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center text-slate-300">
                  {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <User size={48} />}
                </div>
                <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-indigo-600 text-white rounded-[1.5rem] border-4 border-white flex items-center justify-center hover:scale-110 transition-all shadow-xl group-hover:rotate-6">
                  <Camera size={20} />
                </button>
              </div>
              <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter">اللمسات الأخيرة</h1>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">اختر هويتك الرقمية في متجر سارة</p>
            </div>

            <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-slate-50 space-y-6">
              <form onSubmit={handleFinalSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-3">اسم المستخدم الفريد</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-[1.5rem] px-6 py-4 font-black transition-all outline-none" 
                    placeholder="Ahmed_Aura"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-3">كلمة المرور القوية</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-[1.5rem] px-6 py-4 font-black transition-all outline-none" 
                      placeholder="••••••••"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-4">
                    <div 
                      className={`h-full transition-all duration-700 ${strengthColor}`} 
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                  <p className="text-[9px] font-bold text-slate-400 mt-2 mr-2">قوة الحماية: {strength === 100 ? 'عالية جداً' : strength > 40 ? 'جيدة' : 'ضعيفة'}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-3">تأكيد كلمة المرور</label>
                  <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full bg-slate-50 border-2 rounded-[1.5rem] px-6 py-4 font-black transition-all outline-none ${
                      confirmPassword && password !== confirmPassword ? 'border-red-100 ring-2 ring-red-50' : 'border-transparent focus:border-indigo-100'
                    }`}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={password.length < 8 || password !== confirmPassword}
                  className="w-full py-5 bg-indigo-600 text-white rounded-[2.2rem] font-black text-lg shadow-2xl shadow-indigo-500/20 active:scale-[0.97] transition-all mt-6 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
                >
                  تأكيد العضوية
                  <CheckCircle2 size={20} />
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Register;