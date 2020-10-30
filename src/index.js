/** External dependencies */
import express from 'express';

/** Methods */
import * as methods from './wporg_client';

/** Instantiating express */
const app = express();

/** If port is defined in env var, use that otherwise use 3000 */
const PORT = parseInt(process.env.PORT, 10) || 3000;

export { methods };

/** Starting server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
