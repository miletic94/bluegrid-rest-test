import { IFolder } from "./IFolder";

export type TPort = Pick<IPort, "name" | "contents">;
export interface IPort extends Document {
  name: string;
  contents: IFolder[];
}
