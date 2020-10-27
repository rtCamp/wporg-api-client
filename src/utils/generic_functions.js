/**
 * Checks types of an array elements
 *
 * @param {Array} array
 * @param {String} type
 */
const hasCorrectElementTypesInArray = (array, type) => {
    if (!array || !Array.isArray(array)) {
        throw new Error('Array might be empty or of incorrect type');
    }

    let isValid = true;
    array.forEach((element) => {
        if (typeof element !== type) {
            isValid = false;
        }
    });
    return isValid;
};

export { hasCorrectElementTypesInArray };
