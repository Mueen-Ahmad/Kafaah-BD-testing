import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react'
import ScrollAnimation from '../components/ScrollAnimation'

const Contact = () => {
  const { t } = useLanguage()

  const contactInfo = [
    { icon: <Mail size={24} />, label: "Email", value: "tanvirishrak04@gmail.com", color: "bg-emerald-500" },
    { icon: <Phone size={24} />, label: "Phone", value: "01770676700", color: "bg-teal-500" },
    { icon: <MapPin size={24} />, label: "Address", value: "Rajshahi", color: "bg-blue-500" },
  ]

  return (
    <div className="min-h-screen py-20">
      <Helmet>
        <title>Contact Us | Kafa’ah</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Get in Touch
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {contactInfo.map((info, idx) => (
            <ScrollAnimation key={idx}>
              <div className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all text-center group">
                <div className={`w-16 h-16 rounded-2xl ${info.color} text-white flex items-center justify-center mx-auto mb-8 shadow-lg shadow-${info.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                  {info.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{info.label}</h3>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{info.value}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <ScrollAnimation>
            <div className="bg-emerald-500 rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-emerald-500/20">
              <MessageSquare size={48} className="mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
              <p className="text-emerald-50 mb-8">Our team will get back to you within 24 hours InShaAllah.</p>
              <a
                href="mailto:tanvirishrak04@gmail.com"
                className="inline-block px-12 py-4 bg-white text-emerald-600 rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Email Us Now
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}

export default Contact
