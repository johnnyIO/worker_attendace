const express = require("express");
const multer = require("multer");
const path = require("path");
const os = require("os");
const NodeRSA = require("node-rsa");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const validator = require("validator");
const UserModel = require("./models/UserModel");
const RoasterModel = require("./models/Roaster");
const AdminModel = require("./models/AdminModel");
const cors = require("cors");

const app = express();

mongoose.connect("mongodb://localhost:27017/workers", (req, res) => {
  console.log("connected");
});

app.use("/public", express.static("public"));
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/signup", async (req, res) => {
  const userinfo = {
    first_name: req.body.userdetails.firstname,
    last_name: req.body.userdetails.lastname,
    phone_number: req.body.userdetails.phoneNumber,
    date_of_birth: req.body.userdetails.date_of_birth,
  };

  const newUser = await new UserModel(userinfo);
  newUser.save((error, doc) => {
    if (!error) {
      res.json({ inserted_id: doc._id });
    } else {
      console.log(error);
    }
  });
});

app.post("/fetchUser", async (req, res) => {
  let user_id = req.body.userid;

  let findUserById = await UserModel.findById({ _id: user_id });
  //   console.log(findUserById);

  const user = {
    firstname: findUserById.first_name,
    last_name: findUserById.last_name,
    phone_number: findUserById.phone_number,
    date_of_birth: findUserById.date_of_birth,
  };
  res.json({ user });
});

app.post("/login_attempt", async (req, res) => {
  // const values = req.body

  let email = req.body.email;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let user_id = req.body.id;
  let department = req.body.department;

  try {
    if (
      email !== "" &&
      first_name !== "" &&
      last_name !== "" &&
      user_id !== "" &&
      department !== ""
    ) {
      if (validator.isEmail(email)) {
        const newUser = { first_name, last_name, department, user_id, email };
        // const storeUser = new UserModel(newUser)
        // storeUser.save((error, doc)=>{

        // })
        const storeUser = await UserModel.findOne({
          user_id: user_id,
          email: email,
          first_name: first_name,
        });
        if (storeUser) {
          res.json({ store: storeUser, status: true });
        } else {
          res.json({ status: false, msg: "user_not_found" });
        }
      } else {
        res.json({ status: false, msg: "invalid_email" });
      }
    } else {
      res.json({ status: false, msg: "empty_entry" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// Taking attendance starts here

app.post("/roaster", async (req, res) => {
  let uuid = req.body.userid;

  let todaysDate = new Date().toLocaleDateString("en-US");

  // console.log(todaysDate);
  //RoasterModel.$where({})
  let getUser = await RoasterModel.find({
    user_id: uuid,
    roaster_date: todaysDate,
  });

  if (getUser.length > 0) {
    //Here I ran a second check to know if the person had earlier signed out, if the person hasn't then the person is signed out
    let arrived_at = getUser[0].arrived_at;
    let left_at = getUser[0].left_at;
    let update_id = getUser[0]._id;

    if (
      (arrived_at !== null || arrived_at !== "" || arrived_at !== undefined) &&
      (left_at === null || left_at === "")
    ) {
      //Sign the person out

      // Generating time
      let departure_time = new Date().toLocaleTimeString();
      try {
        //Updating the record for the day to sign out the person
        RoasterModel.findOneAndUpdate(
          { _id: update_id },
          { left_at: departure_time },
          (error, success) => {
            if (error) {
              res.json({
                status: false,
                msg: `There seem to be an error signing you out-> ${error}`,
              });
            } else {
              let userparticulars = {
                first_name: getUser[0].first_name,
                last_name: getUser[0].last_name,
              };
              res.json({
                status: true,
                msg: userparticulars,
                signout: true,
              });
            }
          }
        );
      } catch (error) {
        res.json({
          status: false,
          msg: `There seem to be an error -> ${error}`,
        });
      }
    } else if (
      (arrived_at === null || arrived_at === "") &&
      (left_at === null || left_at === "")
    ) {
      // Sign the person in
    } else if (
      (arrived_at !== null || arrived_at !== "") &&
      (left_at !== null || left_at !== "")
    ) {
      //Let the person know that the record has been taken for the day
      res.json({ status: false, msg: "You have previously signed out" });
    }
  } else {
    // console.log("here****!");
    //   Here this is the condition that handles the case where the person has not signed in for the day, i.e today or current day.
    const findUserWithId = await UserModel.findById({ _id: uuid });

    //Check if Qrcode is in database before adding to roaster
    let fetchedUID = findUserWithId._id;
    let fetchedFirstname = findUserWithId.first_name;
    let fetchedLastname = findUserWithId.last_name;

    let dateHolder = new Date();

    let getHour = dateHolder.getHours();
    let getMinutes = dateHolder.getMinutes();
    let getSeconds = dateHolder.getSeconds();

    let timeOfArrival = new Date().toLocaleTimeString();
    const roasterDetails = {
      first_name: fetchedFirstname,
      last_name: fetchedLastname,
      user_id: uuid,
      arrived_at: timeOfArrival,
      roaster_date: todaysDate,
      left_at: "",
    };
    // console.log(roasterDetails);
    let newRoaster = new RoasterModel(roasterDetails);
    newRoaster.save((error, doc) => {
      if (!error) {
        res.json({ status: true, msg: doc, signin: true });
      } else {
        res.json({ status: false, msg: error });
      }
    });
  }
});

app.post("/adminlogin", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // console.log(username);
  try {
    let validate = await AdminModel.findOne({
      username: username,
      password: password,
    });

    if (validate) {
      res.json({ status: true });
    } else {
      res.json({ status: false, msg: "Incorrect username/password" });
    }
  } catch (error) {
    res.json({ status: false, msg: error });
  }
});

app.post("/getrecords", async (req, res) => {
  let selected_date = req.body.selected_date;
  let matching_records = await RoasterModel.find({
    roaster_date: selected_date,
  });

  if (matching_records.length > 0) {
    res.json({ status: true, records: matching_records });
  } else {
    res.json({ status: false, msg: "No Records Found" });
  }
});

app.post("/delete_record", (req, res) => {
  let id = req.body.id;
  RoasterModel.findByIdAndDelete({ _id: id }, (error, doc) => {
    if (error) {
      res.json({ status: false, msg: error });
    } else {
      res.json({ status: true, msg: "Successfully Deleted" });
    }
  });
});

app.get("/fetchRoaster", async (req, res) => {
  let Roasters = await RoasterModel.distinct("roaster_date");
  if (Roasters.length > 0) {
    res.json({ status: true, msg: Roasters });
  } else {
    res.json({ status: false, msg: "No records found" });
  }
});

app.listen("3000", () => {
  console.log("Fire on");
});
