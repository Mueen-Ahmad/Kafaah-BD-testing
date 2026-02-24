import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import ScrollAnimation from '../components/ScrollAnimation'

const JoiningConditions = () => {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen py-20">
      <Helmet>
        <title>Joining Conditions | Kafa’ah</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center"
        >
          Joining Conditions
        </motion.h1>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm prose dark:prose-invert max-w-none">
          {lang === 'bn' ? (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">১. কোম্পানির ধরণ</h2>
                <p>কাফআহ একটি অলাভজনক সামাজিক উদ্যোগ নয়, বরং এটি একটি ইসলামিক মাল্টিপ্রজেক্ট কোম্পানি।</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">২. বেতন নীতি</h2>
                <p>বর্তমানে আমরা কোনো নির্দিষ্ট বেতন প্রদান করছি না। তবে ভবিষ্যতে প্রজেক্ট থেকে আয় শুরু হলে লভ্যাংশ বন্টন করা হবে ইনশাআল্লাহ।</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">৩. কাজের ধরণ</h2>
                <p>এটি সম্পূর্ণ রিমোট কাজ। আপনি আপনার সুবিধাজনক সময়ে কাজ করতে পারবেন।</p>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">1. Company Status</h2>
                <p>Kafa'ah is an Islamic Multiproject Company, not a non-profit organization.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">2. Salary Policy</h2>
                <p>Currently, we do not offer fixed salaries. However, once projects become profitable, dividends will be shared InShaAllah.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">3. Work Type</h2>
                <p>This is a 100% remote position. You can work according to your own schedule.</p>
              </section>
            </div>
          )}
        </div>
        <div className="mt-12 text-center">
          <motion.a
            href="https://docs.google.com/forms/d/e/1FAIpQLScM3Usiy57D08kuVwDl__6vaR6YjRTCrIvGoCFH_U5wwF8kKw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold shadow-lg shadow-emerald-500/20 transition-all text-lg"
          >
            {lang === 'bn' ? 'এখনই যুক্ত হোন' : 'Join Now'}
          </motion.a>
        </div>
      </div>
    </div>
  )
}

export default JoiningConditions
