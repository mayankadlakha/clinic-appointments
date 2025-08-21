
/**
 * Validates if a given datetime string is in ISO 8601 format.
 * 
 * @param {string} datetimeString - The datetime string to validate.
 * @returns {boolean} - Returns true if the datetime string is valid ISO 8601, otherwise false.
 */
const isValidISODate = (datetimeString: string): boolean => {
    try{
        const datetimeDate: Date = new Date(datetimeString);
        const datetimeStringISO: string = datetimeDate.toISOString();
        return datetimeString === datetimeStringISO;
    } catch(e){
        return false;
    }

}

/**
 * Validates if From datetime is before To datetime given datetime.
 * 
 * @param {string} datetimeString - The datetime string to validate.
 * @returns {boolean} - Returns true if the datetime string is valid ISO 8601, otherwise false.
 */
const isFromBeforeTo = (datetimeFrom: Date, datetimeTo: Date) => {
    return datetimeFrom < datetimeTo;

}

export {
    isValidISODate,
    isFromBeforeTo,
};