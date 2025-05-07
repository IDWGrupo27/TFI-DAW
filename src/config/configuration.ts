export default () => ({
    port: parseInt(process.env.PORT || '3000'),
    prefix: process.env.GLOBAL_PREFIX || 'api',
    swaggerHabilitado: process.env.SWAGGER_HABILITADO === 'true',
    database: {}
})