const { tyreModel } = require("../Models/tyreModel");
const User = require("../Models/userModel");
const expressAsyncHandler = require("express-async-handler");

// Count Users and Tyres
const countUsersAndTyres = expressAsyncHandler(async (req, res) => {
    console.log("Fetched Count by ADMIN");
    try {
        const usercount = await User.countDocuments();
        const tyrecount = await tyreModel.countDocuments();

        return res.status(200).json({ message: "Count fetched!", data: { usercount:usercount, tyrecount:tyrecount }});
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
    console.log("Updated User ID & password by ADMIN");
    const { id } = req.params;
    const { name, email, newPassword, isAdmin } = req.body;
    try {
        const updateData = { name, email, isAdmin };
        if (newPassword) {
            updateData.password = newPassword;
        }
        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully", data: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
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
    const { brand, size, price, available } = req.body;

    try {
        const tyre = await tyreModel.findById(req.params.id);
        if (!tyre) {
            return res.status(404).json({ message: "Tyre not found" });
        }

        // Update the tyre details
        tyre.brand = brand;
        tyre.size = size;
        tyre.price = price;
        tyre.available = available;
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

module.exports = {
    countUsersAndTyres,
    allUsersData,
    findIdAndUpdatePassword,
    deleteUserById,
    allTyresData,
    findTyreAndUpdate,
    addTyres,
    deleteTyreById,
};
