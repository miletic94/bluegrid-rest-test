import mongoose, { Schema } from "mongoose";
import { IFolder } from "./types/IFolder";
import { FolderTypeEnum } from "./enums/util.enums";

const folderSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    default: FolderTypeEnum.FOLDER,
    enum: FolderTypeEnum,
  },
  children: [{ type: Schema.Types.Mixed, refPath: "children.type" }],
});

export const FolderModel = mongoose.model<IFolder>("Folder", folderSchema);
