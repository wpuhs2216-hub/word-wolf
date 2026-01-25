import { cn } from '../../utils/cn';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 shadow-md";

    const variants = {
        primary: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-500 shadow-blue-500/30",
        secondary: "bg-white text-gray-800 hover:bg-gray-50 focus:ring-gray-200 border border-gray-100",
        outline: "border-2 border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500 text-gray-600",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-600 shadow-none",
        danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 focus:ring-red-500 shadow-red-500/30",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg w-full",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        />
    );
};
