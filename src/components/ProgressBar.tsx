interface ProgressBarProps {
  progress: string;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
      <div
        className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: progress }}
      />
    </div>
  )
}

export default ProgressBar
