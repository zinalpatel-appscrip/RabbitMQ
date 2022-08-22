const amqp = require('amqplib')

const msg = { number: process.argv[2] }
require('dotenv').config()


connect()
async function connect() {
    try {
        const connection = await amqp.connect(process.env.CONNECTION_URL)
        const channel = await connection.createChannel()
        const result = await channel.assertQueue('jobs')
        channel.consume('jobs', message => {
            console.log(message.content.toString())
            // console.log(JSON.parse(message.content).number)
            if (JSON.parse(message.content).number == 101)
                channel.ack(message)
        })

        console.log('Waiting for messages...')
    } catch (e) {
        console.error(e)
    }
}