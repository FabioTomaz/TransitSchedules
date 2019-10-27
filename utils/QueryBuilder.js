
exports.getLocalizedQuery = function(req) {
    let lat = req.query.lat;
    let lon = req.query.long;
    if((lat !== undefined && lon === undefined) || (lat === undefined && lon !== undefined)){
        return null;
    }
    let query = {};
    if (lat !== undefined) {
        query = {
            within: {
                lat: lat,
                lon: lon,
                radius: 5
            } 
        };
    }
    return query;
}
