export interface IFolder {
  name: string;
  children: (IFolder | String)[];
}
