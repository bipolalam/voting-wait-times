# Voting Wait Times App

This is a [CodeAcross Atlanta 2016](https://nvite.com/CodeAcross/b1aa) project championed by the [New Georgia Project](http://newgeorgiaproject.org/) and hosted by [Code for Atlanta](http://www.codeforatlanta.org/). 

The goal is to crowd-source wait times at voting precincts. The data is openly available on [Socrata](https://brigades.opendatanetwork.com/OPEN-DATA-SHARING-PLATFORM/Voting-Wait-Times/ikiz-kvvr), although currently it only contains test data.

This application is a webapp with a small amount of Node.js server code.

# Project Chat

Our slack channel `#voting-wait-times` on [`codeforatlanta.slack.com`](https://codeforatlanta.slack.com).
Click [here](https://slack.codeforatlanta.org) to join the Code for Atlanta Slack.

# Getting started

### Installing

    [sudo] npm install -g gulp bower
    git clone https://github.com/codeforatlanta/voting-wait-times.git
    cd voting-wait-times
    npm install
    bower install

### Running

    gulp serve

This gulp task will run the server, open the app in the browser, and automatically reload when changes are made.

Running the server requires several environment variables to be set, which are stored in a `.env` file. This file
is not included in the repository for security reasons. 