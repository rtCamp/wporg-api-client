/**
 * Matches type of an array elements with the given type
 *
 * @param {Array}(required) array
 * @param {String}(required) type
 *
 * @returns {Boolean} - Returns true if all elements of array have the given type
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

/**
 * Checks if the element type is one given type from type_array
 *
 * @param {Any}(required) element
 * @param {Array}(required) type_array
 *
 * @returns {Boolean} - Returns true if element type matches with any one
 * type from type_array
 */
const doesElementHaveOneOfType = (element, type_array) => {
    if (!element || !type_array) {
        throw new Error('element and type_array is required');
    }

    if (!Array.isArray(type_array)) {
        throw new Error(`${type_array} should be array`);
    }

    const elementType = typeof element;

    if (type_array.indexOf(elementType) !== -1) {
        return true;
    }

    return false;
};

export { hasCorrectElementTypesInArray, doesElementHaveOneOfType };
