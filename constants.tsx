
import { Product } from './types';

export const CATEGORIES = ['الكل', 'إلكترونيات', 'لايف ستايل', 'أزياء', 'منزل'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'سماعات أورا اللاسلكية',
    price: 299.99,
    category: 'إلكترونيات',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 124,
    description: 'استمتع بنقاء صوت استثنائي مع تقنية إلغاء الضوضاء النشطة وعمر بطارية يصل إلى 40 ساعة من الاستماع المتواصل.',
    features: ['إلغاء الضوضاء النشط', 'بلوتوث 5.2', 'صوت مكاني غامر'],
    colors: ['#000000', '#FFFFFF', '#4F46E5'],
    sizes: ['مقاس موحد'],
    stock: 15,
    isFeatured: true
  },
  {
    id: '2',
    name: 'ساعة جلدية كلاسيكية',
    price: 159.00,
    category: 'أزياء',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    reviews: 89,
    description: 'قطعة فنية خالدة مع حزام من الجلد الإيطالي الأصلي وزجاج ياقوتي مقاوم للخدش.',
    features: ['مقاومة للماء حتى 50 متر', 'حركة سويسرية دقيقة', 'أحزمة قابلة للتبديل'],
    colors: ['#78350F', '#000000'],
    sizes: ['38 ملم', '42 ملم'],
    stock: 8,
    isNew: true
  },
  {
    id: '3',
    name: 'جهاز التحكم المنزلي الذكي',
    price: 199.99,
    category: 'إلكترونيات',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 215,
    description: 'تحكم في منزلك بالكامل عبر الأوامر الصوتية وشاشة عرض رائعة مقاس 10 بوصات بدقة عالية.',
    features: ['تحكم صوتي متقدم', 'كاميرا مدمجة للخصوصية', 'صوت متعدد الغرف'],
    colors: ['#F3F4F6', '#1F2937'],
    sizes: ['قياسي'],
    stock: 22,
    isFeatured: true
  },
  {
    id: '4',
    name: 'كرسي مكتب مريح',
    price: 450.00,
    category: 'منزل',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 42,
    description: 'دعم مثالي لأسفل الظهر وتصميم شبكي يسمح بالتهوية لراحة تدوم طوال يوم العمل.',
    features: ['ارتفاع قابل للتعديل', 'مساند ذراع ثلاثية الأبعاد', 'شبك عالي الجودة للتهوية'],
    colors: ['#000000', '#6B7280'],
    sizes: ['كبير', 'قياسي'],
    stock: 5
  },
  {
    id: '5',
    name: 'حقيبة سفر قماشية',
    price: 120.00,
    category: 'لايف ستايل',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    reviews: 67,
    description: 'حقيبة متينة من قماش القطن مع لمسات جلدية فاخرة. مثالية للرحلات القصيرة وعطلات نهاية الأسبوع.',
    features: ['جيب مخفي للأغراض الهامة', 'بطانة مقاومة للماء', 'قسم مخصص للأحذية'],
    colors: ['#065F46', '#1E3A8A'],
    sizes: ['40 لتر'],
    stock: 12,
    isNew: true
  },
  {
    id: '6',
    name: 'حذاء الجري السحابي',
    price: 140.00,
    category: 'أزياء',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    rating: 4.4,
    reviews: 153,
    description: 'توسيد ثوري يمنحك شعوراً وكأنك تجري فوق السحاب، مع تصميم عصري وأداء رياضي متفوق.',
    features: ['خفيف الوزن للغاية', 'تفاصيل عاكسة للأمان', 'مصنوع من مواد معاد تدويرها'],
    colors: ['#EC4899', '#3B82F6', '#FFFFFF'],
    sizes: ['38', '40', '42', '44'],
    stock: 30
  }
];
