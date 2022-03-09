import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { styleMap } from 'lit-html/directives/style-map';


/**
 * Just one configurable component for use and reuse
 */
@customElement("a-fractal")
export class Fractal extends LitElement{
	static styles = [
		defaultStyles,
		css`
			.div1 {
				position: relative;
			}
			.div2 {
				position: absolute;
				background: black;
				left: 50%;
				top: 50%;
			}

			a-fractal {
				position: absolute;
			}
		`
	];

	@property({type: Number}) noOfChildren: number;

	@property({type: Number}) size: number;

	@property({type: Number}) rotation: number;
	
	render() {
		
		const rotation = this.rotation		
		const length = this.size
		const width = this.size / 10
		const halfWidth = width/2
		
		const style1 = {
			transform: `rotate(${rotation}deg)`
		}

		const style2 = {
			height:  `${length}vw`,
			width: `${width}vw`,
			transform: `translate(-${halfWidth}vw, -${halfWidth}vw)`,
			borderRadius: `${halfWidth}vw`
		}
		
		const style3 = {
			bottom: `${halfWidth}vw`,
			left: `${halfWidth}vw`
		}

		let child = html``;
		if (this.noOfChildren > 0) {
		child = html`
			<a-fractal 
				noOfChildren=${this.noOfChildren-1}
				size=${this.size/1.1}
				rotation=${rotation}
				style=${styleMap(style3)}
			></a-fractal>`;
		}

		return html`
				<div class="div1" style=${styleMap(style1)}>
					<div class="div2" style=${styleMap(style2)}>
						${child}
					</div>
				</div>
		`;
	}

}
