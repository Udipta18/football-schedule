/**
 * Generate Google Calendar URL for a match
 */
export const generateGoogleCalendarUrl = (match) => {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  
  // Parse date and time
  const [year, month, day] = match.date.toISOString().split('T')[0].split('-');
  const [hours, minutes] = match.time.split(':');
  
  // Create start date (IST to UTC: subtract 5:30)
  const startDate = new Date(match.date);
  startDate.setHours(parseInt(hours), parseInt(minutes), 0);
  
  // End date (assume 2 hour match)
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 2);
  
  // Format dates for Google Calendar (YYYYMMDDTHHmmss)
  const formatDate = (d) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const title = encodeURIComponent(`⚽ ${match.homeTeam} vs ${match.awayTeam}`);
  const details = encodeURIComponent(
    `${match.competition}\n` +
    `Time: ${match.time} IST\n` +
    `Venue: ${match.venue}${match.venueCity ? ', ' + match.venueCity : ''}`
  );
  const location = encodeURIComponent(match.venue + (match.venueCity ? ', ' + match.venueCity : ''));
  
  return `${baseUrl}&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}&location=${location}`;
};

/**
 * Generate WhatsApp share URL for a match
 */
export const generateWhatsAppUrl = (match) => {
  const message = encodeURIComponent(
    `⚽ Football Match Alert!\n\n` +
    `🏆 ${match.competition}\n` +
    `⚔️ ${match.homeTeam} vs ${match.awayTeam}\n` +
    `📅 ${match.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n` +
    `⏰ ${match.time} IST\n` +
    `🏟️ ${match.venue}${match.venueCity ? ', ' + match.venueCity : ''}\n\n` +
    `Don't miss it! 🔥`
  );
  
  return `https://wa.me/?text=${message}`;
};

/**
 * Open URL in new tab
 */
export const openInNewTab = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
