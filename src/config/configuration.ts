export default () => ({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3000,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false
})