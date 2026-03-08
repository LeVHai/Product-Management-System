import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Menu = ({
  items = [],
  isOpen = true,
  className = "",
}) => {
  const location = useLocation();

  return (
    <div
      className={`
        bg-background
        transition-all duration-300
       
        ${className}
      `}
    >
      <nav className="flex flex-col gap-1 p-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive =
            item.path && location.pathname.startsWith(item.path);
          return (
            <Link
              key={index}
              to={item.path}
              className={`
                relative flex items-center px-3 py-2 rounded-md text-sm
                transition-all duration-300
                ${isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"}
              `}
            >
              {/* Icon */}
              {Icon && (
                <div className="flex items-center justify-center w-5 h-5">
                  {typeof Icon === "function" ? (
                    <Icon className="w-4 h-4" />
                  ) : (
                    Icon
                  )}
                </div>
              )}

              {/* Label animate */}
             <span
                className={`
                  whitespace-nowrap overflow-hidden
                  transition-all duration-300
                  ${isOpen
                    ? "opacity-100 w-auto ml-2"
                    : "opacity-0 w-0 ml-0"}
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};