const { tyreModel } = require('../Models/tyreModel');

const tyre_insert = async (req, res) => {
    try {
        let data = req.body;
        if (!Array.isArray(data)) {
            data = [data];
        }
        const result = await tyreModel.insertMany(data);
        res.status(200).json({ message: "Data Inserted!", result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const tyre_display = async (req, res) => {
    try {
        const Data = await tyreModel.find();
        res.status(200).json({ Data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { tyre_insert, tyre_display };
