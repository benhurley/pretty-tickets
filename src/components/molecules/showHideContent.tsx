import React, { useState } from 'react';

interface ShowHideContentProps {
  title: string;
  children: React.ReactNode;
}

const ShowHideContent = ({ title, children }: ShowHideContentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="space-y-2">
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleVisibility}
      >
        <div
          className={`transform transition-transform duration-300 ${
            isVisible ? 'rotate-90' : 'rotate-0'
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <span className="ml-2 text-lg font-medium">{title}</span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isVisible ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default ShowHideContent;
