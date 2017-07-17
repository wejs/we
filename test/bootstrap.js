before( function checkDbConfig(done) {
  if (
    !process.env.DATABASE_NAME ||
    !process.env.DATABASE_PASSWORD ||
    !process.env.DATABASE_USERNAME
  ) {
    console.log('Enviroment variable `process.env.DATABASE_NAME`, `process.env.DATABASE_PASSWORD` and `process.env.DATABASE_USERNAME` is required for database configuration \n');
    process.exit(1);
  }

  done();
});