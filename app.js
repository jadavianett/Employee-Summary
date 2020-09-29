//importing required files

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


// creating an empty team array to store data 
const team = [];

// initializes the application
const questionPrompt = [
  {
    type: "confirm",
    message: "Would you like to build your team?",
    name: "initQuestion",
  },
];

// adds a new member
const newMember = [
  {
    type: "confirm",
    message: "Would you like to add another team member?",
    name: "newMember",
  },
];

//chooses the type of member added
const typeOfTeamMember = [
  {
    type: "list",
    message: "Which member of your team would you like to add?",
    choices: ["Engineer", "Intern", "Manager"],
    name: "memberType",
  },
];

//prompts shown when engineer is chosen
const engineerPrompts = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your engineer's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your engineer's e-mail?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your engineer's GitHub username?",
    name: "github",
  },
];

//prompts shown when intern is chosen
const internPrompts = [
  {
    type: "input",
    message: "What is your intern's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your intern's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your intern's e-mail?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your intern's school?",
    name: "school",
  },
];

//prompts shown when manager is chosen
const managerPrompts = [
  {
    type: "input",
    message: "What is your manager's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your manager's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your manager's e-mail?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your manager's office number?",
    name: "officeNumber",
  },
];

//FUNCTIONS

// starts application
function startQuestions() {
  inquirer
    .prompt(questionPrompt)
    .then(function (data) {
      if (data.initQuestion === true) {
        memberType();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//adds member to the team
function addToTeam() {
  inquirer
    .prompt(newMember)
    .then(function (data) {
      if (data.newMember === true) {
        memberType();
      } else {
        end();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//chooses type of team member
function memberType() {
  inquirer
    .prompt(typeOfTeamMember)
    .then(function (data) {
      if (data.memberType === "Engineer") {
        askEngineerPrompts();
      } else if (data.memberType === "Intern") {
        askInternPrompts();
      } else if (data.memberType === "Manager") {
        askManagerPrompts();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//asks engineer questions
function askEngineerPrompts() {
  inquirer
    .prompt(engineerPrompts)
    .then(function (data) {
      var newEngineer = new Engineer(data.name, data.id, data.email, data.github);
      team.push(newEngineer);
      addToTeam();
    })
    .catch((err) => {
      console.log(err);
    });
}

//asks intern questions
function askInternPrompts() {
  inquirer
    .prompt(internPrompts)
    .then(function (data) {
      var newIntern = new Intern(data.name, data.id, data.email, data.school);
      team.push(newIntern);
      addToTeam();
    })
    .catch((err) => {
      console.log(err);
    });
}

//asks manager questions
function askManagerPrompts() {
  inquirer
    .prompt(managerPrompts)
    .then(function (data) {
      var newManager = new Manager(data.name, data.id, data.email, data.officeNumber);
      team.push(newManager);
      addToTeam();
    })
    .catch((err) => {
      console.log(err);
    });
}

//ends the application and generates the HTML file
function end () {
  console.log('Generating html file...')
  fs.writeFile(outputPath, render(team), function (err) {
    if (err) {
      console.log(err);
    }
    console.log("HTML successfully generated!")
  })
  
}

//starts the application
function init() {
  console.log("Follow the prompts to build your team!");
  startQuestions();
}


//FUNCTION CALLS
init();
