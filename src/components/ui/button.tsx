import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium relative overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/0 after:via-white/20 after:to-white/0 after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-700",
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg hover:shadow-destructive/30 hover:scale-[1.02] active:scale-[0.98] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/0 after:via-white/20 after:to-white/0 after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-700",
        outline:
          "border-2 border-primary bg-background shadow-sm hover:bg-primary/10 hover:border-primary/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/0 after:via-white/10 after:to-white/0 after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-700",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors",
        gradient:
          "bg-gradient-to-r from-primary via-primary/80 to-primary text-primary-foreground shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] bg-[length:200%_100%] bg-[position:0%] hover:bg-[position:100%] transition-[background-position,transform,shadow] duration-500",
        glow: "bg-primary text-primary-foreground shadow-lg hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] after:content-[''] after:absolute after:inset-0 after:bg-primary/30 after:blur-xl after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8 text-lg",
        xl: "h-14 rounded-lg px-10 text-xl",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
      loading: {
        true: "relative cursor-wait opacity-80 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      loading: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingText?: string;
}

const LoadingSpinner = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center bg-inherit"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  </motion.div>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      loading,
      asChild = false,
      leftIcon,
      rightIcon,
      loadingText,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const content = loading ? loadingText || children : children;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounded, loading, className }),
        )}
        ref={ref}
        {...props}
      >
        {loading && <LoadingSpinner />}
        <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {leftIcon}
          {content}
          {rightIcon}
        </span>
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
