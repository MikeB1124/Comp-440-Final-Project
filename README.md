# Restaurant Menu Manager

## Install XAMPP For Local Server Environment

- Youtube video on how to install XAMP **(WATCH VIDEO UP TO 5:10 TIMESTAMP)** https://www.youtube.com/watch?v=GRqw0pBwewY&t=137s

## XAMPP Configuration

- Run the Apache service and MySQL service from the XAMPP Control Panel
- Delete all content in htdocs folder within the xampp directory
- Clone this repo into the htdocs folder by doing 'git clone https://github.com/MikeB1124/Comp-440-Final-Project.git'

## How To Browse To Website

- By Default Apache Will Run on localhost:80, browse to http://localhost:80
- Here you will see all your folders listed in the htdocs directory
- Click on the folder 'Comp-440-Final-Project' Within your Browser
- You should now see the website running on the apache local server

## Mannge Local MySQL Database

- Make sure the MySQL service is running on your XAMPP Control Panel
- Visit http://localhost:80/phpmyadmin/, here you will see your local MySQL database
- We will interact with this database through our webpage

## Try out Test Buttons

- When clicking these buttons, Javascript is in charge of listening for the button click event
- When the click event is captured, we use ajax to send the request to our PHP backend code
- Our PHP code sends the appropriate SQL command to our phpmyadmin MySQL database
- You can view your query results in the adming portal http://localhost:80/phpmyadmin/
