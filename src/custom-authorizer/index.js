"use strict";
require("dotenv").config();

const getEffectAction = token => effectAction = token === "khurram" ? "Allow" : "Deny";
module.exports.customAuthorizer = async (event) => {
  const token = event.authorizationToken;

  // getEffectAction can have a call to a database or 
  // you can call an external service to determine if the 
  // user is allowed to execute lambda or not.
  const effectAction = getEffectAction(token);

  const response = {
    principalId: `${process.env.principalId}`,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effectAction,
          Resource: [
            `arn:aws:execute-api:${process.env.region}:${process.env.account}:${process.env.appId}/${process.env.resources}/${process.env.methods}`,
          ],
        },
      ],
    },
  };

  return response;
};
