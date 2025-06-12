import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  gradient?: boolean;
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, gradient, hover, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={fadeInUpVariant}
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-xl border bg-card text-card-foreground",
        "relative overflow-hidden transition-all duration-200",
        hover && "hover:shadow-lg hover:shadow-primary/5",
        gradient && [
          "before:absolute before:inset-0",
          "before:bg-gradient-to-r before:from-primary/5 before:to-primary/10",
          "before:opacity-0 hover:before:opacity-100",
          "before:transition-opacity before:duration-500",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  Omit<HTMLMotionProps<"h3">, "ref">
>(({ className, ...props }, ref) => (
  <motion.h3
    ref={ref}
    variants={fadeInUpVariant}
    transition={{ duration: 0.2, delay: 0.2 }}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      "bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  Omit<HTMLMotionProps<"p">, "ref">
>(({ className, ...props }, ref) => (
  <motion.p
    ref={ref}
    variants={fadeInUpVariant}
    transition={{ duration: 0.2, delay: 0.3 }}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "ref">
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    variants={fadeInUpVariant}
    transition={{ duration: 0.2, delay: 0.4 }}
    className={cn("p-6 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "ref">
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    variants={fadeInUpVariant}
    transition={{ duration: 0.2, delay: 0.5 }}
    className={cn(
      "flex items-center p-6 pt-0",
      "border-t border-border/40 mt-6",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  type CardProps,
};
