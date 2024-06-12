import mongoose, { Schema } from "mongoose";
import { IFile } from "./types/IFile";
import { FileTypeEnum } from "./enums/util.enums";

const fileSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    default: FileTypeEnum.FILE,
    enum: FileTypeEnum,
  },
});

export const FileModel = mongoose.model<IFile>("File", fileSchema);
