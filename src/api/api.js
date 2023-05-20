import fixed_asset from './fixed_asset';
import department from './department';
import fixed_asset_category from './fixed_asset_category';
import ax from 'axios';
const axios = ax.create({
    baseURL: 'https://localhost:5401/',
    Headers: {
        'Content-Type': 'application/json',
    },
});

const api = {
    fixed_asset: fixed_asset(axios),
    department: department(axios),
    fixed_asset_category: fixed_asset_category(axios),
};

export default api;