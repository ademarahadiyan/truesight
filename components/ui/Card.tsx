export function Card({ children, className }: any) {
  return (
    <div className={`bg-slate-900 rounded-xl shadow p-4 border border-slate-800 ${className}`}>
      {children}
    </div>
  );
}
