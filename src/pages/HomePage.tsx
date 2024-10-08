import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Users, Award } from 'lucide-react';

const API_BASE_URL = 'https://qasa-tournament-framework.onrender.com';

interface Tournament {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

interface Match {
  id: number;
  team1_name: string;
  team2_name: string;
  team1_score: number;
  team2_score: number;
  winner_name: string | null;
}

const HomePage: React.FC = () => {
  const [activeTournament, setActiveTournament] = useState<Tournament | null>(null);
  const [bracket, setBracket] = useState<Match[]>([]);
  const [odds, setOdds] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActiveTournament();
  }, []);

  const fetchActiveTournament = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      setActiveTournament(response.data.active_tournament);
      if (response.data.active_tournament) {
        fetchBracket(response.data.active_tournament.id);
        fetchOdds(response.data.active_tournament.id);
      }
    } catch (error) {
      setError('Failed to fetch active tournament. Please try again later.');
    }
  };

  const fetchBracket = async (tournamentId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tournament/${tournamentId}/bracket`);
      setBracket(response.data.matches);
    } catch (error) {
      setError('Failed to fetch bracket. Please try again later.');
    }
  };

  const fetchOdds = async (tournamentId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/odds/${tournamentId}`);
      setOdds(response.data.odds);
    } catch (error) {
      setError('Failed to fetch odds. Please try again later.');
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {activeTournament ? (
        <>
          <h1 className="text-3xl font-bold flex items-center">
            <Trophy className="mr-2" /> {activeTournament.name}
          </h1>
          <p className="text-gray-600">{activeTournament.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rest of the component remains the same */}
          </div>
        </>
      ) : (
        <p className="text-xl text-center">No active tournament at the moment.</p>
      )}
    </div>
  );
};

export default HomePage;