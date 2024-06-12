export type TFile = Pick<IFile, "name" | "type">;
export interface IFile extends Document {
  name: string;
  type: "file";
}
