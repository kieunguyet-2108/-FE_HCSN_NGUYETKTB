async function getFixedAssetById(id){
    const me = this;
    try {
        const rs = await me.$msAxios.getFixedAssetById(id);
        if(rs){
            return rs.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export default {
    getFixedAssetById
}