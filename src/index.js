/** External dependencies */
import express from 'express';

import {
    getThemeInfo,
    getThemesList,
    getThemesBy,
    getThemeTagsList,
    getPopularThemeTagsList,
    getThemeTranslations,
} from './wporg_client/themes_info';

/** Instantiating express */
const app = express();

const makeApiReq = async () => {
    const args = {
        page: 1,
        per_page: 10,
        browse: 'new',
        search: 'food',
        tag: ['sticky-post', 'two-columns'],
    };
    try {
        const apiResponse = await getThemeInfo('grocery-store');
        console.log(apiResponse.data, 'apiResponse');
    } catch (error) {
        console.log(error.message, 'error');
    }
};

makeApiReq();

/** If port is defined in env var, use that otherwise use 3000 */
const PORT = parseInt(process.env.PORT, 10) || 3000;

/** Starting server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
