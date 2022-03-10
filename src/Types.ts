export type FractalSettings = {
  /** Number of initial fractals on the page  */
  noOfFracs: number;
  /** How many layers deep to go in each fractal */
  noOfChildren: number;
  /** The angle for each fork of the branch */
  rotation: number;
  /** How big the fractals are */
  size: number;
  /** How far up the line the fractal branches off */
  forkPosition?: number;
  /** How much smaller each succsesive child gets (1.0 means stay the same) */
  shrinking: number;
  /** How thin each line is */
  thinness?: number;
}