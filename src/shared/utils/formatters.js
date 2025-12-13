/**
 * Formats a number as currency (GTQ - Quetzales).
 * @param {number} amount - The amount to format.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ'
    }).format(amount);
};

/**
 * Formats a date string as a locale-specific date.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('es-GT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Returns the month name based on the index (1-12).
 * @param {number} monthIndex - The month index (1 for January, 12 for December).
 * @returns {string} The month name or "-" if invalid.
 */
export const getMonthName = (monthIndex) => {
    if (!monthIndex || monthIndex < 1 || monthIndex > 12) return "-";

    // Create a date object for the first day of the given month
    // Month index in Date constructor is 0-based, so subtract 1
    const date = new Date(2000, monthIndex - 1, 1);

    return date.toLocaleString('es-GT', { month: 'long' });
};