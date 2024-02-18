export function formatTime(inputTime) {
    const date = new Date(inputTime);

    // Get date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Convert hours to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Construct the formatted time string
    const formattedTime = `${day}.${month}.${year}, ${hours}:${minutes} ${ampm}`;

    return formattedTime;
}