exports.handler = async function (event, context) {
  console.log('hello invoked', { headers: event.headers });
  return { statusCode: 200, body: 'function ok' };
};
