import React, { useState, useMemo } from 'react';
import { 
  Heart, Shield, Home, User, Users, 
  Briefcase, Coffee, MessageCircle, 
  Check, Clock, X, Sparkles, PieChart, 
  List, ChevronRight, Zap, Star, ArrowRight,
  AlertCircle // أيقونة للاختلاف
} from 'lucide-react';

// --- أنماط CSS مدمجة ---
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounceSlow {
    0%, 100% { transform: translateY(-5%); }
    50% { transform: translateY(5%); }
  }
  @keyframes pulseSoft {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
  .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
  .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
  .animate-bounce-slow { animation: bounceSlow 3s infinite ease-in-out; }
  .animate-pulse-soft { animation: pulseSoft 4s infinite ease-in-out; }
  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
`;

// --- البيانات ---
const SECTIONS = [
  {
    id: 'foundation',
    title: 'الأساس والمرجعية',
    icon: Shield,
    color: 'from-violet-500 to-fuchsia-500',
    bgIcon: 'bg-violet-100 text-violet-600',
    questions: [
      { id: 1, text: "ما هو منظورك عن الجواز؟" },
      { id: 2, text: "ما هي وجهة نظرك الدينية ومعتقدك؟ (المصادر، الفتاوى)" },
      { id: 39, text: "إيه أخبار علاقتك بالصلاة والقرآن حالياً؟ وهل بنشجع بعض عليها ولا دي حرية شخصية تامة؟" },
      { id: 40, text: "إيه القيم الـ 3 اللي مستحيل تتنازل عن زرعهم في أولادك مستقبلاً؟" },
      { id: 11, text: "ما هو منظورك عن حقوق الطرف الآخر؟" },
      { id: 12, text: "ما هو منظورك عن واجبات الطرف الآخر؟" }
    ]
  },
  {
    id: 'life',
    title: 'إدارة الحياة والمال',
    icon: Home,
    color: 'from-emerald-400 to-teal-500',
    bgIcon: 'bg-emerald-100 text-emerald-600',
    questions: [
      { id: 3, text: "ما هي أقل تكلفة مادية تكفينا للمعيشة؟" },
      { id: 41, text: "هل عليك أي التزامات مادية حالية (ديون، أقساط، مساعدة للأهل) لازم الطرف التاني يعرفها؟" },
      { id: 20, text: "كيف تتخيل توزيع الأدوار والمسؤوليات المنزلية والمالية بيننا؟" },
      { id: 42, text: "لو الزوجة بتشتغل، إيه الاتفاق على ذمتها المالية والمشاركة في البيت؟" },
      { id: 43, text: "رأيك في القروض والكريدت كارد؟ (وسيلة مساعدة ولا ممنوعات؟)" },
      { id: 36, text: "بتصنف نفسك شخص بيصرف ولا حريص وبتحب تحوش وتأمن المستقبل؟" },
      { id: 44, text: "إيه الحاجة اللي بتدفع فيها فلوس وأنت مستمتع ومش بتستخسر؟ (سفر، أكل، لبس، إلكترونيات؟)" },
      { id: 45, text: "هل عندك خطط حقيقية للهجرة أو العيش في محافظة تانية؟" }
    ]
  },
  {
    id: 'lifestyle',
    title: 'الروتين ونمط الحياة',
    icon: Coffee,
    color: 'from-orange-400 to-red-400',
    bgIcon: 'bg-orange-100 text-orange-600',
    questions: [
      { id: 46, text: "هل أنت شخص نهاري (بيصحى بدري) ولا ليلي (سهران)؟ وهل ده هيأثر على نظام البيت؟" },
      { id: 47, text: "إيه طقوسك في الأكل؟ (أكيلة، نباتي، مابحبش حاجات معينة، لازم طبخ كل يوم؟)" },
      { id: 48, text: "مستوى النظافة والترتيب عندك: (مهووس نظافة - عادي - فوضوي)؟ وإيه اللي مسموح بيه في البيت؟" },
      { id: 49, text: "إيه علاقتك بالتكييف والحرارة؟ (بتحب الجو ساقعة ولا دافي؟)" },
      { id: 23, text: "بتقضي وقت فراغك وإجازاتك إزاي؟" },
      { id: 35, text: "هل أنت شخص 'بيتوتي' ولا بتحب الخروج والسهر؟" }
    ]
  },
  {
    id: 'personality',
    title: 'الشخصية',
    icon: User,
    color: 'from-amber-400 to-orange-500',
    bgIcon: 'bg-amber-100 text-amber-600',
    questions: [
      { id: 4, text: "وصف الشخصية (عيوب ومميزات من وجهة نظرك ونظر الناس)." },
      { id: 50, text: "إيه أكتر صفة الناس بيمدحوك فيها؟ وإيه أكتر صفة بيشتكوا منها؟" },
      { id: 9, text: "ما هي الأشياء التي تظل عالقة معك وتزعجك لفترة؟" },
      { id: 33, text: "النظام والترتيب؟ هل أنت شخص دقيق جداً (Obsessive) ولا فوضوي ولا مرن؟" },
      { id: 22, text: "لما بتكون متعصب جداً، إيه رد فعلك؟" },
      { id: 30, text: "لما بتحس إنك غلطت، إيه طريقتك في الاعتذار؟" }
    ]
  },
  {
    id: 'emotions',
    title: 'المشاعر والتواصل',
    icon: Heart,
    color: 'from-rose-400 to-pink-500',
    bgIcon: 'bg-rose-100 text-rose-600',
    questions: [
      { id: 8, text: "ما هي متطلباتك العاطفية والنفسية وماذا تقدم؟" },
      { id: 51, text: "هل بتعرف تعبر عن مشاعرك بالكلام ولا بالأفعال أكتر؟" },
      { id: 24, text: "إزاي بتعبر عن حبك واهتمامك؟ وإيه الطريقة اللي تحب الطرف التاني يعبرلك بيها؟" },
      { id: 37, text: "إيه مفهومك عن الغيرة؟ امتى بتكون 'حب واهتمام' وامتى بتقلب 'شك وخنقة'؟" },
      { id: 38, text: "إيه رأيك في الاحتفال بالمناسبات الخاصة (أعياد الميلاد، ذكرى الجواز)؟" }
    ]
  },
  {
    id: 'family',
    title: 'العائلة والمجتمع',
    icon: Users,
    color: 'from-blue-400 to-cyan-500',
    bgIcon: 'bg-blue-100 text-blue-600',
    questions: [
      { id: 21, text: "إيه تصورك عن الخلفه؟ والمنهج التربوي؟" },
      { id: 52, text: "لو ربنا رزقنا بأولاد، تفضل مدارس نوعها إيه (حكومي، خاص، إنترناشونال، أزهري)؟" },
      { id: 53, text: "استقبال الضيوف: هل بيتك مفتوح طول الوقت ولا بتحب الخصوصية والمواعيد المسبقة؟" },
      { id: 28, text: "إيه توقعاتك لشكل علاقتي بأهلك؟ وهل مسموح بتدخلهم؟" },
      { id: 10, text: "هل تفضل المساحة الشخصية أم الاندماج الكامل مع الأسرة؟" },
      { id: 25, text: "إيه حدود تعاملك مع الجنس الآخر (زملاء الشغل، السوشيال ميديا)؟" },
      { id: 32, text: "مين هما الناس (غير الأهل) اللي رأيهم بيأثر في قراراتك جداً؟" },
      { id: 29, text: "إيه رأيك في نشر تفاصيل حياتنا أو صورنا على السوشيال ميديا؟" }
    ]
  },
  {
    id: 'crisis',
    title: 'إدارة الخلاف والأزمات',
    icon: Briefcase,
    color: 'from-slate-600 to-gray-700',
    bgIcon: 'bg-gray-100 text-gray-700',
    questions: [
      { id: 54, text: "لو أنا مضايق أو ساكت (فصليت)، بتفضل تسيبني لوحدي ولا تلح عشان نعرف مالك؟" },
      { id: 55, text: "هل بتتقبل النقد؟ وإيه الطريقة اللي تخليك تتقبل النقد من غير ما تتعصب؟" },
      { id: 18, text: "ما هو الحل السليم للخلافات من وجهة نظرك؟" },
      { id: 19, text: "هل تميل لتدخل الأهل في الخلافات أم بقائها خاصة؟" },
      { id: 26, text: "في القرارات المصيرية (زي تغيير شغل، نقل سكن)، إزاي بناخد القرار؟" },
      { id: 27, text: "لو مرينا بأزمة كبيرة (مادية، مرض)، تتوقع مني إيه ورد فعلك إيه؟" },
      { id: 5, text: "ما هي الأشياء التي لا تتقبلها وتطلب الانفصال بسببها؟" }
    ]
  },
  {
    id: 'deep',
    title: 'مصارحة',
    icon: MessageCircle,
    color: 'from-indigo-500 to-purple-600',
    bgIcon: 'bg-indigo-100 text-indigo-600',
    questions: [
      { id: 6, text: "ما هو انطباعك المبدئي عني؟" },
      { id: 16, text: "هل تشعر بأي اختلاف بيننا الآن؟" },
      { id: 7, text: "ما هو تخيلك عن مسار علاقتنا (تفاؤل/تشاؤم)؟" },
      { id: 13, text: "ما هي مخاوفك وكوابيسك عن العلاقة؟" },
      { id: 14, text: "هل هناك ما تؤجله للحديث عنه بعد الخطوبة/الزواج؟" },
      { id: 15, text: "هل هناك ما يوترك أو تخجل من الحديث عنه؟" },
      { id: 31, text: "هل في صفة معينة شفتها فيا بتتمنى إنها تتغير؟" }
    ]
  }
];

// --- المكونات الفرعية ---

const StatBox = ({ icon, label, value, colorClass }) => (
  <div className="bg-white/60 backdrop-blur-sm p-2 rounded-2xl border border-white/50 shadow-sm flex flex-col items-center justify-center flex-1 transition-transform hover:scale-105 min-w-[70px]">
    <div className={`mb-1 ${colorClass}`}>{icon}</div>
    <span className="text-lg font-bold text-gray-800">{value}</span>
    <span className="text-[9px] text-gray-500 font-medium">{label}</span>
  </div>
);

const CardButton = ({ onClick, icon, label, type, subLabel }) => {
  const styles = {
    success: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-1",
    wait: "bg-white text-amber-600 border border-amber-200 hover:bg-amber-50 shadow-sm hover:shadow-md",
    skip: "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 shadow-sm hover:shadow-md",
    disagree: "bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 shadow-sm hover:shadow-md"
  };

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 w-full h-full group ${styles[type]}`}
    >
      <div className="mb-1 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <span className="text-sm font-bold">{label}</span>
      {subLabel && <span className={`text-[9px] mt-0.5 ${type === 'success' ? 'text-emerald-100' : 'text-gray-400'}`}>{subLabel}</span>}
    </button>
  );
};

// --- التطبيق الرئيسي ---

const LoveMapGame = () => {
  const [view, setView] = useState('dashboard');
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [showCelebration, setShowCelebration] = useState(false);

  // حساب الإحصائيات
  const totalQuestions = SECTIONS.reduce((acc, sec) => acc + sec.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  
  const stats = useMemo(() => {
    const agreed = Object.values(answers).filter(a => a === 'agreed').length;
    const later = Object.values(answers).filter(a => a === 'discuss_later').length;
    const skipped = Object.values(answers).filter(a => a === 'skip').length;
    const disagreed = Object.values(answers).filter(a => a === 'disagreed').length;
    
    // نسبة التوافق = الاتفاق / (الاتفاق + الاختلاف + التأجيل)
    const meaningfulAnswers = agreed + later + disagreed;
    
    const compatibility = meaningfulAnswers > 0 ? Math.round((agreed / meaningfulAnswers) * 100) : 0;
    const remaining = totalQuestions - answeredCount;

    return { agreed, later, skipped, disagreed, compatibility, remaining };
  }, [answers, totalQuestions, answeredCount]);

  const startSection = (sectionId) => {
    setActiveSectionId(sectionId);
    const section = SECTIONS.find(s => s.id === sectionId);
    const firstUnanswered = section.questions.findIndex(q => !answers[q.id]);
    setActiveQuestionIndex(firstUnanswered !== -1 ? firstUnanswered : 0);
    setView('game');
  };

  const handleAnswer = (type) => {
    const currentSection = SECTIONS.find(s => s.id === activeSectionId);
    if (!currentSection) return;

    const currentQuestion = currentSection.questions[activeQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: type }));

    if (activeQuestionIndex < currentSection.questions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    } else {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setView('dashboard');
      }, 1500);
    }
  };

  const getResultFeedback = (score) => {
    if (score >= 85) return { text: "توافق رهيب! 😍", color: "text-emerald-600" };
    if (score >= 70) return { text: "تفاهم عالي 👍", color: "text-blue-600" };
    if (score >= 50) return { text: "بداية موفقة 👌", color: "text-amber-600" };
    return { text: "فرصة للتقارب 🤝", color: "text-rose-600" };
  };

  const currentSectionData = SECTIONS.find(s => s.id === activeSectionId);
  const currentQuestionData = currentSectionData?.questions[activeQuestionIndex];
  
  const discussLaterList = SECTIONS.flatMap(s => 
    s.questions.filter(q => answers[q.id] === 'discuss_later').map(q => ({...q, section: s.title, color: s.color}))
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 relative overflow-hidden" dir="rtl">
      <style>{styles}</style>
      
      {/* خلفية */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft" style={{animationDelay: '2s'}}></div>
      </div>

      {/* الحاوية الرئيسية */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col shadow-2xl bg-white/60 backdrop-blur-xl border-x border-white/40">
        
        {/* --- Header (الرئيسية) --- */}
        {view === 'dashboard' && (
          <header className="pt-8 pb-4 px-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-rose-600 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-rose-500 fill-current" />
                  رحلة تعارف
                </h1>
                <p className="text-xs text-gray-500 font-medium mt-1">اكتشفوا مدى توافقكم بمتعة</p>
              </div>
              <button 
                onClick={() => setView('results')}
                className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform active:scale-95"
                title="النتائج"
              >
                <PieChart className="w-6 h-6 text-indigo-600" />
              </button>
            </div>

            {/* بطاقة الإحصائيات مع "اختلفنا" */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-1 shadow-lg shadow-indigo-200 mb-6 transform transition-all hover:scale-[1.01]">
              <div className="bg-white/95 backdrop-blur-sm rounded-[1.3rem] p-5">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">نسبة التوافق الحالية</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-4xl font-black text-gray-800">{stats.compatibility}%</span>
                      {stats.compatibility > 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">رائع!</span>}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-indigo-50 border-4 border-indigo-100 flex items-center justify-center">
                    <Heart className={`w-5 h-5 ${stats.compatibility > 70 ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <StatBox 
                    icon={<Check className="w-4 h-4" />} 
                    label="اتفقنا" 
                    value={stats.agreed} 
                    colorClass="text-emerald-500" 
                  />
                  {/* الخانة الجديدة للاختلاف */}
                  <StatBox 
                    icon={<AlertCircle className="w-4 h-4" />} 
                    label="اختلفنا" 
                    value={stats.disagreed} 
                    colorClass="text-rose-500" 
                  />
                  <StatBox 
                    icon={<Clock className="w-4 h-4" />} 
                    label="مؤجل" 
                    value={stats.later} 
                    colorClass="text-amber-500" 
                  />
                  <StatBox 
                    icon={<List className="w-4 h-4" />} 
                    label="متبقي" 
                    value={stats.remaining} 
                    colorClass="text-indigo-400" 
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-gray-800">اختر موضوعاً للنقاش</h3>
            </div>
          </header>
        )}

        {/* --- VIEW: DASHBOARD (GRID) --- */}
        {view === 'dashboard' && (
          <div className="flex-1 px-4 pb-24 overflow-y-auto custom-scrollbar animate-slide-up">
            <div className="grid grid-cols-1 gap-3">
              {SECTIONS.map((section) => {
                const sectionAnswered = section.questions.filter(q => answers[q.id]).length;
                const total = section.questions.length;
                const isComplete = sectionAnswered === total;
                const IconComponent = section.icon;

                return (
                  <div 
                    key={section.id}
                    onClick={() => startSection(section.id)}
                    className={`
                      relative group overflow-hidden rounded-2xl cursor-pointer transition-all duration-300
                      ${isComplete 
                        ? 'bg-white/50 border border-gray-100 opacity-60' 
                        : 'bg-white border-2 border-transparent hover:border-indigo-100 shadow-md hover:shadow-lg hover:-translate-y-1'}
                    `}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                    
                    <div className="p-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${section.bgIcon}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-gray-800 text-lg">{section.title}</h4>
                          {isComplete && <div className="bg-green-100 p-1 rounded-full"><Check className="w-3 h-3 text-green-600" /></div>}
                        </div>
                        
                        <div className="flex items-center gap-2">
                           <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${section.color} transition-all duration-500`}
                                style={{ width: `${(sectionAnswered/total)*100}%` }}
                              ></div>
                           </div>
                           <span className="text-[10px] text-gray-400 font-bold">{sectionAnswered}/{total}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- VIEW: GAME --- */}
        {view === 'game' && currentQuestionData && (
          <div className="flex-1 flex flex-col p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setView('dashboard')}
                className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg bg-gradient-to-r ${currentSectionData.color}`}>
                {currentSectionData.title}
              </div>
              <div className="w-10"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 p-8 min-h-[320px] flex flex-col items-center text-center relative overflow-hidden border border-white/50">
                
                <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${currentSectionData.color}`}></div>
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${currentSectionData.color} opacity-10 rounded-full blur-2xl`}></div>
                <div className={`absolute top-10 -left-10 w-24 h-24 bg-gradient-to-br ${currentSectionData.color} opacity-10 rounded-full blur-xl`}></div>

                <span className="text-6xl font-black text-gray-50 opacity-[0.08] absolute top-8 left-1/2 -translate-x-1/2 scale-150 select-none">
                  {activeQuestionIndex + 1}
                </span>

                <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mt-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed drop-shadow-sm">
                    {currentQuestionData.text}
                  </h2>
                  
                  {answers[currentQuestionData.id] && (
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-gray-400 animate-fade-in">
                      <span>تمت الإجابة:</span>
                      {answers[currentQuestionData.id] === 'agreed' && <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />}
                      {answers[currentQuestionData.id] === 'disagreed' && <AlertCircle className="w-3 h-3 text-rose-600" />}
                      {answers[currentQuestionData.id] === 'discuss_later' && <Clock className="w-3 h-3 text-amber-500" />}
                      {answers[currentQuestionData.id] === 'skip' && <ArrowRight className="w-3 h-3 text-gray-400" />}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-1.5 mt-auto pt-8">
                  {currentSectionData.questions.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeQuestionIndex 
                        ? `w-6 bg-gradient-to-r ${currentSectionData.color}` 
                        : 'w-1.5 bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* أزرار التحكم - تم تعديلها لتشمل زر "اختلفنا" */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="col-span-1 h-20">
                    <CardButton 
                    type="skip" 
                    icon={<ArrowRight className="w-5 h-5" />} 
                    label="تجاوز" 
                    subLabel="ليس الآن"
                    onClick={() => handleAnswer('skip')}
                    />
                </div>
                <div className="col-span-1 h-20">
                    <CardButton 
                    type="wait" 
                    icon={<Clock className="w-5 h-5" />} 
                    label="مؤجل" 
                    subLabel="يحتاج نقاش"
                    onClick={() => handleAnswer('discuss_later')}
                    />
                </div>
                {/* الصف الثاني للأزرار الحاسمة */}
                <div className="col-span-1 h-24">
                    <CardButton 
                    type="disagree" 
                    icon={<AlertCircle className="w-6 h-6" />} 
                    label="اختلفنا" 
                    subLabel="وجهات نظر متباعدة"
                    onClick={() => handleAnswer('disagreed')}
                    />
                </div>
                <div className="col-span-1 h-24">
                    <CardButton 
                    type="success" 
                    icon={<Heart className="w-6 h-6 fill-current" />} 
                    label="اتفقنا" 
                    subLabel="نقطة مشتركة"
                    onClick={() => handleAnswer('agreed')}
                    />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: RESULTS --- */}
        {view === 'results' && (
          <div className="flex-1 bg-white/95 animate-slide-up overflow-y-auto z-20 custom-scrollbar">
            <div className="p-6">
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <List className="w-6 h-6 text-indigo-500" />
                  الملخص
                </h2>
                <button onClick={() => setView('dashboard')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                   <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white text-center shadow-xl shadow-indigo-200 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <div className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2">مؤشر التوافق العام</div>
                  <div className="text-7xl font-black mb-2 tracking-tighter">{stats.compatibility}%</div>
                  <div className={`text-xl font-bold ${getResultFeedback(stats.compatibility).color} bg-white/10 inline-block px-4 py-1 rounded-lg backdrop-blur-md`}>
                    {getResultFeedback(stats.compatibility).text}
                  </div>
                </div>
              </div>

              {/* شبكة الإحصائيات (محدثة) */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                 <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 text-center flex flex-col items-center">
                    <Heart className="w-6 h-6 text-emerald-500 mb-1 fill-emerald-500" />
                    <span className="text-2xl font-bold text-emerald-700">{stats.agreed}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">نقاط اتفاق</span>
                 </div>
                 <div className="bg-rose-50 p-3 rounded-2xl border border-rose-100 text-center flex flex-col items-center">
                    <AlertCircle className="w-6 h-6 text-rose-500 mb-1" />
                    <span className="text-2xl font-bold text-rose-700">{stats.disagreed}</span>
                    <span className="text-[10px] text-rose-600 font-bold">نقاط اختلاف</span>
                 </div>
                 <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 text-center flex flex-col items-center">
                    <Clock className="w-6 h-6 text-amber-500 mb-1" />
                    <span className="text-2xl font-bold text-amber-700">{stats.later}</span>
                    <span className="text-[10px] text-amber-600 font-bold">تحتاج لنقاش</span>
                 </div>
                 <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center flex flex-col items-center">
                    <List className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-2xl font-bold text-slate-600">{stats.remaining}</span>
                    <span className="text-[10px] text-slate-500 font-bold">متبقي</span>
                 </div>
              </div>

              {discussLaterList.length > 0 ? (
                <div className="mb-10 animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">نقاط تحتاج لنقاش أعمق</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {discussLaterList.map((item, idx) => (
                      <div key={idx} className="bg-white border-l-4 border-l-amber-400 border border-gray-100 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                           <span className={`text-[10px] px-2 py-0.5 rounded bg-gray-100 font-bold text-gray-500`}>
                             {item.section}
                           </span>
                           <Clock className="w-3 h-3 text-amber-400" />
                        </div>
                        <p className="text-gray-700 font-medium text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <button 
                onClick={() => setView('dashboard')}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
              >
                العودة للرئيسية
              </button>
            </div>
          </div>
        )}

        {/* الاحتفال (فقط عند الاتفاق أو الانتهاء) */}
        {showCelebration && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md animate-fade-in">
             <div className="bg-white p-8 rounded-[2rem] shadow-2xl transform scale-110 flex flex-col items-center animate-bounce-slow">
                <div className="relative">
                   <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50 animate-pulse-soft"></div>
                   <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg">
                      <Check className="w-10 h-10 text-white" />
                   </div>
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-1">ممتاز!</h3>
                <p className="text-gray-500 font-medium">أكملتما هذا المحور</p>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoveMapGame;
