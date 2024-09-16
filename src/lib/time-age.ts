export function timeAgo(dateString: string) {
    const now = new Date();
    const pastDate = new Date(dateString);
    const diffMs: number = now.getTime() - pastDate.getTime(); // Difference in milliseconds
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let result = '';

    if (years > 0) {
        result = years === 1 ? '1 yr ago' : `${years} yrs ago`;
    } else if (months > 0) {
        result = months === 1 ? '1 month ago' : `${months} months ago`;
    } else if (days > 0) {
        result = days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
        result = hours === 1 ? '1h ago' : `${hours}h ago`;
    } else if (minutes > 0) {
        result = minutes === 1 ? '1m ago' : `${minutes}m ago`;
    } else if (seconds > 0) {
        result = seconds === 1 ? '1s ago' : `${seconds}s ago`;
    } else {
        result = 'just now'; // Fallback for cases less than 1 second
    }

    // Handle the case where hours, minutes, and seconds are less than 1
    if (hours < 1 && minutes < 1) {
        result = seconds + 's ago';
    } else if (hours < 1) {
        result = minutes === 1 ? '1m ago' : `${minutes}m ago`;
    } else if (minutes < 1) {
        result = hours === 1 ? '1h ago' : `${hours}h ago`;
    } else if (days < 1) {
        result = hours === 1 ? '1h ago' : `${hours}h ago`;
    } else if (days >= 1) {
        const remainingHours = hours % 24;
        if (remainingHours > 0) {
            result = days === 1
                ? `1 day ${remainingHours}h ago`
                : `${days} days ${remainingHours}h ago`;
        } else {
            result = days === 1 ? '1 day ago' : `${days} days ago`;
        }
    }

    return result;
}

