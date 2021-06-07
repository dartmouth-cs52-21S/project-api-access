# PROJECT: ACCESS

![Team Photo](https://user-images.githubusercontent.com/51734801/117523005-6b8eda00-af84-11eb-88cc-781ae657319a.jpg)

[*how?*](https://help.github.com/articles/about-readmes/#relative-links-and-image-paths-in-readme-files)

[Client Link](https://resumov.netlify.app/)
[API Link](https://cs52access.herokuapp.com/)

TODO: short project description, some sample screenshots or mockups

Access is a web application that enables users to generate a portfolio website automatically by filling in fields from their resume. Users will input information regarding their education, work experiences, projects, etc., and be returned a selection of website templates featuring different stylistic choices. This website will be automatically deployed by our application. 

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

TODO: how to get the project dev environment up and running, npm install etc
- npm install
- ejs
- express
- mongoose
- bcrypt

## Deployment

TODO: how to deploy the project

- Netlify: We will deploy our app via Netlify, as we have done with previous assignments
- HerokuApp: We will be our live running server, that we will use to host our javascript/node server program
- Mongodb: Will be our database were we store:  
- email: { type: String, unique: true, lowercase: true },
- password: { type: String },
- name: { type: String },
- resume: { type: JSON },
- The resume JSON will contain information that the user inputs into our frontend, including education, projects, work experience, technical skills, etc.


## Authors

TODO:
- Aadhya
- Luca
- Vico
- Jaime
- John

## Acknowledgments
Professor Tregubov and Samiha Datta for their supervision of our project!
