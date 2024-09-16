export function formatDateString(dateString: string): string {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Define arrays for day and month names
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get day of the week, date, month, and year from the Date object
    const dayName = dayNames[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const monthName = monthNames[date.getMonth()];
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    // Determine AM/PM
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = ((hours + 11) % 12 + 1).toString().padStart(2, '0'); // Convert 24-hour format to 12-hour format

    // Construct the formatted date string
    return `${dayName}, ${day} ${monthName}, ${formattedHours}:${minutes} ${period}`;
}