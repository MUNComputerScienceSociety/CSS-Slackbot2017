![MUN CS Society](https://blog.muncompsci.ca/wp-content/uploads/2017/09/logo-2.png)

# CSS-Slackbot2017

## Contributing

#### 1. Getting started

First you will have to fork the repository to your own account. Forking is as simple as clicking the fork button on the top right of the repository's page. After you fork the repository, you can clone the fork to your local machine.

#### 2. Development Pre-requisites

* NodeJS and NPM
If you are on Windows or Macintosh, you can get Node installed through [here](https://nodejs.org/en/download/). If you are on Linux, use your distro's package manager to install Node if it is not already installed.

#### 3. Setting up your environment

So far this is really straight forward. Once you have your fork cloned, using your terminal go to the directory of the local repository and use `npm install` to install any packages required by this project.

After that, you will have to copy `configBlueprint.js` to `config.js` and add your slack channel token to the config file.

#### 4. Workflow

At any given time there will be tasks waiting for contribution under the *Projects* tab. If you decide to work on a task, move the task to the *In Progress* column. You should then make a new branch on your local repository (that will be the feature branch) and make your changes there, pushing your changes to your fork of the repository. Once you think your code is ready for review, make a Pull Request from your fork's feature branch to the main repository's _master_ branch. Your code will be reviewed and tested, and any changes needed will requested on the PR. Once the PR is fully reviewed, it will be merged to _master_ directly.

#### 5. Resources and Documentation

* [Slack RTM API](https://api.slack.com/rtm)
* [Botkit and Slack Documentation](https://github.com/howdyai/botkit/blob/HEAD/docs/readme-slack.md)
* [How to Build A Slack Bot in NodeJS using Botkit](https://fossbytes.com/how-to-build-a-slack-chat-bot-in-nodejs-using-botkit/)
