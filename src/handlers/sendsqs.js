// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-west-2'});


const sendMessage = async (event) => {
  
  console.log('event:', event);
  console.log('event body:', event.body)

  // Create an SQS service object
  const sqs = new AWS.SQS();

  const queueUrl = process.env.QUEUE_URL
  const params = {
    MessageBody: JSON.stringify(event.body),
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