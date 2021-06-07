# PROJECT: Resumov

![Team Photo](https://user-images.githubusercontent.com/51734801/117523005-6b8eda00-af84-11eb-88cc-781ae657319a.jpg)

[*how?*](https://help.github.com/articles/about-readmes/#relative-links-and-image-paths-in-readme-files)

## Description

Resumov is a web application that enables users to generate multiple portfolio websites by filling in fields from their resume. Users will input information regarding their education, work experiences, projects, etc., and the web application would generate a portfolio of their choice according to the templates we have created. They are also able to customize their portfolio websites, which includes the content and the styles.

## Mockup (ABOVE AND BEYOND): 

<img width="540" alt="Screen Shot 2021-05-19 at 12 51 22 AM" src="https://user-images.githubusercontent.com/47261209/118758368-ee454e00-b83c-11eb-9e70-69e90ea483d2.png">

## Architecture

TODO:  descriptions of code organization and tools and libraries used
- Material-UI: https://material-ui.com/
- Fab API: https://material-ui.com/api/fab/
- Textareaautosize:https://material-ui.com/components/textarea-autosize/
- React-markdown: https://github.com/remarkjs/react-markdown
- TLDR: https://github.com/tldr-pages/tldr

## Setup

Start by cloning the git repository.
````
$ git clone https://github.com/dartmouth-cs52-21S/project-api-access.git
````
Then change your directory to the project
````
$ cd project-api-access
````
Install all packages using npm
```
$ npm install
```
Add all authentication keys in .env file. Here's how it should look like
```
AUTH_SECRET=<INPUT AUTH SECRET>
AWS_ACCESS_KEY_ID=<INPUT AWS ACCESS KEY ID>
AWS_SECRET_ACCESS_KEY=<INPUT AWS SECRET ACCESS KEY>
S3_BUCKET_NAME=<INPUT AWS S3 BUCKET NAME>
```

To run the web app locally, do
```
$ npm start
```
Now, the backend is running locally. To connect to the backend locally, ensure that both the backend and frontend are running. Go to [frontend actions](https://github.com/dartmouth-cs52-21S/project-access/blob/master/src/actions/index.js) and change the line `export const ROOT_URL = 'https://cs52access.herokuapp.com/api';` to `export const ROOT_URL = 'http://localhost:9090/api';`.

## Deployment

- [Netlify](https://resumov.netlify.app/): We will deploy our app via Netlify, as we have done with previous assignments
- [HerokuApp](https://cs52access.herokuapp.com/): We will be our live running server, that we will use to host our javascript/node server program
- [Mongodb](https://www.mongodb.com/): Will be our database were we store:
- [AWS S3](https://s3.console.aws.amazon.com/) : Used to generate and store image urls which will also be stored on the backend.
    * UserSchema:
        1. firstName: { type: String },
        1. lastName: { type: String },
        1. email: { type: String, unique: true, lowercase: true },
        1. password: { type: String },
        1. portfolioIds: [String],
        1. profileUrl: { type: String },
    * PortfolioSchema:
        1. name: String,
        1. header: Object,
        1. aboutMe: Object,
        1. projects: Object,
        1. contactMe: Object,
        1. resume: Object,
    * ImageSchema:
        1. url: String,

    For every portfolio created by a specific email, it will be appended to a user's portfolioIds list. profileUrl links to a user's profile image which can be changed in the settings page. 

    In the PortfolioSchema, name refers to name of the portfolio. Header, aboutMe, projects, contactMe are jsons that would store the styles (flex direction, font size, font, etc.) accordingly which would be rendered on the frontend accordingly. Each portfolio has one resume which would be a json containing all the content (Work experience, skills, languages, etc.) that a user has filled in when creating a portfolio.

If you have deployed your backend to heroku sucessfully, go to your [frontend actions](https://github.com/dartmouth-cs52-21S/project-access/blob/master/src/actions/index.js) and make your root_url your deployed backend url
```
export const ROOT_URL = '<Deployed Url>/api';
```

## Authors

- [Aadhya](https://github.com/AadhyaKocha)
- [Luca](https://github.com/lucalit888)
- [Vico](https://github.com/Vicolee)
- [Jaime](https://github.com/themotivation12)
- [John](https://github.com/johnbkariuki)

## Acknowledgments
Professor Tregubov and Samiha Datta for their supervision of our project!

## References

1. [Deploy backend on Heroku and Mongodb](https://cs52.me/assignments/sa/server-side/)
1. [Connect AWS S3 to backend](https://cs52.me/assignments/sa/s3-upload/)