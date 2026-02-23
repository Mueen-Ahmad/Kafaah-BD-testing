import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import ScrollAnimation from '../components/ScrollAnimation'

const TermsConditions = () => {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen py-20">
      <Helmet>
        <title>Terms & Conditions | Kafa’ah</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center"
        >
          Terms & Conditions
        </motion.h1>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm prose dark:prose-invert max-w-none">
          {lang === 'bn' ? (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">১. ব্যবহারের শর্ত</h2>
                <p>আমাদের সেবাগুলো ব্যবহারের মাধ্যমে আপনি আমাদের সকল শর্তাবলী মেনে নিচ্ছেন বলে গণ্য হবে।</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">২. মেধা সম্পদ</h2>
                <p>এই ওয়েবসাইটের সকল কন্টেন্ট কাফআহ কোম্পানির নিজস্ব সম্পত্তি। অনুমতি ছাড়া কপি করা দণ্ডনীয় অপরাধ।</p>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">1. Acceptance of Terms</h2>
                <p>By using our services, you agree to be bound by these terms and conditions.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">2. Intellectual Property</h2>
                <p>All content on this website is the property of Kafa'ah. Unauthorized reproduction is prohibited.</p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TermsConditions
