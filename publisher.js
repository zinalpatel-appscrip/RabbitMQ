const amqp = require('amqplib')

const msg = { number: process.argv[2] }
require('dotenv').config()

connect()
async function  connect() {
    try{
        const connection = await amqp.connect(process.env.CONNECTION_URL)
        const channel = await connection.createChannel()
        const result = await channel.assertQueue('jobs')
        channel.sendToQueue('jobs',Buffer.from(JSON.stringify(msg)))
        console.log('Job sent successfully')
    }catch(e)
    {
        console.error(e)
    }
}