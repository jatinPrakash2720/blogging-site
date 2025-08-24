import React from "react";
// 1. Import the raw Shadcn button and its variants
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Shadcn's utility for merging classes

// 2. Define your app's custom props
interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

// 3. Create your wrapper component
const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ intent = "primary", fullWidth, className, children, ...props }, ref) => {
    // 4. Map your custom props to Tailwind classes
    const intentClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
      // 5. Render the Shadcn button internally, but with your custom styles
      <ShadcnButton
        ref={ref}
        className={cn(
          intentClasses[intent], // Your custom style
          fullWidth && "w-full", // Your custom logic
          className // Allow passing extra classes
        )}
        {...props}
      >
        {children}
      </ShadcnButton>
    );
  }
);

export default Button;
