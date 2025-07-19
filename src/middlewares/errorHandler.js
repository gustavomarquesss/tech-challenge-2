module.exports = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Erro interno no servidor";

    res.status(statusCode).json({
        error: true,
        statusCode,
        message,
    });
};