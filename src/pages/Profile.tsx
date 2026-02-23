import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { User, History, Award, BookOpen, Clock, ChevronRight, Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

interface ExamHistory {
  id: string
  created_at: string
  subject_id: string
  chapter_name: string
  score: number
  total_questions: number
  correct_answers: number
  time_taken: number
}

interface Profile {
  full_name: string
  points: number
  institution: string
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [history, setHistory] = useState<ExamHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
      return
    }

    if (user) {
      fetchData()
    }
  }, [user, authLoading])

  const fetchData = async () => {
    if (!user) return
    
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (profileError && profileError.code === 'PGRST116') {
        // Profile missing, create it
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert([{ id: user.id, full_name: user.user_metadata?.full_name || 'Student', points: 0 }])
          .select()
          .single()
        setProfile(newProfile)
      } else {
        setProfile(profileData)
      }

      // Fetch history
      const { data: historyData, error: historyError } = await supabase
        .from('exam_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (historyError) throw historyError
      setHistory(historyData || [])
    } catch (err: any) {
      console.error('Error fetching data:', err)
      // Optional: show a small toast or error message
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="w-32 h-32 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600">
            <User size={64} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {profile?.full_name || 'Student Name'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              {profile?.institution || 'Institution not set'}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center gap-2 text-emerald-600 font-bold">
                <Award size={20} />
                {profile?.points || 0} Points
              </div>
              <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center gap-2 text-blue-600 font-bold">
                <BookOpen size={20} />
                {history.length} Exams Taken
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Summary */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="text-emerald-500" />
              Progress Overview
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-800 space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Average Score</span>
                  <span className="font-bold text-emerald-500">
                    {history.length > 0 
                      ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length)
                      : 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000"
                    style={{ width: `${history.length > 0 ? history.reduce((acc, h) => acc + h.score, 0) / history.length : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Exam History */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="text-emerald-500" />
              Exam History
            </h2>
            <div className="space-y-4">
              {history.length > 0 ? (
                history.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${item.score >= 80 ? 'bg-emerald-100 text-emerald-600' : item.score >= 50 ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
                        {Math.round(item.score)}%
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{item.chapter_name}</h3>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                          <span>{item.correct_answers}/{item.total_questions} Correct</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-300" />
                  </motion.div>
                ))
              ) : (
                <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl text-center border border-dashed border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500">No exams taken yet. Start practicing!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
