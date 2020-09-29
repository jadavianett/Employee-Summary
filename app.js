const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
const team = [];

const questionPrompt = [
  {
    type: "confirm",
    message: "Would you like to build your team?",
    name: "initQuestion",
  },
];
const newMember = [
  {
    type: "confirm",
    message: "Would you like to add another team member?",
    name: "newMember",
  },
];

const typeOfTeamMember = [
  {
    type: "list",
    message: "Which member of your team would you like to add?",
    choices: ["Engineer", "Intern", "Manager"],
    name: "memberType",
  },
];

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

// TODO, ASK QUESTION BASED ON SPECIFIC USER INPUT, IE, IF THEY SELECT ADD AN INTERN, ASK THEM INTERN QUESTIONS!
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// starts application
function startQuestions() {
  inquirer
    .prompt(questionPrompt)
    .then(function (data) {
      if (data.initQuestion === true) {
        // console.log("will start questions!");
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
        console.log("engineer chosen");
        askEngineerPrompts();
      } else if (data.memberType === "Intern") {
        console.log("intern chosen");
        askInternPrompts();
      } else if (data.memberType === "Manager") {
        console.log("manager chosen");
        askManagerPrompts();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function askEngineerPrompts() {
  inquirer
    .prompt(engineerPrompts)
    .then(function (data) {
      console.log(data);
      var newEngineer = new Engineer(data.name, data.id, data.email, data.github);
      team.push(newEngineer);
      console.log(team);
      addToTeam();
    })
    .catch((err) => {
      console.log(err);
    });
}

function askInternPrompts() {
  inquirer
    .prompt(internPrompts)
    .then(function (data) {
      console.log(data);
      var newIntern = new Intern(data.name, data.id, data.email, data.school);
      team.push(newIntern);
      console.log(team);
      addToTeam();
    })
    .catch((err) => {
      console.log(err);
    });
}

function askManagerPrompts() {
  inquirer
    .prompt(managerPrompts)
    .then(function (data) {
      console.log(data);
      var newManager = new Manager(data.name, data.id, data.email, data.officeNumber);
      team.push(newManager);
      console.log(team);
      addToTeam();
    })
    .catch((err) => {
      console.log(err);
    });
}

function end () {
  console.log('Your team is complete!' + '\n' + 'Generating html file...')
  fs.writeFile("team.html", render(team), function (err) {
    if (err) {
      console.log(err);
    }
    console.log("HTML successfully generated!")
  })
  
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

function init() {
  console.log("Follow the prompts to build your team!");
  startQuestions();
}

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//FUNCTION CALLS
init();
