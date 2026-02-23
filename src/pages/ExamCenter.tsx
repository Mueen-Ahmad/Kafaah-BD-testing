import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Clock, CheckCircle2, XCircle, AlertCircle, Download, RotateCcw, Play, Settings } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { Helmet } from 'react-helmet-async'
import { subjectChapters, Chapter } from '../data/subjectChapters'
import { supabase } from '../services/supabase'
import Markdown from 'react-markdown'
import 'katex/dist/katex.min.css'

interface Question {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

const ExamCenter = () => {
  const [searchParams] = useSearchParams()
  const group = searchParams.get('group') || ''
  const subjectId = searchParams.get('subject') || ''
  const { t, lang } = useLanguage()
  const { user } = useAuth()

  // State
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Exam Config
  const [examStarted, setExamStarted] = useState(false)
  const [examFinished, setExamFinished] = useState(false)
  const [questionCount, setQuestionCount] = useState(10)
  const [duration, setDuration] = useState(10) // minutes
  
  // Exam Running State
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (group && subjectId && subjectChapters[group] && subjectChapters[group][subjectId]) {
      setChapters(subjectChapters[group][subjectId])
    }
  }, [group, subjectId])

  const loadQuestions = async (chapter: Chapter) => {
    if (chapter.url === '#') {
      setError('Questions for this chapter are coming soon InShaAllah.')
      return
    }

    setLoading(true)
    setError('')
    try {
      let normalizedData = []

      if (chapter.url === 'supabase') {
        // Fetch from Supabase
        const { data, error: sbError } = await supabase
          .from('questions')
          .select('*')
          .eq('category_group', group)
          .eq('subject_id', subjectId)
          .eq('chapter_name', chapter.name)

        if (sbError) throw sbError
        if (!data || data.length === 0) throw new Error('No questions found in database for this chapter.')

        normalizedData = data.map((q: any) => ({
          question: q.question_text,
          options: q.options,
          answer: q.correct_option,
          explanation: q.explanation
        }))
      } else {
        // Fetch from JSON URL (GitHub)
        const res = await fetch(chapter.url)
        if (!res.ok) throw new Error('Failed to fetch questions')
        const data = await res.json()
        
        // Normalize data to handle different JSON formats
        normalizedData = data.map((q: any) => {
          // Handle options as object {a, b, c, d} or array
          let optionsArray: string[] = []
          if (q.options && typeof q.options === 'object' && !Array.isArray(q.options)) {
            optionsArray = [q.options.a, q.options.b, q.options.c, q.options.d].filter(opt => opt !== undefined)
          } else if (Array.isArray(q.options)) {
            optionsArray = q.options
          }

          // Handle correct_answer as string "a", "b", "c", "d" or index
          let answerIndex = typeof q.answer === 'number' ? q.answer : 0
          if (q.correct_answer && typeof q.correct_answer === 'string') {
            const mapping: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 }
            answerIndex = mapping[q.correct_answer.toLowerCase()] ?? 0
          }

          return {
            question: q.question,
            options: optionsArray,
            answer: answerIndex,
            explanation: q.explanation
          }
        })
      }

      setQuestions(normalizedData)
      setSelectedChapter(chapter)
    } catch (err: any) {
      setError(err.message || 'Failed to load questions. Please check your internet connection.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const startExam = () => {
    // Shuffle and pick questions
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, Math.min(questionCount, questions.length))
    
    setCurrentQuestions(selected)
    setUserAnswers(new Array(selected.length).fill(null))
    setTimeLeft(duration * 60)
    setExamStarted(true)
    setExamFinished(false)

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const finishExam = async () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setExamFinished(true)
    setExamStarted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Save result to Supabase if user is logged in
    if (user) {
      const score = calculateScore()
      const total = currentQuestions.length
      const wrong = total - score
      const timeTaken = Math.max(0, duration * 60 - timeLeft)

      try {
        // Save exam history
        const { error: historyError } = await supabase.from('exam_history').insert([{
          user_id: user.id,
          category_group: group || 'unknown',
          subject_id: subjectId || 'unknown',
          chapter_name: selectedChapter?.name || 'General',
          total_questions: total,
          correct_answers: score,
          wrong_answers: wrong,
          time_taken: timeTaken,
          score: total > 0 ? (score / total) * 100 : 0
        }])

        if (historyError) throw historyError

        // Save mistakes
        const mistakeEntries = currentQuestions
          .map((q, idx) => ({ q, ans: userAnswers[idx] }))
          .filter(item => item.ans !== null && item.ans !== item.q.answer)
          .map(item => ({
            user_id: user.id,
            question_text: item.q.question,
            options: item.q.options,
            correct_option: item.q.answer,
            explanation: item.q.explanation || ''
          }))

        if (mistakeEntries.length > 0) {
          const { error: mistakeError } = await supabase.from('mistakes').upsert(mistakeEntries, { onConflict: 'user_id,question_text' })
          if (mistakeError) console.error('Error saving mistakes:', mistakeError)
        }

        // Update user points
        const { data: profileData, error: profileFetchError } = await supabase.from('profiles').select('points').eq('id', user.id).single()
        
        if (profileFetchError && profileFetchError.code === 'PGRST116') {
          // Profile doesn't exist, create it
          await supabase.from('profiles').insert([{ id: user.id, points: score * 10, full_name: user.user_metadata?.full_name || 'Student' }])
        } else if (profileData) {
          await supabase.from('profiles').update({ points: (profileData.points || 0) + (score * 10) }).eq('id', user.id)
        }
      } catch (err: any) {
        console.error('Error saving exam results:', err)
        alert('আপনার রেজাল্ট সেভ করতে সমস্যা হয়েছে। দয়া করে নিশ্চিত করুন যে আপনি SQL কোডটি সুপাবেসে রান করেছেন। Error: ' + (err.message || 'Unknown error'))
      }
    }
  }

  const handleAnswer = (qIdx: number, oIdx: number) => {
    if (examFinished) return
    const newAnswers = [...userAnswers]
    newAnswers[qIdx] = oIdx
    setUserAnswers(newAnswers)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const calculateScore = () => {
    return userAnswers.reduce((score, ans, idx) => {
      return score + (ans === currentQuestions[idx].answer ? 1 : 0)
    }, 0)
  }

  const downloadResult = () => {
    // Simple PDF generation logic or text file
    const score = calculateScore()
    const content = `
      Kafa'ah Exam Result
      Subject: ${subjectId}
      Chapter: ${selectedChapter?.name}
      Score: ${score} / ${currentQuestions.length}
      Percentage: ${((score / currentQuestions.length) * 100).toFixed(2)}%
    `
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `result_${subjectId}.txt`
    a.click()
  }

  // Render Logic
  if (!group || !subjectId) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <AlertCircle size={48} className="mx-auto text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Invalid Subject</h2>
        <Link to="/study" className="text-emerald-500 font-bold">Go Back to Study</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-20 bg-slate-50 dark:bg-slate-950">
      <Helmet>
        <title>Exam Center | Kafa’ah</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {!examStarted && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Link to={`/study/${group}`} className="inline-flex items-center gap-2 text-emerald-500 font-bold mb-8 hover:gap-3 transition-all">
              <ArrowLeft size={20} />
              {t('study.back')}
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {subjectId.replace('-', ' ')} Exam Center
            </h1>
          </motion.div>
        )}

        {/* Chapter Selection */}
        {!selectedChapter && !examStarted && (
          <div className="grid grid-cols-1 gap-4">
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-4">Select Chapter to Start</h2>
            {chapters.length > 0 ? (
              chapters.map((chapter, idx) => (
                <button
                  key={idx}
                  onClick={() => loadQuestions(chapter)}
                  disabled={loading}
                  className="w-full p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-left hover:border-emerald-500 hover:shadow-lg transition-all flex justify-between items-center group"
                >
                  <span className="font-medium text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {chapter.name}
                  </span>
                  <Play size={18} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </button>
              ))
            ) : (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-slate-500">No chapters found for this subject yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Loading & Error */}
        {loading && (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">Fetching questions from server...</p>
          </div>
        )}

        {error && (
          <div className="p-8 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl text-center">
            <AlertCircle size={32} className="mx-auto text-rose-500 mb-4" />
            <p className="text-rose-600 dark:text-rose-400 font-medium mb-6">{error}</p>
            <button onClick={() => setError('')} className="text-sm font-bold text-slate-500 hover:text-slate-700 uppercase tracking-widest">
              Try Another Chapter
            </button>
          </div>
        )}

        {/* Exam Configuration */}
        {selectedChapter && !examStarted && !examFinished && !loading && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Settings size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedChapter.name}</h2>
                <p className="text-sm text-slate-500">Configure your exam settings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Number of Questions</label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                >
                  {[5, 10, 20, 30, 50].map(n => (
                    <option key={n} value={n}>{n} Questions</option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Duration (Minutes)</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                >
                  {[5, 10, 20, 30, 60].map(n => (
                    <option key={n} value={n}>{n} Minutes</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={startExam}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Start Exam Now
              </button>
              <button
                onClick={() => setSelectedChapter(null)}
                className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Exam Running */}
        {examStarted && (
          <div className="space-y-8">
            {/* Sticky Timer */}
            <div className="sticky top-20 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time Remaining</p>
                  <p className={`text-xl font-mono font-bold ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-slate-900 dark:text-white'}`}>
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
              <button
                onClick={finishExam}
                className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all"
              >
                Submit Exam
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {currentQuestions.map((q, qIdx) => (
                <div key={qIdx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex gap-4 mb-6">
                    <span className="flex-shrink-0 w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center font-bold text-slate-500 text-sm">
                      {qIdx + 1}
                    </span>
                    <div className="prose dark:prose-invert max-w-none">
                      <Markdown>{q.question}</Markdown>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 ml-12">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswer(qIdx, oIdx)}
                        className={`p-4 rounded-xl text-left border-2 transition-all flex items-center gap-4 ${userAnswers[qIdx] === oIdx ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                      >
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${userAnswers[qIdx] === oIdx ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <Markdown>{opt}</Markdown>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={finishExam}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 rounded-3xl shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-1"
            >
              Submit All Answers
            </button>
          </div>
        )}

        {/* Exam Results */}
        {examFinished && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            {/* Result Summary Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 text-center shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Exam Completed!</h2>
              
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 min-w-[140px]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Your Score</p>
                  <p className="text-4xl font-bold text-emerald-500">{calculateScore()}</p>
                  <p className="text-xs text-slate-500 mt-1">out of {currentQuestions.length}</p>
                </div>
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 min-w-[140px]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Accuracy</p>
                  <p className="text-4xl font-bold text-teal-500">
                    {Math.round((calculateScore() / currentQuestions.length) * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={downloadResult}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <Download size={20} />
                  Download Result
                </button>
                <button
                  onClick={() => {
                    setExamFinished(false)
                    setSelectedChapter(null)
                    setQuestions([])
                  }}
                  className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2"
                >
                  <RotateCcw size={20} />
                  Try Another
                </button>
              </div>
            </div>

            {/* Detailed Review */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white px-4">Review Answers</h3>
              {currentQuestions.map((q, qIdx) => {
                const isCorrect = userAnswers[qIdx] === q.answer
                return (
                  <div key={qIdx} className={`bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 shadow-sm ${isCorrect ? 'border-emerald-500/20' : 'border-rose-500/20'}`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center font-bold text-slate-500 text-sm">
                          {qIdx + 1}
                        </span>
                        <div className="prose dark:prose-invert max-w-none">
                          <Markdown>{q.question}</Markdown>
                        </div>
                      </div>
                      {isCorrect ? (
                        <CheckCircle2 className="text-emerald-500 shrink-0" size={28} />
                      ) : (
                        <XCircle className="text-rose-500 shrink-0" size={28} />
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-3 ml-12 mb-8">
                      {q.options.map((opt, oIdx) => {
                        let styles = "border-slate-100 dark:border-slate-800 text-slate-500"
                        if (oIdx === q.answer) styles = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-bold"
                        else if (oIdx === userAnswers[qIdx] && !isCorrect) styles = "border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 font-bold"

                        return (
                          <div key={oIdx} className={`p-4 rounded-xl border-2 flex items-center gap-4 ${styles}`}>
                            <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${oIdx === q.answer ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <Markdown>{opt}</Markdown>
                          </div>
                        )
                      })}
                    </div>

                    {q.explanation && (
                      <div className="ml-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Explanation</p>
                        <div className="prose dark:prose-invert prose-sm max-w-none">
                          <Markdown>{q.explanation}</Markdown>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ExamCenter
