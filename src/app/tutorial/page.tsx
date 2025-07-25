"use client";

import React from "react";
import TutorialGameBoard from "../components/TutorialGameBoard";
import TutorialPanel from "../components/TutorialPanel";

const DemoPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="mx-auto w-full max-w-7xl flex flex-col h-full">
        <div className="mb-6 text-center flex-shrink-0">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            Taka - Interactive Tutorial
          </h1>
          <p className="text-lg text-gray-600">
            Learn to play Taka with step-by-step interactive guidance
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
          <div className="lg:w-3/4 flex-1">
            <TutorialGameBoard />
          </div>
          
          <div className="lg:w-1/4 flex-shrink-0">
            <TutorialPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;