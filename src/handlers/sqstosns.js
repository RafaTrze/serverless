// 1. I want to take a string from the sqs queue and turn it into an params object:
//  {
//   phoneNumber: ''
//   message: ''
// }
// 2. want to send params to sns.publish

// 1. let's start with receiving and deleting from the queue:

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-west-2'});


const queueToText = async (event) => {
  console.log('it was called');
  console.log(event);
  
  const sqs = new AWS.SQS();

  const queueUrl = process.env.QUEUE_URL;
  const params = {
    QueueUrl: queueUrl,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
  };

  const data = await sqs.receiveMessage(params).promise();

  console.log('data:', data);

  const deleteParams = {
    QueueUrl: queueUrl,
    ReceiptHandle: data.Messages[0].ReceiptHandle
  };

  const removedMessage = await sqs.deleteMessage(deleteParams).promise();
  console.log('removed message:', removedMessage);

  return {
    statusCode: 200,
    body: data[1]
  };
};

module.exports = {
  handler: queueToText
}