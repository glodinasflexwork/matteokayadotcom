'use client';

import { useState, useEffect, useRef } from 'react';

interface MusicSectionProps {
    title: string;
    subtitle: string;
}

interface Track {
    key: string; // filename from R2
    title: string;
    artist: string;
    duration?: string; // We might not get this from R2 list immediately
    size?: number;
    uploaded?: string;
    coverColor?: string;
}

const fallbackTracks: Track[] = [
    { key: 'angels-watching', title: 'Angels Watching Over Me', artist: "Matteo's Selection", duration: '4:02', coverColor: 'from-amber-500 to-orange-600' },
    { key: 'lullaby-new-day', title: 'Lullaby for a New Day', artist: 'Soft Instrumental', duration: '3:45', coverColor: 'from-blue-500 to-indigo-600' },
    { key: 'morning-sunbeams', title: 'Morning Sunbeams', artist: 'Nature Harmony', duration: '5:12', coverColor: 'from-emerald-500 to-teal-600' },
];

export default function MusicSection({ title, subtitle }: MusicSectionProps) {
    const [playlist, setPlaylist] = useState<Track[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement>(null);

    const fetchMusic = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/music/list');
            if (!response.ok) throw new Error('Failed to load playlist');
            const data = await response.json() as { files: any[] };

            if (data.files && Array.isArray(data.files) && data.files.length > 0) {
                const tracks = data.files.map((file: any, index: number) => {
                    const name = file.key.replace('.mp3', '').replace(/-/g, ' ');
                    return {
                        key: file.key,
                        title: capitalize(name),
                        artist: "Matteo's Selection",
                        duration: "...",
                        coverColor: getRandomGradient(index)
                    };
                });
                setPlaylist(tracks);
            } else {
                // Fallback static playlist matching the Stitch design
                setPlaylist(fallbackTracks);
            }
        } catch (err) {
            console.error("Failed to load music:", err);
            // Silently fall back to static playlist instead of showing error
            setPlaylist(fallbackTracks);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch playlist from R2
    useEffect(() => {
        fetchMusic();
    }, []);

    // Handle track change
    useEffect(() => {
        if (playlist.length > 0 && audioRef.current) {
            audioRef.current.src = `/api/audio/${encodeURIComponent(playlist[currentTrackIndex].key)}`;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Play error:", e));
            }
        }
    }, [currentTrackIndex, playlist]);

    // Audio Event Handlers
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const handleEnded = () => {
        playNext();
    };

    // Controls
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const playNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
    };

    const playPrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    // Helpers
    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const getRandomGradient = (index: number) => {
        const gradients = [
            "from-pink-500 to-rose-600",
            "from-purple-500 to-indigo-600",
            "from-blue-400 to-cyan-600",
            "from-green-400 to-emerald-600",
            "from-amber-400 to-orange-600",
        ];
        return gradients[index % gradients.length];
    };

    const currentTrack = playlist[currentTrackIndex];
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <section className="py-24 px-4 relative overflow-hidden" style={{ padding: '6rem 1rem', position: 'relative', overflow: 'hidden' }}>
            {/* Audio Element */}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onLoadedMetadata={handleTimeUpdate}
            />

            <div className="max-w-3xl mx-auto relative z-10" style={{ maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 10 }}>

                {/* Section Header */}
                <div className="text-center mb-8">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-[var(--accent-gold)]/5 border border-[var(--accent-gold)]/20 text-[var(--accent-gold)] text-xs font-semibold tracking-widest uppercase mb-3 backdrop-blur-md">
                        {subtitle}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[var(--accent-gold)] drop-shadow-sm">
                        {title}
                    </h2>
                </div>

                {/* Music Card — Matching Stitch Design exactly */}
                <div className="rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative" style={{ background: 'rgba(28, 28, 30, 0.95)', backdropFilter: 'blur(40px)' }}>
                    {/* Gold shimmer overlay */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(var(--accent-gold-rgb, 212, 175, 55), 0.05) 0%, transparent 50%, rgba(var(--accent-gold-rgb, 212, 175, 55), 0.03) 100%)' }} />

                    {/* Card Header — gold icon + title + Live badge */}
                    <div className="p-8 md:p-10 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                        <div className="flex items-center gap-6">
                            {/* Large gold gradient rounded square icon with library_music */}
                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent-gold), #b8941e)', boxShadow: '0 8px 25px rgba(var(--accent-gold-rgb, 212, 175, 55), 0.2)' }}>
                                <svg className="w-10 h-10" style={{ color: '#0B101A' }} viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-serif text-2xl font-medium text-white">Matteo&apos;s Playlist</h3>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] mt-1" style={{ color: 'var(--accent-gold)' }}>Exclusive Audio</p>
                            </div>
                        </div>
                        {/* LIVE pill badge with animated bouncing bars */}
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full border" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                            <div className="flex gap-1">
                                <div className="w-1 h-3 bg-red-500 rounded-full" style={{ animation: 'bounce 1s infinite' }} />
                                <div className="w-1 h-3 bg-red-500 rounded-full" style={{ animation: 'bounce 1.2s infinite' }} />
                                <div className="w-1 h-3 bg-red-500 rounded-full" style={{ animation: 'bounce 0.8s infinite' }} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Live</span>
                        </div>
                    </div>

                    {/* Playlist — Clean rows with plain text numbers */}
                    <div className="px-6 py-4 md:px-10 space-y-2 relative z-10">
                        {isLoading ? (
                            <div className="p-8 text-center text-white/30 text-sm animate-pulse">Loading library...</div>
                        ) : error ? (
                            <div className="p-8 text-center">
                                <p className="text-red-400 text-sm mb-3">{error}</p>
                                <button onClick={fetchMusic} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs text-white transition-colors">Retry</button>
                            </div>
                        ) : playlist.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-white/30 text-sm mb-3">No tracks found in library.</p>
                                <button onClick={fetchMusic} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs text-white transition-colors">Refresh</button>
                            </div>
                        ) : (
                            playlist.map((track, index) => {
                                const isActive = index === currentTrackIndex;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setCurrentTrackIndex(index);
                                            setIsPlaying(true);
                                        }}
                                        className={`flex items-center gap-4 p-3 rounded-2xl transition-all cursor-pointer ${isActive
                                            ? 'border'
                                            : 'hover:bg-white/5'
                                            }`}
                                        style={isActive ? {
                                            backgroundColor: 'rgba(var(--accent-gold-rgb, 212, 175, 55), 0.1)',
                                            borderColor: 'rgba(var(--accent-gold-rgb, 212, 175, 55), 0.2)',
                                        } : {}}
                                    >
                                        {/* Plain text track number — matches Stitch */}
                                        <span
                                            className="font-bold text-xs w-4 text-center"
                                            style={{ color: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.4)' }}
                                        >
                                            {index + 1}
                                        </span>

                                        {/* Track Info */}
                                        <div className="flex-grow min-w-0">
                                            <p className="text-xs font-bold truncate" style={{ color: isActive ? 'white' : 'white' }}>
                                                {track.title}
                                            </p>
                                            <p className="text-[10px] truncate" style={{ color: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.4)' }}>
                                                {track.artist}
                                            </p>
                                        </div>

                                        {/* Right icon — equalizer for active, play_circle for inactive */}
                                        {isActive ? (
                                            <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-gold)' }} viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12-6v8h2V8h-2zm4 2v4h2v-4h-2z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 shrink-0 text-white/20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                                            </svg>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Player Controls — Matching Stitch bottom section */}
                    <div className="p-6 md:p-10 relative z-10" style={{ backgroundColor: 'rgba(15, 21, 32, 0.8)' }}>
                        {/* Progress Bar with timestamps */}
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>{formatTime(currentTime)}</span>
                            <div className="flex-grow mx-6 relative h-1.5 rounded-full overflow-visible group cursor-pointer" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                                <div
                                    className="absolute left-0 top-0 h-full rounded-full relative"
                                    style={{
                                        width: `${progressPercent}%`,
                                        backgroundColor: 'var(--accent-gold)',
                                    }}
                                >
                                    {/* Scrub handle — appears on hover like Stitch */}
                                    <div
                                        className="absolute -top-[5px] w-4 h-4 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"
                                        style={{
                                            right: '-8px',
                                            backgroundColor: 'var(--accent-gold)',
                                        }}
                                    />
                                </div>
                                {/* Invisible seek slider */}
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 100}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    style={{ margin: 0 }}
                                />
                            </div>
                            <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                {currentTrack?.duration || formatTime(duration)}
                            </span>
                        </div>

                        {/* Controls Row — Centered: Shuffle, Prev, Play/Pause, Next, Repeat */}
                        <div className="flex items-center justify-center gap-6 md:gap-12">
                            <button className="hover:text-[var(--accent-gold)] transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }} title="Shuffle">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                                </svg>
                            </button>
                            <button onClick={playPrev} className="hover:text-[var(--accent-gold)] transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }} title="Previous">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                                </svg>
                            </button>

                            <button
                                onClick={togglePlay}
                                className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl hover:scale-105 hover:shadow-2xl transition-all" style={{ color: '#0B101A', boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }}
                            >
                                {isPlaying ? (
                                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                ) : (
                                    <svg className="w-9 h-9 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                )}
                            </button>

                            <button onClick={playNext} className="hover:text-[var(--accent-gold)] transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }} title="Next">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                                </svg>
                            </button>
                            <button className="hover:text-[var(--accent-gold)] transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }} title="Repeat">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
