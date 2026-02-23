import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, BookOpen, GraduationCap, Info } from 'lucide-react'
import ScrollAnimation from '../components/ScrollAnimation'

const AdmissionCorner = () => {
  const { t } = useLanguage()

  const categories = [
    {
      id: 'engineering',
      title: t('study.admission.engineering'),
      subjects: [
        { id: 'engineering-physics', name: t('study.admission.physics') },
        { id: 'engineering-chemistry', name: t('study.admission.chemistry') },
        { id: 'engineering-math', name: t('study.admission.math') },
        { id: 'engineering-highermath', name: t('study.admission.highermath') },
      ]
    },
    {
      id: 'medical',
      title: t('study.admission.medical'),
      subjects: [
        { id: 'medical-physics', name: t('study.admission.physics') },
        { id: 'medical-chemistry', name: t('study.admission.chemistry') },
        { id: 'medical-biology', name: t('study.admission.biology') },
        { id: 'medical-gk', name: t('study.admission.gk') },
        { id: 'medical-english', name: t('study.admission.english') },
      ]
    },
    {
      id: 'university',
      title: t('study.admission.university'),
      subjects: [
        { id: 'university-bangla', name: t('study.admission.bangla') },
        { id: 'university-english', name: t('study.admission.english') },
        { id: 'university-gk', name: t('study.admission.gk') },
        { id: 'university-math', name: t('study.admission.math') },
      ]
    }
  ]

  return (
    <div className="min-h-screen py-20 bg-slate-50 dark:bg-slate-950">
      <Helmet>
        <title>{t('study.admission.title')} | Kafa’ah</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/study" className="inline-flex items-center gap-2 text-emerald-500 font-bold mb-12 hover:gap-3 transition-all">
          <ArrowLeft size={20} />
          {t('study.back')}
        </Link>

        <div className="mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('study.admission.title')}</h1>
          <p className="text-slate-600 dark:text-slate-400">{t('study.admission.subtitle')}</p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-16 flex items-start gap-4">
          <Info className="text-emerald-500 shrink-0 mt-1" size={24} />
          <p className="text-emerald-800 dark:text-emerald-200 text-sm">
            Admission corner is currently under heavy development. We are adding previous years' questions from BUET, Medical, and top Universities InShaAllah.
          </p>
        </div>

        <div className="space-y-20">
          {categories.map((category, idx) => (
            <ScrollAnimation key={idx}>
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.subjects.map(subject => (
                    <Link
                      key={subject.id}
                      to={`/study/exam?group=admission&subject=${subject.id}`}
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Targeting Top Institutions</h2>
          <p className="text-slate-600 dark:text-slate-400">Prepare yourself for BUET, Medical, DU, and other top universities with our smart exam system.</p>
        </div>
      </div>
    </div>
  )
}

export default AdmissionCorner
