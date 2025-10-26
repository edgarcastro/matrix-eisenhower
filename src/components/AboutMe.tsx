import React from "react";
import { Button } from "./ui/button";
import { Mail, Download } from "lucide-react";
import linkedInIcon from "@/assets/linkedin.svg";

import photo from "@/assets/photo.jpeg";
import cv from "@/assets/CV.pdf";

interface AboutMeProps {
  name?: string;
  email?: string;
  linkedinUrl?: string;
  cvUrl?: string;
  photoUrl?: string;
  className?: string;
}

const AboutMe: React.FC<AboutMeProps> = ({
  name = "Edgar Castro",
  email = "edgar.castro.villa@outlook.com",
  linkedinUrl = "https://www.linkedin.com/in/ecastrov",
  cvUrl = cv,
  photoUrl = photo,
  className = "",
}) => {
  const handleDownloadCV = () => {
    if (cvUrl) {
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = "CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleLinkedInClick = () => {
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg mx-auto grid grid-cols-2 gap-2 items-start ${className}`}
    >
      {/* Photo */}
      <div className="flex justify-center">
        <div className="relative">
          <img
            src={photoUrl}
            alt={`${name} profile`}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 shadow-md"
          />
        </div>
      </div>

      {/* Name */}
      <div className="text-center mb-6 flex flex-col items-start gap-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {name}
        </h1>
        {/* Email */}
        <div className="flex items-center justify-center space-x-3">
          <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <button
            onClick={handleEmailClick}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
          >
            {email}
          </button>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center justify-center space-x-3">
          <img
            src={linkedInIcon}
            alt="LinkedIn"
            className="w-5 h-5 text-gray-600 dark:text-gray-400"
          />
          <button
            onClick={handleLinkedInClick}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 text-sm"
          >
            LinkedIn Profile
          </button>
        </div>
      </div>

      {/* Download CV Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleDownloadCV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download CV</span>
        </Button>
      </div>
    </div>
  );
};

export default AboutMe;
