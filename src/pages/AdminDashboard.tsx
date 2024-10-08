import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Plus, Edit, Archive, Trash, RefreshCw } from 'lucide-react';

const API_BASE_URL = 'https://qasa-tournament-framework.onrender.com';

interface Tournament {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

const AdminDashboard: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [newTournament, setNewTournament] = useState({ name: '', description: '' });
  const [editingTournament, setEditingTournament] = useState<Tournament | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin`);
      setTournaments(response.data.tournaments);
    } catch (error) {
      setError('Failed to fetch tournaments. Please try again later.');
    }
  };

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/admin/create_tournament`, newTournament);
      setNewTournament({ name: '', description: '' });
      fetchTournaments();
    } catch (error) {
      setError('Failed to create tournament. Please try again.');
    }
  };

  const handleEditTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTournament) return;
    try {
      await axios.post(`${API_BASE_URL}/admin/edit_tournament/${editingTournament.id}`, editingTournament);
      setEditingTournament(null);
      fetchTournaments();
    } catch (error) {
      setError('Failed to edit tournament. Please try again.');
    }
  };

  const handleArchiveTournament = async (id: number) => {
    try {
      await axios.post(`${API_BASE_URL}/admin/archive_tournament/${id}`);
      fetchTournaments();
    } catch (error) {
      setError('Failed to archive tournament. Please try again.');
    }
  };

  const handleDeleteTournament = async (id: number) => {
    try {
      await axios.post(`${API_BASE_URL}/admin/delete_tournament/${id}`);
      fetchTournaments();
    } catch (error) {
      setError('Failed to delete tournament. Please try again.');
    }
  };

  const handleGenerateBracket = async (id: number) => {
    try {
      await axios.post(`${API_BASE_URL}/admin/generate_bracket/${id}`);
      fetchTournaments();
    } catch (error) {
      setError('Failed to generate bracket. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold flex items-center">
        <Trophy className="mr-2" /> Admin Dashboard
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default AdminDashboard;