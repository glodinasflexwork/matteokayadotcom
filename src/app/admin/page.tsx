'use client';

import { useState, useEffect } from 'react';

interface RSVP {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    role: 'guest' | 'nas' | 'cumetru';
    donation_tier: number | null;
    num_guests: number;
    message: string | null;
    created_at: string;
}

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [rsvps, setRsvps] = useState<RSVP[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Simple password check (you can change this)
    const ADMIN_PASSWORD = 'matteo2026';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            fetchRSVPs();
        } else {
            setError('Incorrect password');
        }
    };

    const fetchRSVPs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/rsvp');
            const data = await res.json() as { rsvps: RSVP[] };
            setRsvps(data.rsvps || []);
        } catch {
            setError('Failed to load RSVPs');
        } finally {
            setLoading(false);
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'nas': return '👑 Naș';
            case 'cumetru': return '✨ Cumetru';
            default: return '👤 Guest';
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Stats
    const totalGuests = rsvps.reduce((sum, r) => sum + r.num_guests, 0);
    const totalNasi = rsvps.filter(r => r.role === 'nas').length;
    const totalCumetri = rsvps.filter(r => r.role === 'cumetru').length;
    const totalDonations = rsvps.reduce((sum, r) => sum + (r.donation_tier || 0), 0);

    if (!authenticated) {
        return (
            <div className="admin-login">
                <div className="admin-card">
                    <h1>🔒 Admin Access</h1>
                    <p>Enter password to view RSVPs</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            autoFocus
                        />
                        {error && <div className="error">{error}</div>}
                        <button type="submit">Enter</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>📋 RSVP Dashboard</h1>
                <p>Matteo Kaya Botez Baptism</p>
            </header>

            <div className="admin-stats">
                <div className="stat-card">
                    <span className="stat-value">{rsvps.length}</span>
                    <span className="stat-label">RSVPs</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{totalGuests}</span>
                    <span className="stat-label">Total Guests</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{totalNasi}</span>
                    <span className="stat-label">Nași</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{totalCumetri}</span>
                    <span className="stat-label">Cumetri</span>
                </div>
                <div className="stat-card gold">
                    <span className="stat-value">€{totalDonations}</span>
                    <span className="stat-label">Pledged</span>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : rsvps.length === 0 ? (
                <div className="empty-state">
                    <p>No RSVPs yet. Share the invitation! 🎉</p>
                </div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Role</th>
                                <th>Tier</th>
                                <th>Guests</th>
                                <th>Message</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rsvps.map((rsvp, idx) => (
                                <tr key={rsvp.id}>
                                    <td>{idx + 1}</td>
                                    <td className="name-cell">{rsvp.name}</td>
                                    <td className="contact-cell">
                                        {rsvp.email && <div>{rsvp.email}</div>}
                                        {rsvp.phone && <div>{rsvp.phone}</div>}
                                    </td>
                                    <td><span className={`role-badge ${rsvp.role}`}>{getRoleBadge(rsvp.role)}</span></td>
                                    <td>{rsvp.donation_tier ? `€${rsvp.donation_tier}` : '-'}</td>
                                    <td>{rsvp.num_guests}</td>
                                    <td className="message-cell">{rsvp.message || '-'}</td>
                                    <td className="date-cell">{formatDate(rsvp.created_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button className="refresh-btn" onClick={fetchRSVPs}>🔄 Refresh</button>
        </div>
    );
}
