const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://gofood:arnab1234@cluster0.kwbepjd.mongodb.net/gofoodmern?retryWrites=true&w=majority';
const mongoURI = 'mongodb://gofood:arnab1234@ac-xhv8o8m-shard-00-00.kwbepjd.mongodb.net:27017,ac-xhv8o8m-shard-00-01.kwbepjd.mongodb.net:27017,ac-xhv8o8m-shard-00-02.kwbepjd.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-138o6c-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
                // if(err) console.log(err);
                // else {
                //     global.food_items = data;
                //     // console.log(global.food_items)
                // } 
            })
        }
    });
}


module.exports = mongoDB;