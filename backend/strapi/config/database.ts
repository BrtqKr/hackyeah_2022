export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'psql01.mikr.us'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'db_m139'),
      user: env('DATABASE_USERNAME', 'm139'),
      password: env('DATABASE_PASSWORD', '389D_fcd4b9'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});