import { Schema } from "mongoose";

export const folderSchema = new Schema({
  name: { type: String, required: true },
  contents: [{ type: Schema.Types.Mixed }],
});
