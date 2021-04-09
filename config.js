const env = process.env;

const config = {
  db: { /* don’t expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || '192.168.100.117',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'Pa55word',
    database: env.DB_NAME || 'stocks',
  }
};
  
module.exports = config;