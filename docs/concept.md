# Concept DARA++

## Server-side option

### Requirements
- User needs to install our minimal extension
- We process authentication cookies
- Backend infrastructure

### Flow
1. Go to our Website / Extension-site and select controller
2. Our browser extension collects authentication cookies from our users. 
    - On a per-controller-site basis, always asking for permission.
3. Received cookies are passed to our backend-server.
4. Backend starts modified automa instance and executes clickpath.
5. We signal the results back to the user.

### Pro
- No side-loaded extension
- We can hide the complexity of the clickpath execution

### Contra
- Collecting cookies will not be enough in many cases! Often a second password request must be handled
- We have to host and secure infrastructure
- We process user authentication tokens in our infrastructure
- Not as transparent
- Hard to communicate errors and get feedback from the user

## Client-side option

### Requirements
- User needs to (probably side-load install) our modified automa extension.

### Flow
1. Go to our Website / Extension-site and select controller
2. The click path is executed in the user's browser

### Pro
- all local execution: less complexity, and privacy/security complications

### Contra
- We need to develop our own automa version 
    - since automa is still based on extension-manifest v2, we can't submit our (v2-based) version in the (chrome) extension store
- The extension API is not likely to be merged in the main extension.


### Architecture
- We extend automa with an API allowing to pass workflows for execution directly to the extension.
- The API is based on chrome message passing.
- API access is granted on a user-configurable known domain white list.
- The workflows are retrieved from a backend - handling updating and statistics of the stored wfs