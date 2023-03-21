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

  const body = JSON.parse(event.Records[0].body)

  console.log('body:', body)
  
  const sns = new AWS.SNS()

  // const paramsAttributes = {
  //   attributes: {
  //     DefaultSMSType: 'Promotional'
  //   }
  // }
  const paramsMessage = {
    Message: body.message,
    PhoneNumber: body.phoneNumber
  }
  
  console.log('paramsMessage:', paramsMessage)
  
  
  // const messageAttributes = await sns.setSMSAttributes(paramsAttributes).promise();
  const data = await sns.publish(paramsMessage).promise();
  // await sns.publish(paramsMessage).promise();

  // console.log('messageAttributes:', messageAttributes)
  console.log('data:', data)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'success',
    })
  };
};

module.exports = {
  handler: queueToText
}