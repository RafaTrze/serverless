const hello = async (event) => {
  
  console.log('I said hello')
  
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