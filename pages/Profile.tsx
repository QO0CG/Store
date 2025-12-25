
import React from 'react';
import { 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  Headset, 
  LogOut, 
  ChevronLeft, 
  ShieldCheck, 
  Bell,
  Wallet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileOption = ({ icon: Icon, title, subtitle, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className="group bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50 flex items-center gap-5 transition-all hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 active:scale-95 text-right w-full"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${color} group-hover:scale-110 duration-500`}>
      <Icon size={24} />
    </div>
    <div className="flex-grow">
      <h3 className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm font-medium">{subtitle}</p>
    </div>
    <ChevronLeft size={20} className="text-slate-300 group-hover:text-indigo-600 group-hover:-translate-x-1 transition-all" />
  </button>
);

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#fcfcfd] min-h-screen pt-36 pb-40 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* User Header Card */}
        <div className="glass rounded-[3rem] p-8 mb-12 flex flex-col md:flex-row-reverse items-center gap-8 relative overflow-hidden pill-shadow">
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          
          <div className="relative">
            <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
              <img src="https://picsum.photos/id/64/300/300" className="w-full h-full object-cover" alt="الملف الشخصي" />
            </div>
            <div className="absolute -bottom-2 -left-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
          </div>
          
          <div className="text-center md:text-right flex-grow">
            <h1 className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">مرحباً، {user?.name || 'زائر متجر سارة'}!</h1>
            <p className="text-slate-400 font-bold mb-4">{user?.email || 'user@example.com'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 flex-row-reverse">
              <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black flex items-center gap-2">
                <ShieldCheck size={14} /> عضو ذهبي
              </span>
              <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-black flex items-center gap-2">
                <Bell size={14} /> 3 تنبيهات
              </span>
            </div>
          </div>
          
          <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all active:scale-95">
            تعديل الحساب
          </button>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ProfileOption 
            icon={Package} 
            title="طلباتي" 
            subtitle="تتبع شحناتك الحالية والسابقة"
            color="bg-indigo-50 text-indigo-600"
            onClick={() => {}}
          />
          <ProfileOption 
            icon={Heart} 
            title="المفضلة" 
            subtitle="المنتجات التي خطفت قلبك"
            color="bg-pink-50 text-pink-600"
            onClick={() => {}}
          />
          <ProfileOption 
            icon={Wallet} 
            title="المحفظة" 
            subtitle="رصيدك: $1,250.00"
            color="bg-emerald-50 text-emerald-600"
            onClick={() => {}}
          />
          <ProfileOption 
            icon={MapPin} 
            title="عناوين الشحن" 
            subtitle="إدارة مواقع التوصيل الخاصة بك"
            color="bg-amber-50 text-amber-600"
            onClick={() => {}}
          />
          <ProfileOption 
            icon={CreditCard} 
            title="طرق الدفع" 
            subtitle="البطاقات المحفوظة والفوترة"
            color="bg-blue-50 text-blue-600"
            onClick={() => {}}
          />
          <ProfileOption 
            icon={Bell} 
            title="التنبيهات" 
            subtitle="تحكم في كيفية وصول الأخبار إليك"
            color="bg-purple-50 text-purple-600"
            onClick={() => {}}
          />
          <ProfileOption 
            icon={Settings} 
            title="الإعدادات" 
            subtitle="الأمان، اللغة، والخصوصية"
            color="bg-slate-100 text-slate-600"
            onClick={() => {}}
          />
          <ProfileOption 
            icon={Headset} 
            title="الدعم والمساعدة" 
            subtitle="نحن هنا للإجابة على تساؤلاتك"
            color="bg-rose-50 text-rose-600"
            onClick={() => {}}
          />
        </div>

        {/* Logout Section */}
        <div className="border-t border-slate-100 pt-10">
          <button 
            onClick={handleLogout}
            className="w-full py-5 rounded-[2rem] bg-red-50 text-red-600 font-black flex items-center justify-center gap-3 hover:bg-red-100 transition-all active:scale-95 group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            تسجيل الخروج من الحساب
          </button>
          <p className="text-center text-slate-300 text-[10px] font-bold uppercase tracking-[0.3em] mt-8">
            Sara Store Version 2.1.0 • سياسة الخصوصية • الشروط
          </p>
        </div>

      </div>
    </div>
  );
};

export default Profile;