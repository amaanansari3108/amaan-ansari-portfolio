
export default function Badge({ children, className = '', variant = 'primary' }) {
  const variants = {
    primary: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
    gold: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    outline: "bg-white/5 text-gray-300 border border-white/10",
  };

  return (
    <span className={`px-3 py-1 text-xs md:text-sm font-medium rounded-full backdrop-blur-sm select-none inline-flex items-center gap-1.5 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
