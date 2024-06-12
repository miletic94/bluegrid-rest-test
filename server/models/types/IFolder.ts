import { Document } from "mongoose";
import { IFile, TFile } from "./IFile";

export type TFolder = Pick<IFolder, "name" | "type" | "children">;

export interface IFolder extends Document {
  name: string;
  type: "folder";
  children: (TFolder | TFile)[];
}
