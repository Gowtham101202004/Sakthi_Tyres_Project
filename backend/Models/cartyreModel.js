const mongoose = require('mongoose');
const tyres = mongoose.Schema(
    {
            image: String,
            vehicle_type: String,
            vehicle_brand: String,
            vehicle_model: String,
            tyre_brand: String,
            tyre_model: String,
            tyre_size: String,
            price :String
    }
);

const tyreModel = mongoose.model('Car_tyres',tyres)

module.exports={tyreModel};
