import { useLanguage } from '../contexts/LanguageContext'

const LanguageToggle = () => {
  const { lang, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all"
    >
      <span>{lang === 'en' ? 'BN' : 'EN'}</span>
    </button>
  )
}

export default LanguageToggle
