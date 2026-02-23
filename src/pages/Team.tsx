import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import { User } from 'lucide-react'
import ScrollAnimation from '../components/ScrollAnimation'

const Team = () => {
  const { t } = useLanguage()

  const team = [
    { name: "Tanvir Ishrak", role: "Lead Architect", image: null },
    { name: "Marjuk Mahmud", role: "Idea Generator", image: null },
    { name: "Ahnaf Habib Ritom", role: "Enzyme", image: null },
    { name: "MD Rifat Al Mahmud", role: "Catalyst", image: null },
    { name: "Mueen Ahmad", role: "App Developer", image: null },
  ]

  return (
    <div className="min-h-screen py-20">
      <Helmet>
        <title>Our Team | Kafa’ah</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Meet Our Team
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The dedicated individuals working behind the scenes to build technology for the Ummah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <ScrollAnimation key={idx}>
              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all text-center group">
                <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6 border-4 border-white dark:border-slate-800 shadow-inner group-hover:scale-105 transition-transform">
                  <User size={64} className="text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-emerald-500 font-medium text-sm">{member.role}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-32 p-12 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] text-center border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Want to Join Our Team?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">We are always looking for passionate individuals to join our mission.</p>
          <motion.a
            href="/joining-conditions"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-emerald-500 text-white rounded-full font-bold shadow-lg shadow-emerald-500/20"
          >
            View Joining Conditions
          </motion.a>
        </div>
      </div>
    </div>
  )
}

export default Team
