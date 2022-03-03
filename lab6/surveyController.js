// required packages
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const fs = require("fs");

// read the data file
const readData = (fileName) => {
  const dataRead = fs.readFileSync("./data/" + fileName + ".json");
  return JSON.parse(dataRead);
};

// read the data file
const writeData = (record, fileName) => {
  const data = JSON.stringify(record);
  fs.writeFileSync("./data/" + fileName + ".json", data);
};

// preprocess string so that it ignores case insensitivity
const preprocessString = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const combineCounts = (name, value) => {
  const data = readData(name);
  data[preprocessString(value)] = (data[preprocessString(value)] || 0) + 1;
  writeData(data, name);
};

// This is the controler per se, with the get/post
module.exports = (app) => {
  // when a user goes to localhost:3000/analysis
  // serve a template (ejs file) which will include the data from the data files
  app.get("/analysis", function (_, res) {
    const color = readData("color");
    const fruit = readData("fruit");
    const animal = readData("animal");
    res.render("showResults", {
      results: { Color: color, Fruit: fruit, Animal: animal },
    });
  });

  // when a user goes to localhost:3000/niceSurvey
  // serve a static html (the survey itself to fill in)
  app.get("/niceSurvey", function (_, res) {
    res.sendFile(__dirname + "/views/niceSurvey.html");
  });

  // when a user types SUBMIT in localhost:3000/niceSurvey
  // the action.js code will POST, and what is sent in the POST
  // will be recuperated here, parsed and used to update the data files
  app.post("/niceSurvey", urlencodedParser, function (req, res) {
    const data = req.body;
    Object.keys(data).forEach((key) => {
      if (typeof data[key] !== "string") {
        data[key].forEach((i) => {
          combineCounts(key, i);
        });
      } else {
        combineCounts(key, data[key]);
      }
    });

    // mystery line... (if I take it out, the SUBMIT button does change)
    // if anyone can figure this out, let me know!
    res.sendFile(__dirname + "/views/niceSurvey.html");
  });
};
