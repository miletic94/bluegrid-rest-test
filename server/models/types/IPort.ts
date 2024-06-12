import { IFolder } from "./IFolder";

export type TPort = Pick<IPort, "name" | "folders">;
export interface IPort extends Document {
  name: string;
  folders: IFolder[];
}
