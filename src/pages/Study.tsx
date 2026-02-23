import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Book, GraduationCap, Languages, Heart, Star, BookOpen } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import ScrollAnimation from '../components/ScrollAnimation'

const Study = () => {
  const { t } = useLanguage()

  const sections = [
    { icon: <GraduationCap size={32} />, title: t('study.ssc'), path: '/study/ssc', color: 'bg-blue-500' },
    { icon: <GraduationCap size={32} />, title: t('study.hsc'), path: '/study/hsc', color: 'bg-emerald-500' },
    { icon: <GraduationCap size={32} />, title: t('study.admission'), path: '/study/admission', color: 'bg-purple-500' },
    { icon: <Book size={32} />, title: t('study.quran'), path: '#', color: 'bg-amber-500', comingSoon: true },
    { icon: <Languages size={32} />, title: t('study.english'), path: '#', color: 'bg-rose-500', comingSoon: true },
    { icon: <Heart size={32} />, title: t('study.islamic'), path: '#', color: 'bg-teal-500', comingSoon: true },
  ]

  return (
    <div className="min-h-screen py-20">
      <Helmet>
        <title>Study Corner | Kafa’ah</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Study Corner
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Your smart companion for academic and Islamic excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <ScrollAnimation key={idx}>
              <Link
                to={section.path}
                className={`group relative block p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden ${section.comingSoon ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${section.color} opacity-5 rounded-bl-full group-hover:scale-150 transition-transform duration-500`}></div>
                
                <div className={`w-16 h-16 rounded-2xl ${section.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-${section.color.split('-')[1]}-500/20`}>
                  {section.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{section.title}</h3>
                
                {section.comingSoon ? (
                  <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold rounded-full uppercase tracking-widest">
                    Coming Soon
                  </span>
                ) : (
                  <div className="flex items-center text-emerald-500 font-bold text-sm group-hover:gap-2 transition-all">
                    <span>Explore Now</span>
                    <ArrowRight size={16} />
                  </div>
                )}
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  )
}

const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default Study
