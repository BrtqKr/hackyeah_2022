export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 2137),
      database: env('DATABASE_NAME', 'stonks-db-postgres'),
      user: env('DATABASE_USERNAME', 'sa'),
      password: env('DATABASE_PASSWORD', 'sa'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
