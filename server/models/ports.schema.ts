import mongoose, { Schema } from "mongoose";
import { IPort } from "./types/IPort";

const portSchema = new Schema({
  name: { type: String, required: true },
  folders: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
});

export const PortModel = mongoose.model<IPort>("Port", portSchema);
