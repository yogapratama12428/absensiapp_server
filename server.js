import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).json({
        'message': 'Hello world'
    });
})

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})
