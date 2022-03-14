/** Settings that describe the look and behavior */
export type FractalSettings = {
  /** Number of initial fractals on the page  */
  amount: number;
  /** How many layers deep to go in each fractal */
  layers: number;
  /** The angle between each parent fractal and it's child branch */
  angle: number;
  /** How big the fractals are */
  size: number;
  /** How far up the parent line the child fractal branches off */
  forkPosition?: number;
  /** How much smaller each succsesive child gets ('2' halves each time, '1' stays the same) */
  shrinking: number;
  /** Makes the angles on the branches sway/drift/twist to the left or right  */
  sway: number;
  /** How thin each line is */
  thinness?: number;
	/** Set of colours for the fractals to choose from */
	colors: string[];
	/** background colour */
	backgroundColor: string;
}

export const defaultSettings: FractalSettings[] = [
  {
		amount: 7,
		layers: 2,
		angle: 130,
		size: 28,
		forkPosition: 0.4,
		shrinking: 1.05,
		sway: 0,
		thinness: 44,
		colors: ['#c327cf', '#8a2be2'],
		backgroundColor: '#000000'
  },
  {
		amount: 16,
		layers: 4,
		angle: 95,
		size: 40,
		forkPosition: 0.2,
		shrinking: 1.25,
		sway: -10,
		thinness: 44,
		colors: ['#c327cf', '#8a2be2'],
		backgroundColor: '#ffdab9'
  },
  {
		amount: 8,
		layers: 4,
		angle: 55,
		size: 15,
		forkPosition: 0.5,
		shrinking: 0.855,
		sway: 18,
		thinness: 50,
		colors: ['#c327cf', '#8a2be2'],
		backgroundColor: '#ffdab9'
  }
]