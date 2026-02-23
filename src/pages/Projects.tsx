import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import ScrollAnimation from '../components/ScrollAnimation'
import ProgressBar from '../components/ProgressBar'
import { BookOpen, Languages, GraduationCap } from 'lucide-react'

const Projects = () => {
  const { t } = useLanguage()

  const projects = [
    {
      icon: <BookOpen className="text-emerald-500" />,
      title: t('projects.quran.title'),
      progress: t('projects.quran.progress'),
      desc: t('projects.quran.desc'),
      color: "emerald"
    },
    {
      icon: <Languages className="text-blue-500" />,
      title: t('projects.english.title'),
      progress: t('projects.english.progress'),
      desc: t('projects.english.desc'),
      color: "blue"
    },
    {
      icon: <GraduationCap className="text-purple-500" />,
      title: t('projects.study.title'),
      progress: "10%",
      desc: t('projects.study.desc'),
      color: "purple"
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <Helmet>
        <title>Our Projects | Kafa’ah</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Our Projects
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Innovative digital platforms we are building for the Muslim Ummah.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, idx) => (
            <ScrollAnimation key={idx}>
              <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-1/3">
                    <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-8 shadow-inner">
                      {project.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{project.title}</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-slate-400 uppercase tracking-widest">Development Progress</span>
                        <span className="text-emerald-500">{project.progress}</span>
                      </div>
                      <ProgressBar progress={project.progress} />
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                        {project.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-emerald-600 font-bold italic text-lg">{t('projects.more')}</p>
        </div>
      </div>
    </div>
  )
}

export default Projects
