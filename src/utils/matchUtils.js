import { getMatchData } from '../data/matches';

// League color mapping
const leagueColors = {
  'Premier League': { color: '#3d195b', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  'La Liga': { color: '#ee8707', icon: '🇪🇸' },
  'Serie A': { color: '#024494', icon: '🇮🇹' },
  'Bundesliga': { color: '#d20515', icon: '🇩🇪' },
  'Ligue 1': { color: '#091c3e', icon: '🇫🇷' },
  'UEFA Champions League': { color: '#0d1541', icon: '🏆' },
  'UEFA Europa League': { color: '#f68e1e', icon: '🌟' },
  'FIFA World Cup': { color: '#56042c', icon: '🌍' },
  'FIFA Club World Cup': { color: '#1a472a', icon: '🏆' },
  'Copa America': { color: '#1e3a5f', icon: '🌎' },
  'AFC Asian Cup': { color: '#ff6b00', icon: '🌏' },
  'Africa Cup of Nations': { color: '#008c45', icon: '🌍' },
  'Saudi Pro League': { color: '#006c35', icon: '🇸🇦' }
};

/**
 * Get league styling information
 * @param {string} leagueName - Name of the league
 * @returns {object} - League color and icon
 */
export const getLeagueStyle = (leagueName) => {
  return leagueColors[leagueName] || { color: '#3b82f6', icon: '⚽' };
};

/**
 * Parse venue string into name and city
 * @param {string} venue - Venue string in format "Name, City"
 * @returns {object} - Venue name and city
 */
const parseVenue = (venue) => {
  const parts = venue.split(', ');
  return {
    name: parts[0] || venue,
    city: parts[1] || ''
  };
};

/**
 * Load matches for a given year and month from JSON data
 * @param {number} year - Year
 * @param {number} month - Month (0-11)
 * @returns {Array} - Array of formatted match objects
 */
export const loadMatchesForMonth = (year, month) => {
  const data = getMatchData(year, month);
  
  if (!data || !data.matches) {
    return [];
  }

  return data.matches.map(match => {
    let matchDateObj;
    let timeStr;
    
    // Handle new JSON format with kickoff_datetime_ist
    if (match.kickoff_datetime_ist) {
      matchDateObj = new Date(match.kickoff_datetime_ist);
      // Format time as HH:MM
      timeStr = matchDateObj.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else {
      // Fallback for old format
      const dateStr = match.date;
      timeStr = match.time || match.time_ist || '00:00';
      
      let parseTime = timeStr;
      if (timeStr === 'TBD') {
        parseTime = '00:00';
      }

      if (dateStr) {
        matchDateObj = new Date(`${dateStr}T${parseTime}`);
      } else {
        matchDateObj = new Date(); // Fallback safety
      }
    }

    // Adjust time for Spanish leagues (add 1 hour)
    if (match.league === 'La Liga') {
      matchDateObj.setHours(matchDateObj.getHours() + 1);
      // Update time string to reflect the new time
      timeStr = matchDateObj.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    }

    const venue = parseVenue(match.venue);
    const leagueStyle = getLeagueStyle(match.league);
    
    // Status Logic: Purely time-based as per user request
    const now = new Date();
    // Assuming a match lasts ~2 hours
    const matchEndTime = new Date(matchDateObj.getTime() + 2 * 60 * 60 * 1000);
    
    let status = 'Scheduled';
    
    if (now > matchEndTime) {
      status = 'Completed';
    } else if (now >= matchDateObj) {
      status = 'Live';
    }

    return {
      id: match.id,
      date: matchDateObj, // Store full Date object
      day: matchDateObj.getDate(),
      homeTeam: match.home,
      awayTeam: match.away,
      competition: match.league,
      competitionColor: leagueStyle.color,
      competitionIcon: leagueStyle.icon,
      time: timeStr,
      venue: venue.name,
      venueCity: venue.city,
      status: status
    };
  }).sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.time.localeCompare(b.time);
  });
};

/**
 * Get number of days in a month
 * @param {number} year - Year
 * @param {number} month - Month (0-11)
 * @returns {number} - Number of days
 */
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get the day of week for the first day of a month (0 = Sunday)
 * @param {number} year - Year
 * @param {number} month - Month (0-11)
 * @returns {number} - Day of week (0-6)
 */
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

/**
 * Check if a date is today
 * @param {number} day - Day of month
 * @param {number} month - Month (0-11)
 * @param {number} year - Year
 * @returns {boolean} - True if the date is today
 */
export const isToday = (day, month, year) => {
  const today = new Date();
  return day === today.getDate() && 
         month === today.getMonth() && 
         year === today.getFullYear();
};

/**
 * Format a date for display
 * @param {Date} date - Date object
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Get matches grouped by day
 * @param {Array} matches - Array of match objects
 * @returns {object} - Object with day as key and matches array as value
 */
export const groupMatchesByDay = (matches) => {
  return matches.reduce((acc, match) => {
    const day = match.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(match);
    return acc;
  }, {});
};
