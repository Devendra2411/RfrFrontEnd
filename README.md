# RFR-FrontEnd
User interface code of Red-Flag-Review

# Proxy Settings

- Configure the NPM proxy if you are behind a proxy
- Proxy for Bower is configured in the Bowerrc file

# Prerequisite  

- Node Version 8
- Angular CLI Installed
- Gulp Installed Globally

# Building the Code

- Once the code is cloned from the repo run the below commands in sequence in a command prompt

  - `npm install`
  - `bower install`
  - Compile the SASS files in the project using the command `gulp sass` 

# Running the Code

- Once the code is built use the command `ng serve` to run the code locally on a port 9000

# Other Gulp Tasks

- Linting of TS can be done using the command `gulp lint`. Once the lint is done you should see the HTML report in the folder "tslint-report.html"
