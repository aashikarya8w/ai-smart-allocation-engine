// Runs once per worker BEFORE any module is imported.
process.env["MONGO_URI"] = "mongodb://localhost:27017/sih25033_test";
process.env["NODE_ENV"]  = "test";
