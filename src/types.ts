export interface Tournament {
  id: string;
  name: string;
  status: 'active' | 'archived';
  teams: Team[];
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  team1Id: string;
  team2Id: string;
  score1: number;
  score2: number;
  round: number;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Bet {
  id: string;
  matchId: string;
  userId: string;
  amount: number;
  teamId: string;
}