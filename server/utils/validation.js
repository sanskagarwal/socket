var isRealString = (s) => {
    return typeof s ==='string' && s.trim().length>0;
}

module.exports = {isRealString};