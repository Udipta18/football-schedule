/**
 * Team Abbreviations Utility
 * Converts full team names to short, recognizable abbreviations
 */

const teamAbbreviations = {
    // Spanish Teams
    'Real Madrid': 'RMA',
    'Barcelona': 'BAR',
    'Atletico Madrid': 'ATM',
    'Athletic Club': 'ATH',
    'Real Betis': 'BET',
    'Espanyol': 'ESP',
    'Real Sociedad': 'RSO',
    'Villarreal': 'VIL',
    'Real Oviedo': 'OVI',
    'Levante': 'LEV',
    
    // English Teams
    'Liverpool': 'LIV',
    'Arsenal': 'ARS',
    'Manchester City': 'MCI',
    'Manchester United': 'MUN',
    'Chelsea': 'CHE',
    'Tottenham Hotspur': 'TOT',
    'Leeds United': 'LEE',
    'Brentford': 'BRE',
    'Bournemouth': 'BOU',
    'Fulham': 'FUL',
    'Sunderland': 'SUN',
    
    // European Teams
    'Monaco': 'MON',
    'Slavia Prague': 'SLA',
    'Copenhagen': 'COP',
    'Benfica': 'BEN',
};

/**
 * Team search aliases - maps common nicknames and abbreviations to official team names
 */
const teamSearchAliases = {
    // Real Madrid
    'rma': 'Real Madrid',
    'real': 'Real Madrid',
    'madrid': 'Real Madrid',
    'real madrid': 'Real Madrid',
    
    // Barcelona
    'bar': 'Barcelona',
    'barca': 'Barcelona',
    'barça': 'Barcelona',
    'barcelona': 'Barcelona',
    
    // Manchester United
    'mun': 'Manchester United',
    'manu': 'Manchester United',
    'man utd': 'Manchester United',
    'man united': 'Manchester United',
    'manchester united': 'Manchester United',
    'united': 'Manchester United',
    
    // Manchester City
    'mci': 'Manchester City',
    'man city': 'Manchester City',
    'manchester city': 'Manchester City',
    'city': 'Manchester City',
    
    // Liverpool
    'liv': 'Liverpool',
    'liverpool': 'Liverpool',
    
    // Arsenal
    'ars': 'Arsenal',
    'arsenal': 'Arsenal',
    'gunners': 'Arsenal',
    
    // Chelsea
    'che': 'Chelsea',
    'chelsea': 'Chelsea',
    'blues': 'Chelsea',
    
    // Tottenham
    'tot': 'Tottenham Hotspur',
    'spurs': 'Tottenham Hotspur',
    'tottenham': 'Tottenham Hotspur',
    
    // Atletico Madrid
    'atm': 'Atletico Madrid',
    'atleti': 'Atletico Madrid',
    'atletico': 'Atletico Madrid',
    'atletico madrid': 'Atletico Madrid',
    
    // Athletic Club
    'ath': 'Athletic Club',
    'athletic': 'Athletic Club',
    'bilbao': 'Athletic Club',
    
    // Real Betis
    'bet': 'Real Betis',
    'betis': 'Real Betis',
    'real betis': 'Real Betis',
    
    // Real Sociedad
    'rso': 'Real Sociedad',
    'sociedad': 'Real Sociedad',
    'real sociedad': 'Real Sociedad',
    
    // Others
    'vil': 'Villarreal',
    'villarreal': 'Villarreal',
    'esp': 'Espanyol',
    'espanyol': 'Espanyol',
    'mon': 'Monaco',
    'monaco': 'Monaco',
    'ben': 'Benfica',
    'benfica': 'Benfica',
    'lee': 'Leeds United',
    'leeds': 'Leeds United',
    'bre': 'Brentford',
    'brentford': 'Brentford',
    'bou': 'Bournemouth',
    'bournemouth': 'Bournemouth',
    'ful': 'Fulham',
    'fulham': 'Fulham',
    'sun': 'Sunderland',
    'sunderland': 'Sunderland',
    'lev': 'Levante',
    'levante': 'Levante',
    'ovi': 'Real Oviedo',
    'oviedo': 'Real Oviedo',
    'sla': 'Slavia Prague',
    'slavia': 'Slavia Prague',
    'cop': 'Copenhagen',
    'copenhagen': 'Copenhagen',
};

/**
 * Get team abbreviation
 * @param {string} teamName - Full team name
 * @returns {string} - 3-letter abbreviation or first 3 letters if not found
 */
export const getTeamAbbreviation = (teamName) => {
    if (!teamName) return '';
    
    // Check if we have a predefined abbreviation
    if (teamAbbreviations[teamName]) {
        return teamAbbreviations[teamName];
    }
    
    // Fallback: Take first 3 letters of the team name
    // Remove common words and get meaningful part
    const cleanName = teamName
        .replace(/^(Real|FC|CF|Athletic|Club)\s+/i, '') // Remove common prefixes
        .replace(/\s+(United|City|FC|CF|Club)$/i, ''); // Remove common suffixes
    
    return cleanName.substring(0, 3).toUpperCase();
};

/**
 * Format match display for calendar
 * @param {string} homeTeam - Home team name
 * @param {string} awayTeam - Away team name
 * @returns {string} - Formatted match string (e.g., "RMA vs BAR")
 */
export const formatMatchDisplay = (homeTeam, awayTeam) => {
    const home = getTeamAbbreviation(homeTeam);
    const away = getTeamAbbreviation(awayTeam);
    return `${home} vs ${away}`;
};

/**
 * Search for team matches - supports full names, abbreviations, and nicknames
 * @param {string} searchQuery - User's search input
 * @returns {string|null} - Official team name or null if not found
 */
export const findTeamBySearch = (searchQuery) => {
    if (!searchQuery || searchQuery.trim() === '') return null;
    
    const query = searchQuery.toLowerCase().trim();
    
    // Check aliases first
    if (teamSearchAliases[query]) {
        return teamSearchAliases[query];
    }
    
    // Check if query partially matches any team name
    const allTeams = Object.keys(teamAbbreviations);
    const partialMatch = allTeams.find(team => 
        team.toLowerCase().includes(query)
    );
    
    return partialMatch || null;
};

/**
 * Filter matches by team
 * @param {Array} matches - Array of match objects
 * @param {string} searchQuery - Team search query
 * @returns {Array} - Filtered matches
 */
export const filterMatchesByTeam = (matches, searchQuery) => {
    if (!searchQuery || searchQuery.trim() === '') return matches;
    
    const teamName = findTeamBySearch(searchQuery);
    if (!teamName) return matches;
    
    return matches.filter(match => 
        match.homeTeam === teamName || match.awayTeam === teamName
    );
};

