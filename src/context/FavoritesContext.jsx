import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load favorites from Supabase when user changes
    useEffect(() => {
        if (user) {
            loadFavorites();
        } else {
            // Load from localStorage for non-authenticated users
            const saved = localStorage.getItem('footballFavorites');
            setFavorites(saved ? JSON.parse(saved) : []);
        }
    }, [user]);

    // Save to localStorage for non-authenticated users
    useEffect(() => {
        if (!user) {
            localStorage.setItem('footballFavorites', JSON.stringify(favorites));
        }
    }, [favorites, user]);

    const loadFavorites = async () => {
        if (!user) return;

        setLoading(true);
        const { data, error } = await supabase
            .from('favorites')
            .select('match_id')
            .eq('user_id', user.id);

        if (!error && data) {
            setFavorites(data.map(f => f.match_id));
        }
        setLoading(false);
    };

    const toggleFavorite = async (matchId) => {
        if (user) {
            // Authenticated: sync with Supabase
            const isCurrentlyFavorite = favorites.includes(matchId);

            if (isCurrentlyFavorite) {
                // Remove from Supabase
                await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('match_id', matchId);

                setFavorites(prev => prev.filter(id => id !== matchId));
            } else {
                // Add to Supabase
                await supabase
                    .from('favorites')
                    .insert({ user_id: user.id, match_id: matchId });

                setFavorites(prev => [...prev, matchId]);
            }
        } else {
            // Not authenticated: use localStorage
            setFavorites(prev =>
                prev.includes(matchId)
                    ? prev.filter(id => id !== matchId)
                    : [...prev, matchId]
            );
        }
    };

    const isFavorite = (matchId) => favorites.includes(matchId);

    const clearFavorites = async () => {
        if (user) {
            await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id);
        }
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite,
            clearFavorites,
            loading
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};
