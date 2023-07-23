import express from 'express';
import eventSchemaRouter from './routes/eventSchemaRouter';
import * as bodyParser from 'body-parser'
import config from 'config';


const port = config.get('server.port');
const app = express()

// app.use(bodyParser.json())
app.use(express.json())

app.use(eventSchemaRouter)

app.listen(port, () => {
    console.log("app is up");
})