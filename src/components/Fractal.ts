import { css, customElement, html, LitElement, property } from "lit-element";
import { styleMap } from 'lit-html/directives/style-map';
import { defaultStyles } from "../defaultStyles";

/**
 * A fractal (a line) that can contain copies of itself, that can contain copies of itself, that can con..
 */
@customElement("my-fractal")
export class Fractal extends LitElement{
	static styles = [
		defaultStyles,
		css`
			.pivot {
				position: relative;
				transition: all 0.3s ease;
			}
			.line {
				position: absolute;
				left: 50%;
				top: 50%;
			}

			my-fractal {
				position: absolute;
				transition: all 0.3s ease;
			}
		`
	];

	/** how many more layers to go, becomes 1 less with each recursive fractal */
	@property({type: Number}) noOfChildren: number;
	// see FractalSettings.ts for these property descriptions
	@property({type: Number}) angle: number;
	@property({type: Number}) size: number;
	@property({type: Number}) forkPosition: number;
	@property({type: Number}) shrinking: number;
	@property({type: Number}) sway: number;
	@property({type: Number}) thinness: number;
	@property({type: String}) color: string;
	/** how fast the 'angle' changes */
	@property({type: Number}) spinningSpeed: number;

	
	render() {
		const length = this.size;
		const width = this.size / this.thinness;
		const halfWidth = width/2;
		const forkPosition = length * this.forkPosition;

		const angle = this.angle + this.sway;
		
		const pivotStyle = {
			transform: `rotate(${angle}deg)`,
			transition: `transform ${this.spinningSpeed}ms linear`
		};

		const lineStyle = {
			width: `${width}vw`,
			height:  `${length}vw`,
			transform: `translate(-${halfWidth}vw, -${halfWidth}vw)`,
			borderRadius: `${halfWidth}vw`,
			zIndex: `${100-this.noOfChildren}`,
			background: `radial-gradient(circle, ${this.color} 45%, rgba(0,0,0,0) 100%)`
		};
		

		const branchAngles = [-this.angle, this.angle];
		let fractalBranches = [];
		if (this.noOfChildren > 0) {
			fractalBranches = branchAngles.map(angle =>  {
				const size = (this.size/this.shrinking);

				const branchesStyle = {
					left: `${halfWidth}vw`,
					top: `${forkPosition}vw`
				};

				return html`
					<my-fractal 
						noOfChildren=${this.noOfChildren-1}
						angle=${angle}
						size=${size}
						forkPosition=${this.forkPosition}
						shrinking=${this.shrinking}
						thinness=${this.thinness}
						sway=${this.sway}
						spinningSpeed=${this.spinningSpeed}
						color=${this.color}
						style=${styleMap(branchesStyle)}
					></my-fractal>`;
			});
		};


		return html`
				<div class="pivot" style=${styleMap(pivotStyle)}>
					<div class="line" style=${styleMap(lineStyle)}>
						${fractalBranches}
					</div>
				</div>
		`;
	}

}
