export default function handleError(error, res) {
    res.status(error.statusCode || 500).send({
        message: `an error has occurred because of ${error.message}`
    })
}