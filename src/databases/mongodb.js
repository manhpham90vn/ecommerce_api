const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const { MONGO_URI } = require("../configs/configs");

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.set("debug", true);
        mongoose.set("debug", { color: true })

        mongoose
        .connect(MONGO_URI, { maxPoolSize: 100 })
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error(err));
    }

    countConnect() {
        return mongoose.connections.length;
    }

    checkOverload() {
        setInterval(() => {
            const countConnect = this.countConnect();
            const countCores = os.cpus().length;
            const memoryUsage = process.memoryUsage().rss / 1024 / 1024;
            const maxConnection = countCores * 5;

            console.log("Current Connection: ", countConnect);
            console.log("Memory Usage: ", memoryUsage);
            console.log("Max Connection: ", maxConnection);
            if (countConnect > maxConnection) {
                console.error("Overload");
            }
        }, 5000);
    }

    close() {
        return mongoose.disconnect();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
}

const instance = Database.getInstance();
module.exports = instance;