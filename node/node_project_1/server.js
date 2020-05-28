const express = require('express')
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();


app.use(bodyParser.json());
app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

let client;

(async function () {
    client = await mongoClient.connect();

    const db = client.db("Chat");
    let collection;
    try {
        collection = db.collection("Messages");
    } catch (ex) {
        db.createCollection("Messages", { capped: true, size: 5242880, max: 5000 });
        collection = db.collection("Messages");
    }

    if (!collection) {
        db.createCollection("Messages", { capped: true, size: 5242880, max: 5000 });
    }

    const addMessage = async function (msg) {

        await collection.insertOne(msg);
    };

    const getMessages = async function () {

        let result = await collection.find().toArray();

        console.log("Server has extracted data from db collection: ");
        console.log(result);

        return result;
    };

    const removeMessageById = async function (msgId) {

        await collection.deleteOne({ _id: new ObjectID(msgId) });

        console.log(`Server has successfully removed a record with id = ${msgId} from db collection`);
    };

    const updateMessageById = async function (msgId, newValue) {

        await collection.updateOne(
            {
                _id: new ObjectID(msgId)
            },
            {
                $set: {
                    nick: newValue.nick,
                    message: newValue.message
                }
            }
        );

        await collection.updateMany(
            {
                'repliedMsg.id': msgId
            },
            {
                $set: {
                    'repliedMsg.nick': newValue.nick,
                    'repliedMsg.message': newValue.message
                }
            }
        );

        console.log(`Server has successfully updated a record with id = ${msgId} from db collection`);
    };


    app.get("/message", async (req, res) => {
        let messages = await getMessages();
        res.send(JSON.stringify(messages));
    });

    app.post("/message", async (req, res) => {
        await addMessage(req.body);
        res.status(201).send(req.body);
    });

    app.put("/message/:messageId", async (req, res) => {
        await updateMessageById(req.params.messageId, req.body);
        res.send(JSON.stringify(req.body));
    });

    app.delete("/message/:messageId", async (req, res) => {
        await removeMessageById(req.params.messageId);
        res.send(JSON.stringify(req.body));
    });

    app.get("/file", (req, res) => {
        fs.readdirSync("public/upload").forEach(file => {
            console.log(file);
        });
        res.end(JSON.stringify(fs.readdirSync("public/upload")))
    })

    app.post("/file", (req, res) => {
        let fileName = Math.random().toString("36");
        fileName = `upload/${fileName}`;
        let fileStream = fs.createWriteStream("public/" + fileName);

        req.pipe(fileStream);
        req.on("end", () => {
            res.end(fileName);
        });
    });
    app.listen(5000, () => console.log("listen on 5000 port"));

})();


