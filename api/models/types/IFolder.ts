export interface IFolder {
  name: string;
  contents: (IFolder | String)[];
}
