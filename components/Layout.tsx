
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Home, Grid, Heart, X, ArrowLeft, LogIn, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const controlNavbar = () => {
      if (searchActive) return;
      if (window.scrollY > 100) {
        setIsScrolled(true);
        if (window.scrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsScrolled(false);
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, searchActive]);

  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchActive]);

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    if (searchActive) setSearchQuery('');
  };

  return (
    <header className={`fixed top-4 left-0 right-0 z-[100] transition-all duration-500 px-4 ${isVisible ? 'header-visible' : 'header-hidden'}`}>
      <div className="max-w-5xl mx-auto relative h-14">
        <div className={`glass h-full px-5 rounded-full flex items-center justify-between pill-shadow transition-all duration-500 overflow-hidden ${isScrolled ? 'max-w-2xl mx-auto' : 'max-w-full'} ${searchActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <Link to="/" className="flex items-center space-x-2 space-x-reverse group shrink-0">
            <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform border border-slate-700">
              <Sparkles size={18} className="text-indigo-400" />
            </div>
            <span className="text-lg font-extrabold tracking-tighter bg-gradient-to-l from-slate-900 to-slate-600 bg-clip-text text-transparent hidden sm:block">SARA STORE</span>
          </Link>

          <div className="flex items-center space-x-1 space-x-reverse">
            <Link to="/products" className={`p-2 rounded-full transition-all ${location.pathname === '/products' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}>
              <Grid size={20} title="المتجر" />
            </Link>
            <button onClick={toggleSearch} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-all">
              <Search size={20} title="بحث" />
            </button>
            <Link to="/cart" className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-all relative">
              <ShoppingBag size={20} title="السلة" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-indigo-500 rounded-full"></span>
              )}
            </Link>
            <div className="w-px h-6 bg-slate-200 mx-2 hidden xs:block"></div>
            
            {isAuthenticated ? (
              <Link to="/profile" className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden border border-white shadow-sm hover:scale-110 transition-transform hidden xs:block">
                <img src="https://picsum.photos/id/64/100/100" className="w-full h-full object-cover" alt="الملف الشخصي" />
              </Link>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all hidden xs:block"
              >
                دخول
              </button>
            )}
          </div>
        </div>

        {searchActive && (
          <div className="absolute inset-0 z-10 flex items-center justify-center px-2">
             <div className="w-full h-full glass rounded-full pill-shadow animate-line-to-box flex items-center px-4 overflow-hidden border-indigo-200">
                <button onClick={toggleSearch} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <input 
                  ref={searchInputRef}
                  type="text"
                  placeholder="ابحث عن أناقتك القادمة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-transparent border-none outline-none px-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-medium"
                />
             </div>
          </div>
        )}
      </div>
    </header>
  );
};

const MobileNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm px-4">
      <div className="glass h-16 rounded-[2rem] flex items-center justify-around pill-shadow border-white/50">
        <Link to="/" className={`flex flex-col items-center transition-all ${location.pathname === '/' ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
          <Home size={22} />
          <span className="text-[9px] font-bold mt-1">الرئيسية</span>
        </Link>
        <Link to="/products" className={`flex flex-col items-center transition-all ${location.pathname.startsWith('/products') ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
          <Grid size={22} />
          <span className="text-[9px] font-bold mt-1">المتجر</span>
        </Link>
        <Link to="/cart" className={`flex flex-col items-center transition-all ${location.pathname === '/cart' ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
          <ShoppingBag size={22} />
          <span className="text-[9px] font-bold mt-1">السلة</span>
        </Link>
        <Link to={isAuthenticated ? "/profile" : "/login"} className={`flex flex-col items-center transition-all ${location.pathname === '/profile' || location.pathname === '/login' ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
          {isAuthenticated ? <User size={22} /> : <LogIn size={22} />}
          <span className="text-[9px] font-bold mt-1">{isAuthenticated ? 'حسابي' : 'دخول'}</span>
        </Link>
      </div>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col pb-24 md:pb-0 overflow-x-hidden">
      <Header />
      <main className="flex-grow">{children}</main>
      <MobileNav />
    </div>
  );
};

export default Layout;