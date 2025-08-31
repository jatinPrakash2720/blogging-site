export const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl bg-sky-100/80 dark:bg-sky-900/30 border-none transition-all duration-300 hover:bg-sky-200/50 dark:hover:bg-sky-800/50 focus-within:ring-2 focus-within:ring-sky-500 dark:focus-within:ring-sky-400 focus:outline-none focus:ring-0 focus:shadow-none focus:-outline-offset-2 !focus:outline-none !focus:ring-0 !focus:shadow-none">
    {children}
  </div>
);
