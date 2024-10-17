const { tyreModel } = require("../Models/tyreModel");
const User = require("../Models/userModel");
const { orderModel } = require("../Models/orderModel");
const expressAsyncHandler = require("express-async-handler");

// Count Users and Tyres
const countUsersAndTyres = expressAsyncHandler(async (req, res) => {
    console.log("Fetched Count by ADMIN");
    try {
        const usercount = await User.countDocuments();
        const tyrecount = await tyreModel.countDocuments();
        const ordercount = await orderModel.countDocuments();
        console.log(`Users: ${usercount}, Tyres: ${tyrecount}, Orders: ${ordercount}`);
        return res.status(200).json({ message: "Count fetched!", data: { usercount:usercount, tyrecount:tyrecount, ordercount:ordercount }});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch All Users Data
const allUsersData = expressAsyncHandler(async (req, res) => {
    console.log("User data fetched by ADMIN");
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ message: "User data fetched!", data: users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update User Data
const findIdAndUpdatePassword = expressAsyncHandler(async (req, res) => {
    console.log("Updated ID -> ", req.params.id);
    console.log("Updated User ID & password by ADMIN");
    // const { id } = req.params;
    const { name, email, newPassword, isadmin } = req.body;
    if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name=name;
        user.email=email;
        user.password = newPassword;
        user.isadmin=isadmin;
        await user.save();

        res.status(200).json({ message: `User ${user.name}'s data updated!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});


// Delete User by ID
const deleteUserById = expressAsyncHandler(async (req, res) => {
    console.log("User ID to delete -> ", req.params.id);
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const allTyresData = expressAsyncHandler(async (req, res) => {
    console.log("Tyre data fetched by ADMIN");
    try {
        const tyres = await tyreModel.find();
        if (!tyres || tyres.length === 0) {
            return res.status(404).json({ message: "No tyres found" });
        }
        return res.status(200).json({ message: "Tyre data fetched!", data: tyres });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Tyre Data
const findTyreAndUpdate = expressAsyncHandler(async (req, res) => {
    console.log("Updated Tyre ID -> ", req.params.id);
    const { image, vehicle_type, vehicle_brand, vehicle_model, tyre_brand, tyre_model, tyre_size, price } = req.body;

    try {
        const tyre = await tyreModel.findById(req.params.id);
        if (!tyre) {
            return res.status(404).json({ message: "Tyre not found" });
        }

        // Update the tyre details
        tyre.image = image;
        tyre.vehicle_type = vehicle_type;
        tyre.vehicle_brand = vehicle_brand;
        tyre.vehicle_model = vehicle_model;
        tyre.brand = tyre_brand;
        tyre.model = tyre_model;
        tyre.size = tyre_size;
        tyre.price = price;
        await tyre.save();

        res.status(200).json({ message: `Tyre ${tyre.brand} updated!` });
    } catch (err) {
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

// Add New Tyres
const addTyres = expressAsyncHandler(async (req, res) => {
    console.log("Tyre data to add -> ", req.body);
    try {
        let tyres = req.body;
        if (!Array.isArray(tyres)) {
            tyres = [tyres];
        }
        await tyreModel.insertMany(tyres);
        res.status(200).json({ message: "Tyres added successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete Tyre by ID
const deleteTyreById = expressAsyncHandler(async (req, res) => {
    console.log("Tyre ID to delete -> ", req.params.id);
    try {
        const tyre = await tyreModel.findByIdAndDelete(req.params.id);
        if (!tyre) {
            return res.status(404).json({ message: "Tyre not found" });
        }
        return res.status(200).json({ message: "Tyre deleted!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch All Orders Data
const allOrdersData = expressAsyncHandler(async (req, res) => {
    console.log("Order data fetched by ADMIN");
    try {
        const orders = await orderModel.find();
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        return res.status(200).json({ message: "Order data fetched!", data: orders });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = {
    countUsersAndTyres,
    allUsersData,
    findIdAndUpdatePassword,
    deleteUserById,
    allTyresData,
    findTyreAndUpdate,
    addTyres,
    deleteTyreById,
    allOrdersData,
};
