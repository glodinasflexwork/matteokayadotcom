'use client';

import { useState, useEffect } from 'react';

interface PhotoGalleryProps {
    title: string;
    subtitle: string;
}

interface Photo {
    key: string;
    size: number;
    uploaded: string;
}

export default function PhotoGallery({ title, subtitle }: PhotoGalleryProps) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const fetchPhotos = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/photos/list');
            if (!response.ok) throw new Error('Failed to load photos');
            const data = await response.json() as { photos: Photo[] };
            if (data.photos && Array.isArray(data.photos)) {
                setPhotos(data.photos);
            }
        } catch (err) {
            console.error('Failed to load photos:', err);
            setError('Could not load photos.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextPhoto = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % photos.length);
        }
    };
    const prevPhoto = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextPhoto();
            if (e.key === 'ArrowLeft') prevPhoto();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxIndex, photos.length]);

    return (
        <>
            <section className="photo-gallery-section">
                <div className="section-badge">📸 BAPTISM MEMORIES</div>
                <h2 className="section-title-gold">{title}</h2>
                <p className="section-subtitle-muted">{subtitle}</p>

                {isLoading && (
                    <div className="photo-gallery-loading">
                        <div className="spinner" />
                        <p>Loading memories...</p>
                    </div>
                )}

                {error && (
                    <div className="photo-gallery-error">
                        <p>{error}</p>
                        <button onClick={fetchPhotos} className="retry-btn">Retry</button>
                    </div>
                )}

                {!isLoading && !error && photos.length === 0 && (
                    <div className="photo-gallery-empty">
                        <span className="empty-icon">📷</span>
                        <p>Photos coming soon!</p>
                        <p className="empty-hint">Event photos will appear here shortly.</p>
                    </div>
                )}

                {!isLoading && !error && photos.length > 0 && (
                    <div className="photo-grid">
                        {photos.map((photo, index) => (
                            <div
                                key={photo.key}
                                className="photo-grid-item"
                                onClick={() => openLightbox(index)}
                            >
                                <img
                                    src={`/api/photos/${encodeURIComponent(photo.key)}`}
                                    alt={photo.key.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}
                                    loading="lazy"
                                />
                                <div className="photo-overlay">
                                    <span className="photo-zoom-icon">🔍</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && photos[lightboxIndex] && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>✕</button>
                        <button className="lightbox-nav lightbox-prev" onClick={prevPhoto}>‹</button>
                        <img
                            src={`/api/photos/${encodeURIComponent(photos[lightboxIndex].key)}`}
                            alt={photos[lightboxIndex].key}
                            className="lightbox-image"
                        />
                        <button className="lightbox-nav lightbox-next" onClick={nextPhoto}>›</button>
                        <div className="lightbox-counter">
                            {lightboxIndex + 1} / {photos.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
