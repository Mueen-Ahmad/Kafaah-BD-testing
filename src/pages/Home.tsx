import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { BookOpen, Code, Globe, Shield, Zap, Users, ArrowRight, Quote } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import ScrollAnimation from '../components/ScrollAnimation'

const Home = () => {
  const { t, lang } = useLanguage()
  const [ayat, setAyat] = useState<{ text: string; surah: string } | null>(null)
  const [loadingAyat, setLoadingAyat] = useState(true)

  const fetchAyat = async () => {
    setLoadingAyat(true)
    try {
      const randomAyat = Math.floor(Math.random() * 6236) + 1
      const res = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyat}/en.asad`)
      const data = await res.json()
      setAyat({
        text: data.data.text,
        surah: `${data.data.surah.englishName} ${data.data.surah.number}:${data.data.numberInSurah}`
      })
    } catch (error) {
      console.error("Error fetching ayat:", error)
    } finally {
      setLoadingAyat(false)
    }
  }

  useEffect(() => {
    fetchAyat()
  }, [])

  const services = [
    { icon: <Code size={24} />, title: t('home.services.software'), desc: "Custom web and mobile solutions tailored for your needs." },
    { icon: <Globe size={24} />, title: t('home.services.islamicapps'), desc: "Authentic Islamic applications for daily spiritual growth." },
    { icon: <BookOpen size={24} />, title: t('home.services.learning'), desc: "Modern educational platforms for smart learning." },
    { icon: <Zap size={24} />, title: t('home.services.saas'), desc: "Scalable software as a service for global impact." },
  ]

  const values = [
    { title: t('home.why.authentic'), desc: "Verified by scholars and experts." },
    { title: t('home.why.quality'), desc: "Using latest tech stacks like React, Node, and Cloud." },
    { title: t('home.why.ethical'), desc: "Strict adherence to Islamic principles in business." },
  ]

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Kafa’ah | Technology for Ummah</title>
        <meta name="description" content="Kafa’ah Islamic and Multiproject Company - Building technology for the Muslim Ummah." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="block text-slate-900 dark:text-white">Kafa’ah Islamic &</span>
              <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Multiproject Company
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto font-medium">
              {t('home.hero.tagline')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/joining-conditions"
                className="w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-lg shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-1"
              >
                {t('home.cta.button')}
              </Link>
              <Link
                to="/projects"
                className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                {t('nav.projects')}
              </Link>
            </div>
          </motion.div>

          {/* Slogan */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 italic text-emerald-600 dark:text-emerald-400 font-serif text-lg"
          >
            "{t('home.slogan')}"
          </motion.div>
        </div>
      </section>

      {/* Quran Ayat Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollAnimation>
            <div className="inline-block p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 mb-8">
              <Quote size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              {lang === 'bn' ? 'আজকের আয়াত' : 'Today\'s Ayat'}
            </h2>
            <div className="min-h-[150px] flex flex-col justify-center">
              {loadingAyat ? (
                <p className="text-slate-500 animate-pulse">{lang === 'bn' ? 'আয়াত লোড হচ্ছে...' : 'Loading Ayat...'}</p>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={ayat?.text}
                >
                  <p className="text-2xl md:text-3xl font-serif text-slate-800 dark:text-slate-200 leading-relaxed mb-6">
                    "{ayat?.text}"
                  </p>
                  <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm">
                    — {ayat?.surah}
                  </p>
                </motion.div>
              )}
            </div>
            <button
              onClick={fetchAyat}
              className="mt-10 text-sm font-bold text-slate-500 hover:text-emerald-500 transition-colors uppercase tracking-widest"
            >
              {lang === 'bn' ? 'নতুন আয়াত' : 'Next Ayat'}
            </button>
          </ScrollAnimation>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                    {t('home.mission.title')}
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('home.mission.text')}
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-teal-500 rounded-full"></span>
                    {t('home.vision.title')}
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('home.vision.text')}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://picsum.photos/seed/kafaah/800/800"
                    alt="Mission"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">100%</p>
                      <p className="text-sm text-slate-500">Authentic Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">{t('home.services.title')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Providing innovative digital solutions with Islamic values at the core.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ScrollAnimation key={idx}>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('home.why.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, idx) => (
              <ScrollAnimation key={idx}>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{value.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">{t('home.cta.title')}</h2>
              <Link
                to="/joining-conditions"
                className="inline-flex items-center gap-2 px-12 py-5 bg-white text-emerald-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                {t('home.cta.button')}
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
