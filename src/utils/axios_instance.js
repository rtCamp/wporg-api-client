/** External dependencies */
import axios from 'axios';

/** Internal dependencies */
import { BASE_URL } from '../utils/apis';

export default axios.create({
    baseURL: BASE_URL,
    method: 'get',
    timeout: 6000,
});
