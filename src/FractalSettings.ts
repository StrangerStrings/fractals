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
  
  sway: number;
  /** How thin each line is */
  thinness?: number;
}

export const defaultSettings: FractalSettings[] = [
  {
		noOfFracs: 3,
		noOfChildren: 3,
		rotation: 40,
		size: 28,
		forkPosition: 0.4,
		shrinking: 1.05,
		sway: 0,
		thinness: 44
  },
  {
		noOfFracs: 16,
		noOfChildren: 4,
		rotation: 60,
		size: 40,
		forkPosition: 0.2,
		shrinking: 1.25,
		sway: -10,
		thinness: 44
  },
  {
		noOfFracs: 13,
		noOfChildren: 3,
		rotation: 40,
		size: 28,
		forkPosition: 0.4,
		shrinking: 1.05,
		sway: 0,
		thinness: 44
  }
]