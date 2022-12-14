# Climate-C_DV
# TwentyFifty-Y project documentation
The project was about creating a web application that offers visualizations of climate catastrophe as a part of our Information Technology Engineering degree. The visualizations are mainly charts of co2 concentrations in air or in ice and changes in temperatures. 

Climate change is a very current and pressing subject that evokes a lot of feelings. In a professional side, we have had to familiarise ourselves with new technologies and programming elements. We have learned much of teamwork and scheduling as well as researching during this project. 

While creating our application, we have used a large variety of different technologies, of which some are new and some we have studied previously. Our three most used spaces were Visual Studio Code, AWS and GitHub which served as the base of where everything was created. 
Visual Studio Code, or VSC, is the code editor we have been using from the start of our studies. Our main programming language is JavaScript for the logic and connections, HTML for some basic hardcoded elements and CSS to style the page. The application was created as a React app. The charts are created by chartJS package.

Our database is in AWS DynamoDB. We chose Dynamo as it is NoSQL and works better with the amount of information we needed to save there. In AWS we used Lambda to transfer data in the database straight from the URLs provided for us. Our database has distinct own tables for visualization data, user information and custom view information.

GitHub is where our whole application is stored with the project management. Our source control was through GitHub Desktop which allowed us to smoothly update and add new code parts in our projects. Our GitHub can be found in [here](https://github.com/TwentyFifty-Y) .
Our meetings were mostly in person, but we did communicate through Microsoft Teams whenever something important came up as well as when a problem would appear. 
First design of the application was done in Figma.

Our group had four members: Eero Helanti, Marion Roussel, Anibal Donoso Onell and Heta Myllymäki. We are all in the same class and are friends with each other. At first, we did have assigned roles, but after the work started to flow, they were unrelevant. A large quantity of the work was done in a group or in pairs.

Roussel did most of the front-end work by coding, connecting and styling the page. She developed the user signup, login, logout and deletion. The testing was also documented by her.

Helanti started design of the application by doing drafts of the page in Figma. He studied the chartJS and created most of the needed charts as well as helped others with their charts. He did the foundation of custom views. Part of testing document was done by him.

Donoso Onell is the host of the application. They created the server and AWS credentials as well as took care of transporting data in the database from the provided links. They made the connection between the application and database. Few of views are also created by them as well as back-end deployment. They added the finishing touches to the custom views.

Myllymäki worked with the database, mostly with the users-table. They also helped with the server side of signup and created some charts. Visualization 10 data was manually added to database by them. Project document was written by them as well the first deployment of the front-end.

As previously stated, our database is NoSQL database in Amazon Web Services. We decided to go with the non-relational database because the charts use a lot of data, like for example the evolution of the global temperature over the past two million years. In the database we have three tables, one having all the data for the visualizations, another one having all the user info, password and user id stored hashed for security reasons, and the third has the user customised views. 

With interface we wanted to create different UI for users that are logged in and the ones that are not. Those users who have logged in see more content than the ones who are not. We wanted to create relatively simple interface to focus on the actual logic and content. 
The application is not installable, it is a website. The link to the published application is here: [2050-Y](https://twentyfifty-y.com/)

To use the application, user should signup and then login to see the visualizations they want to see. After logging in navigate to either Atmospheric CO2 and emissions, Emission sources or My views tab to choose what to view. In the main page there are some basic information about climate change with a link to UN website.    
Link to the server is https://express.twentyfifty-y.com/ . 
 
