import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { styleMap } from 'lit-html/directives/style-map';

/**
 * Just one configurable component for use and reuse
 */
@customElement("single-fractal")
export class Fractal extends LitElement{
	static styles = [
		defaultStyles,
		css`
			.container {
				position: relative;
				transition: transform 0.2s ease
			}
			.line {
				position: absolute;
				background: black;
				left: 50%;
				top: 50%;
			}

			single-fractal {
				position: absolute;
			}
		`
	];

	@property({type: Number}) noOfChildren: number;
	
	@property({type: Number}) rotation: number;
	
	@property({type: Number}) size: number;
	
	@property({type: Number}) forkPosition: number;
	
	@property({type: Number}) shrinking: number;
	
	@property({type: Number}) thinness: number;
	
	@property({type: String}) color: string = 'black';
	
	render() {
		
		const rotation = this.rotation
		const length = this.size
		const width = this.size / this.thinness
		const halfWidth = width/2
		
		const containerStyle = {
			transform: `rotate(${rotation}deg)`
		}

		const lineStyle = {
			height:  `${length}vw`,
			width: `${width}vw`,
			transform: `translate(-${halfWidth}vw, -${halfWidth}vw)`,
			borderRadius: `${halfWidth}vw`,
			background: `radial-gradient(circle, ${this.color} 45%, rgba(0,0,0,0) 100%)`
		}
		
		const childStyle = {
			top: `${length*this.forkPosition}vw`,
			left: `${halfWidth}vw`
		}

		const rotations = [-rotation, rotation]
		
		let children = [];
		if (this.noOfChildren > 0) {
			
			children = rotations.map(r =>  {
				const size = (this.size/this.shrinking) 

				return html`
					<single-fractal 
						noOfChildren=${this.noOfChildren-1}
						rotation=${r}
						size=${size}
						forkPosition=${this.forkPosition}
						shrinking=${this.shrinking}
						thinness=${this.thinness}
						color=${this.color}
						style=${styleMap(childStyle)}
					></single-fractal>`;
				}
			)}

		return html`
				<div class="container" style=${styleMap(containerStyle)}>
					<div class="line" style=${styleMap(lineStyle)}>
						${children}
					</div>
				</div>
		`;
	}

}
