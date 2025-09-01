"use client";

import React, { useEffect, useState } from "react";
import FullPageLoader from "@/components/FullPageLoader";
import GameBoard from "@/components/game/GameBoard";

const PlayPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameId, setGameId] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.href);
    const gameId = params.get("id");

    if (gameId) {
      setGameId(gameId);
    }
  }, []);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (globalError) {
    return <h1 className="text-red-500">{globalError}</h1>;
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-green-50 to-blue-50 p-4 pt-8">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
        <div className="mb-6 flex-shrink-0 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Taka - Play</h1>
          <p className="text-lg text-gray-600">Play against an opponent!</p>
        </div>

        <GameBoard />
      </div>
    </div>
  );
};

export default PlayPage;
