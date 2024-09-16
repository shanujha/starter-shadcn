export default (createdAt = '') => {
    // Parse the createdAt string into a Date object
    const date = new Date(createdAt);

    // Function to get the ordinal suffix for the day
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:  return 'st';
            case 2:  return 'nd';
            case 3:  return 'rd';
            default: return 'th';
        }
    };

    // Function to format the date into "DD Mon YYYY, h:mm A"
    const formatDate = (date) => {
        const day = date.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)
        const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

        return `${day}${getOrdinalSuffix(day)} ${month} ${year}, ${formattedTime}`;
    };

    // Format the parsed date
    const formattedDate = formatDate(date);

    return formattedDate;
};
