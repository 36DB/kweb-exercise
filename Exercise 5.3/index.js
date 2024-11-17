const { runQuery } = require("./database");
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const getTicketByUid = async (uid) => {
    const sql = 'SELECT `trains`.`id` AS `id`, `users`.`name` AS `name` FROM `tickets` INNER JOIN `users` ON `users`.`id` = `tickets`.`user` INNER JOIN `trains` ON `trains`.`id` = `tickets`.`train` WHERE `tickets`.`user` = ?';
    const results = await runQuery(sql, [uid]);
    return results;
};

const getFare = async (id) => {
    const sql = 'SELECT round((`types`.`fare_rate` * 0.01 * `trains`.`distance` * 0.1), -2) AS `fare` FROM `trains` INNER JOIN `types` ON `types`.`id` = `trains`.`type` WHERE `trains`.`id` = ?';
    const results = await runQuery(sql, [id]);
    return results[0];
};

const findFareId = async (ticketId) => {
    const tickets = await getTicketByUid(ticketId);
    let sum = 0;
    for (let ticket of tickets){
        const fare = await getFare(ticket.id);
        sum += parseInt(fare.fare, 10)
    }
    const result = [sum, tickets[0].name];
    return result;
};

const getTrainInfo = async (tid) => {
    const sql = 'SELECT `trains`.`id` AS `id`, count(`tickets`.`train`) AS `occupied`, `types`.`max_seats` AS `maximum` FROM `trains` INNER JOIN `types` ON `trains`.`type` = `types`.`id` LEFT OUTER JOIN `tickets` ON `trains`.`id` = `tickets`.`train` GROUP BY `tickets`.`train` ORDER BY `id` ASC';
    const results = await runQuery(sql)
    return results[tid-1];
};

const isTrainFull = async (tid) => {
    const train = await getTrainInfo(tid);
    return train.occupied == train.maximum
};

app.get('/fare', async (req, res) => {
    try {
        const fareData = await findFareId(req.query.uid);
        res.send(`Total fare of ${fareData[1]} is ${fareData[0]} KRW.`);
    } catch (error) {
        console.error('Error occured : '. error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/train/status', async (req, res) => {
    try {
        const trainInfo = await getTrainInfo(req.query.tid);
        const trainStatus = await isTrainFull(req.query.tid) ? 'sold out' : 'not sold out';
        res.send(`Train ${trainInfo.id} is ${trainStatus}`);
    } catch (error) {
        console.error('Error occured : '. error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));