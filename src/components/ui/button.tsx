import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-transparent text-sm font-medium tracking-tight ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-purple-500/60",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-md shadow-emerald-500/20 hover:-translate-y-0.5 hover:shadow-emerald-500/30 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700 dark:shadow-purple-500/30 dark:hover:shadow-purple-500/40",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-0.5",
        outline:
          "border border-slate-600 bg-white/70 text-slate-900 hover:border-slate-800 hover:bg-white/90 hover:-translate-y-0.5 dark:border-purple-400/30 dark:bg-white/10 dark:text-purple-100 dark:hover:border-purple-300/50 dark:hover:bg-white/15",
        secondary:
          "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 hover:-translate-y-0.5 dark:bg-purple-500/20 dark:text-purple-100 dark:hover:bg-purple-500/30",
        ghost:
          "bg-transparent text-slate-600 hover:bg-slate-900/5 hover:text-slate-900 hover:-translate-y-0.5 dark:text-purple-200 dark:hover:bg-purple-500/10 dark:hover:text-white",
        link: "text-emerald-700 underline-offset-4 hover:underline dark:text-purple-200",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
