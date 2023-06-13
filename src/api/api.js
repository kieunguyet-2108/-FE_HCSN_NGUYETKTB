import fixed_asset from './fixed_asset';
import department from './department';
import fixed_asset_category from './fixed_asset_category';
import import_file from './import_file';
import ax from 'axios';
const axios = ax.create({
    baseURL: 'https://localhost:7081',
    Headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials':true,
    },
});
const api = {
    fixed_asset: fixed_asset(axios),
    department: department(axios),
    fixed_asset_category: fixed_asset_category(axios),
    import_file : import_file(axios),
};

export default api;