import { motion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'
import ScrollAnimation from '../components/ScrollAnimation'

const PrivacyPolicy = () => {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen py-20">
      <Helmet>
        <title>Privacy Policy | Kafa’ah</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center"
        >
          Privacy Policy
        </motion.h1>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm prose dark:prose-invert max-w-none">
          {lang === 'bn' ? (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">১. তথ্য সংগ্রহ</h2>
                <p>আমরা আমাদের অ্যাপ এবং ওয়েবসাইটে আপনার নাম, ইমেইল এবং ব্যবহারের ধরণ সংক্রান্ত তথ্য সংগ্রহ করতে পারি।</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">২. তথ্যের ব্যবহার</h2>
                <p>আপনার অভিজ্ঞতা উন্নত করতে এবং আমাদের সেবাগুলো আরও কার্যকর করতে এই তথ্য ব্যবহৃত হয়।</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">৩. তথ্য সুরক্ষা</h2>
                <p>আমরা আপনার তথ্যের সর্বোচ্চ নিরাপত্তা নিশ্চিত করতে আধুনিক প্রযুক্তি ব্যবহার করি।</p>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">1. Information Collection</h2>
                <p>We may collect your name, email address, and usage patterns when you use our apps and website.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">2. Use of Information</h2>
                <p>The information is used to personalize your experience and improve our services.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-emerald-600">3. Data Security</h2>
                <p>We implement advanced security measures to protect your personal information from unauthorized access.</p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
