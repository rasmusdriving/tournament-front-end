import React from 'react';
import { Tournament } from '../types';
import { Trophy } from 'lucide-react';

interface TournamentListProps {
  tournaments: Tournament[];
  onSelectTournament: (tournament: Tournament) => void;
}

const TournamentList: React.FC<TournamentListProps> = ({ tournaments, onSelectTournament }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Trophy className="mr-2" /> Tournaments
      </h2>
      <ul className="space-y-2">
        {tournaments.map((tournament) => (
          <li
            key={tournament.id}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => onSelectTournament(tournament)}
          >
            <span className="font-semibold">{tournament.name}</span>
            <span className={`ml-2 text-sm ${tournament.status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>
              ({tournament.status})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentList;