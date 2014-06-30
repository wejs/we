/**
 * Message formater and responsers
 */

var SysMessageService = {};

  /**
   * Format and send a error message
   */
SysMessageService.sendError = function formatErrorMessage(res, message, status){
  if(!status){
    status = 500;
  }

  return res.send(status,{
    responseMessage: {
      status: status,
      errors: [
        SysMessageService.formatErrorMessage(message)
      ]
    }

  });
};

SysMessageService.formatErrorMessage = function formatErrorMessage(message){
  if( _.isObject(message) ){
    sails.log.warning('formatErrorMessage: TODO sys message :', message);
  }else if( _.isString(message) ){
    return {
      "type": 'Error',
      "data": new Date(),
      "message":"message"
    };
  }else{
    sails.log.error('SysMessageService:formatErrorMessage - Type of message is wrong on :', message);
  }
};


/*

// default error message:
{
  "status":500,
  "errors":[
    {
      "ValidationError":{
        "endDate":[
          {
            "data":"Mon, 02 Jan 2012 02:00:00 GMT",
            "message":"Validation error: \"Mon, 02 Jan 2012 02:00:00 GMT\" Rule \"after(Wed, 01 Jan 2014 01:00:00 GMT)\" failed.",
            "rule":"after",
            "args":[
              "Wed, 01 Jan 2014 01:00:00 GMT"
            ]
          }
        ]
      }
    }
  ]
}
// default success message:
{
  responseMessage: {
    "status":200|201,
    "success":[
      {
        "type": "AccountCreated",
        "data":"Mon, 02 Jan 2012 02:00:00 GMT",
        "message":"Validation error: \"Mon, 02 Jan 2012 02:00:00 GMT\" Rule \"after(Wed, 01 Jan 2014 01:00:00 GMT)\" failed.",
        "rule":"after",
        "args":[
          "Wed, 01 Jan 2014 01:00:00 GMT"
        ]
      }
    ]
  }

}

 */

module.exports = SysMessageService;
