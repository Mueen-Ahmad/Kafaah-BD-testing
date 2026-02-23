import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './contexts/AuthContext'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Study = lazy(() => import('./pages/Study'))
const SSCCorner = lazy(() => import('./pages/SSCCorner'))
const HSCCorner = lazy(() => import('./pages/HSCCorner'))
const AdmissionCorner = lazy(() => import('./pages/AdmissionCorner'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Team = lazy(() => import('./pages/Team'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const JoiningConditions = lazy(() => import('./pages/JoiningConditions'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const ExamCenter = lazy(() => import('./pages/ExamCenter'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Profile = lazy(() => import('./pages/Profile'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30">
        <Navbar />
        <main className="pt-16">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/study" element={<Study />} />
              <Route path="/study/ssc" element={<SSCCorner />} />
              <Route path="/study/hsc" element={<HSCCorner />} />
              <Route path="/study/admission" element={<AdmissionCorner />} />
              <Route path="/study/exam" element={<ExamCenter />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/joining-conditions" element={<JoiningConditions />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
