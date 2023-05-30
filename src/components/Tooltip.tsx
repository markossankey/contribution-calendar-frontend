import { useState } from "react";

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {isVisible && content && (
        <div className="bg-opacity-90 absolute z-10 p-2 w-fit bg-gray-50 text-gray-800 text-xs rounded-md shadow-md bottom-6 transform -translate-x-1/2 translate-y-2">
          {content}
        </div>
      )}
      {children}
    </div>
  );
};

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
};
