const logger = require('./src/utils/logger');

const hello = async (event) => {
  
  logger.info({
    message: 'I said hello world',
    path: __dirname,
    function: hello.name,
    status: 200
  })
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello World! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports = {
  handler: hello
}