// Using query builder
Person.find({ occupation: /host/ })
    .where('name.last')
    .equals('Ghost')
    .where('age')
    .gt(17)
    .lt(66)
    .where('likes')
    .in(['vaporizing', 'talking'])
    .limit(10)
    .sort('-occupation')
    .select('name occupation')
    .exec(callback);

query.getOptions();
// could return
{find: {occupation: 'host'}, where: [{'name.last': 'Ghost'}]}
// CHECK TO SEE IF THIS QUERY HAS ALREADY BEEN
// FETCHED IN REDIS
// we need to figure out, if the query has already been fetched
query.exec = function () {
    // to check to see if this query has already been executed
    // and if it has return the result right away
    const result = client.get('query key');
    if ( result ) {
        return result;
    }
    // otherwise issue the query *as normal*
    const result = runTheOriginalExecFunction();

    // then save that value in reids
    client.set('query key', result);
    return result;
}

query.exec((err, result) => console.log(result));
// Same as...
query.then(result => console.log(result));
//Same as...
const result = await query;
