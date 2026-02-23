import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import { Shield, Target, Award, Users, CheckCircle2 } from 'lucide-react'
import ScrollAnimation from '../components/ScrollAnimation'

const About = () => {
  const { t } = useLanguage()

  const features = [
    { icon: <Shield className="text-emerald-500" />, title: "Authentic Content", desc: "Every piece of information is verified for accuracy." },
    { icon: <Target className="text-teal-500" />, title: "Modern Tech", desc: "Built with cutting-edge technologies for best performance." },
    { icon: <Award className="text-amber-500" />, title: "Islamic Values", desc: "Our core values are rooted in the Quran and Sunnah." },
    { icon: <Users className="text-blue-500" />, title: "Community Focused", desc: "Designed to serve the global Muslim Ummah." },
  ]

  return (
    <div className="min-h-screen py-20">
      <Helmet>
        <title>About Us | Kafa’ah</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
          >
            About <span className="text-emerald-500">Kafa’ah</span>
          </motion.h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Kafa’ah Islamic and Multiproject Company is a digital platform dedicated to serving the Muslim Ummah through technology.
          </p>
        </div>

        {/* Mission/Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <ScrollAnimation>
            <div className="p-10 rounded-[2.5rem] bg-emerald-500 text-white shadow-2xl shadow-emerald-500/20 h-full">
              <h2 className="text-3xl font-bold mb-6">{t('home.mission.title')}</h2>
              <p className="text-emerald-50 text-lg leading-relaxed">{t('home.mission.text')}</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation>
            <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl h-full">
              <h2 className="text-3xl font-bold mb-6 text-emerald-500">{t('home.vision.title')}</h2>
              <p className="text-slate-400 text-lg leading-relaxed">{t('home.vision.text')}</p>
            </div>
          </ScrollAnimation>
        </div>

        {/* Uniqueness */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">What Makes Us Unique?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <ScrollAnimation key={i}>
                <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Partners */}
        <section className="py-20 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Partners</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="text-3xl font-black tracking-tighter text-slate-400">DOYOSOFT</div>
            <div className="text-3xl font-black tracking-tighter text-slate-400">KAFA'AH</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
