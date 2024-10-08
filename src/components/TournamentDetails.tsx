import React, { useState } from 'react';
import { Tournament, Team, Match } from '../types';
import { Users, Award, Clock } from 'lucide-react';

interface TournamentDetailsProps {
  tournament: Tournament;
  matches: Match[];
  onUpdateMatch: (match: Match) => void;
}

const TournamentDetails: React.FC<TournamentDetailsProps> = ({ tournament, matches, onUpdateMatch }) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleScoreUpdate = (match: Match, team: 'team1' | 'team2', score: number) => {
    const updatedMatch = { ...match, [team === 'team1' ? 'score1' : 'score2']: score };
    onUpdateMatch(updatedMatch);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{tournament.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Users className="mr-2" /> Teams
          </h3>
          <ul className="space-y-1">
            {tournament.teams.map((team) => (
              <li
                key={team.id}
                className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                onClick={() => setSelectedTeam(team)}
              >
                {team.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Award className="mr-2" /> Matches
          </h3>
          <ul className="space-y-2">
            {matches.map((match) => (
              <li key={match.id} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <span>{tournament.teams.find(t => t.id === match.team1Id)?.name}</span>
                  <input
                    type="number"
                    value={match.score1}
                    onChange={(e) => handleScoreUpdate(match, 'team1', parseInt(e.target.value))}
                    className="w-12 text-center border rounded"
                  />
                  <span className="mx-2">vs</span>
                  <input
                    type="number"
                    value={match.score2}
                    onChange={(e) => handleScoreUpdate(match, 'team2', parseInt(e.target.value))}
                    className="w-12 text-center border rounded"
                  />
                  <span>{tournament.teams.find(t => t.id === match.team2Id)?.name}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1 flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> Round {match.round} - {match.status}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedTeam && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Team Details: {selectedTeam.name}</h3>
          <ul>
            {selectedTeam.players.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TournamentDetails;