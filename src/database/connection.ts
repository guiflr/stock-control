import mongoose from "mongoose";

class Database {
  private uri: string;
  private password: string;
  private databaseName: string;

  constructor() {
    this.password = "B0YeaBKhWSu68Sum";
    this.databaseName = "stock-control";
    this.uri = `mongodb+srv://guiflr:${this.password}@stockcluster.0bmhe.mongodb.net/${this.databaseName}?retryWrites=true&w=majority`;
  }

  connection() {
    mongoose.connect(
      this.uri,
      () => {
        console.log("Connected to mongodb");
      }
    );
  }
}

export { Database };
