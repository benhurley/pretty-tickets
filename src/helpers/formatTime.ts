export function formatTime(timeString: string) {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(':');
  
    // Parse hours as an integer
    const parsedHours = parseInt(hours, 10);
  
    // Determine whether it's AM or PM
    const period = parsedHours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour format
    const formattedHours = parsedHours > 12 ? parsedHours - 12 : parsedHours;
    
    // Ensure single-digit hours have no leading zero (e.g., 1 PM, not 01 PM)
    const formattedHoursString = formattedHours.toString();
  
    // Combine hours and minutes with AM/PM
    const formattedTime = `${formattedHoursString}:${minutes} ${period}`;
  
    return formattedTime;
  }