import mongoose, { Schema } from "mongoose";
import { IPort } from "./types/IPort";
import { folderSchema } from "./folder.schema";

const portSchema = new Schema({
  name: { type: String, required: true, unique: true },
  contents: { type: [folderSchema] },
});

export const Port = mongoose.model<IPort>("Port", portSchema);
