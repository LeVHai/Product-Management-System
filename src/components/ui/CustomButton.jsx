// import React from "react";
// import { Button } from "./button";
// import { cn } from "@/lib/utils";
// import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

// const colorVariants = {
//   default: "text-gray-600 hover:text-gray-900 hover:bg",
//   primary: "text-blue-500 hover:text-blue-700",
//   success: "text-green-500 hover:text-green-700",
//   danger: "text-red-500 hover:text-red-700",
//   warning: "text-yellow-500 hover:text-yellow-600",
// };

// const ButtonIcon = ({
//   icon: Icon,
//   label,
//   tooltipContent = "",
//   color = "default",
//   showLabel = false,
//   ...props
// }) => {
//   return (
//     <Button
//       variant="outline"
//       size={showLabel ? "default" : "icon"}
//       aria-label={label}
//       className={cn(
//         " bg-transparent shadow-none cursor-pointer",
//         colorVariants[color]
//       )}
//       {...props}
//     >
//       {tooltipContent ? (
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <span className="flex items-center gap-2">
//               <Icon className="w-5 h-5 bg[#4096ff]" />
//               {showLabel && <span>{label}</span>}
//             </span>
//           </TooltipTrigger>
//           <TooltipContent>{tooltipContent}</TooltipContent>
//         </Tooltip>
//       ) : (
//         <span className="flex items-center gap-2">
//           <Icon className="w-5 h-5" />
//           {showLabel && <span>{label}</span>}
//         </span>
//       )}
//     </Button>
//   );
// };

// export default ButtonIcon;
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
    inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
    disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        dark: "bg-slate-900 hover:bg-slate-800 text-white",
        primary: "bg-[#1677ff] hover:bg-[#4096ff] text-white",
        secondary: "bg-[#f5f5f5] hover:bg-[#e6e6e6] text-gray-800",
        success: "bg-[#52c41a] hover:bg-[#73d13d] text-white",
        warning: "bg-[#faad14] hover:bg-[#ffc53d] text-white",
        destructive: "bg-[#ff4d4f] hover:bg-[#ff7875] text-white",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        link: "bg-transparent hover:bg-transparent text-[#1677ff] underline-offset-4 hover:underline",
        outline:
          "bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300",
      },
      size: {
        default: "px-9 py-3",
        sm: "px-4 py-2",
        lg: "px-14 py-4",
        xl: "px-16 py-4",
        icon: "w-12 h-12",
        full: "w-full h-12",
        auto: "w-auto h-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

const CustomButton = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

CustomButton.displayName = "CustomButton";

export { CustomButton, buttonVariants };
