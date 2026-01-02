// Import all match data files
import dec2025 from './2025-12.json';
import jan2026 from './2026-01.json';
import feb2026 from './2026-02.json';
import mar2026 from './2026-03.json';
import apr2026 from './2026-04.json';
import may2026 from './2026-05.json';

// Create a map of year-month to match data
const matchDataMap = {
  '2025-12': dec2025,
  '2026-01': jan2026,
  '2026-02': feb2026,
  '2026-03': mar2026,
  '2026-04': apr2026,
  '2026-05': may2026,
};

/**
 * Get match data for a specific year and month
 * @param {number} year - The year
 * @param {number} month - The month (0-indexed, 0 = January)
 * @returns {object|null} - Match data object or null if not found
 */
export const getMatchData = (year, month) => {
  const key = `${year}-${String(month + 1).padStart(2, '0')}`;
  return matchDataMap[key] || null;
};

/**
 * Get all available months with match data
 * @returns {Array} - Array of {year, month} objects
 */
export const getAvailableMonths = () => {
  return Object.keys(matchDataMap).map(key => {
    const [year, month] = key.split('-');
    return {
      year: parseInt(year),
      month: parseInt(month) - 1, // Convert to 0-indexed
      key
    };
  });
};

/**
 * Check if match data exists for a specific month
 * @param {number} year - The year
 * @param {number} month - The month (0-indexed)
 * @returns {boolean}
 */
export const hasMatchData = (year, month) => {
  const key = `${year}-${String(month + 1).padStart(2, '0')}`;
  return key in matchDataMap;
};

export default matchDataMap;
