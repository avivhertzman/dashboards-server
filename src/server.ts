import express from 'express';
import eventSchemaRouter from './routes/eventSchemaRouter';
import config from 'config';
import eventRouter from './routes/eventRouter';


const port = config.get('server.port');
const app = express()

app.use(express.json())

app.use(eventSchemaRouter)
app.use(eventRouter)

app.listen(port, () => {
    console.log("app is up");
})