import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Footer = () => {
  const { t, lang } = useLanguage()

  const footerLinks = {
    company: [
      { name: t('footer.about'), path: '/about' },
      { name: t('footer.team'), path: '/team' },
      { name: t('footer.contact'), path: '/contact' },
    ],
    legal: [
      { name: t('footer.privacy'), path: '/privacy-policy' },
      { name: t('footer.joining'), path: '/joining-conditions' },
      { name: t('footer.terms'), path: '/terms-conditions' },
    ],
    services: [
      { name: t('footer.projects'), path: '/projects' },
      { name: t('footer.join'), path: '/joining-conditions' },
    ]
  }

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Social */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold text-emerald-600">Kafa’ah</Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {t('home.hero.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:shadow-md transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:shadow-md transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:shadow-md transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:shadow-md transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-6 uppercase tracking-wider text-xs">{t('footer.about')}</h4>
            <ul className="space-y-4">
              {footerLinks.company.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 text-sm transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-6 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 text-sm transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-slate-900 dark:text-white font-semibold mb-6 uppercase tracking-wider text-xs">{t('footer.contact')}</h4>
            <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-400 text-sm">
              <MapPin size={18} className="text-emerald-500 shrink-0" />
              <span>Rajshahi</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-sm">
              <Phone size={18} className="text-emerald-500 shrink-0" />
              <span>01770676700</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-sm">
              <Mail size={18} className="text-emerald-500 shrink-0" />
              <span>tanvirishrak04@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-500 dark:text-slate-500 text-[10px] sm:text-xs leading-relaxed max-w-4xl mx-auto">
            {lang === 'bn' ? t('footer.copyright.bn') : t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
