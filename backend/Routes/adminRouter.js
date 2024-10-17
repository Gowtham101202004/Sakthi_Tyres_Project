const express = require("express");
const {
    countUsersAndTyres,
    allUsersData,
    findIdAndUpdatePassword,
    deleteUserById,
    allTyresData,
    findTyreAndUpdate,
    addTyres,
    deleteTyreById,
    allOrdersData,
} = require("../Controller/adminController");

const Router = express.Router();

Router.get("/get-count", countUsersAndTyres);
Router.get("/get-all-users-data", allUsersData);
Router.put("/update-user/:id", findIdAndUpdatePassword);
Router.delete("/delete-user/:id", deleteUserById);
Router.get("/all-tyre-data", allTyresData);
Router.get("/all-orders-data", allOrdersData);
Router.put("/update-tyre/:id", findTyreAndUpdate);
Router.delete("/delete-tyre/:id", deleteTyreById);
Router.post("/add-tyres", addTyres);


module.exports = Router;
