import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-slate-900/15 bg-white/70 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 shadow-sm backdrop-blur transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 dark:border-white/15 dark:bg-white/10 dark:text-white/70 dark:focus:ring-purple-500/50",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:bg-purple-500/20 dark:text-purple-100 dark:hover:bg-purple-500/30",
        secondary:
          "border-transparent bg-slate-900/5 text-slate-700 hover:bg-slate-900/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10",
        destructive:
          "border-transparent bg-destructive/15 text-destructive hover:bg-destructive/20",
        outline: "border-slate-900/25 text-slate-600 dark:border-white/20 dark:text-white/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
