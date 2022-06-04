# Task Description
Before starting the homework we recommend reading it in its entirety so that you have a broad understanding of what you're building. You can use any languages, databases and tools you want. Submit your application on this Github private repo with a README file with build instructions, an explanation of the approach you took, and how you could potentially improve it in the future. 

Email connor@pilotplans.com once you've completed the assignment. 

# Requirement
Develop a Node.Js API that allows a client app to obtain the full directory listing of a given directory path on the local filesystem.

Include the full path, file size and attribute information in the result and cater for a large directory size ( at least 100,000).

Make sure the application can build and run on any OS and provide clear instructions. You can use REST or GraphQl.

Pilot is a NodeJs, GraphQL company, but if you don’t know it yet then I would suggest you use what you know best.

And do your best to impress us! Simple solutions are best, but the more you can show off your technical skills the better.

# Solution

# Table of Contents

1. [Installation](#installation)
2. [Notes](#notes)
3. [Proposed Improvements](#proposed-improvements)
4. [Technology Stack](#technology-stack)

# Installation
 1. Clone the repo 

    ```git clone https://github.com/Pilot-Recruitment/Rajarshi-Ghoshal.git```

 2. Install NPM packages

    `npm install`
    
 3. Run
     
    normal start - `node server.js`
    for listening to changes - `nodemon server.js`
    If not restarting in containerised environements use 'legacy-watch-flag' - `nodemon -L server.js`
 
 # Notes
 
   Routes - 
    
    1. GET route for relatively smaller directory size - /directory-info 
    2. GET route for very-large directory - /for-large-directories 
    
    My approach to solving this assignment was to first solve it for a smaller directory structure and I have implemented that solution on '/directory-info' with all 
    the required parameters. When solving for iterating through very large directories I faced a number of issues with regards to the NodeJS event-loop and asynchronous code. 
    I tried various approaches but there were short comings in all of them. The solution I have implemented currently on '/for-large-directories' solves the problem to some 
    extent and logs all directory items for 100k+ directory size (tested upto size - 2k items).   
 
# Proposed Improvements
    
    1. Solve the issue of fs.readdir() getting blocked when reading very large directory size and refactor it to include all the attributes in the return value.  
    2. Maybe use/implement streaming.  
    
# Technology Stack
  
  Implemented REST with - 
  
  NodeJS <br />
  ExpressJS 
