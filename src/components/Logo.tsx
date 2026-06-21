import { motion } from "framer-motion";

export function Logo({ size = 28, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <motion.div
        initial={{ rotate: -8, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="relative"
      >
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lf1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3B82F6" />
              <stop offset="0.55" stopColor="#06B6D4" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="lf2" x1="0" y1="0" x2="0" y2="40">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#lf1)" />
          <path
            d="M14 9h10.5L29 13.2V27a3 3 0 0 1-3 3h-12a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3Z"
            fill="url(#lf2)"
            opacity="0.95"
          />
          <path d="M21.6 14.4l-5.2 8.1h3.6l-1.4 5.1 5.2-8.1h-3.6l1.4-5.1Z" fill="#1E293B" />
        </svg>
      </motion.div>
      {withText && (
        <div className="leading-none">
          <div className="text-[15px] font-semibold tracking-tight text-foreground">
            <span className="text-grad-brand">Invoxa</span>
          </div>
        </div>
      )}
    </div>
  );
}
