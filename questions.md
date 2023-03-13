// Questions: 
- in yml file:
  Action:
    - sqs:* 
  If I wanted to create access that allows Write only would it be:
    - sqs: Write?
  My undestanding is that that above permison applies to all lambda functions can I restrict it to only particular one?