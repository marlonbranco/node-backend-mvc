class ErrorsApp {
    message;
    statusCode = 400;

    constructor(
        message,
        statusCode = 400,
    ) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = { ErrorsApp };
