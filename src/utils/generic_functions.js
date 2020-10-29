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
 * Checks if the type of element is one of type in type_array or now
 *
 * @param {Any}(required) element
 * @param {Array}(required) type_array
 *
 * @returns {Boolean} - Returns true if element type matches with any one of
 * type in type_array
 */
const doesElementHaveOneOfType = (element, type_array) => {
    if (!element || !type_array) {
        throw new Error('element and type_array is required');
    }

    if (!Array.isArray(type_array)) {
        throw new Error(`${type_array} should be array`);
    }

    const elementType = typeof element;

    /** Handle array types differently because type of array is object in JS */
    if (type_array.indexOf('array') !== -1) {
        type_array.forEach((type) => {
            if (type === 'array' && Array.isArray(element)) {
                return true;
            } else if (elementType === type) {
                return true;
            }
        });
    } else if (type_array.indexOf(elementType) !== -1) {
        return true;
    }

    return false;
};

/**
 * Checks if the version is valid
 *
 * @param {String} version
 * @param {Array} versions_array
 *
 * @returns {Boolean} - true if an array is valid
 *
 */
const isValidVersion = (version, versions_array) => {
    if (!version) {
        throw new Error('version is required');
    }

    if (!versions_array || Array.isArray(versions_array)) {
        throw new Array('version array is required and should be array');
    }
    if (versions_array.indexOf(version) !== -1) {
        return true;
    }

    return false;
};

export {
    hasCorrectElementTypesInArray,
    doesElementHaveOneOfType,
    isValidVersion,
};
