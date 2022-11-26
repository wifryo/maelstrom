# Tapestry

[Design](https://github.com/wifryo/tapestry/blob/main/README.md#design)  
[Functionality](https://github.com/wifryo/tapestry/blob/main/README.md#functionality)  
[Technologies](https://github.com/wifryo/tapestry/blob/main/README.md#technologies)  
[Future plans](https://github.com/wifryo/tapestry/blob/main/README.md#future-plans)  
[Screenshots](https://github.com/wifryo/tapestry/blob/main/README.md#screenshots)   
[Setup instructions](https://github.com/wifryo/tapestry/blob/main/README.md#setup-instructions)   

**Tapestry** is a full stack web application that generates prose to add life to, and provide inspiration for, anyone playing or running fantasy tabletop RPGs - primarily Dungeons & Dragons. The application uses OpenAI's GPT-3 text generator to generate original texts, and all generated texts are saved to a database, providing an ever-expanding library of material.

Visit the live, deployed version of **Tapestry** [here](https://tapestry-gen.fly.dev/)

 

![image](https://user-images.githubusercontent.com/28006307/204075902-6f88966d-50ec-44cc-aeda-397fb540ab42.png)

## Design

The application is fully responsive for all screen sizes. The visual design was implemented using [Material UI](https://mui.com/).

The primary functionality of the application was planned in Figma & DrawSQL. The full version of the initial flowchart be found [here](https://www.figma.com/file/XtbHPUghd4wbZKq7x73yVV/tapestry?node-id=0%3A1&t=4QTNe0RWf4jwAzgN-1).  
Please note that these diagrams do not represent the final product, as improvements were made to the design during the development process.

![image](https://user-images.githubusercontent.com/28006307/204078324-326733cd-cdb4-4440-8b33-3a7a1be88789.png)

![image](https://user-images.githubusercontent.com/28006307/204077208-c59e9c60-1529-467f-9bec-8d064f93e4ea.png)


## Functionality

- Generate original names/backstories/settlement descriptions supported by OpenAI's GPT-3 text generator, or retrieve texts that were previously generated by others
- Generating original texts costs credits; each account has a finite number
- Generated character names are embedded in backstories and can be changed prior to saving
- Any generated item can be saved to the user's profile for future reference
- User authorisation and authentication
- Fully responsive & functional on any standard device size

## Technologies

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)
- [Material UI](https://mui.com/)
- REST API
- [OpenAI GPT-3](https://openai.com/api/)
- [DrawSQL](https://drawsql.app/)
- [Jest](https://jestjs.io/)
- [Playwright](https://playwright.dev/)
- [Fly.io](https://fly.io/)

## Future plans

- More generators
- Ability to approve quality generated texts & use them to further refine AI model
- Ability to acquire more credits
- Ability to choose a particular author's "voice"
- Pronoun selection for backstory

## Setup instructions

- Clone the repository with `git clone <repo>`
- Create a PostgreSQL database & user with appropriate permissions
- Create a new .env file
- Copy the environment variables from .env-example into .env
- Replace the placeholders xxxxx with your username, password and name of database
- Register with [OpenAI](https://openai.com/api/), generate a new API key and add it to .env
- Install dotenv-cli with yarn add dotenv-cli
- Ensure all dependencies are installed (e.g. by running `yarn`)
- Run migrations with `yarn migrate up`
- Start the local database service with `postgres`
- Start the local server with `yarn dev`
