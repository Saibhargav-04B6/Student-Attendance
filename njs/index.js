function getISTTime() {
    // Create a new Date object
    let currentTime = new Date();

    // Get the current UTC offset in minutes
    let currentOffset = currentTime.getTimezoneOffset();

    // IST offset is UTC +5:30, which is 330 minutes
    let ISTOffset = 330;

    // Calculate IST time
    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

    // Format the time in 12-hour format with AM/PM
    let hours = ISTTime.getHours();
    let minutes = ISTTime.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

console.log(getISTTime());
