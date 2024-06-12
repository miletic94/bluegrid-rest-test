import { Schema } from "mongoose";

export const folderSchema = new Schema({
  name: { type: String, required: true },
  children: [{ type: Schema.Types.Mixed }],
});
