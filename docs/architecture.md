# Architecture sketch

1. Retrieve Workflows from Backend API
- We want to retrieve the available controllers to display choices to the user.
- If a controller workflow is requested, download workflow and pass to automa. 
- Can we check whether the user is logged in with a certain controller and the workflow is executable?
    - No unfortunately CORS denies us this. 

2. Workflow Execution
- Default: open tab in background, just display spinning wheel in frontend.
- If an error occurred (e.g. login, re-enter password, captcha, etc.): 
    - inform the user and ask to check
    - if accepted: focus tab to manually resolve
    - This functionality should be built inside the workflow
        - having a "check" block for each step to verify correct execution.
        - Communicating state back to website.

3. Workflow execution feedback logic
- the result of the workflow execution shall be returned 
    - to the server for statistics collection
    - to the frontend for user information:
        - e.g. 'Successfully send data request' or 'execution failed: investigate'

## Design

- [x] Display a card for each controller, with actions:
    - Visit Request-page
    - Request data
- Help / Description texts / Tooltips / ..
    - [ ] Describe what happens when 'execute workflow' is pressed.
    - [ ] Describe the idea behind the project and link to daskita.


## Stretch-goals

- Implement website-extension access request logic and submit pull request to automa.
- Offer 'add & inspect' workflow to automa.
- Offer feedback / issue creation interface for workflows.
- Display additional information like usage statistics on the cards.
- Authenticate/Secure workflow statistics responses: 
    - pass a short-lived token form the backend with the workflow 
    - only accept responses containing a valid token 
    - invalidate a token on submit
    - take care of rate-limiting
- Build an asynchronous mechanism to fetch workflows on demand and initially only fetch available controllers, without the connected workflows.
- Offer user profile / statistics interface about past requests etc. Information is stored in the backend.