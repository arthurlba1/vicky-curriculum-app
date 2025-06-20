import { cn } from "@/lib/utils"

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

const TypographyH1 = ({ children, className }: TypographyProps) => {
    return (
      <h1 className={cn("scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance", className)}>
        {children}
      </h1>
    )
}

const TypographyH3 = ({ children, className }: TypographyProps) => {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  )
}

const TypographyMuted = ({ children, className }: TypographyProps) => {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>
      {children}
    </p>
  )
}


export { TypographyH1, TypographyH3, TypographyMuted }
