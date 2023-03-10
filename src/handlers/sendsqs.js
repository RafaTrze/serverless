// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const logger = require('../utils/logger')
// Set the region 
AWS.config.update({region: 'eu-west-2'});


const sendMessage = async (event) => {
  // Create an SQS service object
  const sqs = new AWS.SQS();

  const queueUrl = process.env.QUEUE_URL
  const params = {
    MessageBody: JSON.stringify(event.body),
    QueueUrl: queueUrl,
    DelaySeconds: 2
  };

  const data = await sqs.sendMessage(params).promise();
  
  logger.info({
    message: 'message send to sqs queue',
    path: __dirname,
    function: sendMessage.name,
    status: 200
  })
  
  console.log('console.log')
  console.log({
    message: 'console.log object'
  })
  logger.info('logger')

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'message sent to the queue!',
      data,
    })
  }
};

module.exports = {
  handler: sendMessage
};