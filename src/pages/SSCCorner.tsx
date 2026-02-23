import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, BookOpen, GraduationCap } from 'lucide-react'
import ScrollAnimation from '../components/ScrollAnimation'

const SSCCorner = () => {
  const { t } = useLanguage()

  const groups = [
    {
      title: t('study.common'),
      subjects: [
        { id: 'bangla', name: t('study.subjects.bangla') },
        { id: 'english', name: t('study.subjects.english') },
        { id: 'ict', name: t('study.subjects.ict') },
        { id: 'math', name: t('study.subjects.math') },
        { id: 'islam', name: t('study.subjects.islam') },
      ]
    },
    {
      title: t('study.science'),
      subjects: [
        { id: 'physics', name: t('study.subjects.physics') },
        { id: 'chemistry', name: t('study.subjects.chemistry') },
        { id: 'biology', name: t('study.subjects.biology') },
        { id: 'highermath', name: t('study.subjects.highermath') },
      ]
    },
    {
      title: t('study.arts'),
      subjects: [
        { id: 'history', name: t('study.subjects.history') },
        { id: 'civics', name: t('study.subjects.civics') },
        { id: 'geography', name: t('study.subjects.geography') },
      ]
    },
    {
      title: t('study.commerce'),
      subjects: [
        { id: 'accounting', name: t('study.subjects.accounting') },
        { id: 'business', name: t('study.subjects.business') },
        { id: 'finance', name: t('study.subjects.finance') },
      ]
    }
  ]

  return (
    <div className="min-h-screen py-20 bg-slate-50 dark:bg-slate-950">
      <Helmet>
        <title>{t('study.ssc.title')} | Kafa’ah</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/study" className="inline-flex items-center gap-2 text-emerald-500 font-bold mb-12 hover:gap-3 transition-all">
          <ArrowLeft size={20} />
          {t('study.back')}
        </Link>

        <div className="mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('study.ssc.title')}</h1>
          <p className="text-slate-600 dark:text-slate-400">{t('study.ssc.subtitle')}</p>
        </div>

        <div className="space-y-16">
          {groups.map((group, idx) => (
            <ScrollAnimation key={idx}>
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                  {group.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {group.subjects.map(subject => (
                    <Link
                      key={subject.id}
                      to={`/study/exam?group=ssc&subject=${subject.id}`}
                      className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <BookOpen size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                        {subject.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-24 p-12 bg-white dark:bg-slate-900 rounded-[2.5rem] text-center border border-slate-100 dark:border-slate-800">
          <GraduationCap size={48} className="mx-auto text-emerald-500 mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">More Content Coming Soon</h2>
          <p className="text-slate-600 dark:text-slate-400">We are constantly updating our question bank InShaAllah.</p>
        </div>
      </div>
    </div>
  )
}

export default SSCCorner
