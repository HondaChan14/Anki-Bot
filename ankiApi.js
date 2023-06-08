/*
 ** slash command will prompt category to be loaded
 ** slash command will call a displayQuestion function
 ** function will select a random question from the array of objects
 ** function will check if the current user does not exist in users array for that question
 ** if they do not exist, they will be added as an object with a user and dateLastCalled property set to current date
 ** EXAMPLE  
  {
    question: "What is the work you’ve done that you're the most proud of?",
    users: [
      {
        user: "picklejuice",
        dateLastCalled: "new Date()",
      }
    ],
  },
 ** if they do exist, check if the dateLastCalled is older than current date + 24 hours, if it is, update the dateLastCalled property to the current date, display question
 ** if it has not been longer than 24 hours, select another question (break out of function and call it again)
 ** Check how to prevent infinite loop incase all questions have been been studied within the last 24 hours
 ** optional return message that all questions have been studied
 */

/*
 ** helper functions would include one that checks if current date + 24 hours is older than current date
 ** helper function for picking a random question from the array of objects
 */
