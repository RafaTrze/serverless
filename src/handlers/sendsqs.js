// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const logger = require('../utils/logger')
// Set the region 
AWS.config.update({region: 'eu-west-2'});



const sendMessage = async (event) => {
  logger.info('message1')
  logger.info({
    event: event,
    dirname: __dirname
  }, 
    'message');
  // console.log('event:', event);

  // Create an SQS service object
  const sqs = new AWS.SQS();

  const body = JSON.parse(event.body);
  const queueUrl = process.env.QUEUE_URL
  const params = {
    MessageBody: JSON.stringify(body),
    QueueUrl: queueUrl,
    DelaySeconds: 2
  };

  const data = await sqs.sendMessage(params).promise();
  
  console.log('data:', data)

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