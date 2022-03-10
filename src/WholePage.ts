import { css, customElement, html, internalProperty, LitElement, property }
	from "lit-element";
import {defaultStyles} from './defaultStyles';
import './components/Fractal';
import './components/Controls';
import { FractalSettings } from "./Types";
import { styleMap } from 'lit-html/directives/style-map';

@customElement('whole-page')
/**
 * The Page which will contain and surround our components
 */
export class WholePage extends LitElement {

	static styles = [
		defaultStyles,
		css`
			.container {
				height: 100%;
				background: peachpuff;
				background: radial-gradient(circle, rgba(255,218,185,1) 74%, rgba(0,0,0,1) 100%);
				background: radial-gradient(circle, rgba(255,218,185,1) 35%, rgba(183,156,133,1) 73%, rgba(0,0,0,1) 100%);
			}
			.frax {
				position: absolute;
				top: 50%;
				left: 50%;
			}

			.relative {
				transition: transform 1s linear
			}

			control-panel {
				position: fixed;
				bottom: 20px;
				left: 20px;
			}
		`
	];

	@internalProperty() settings: FractalSettings = {
		noOfFracs: 7,
		noOfChildren: 3,
		rotation: 40,
		size: 28,
		forkPosition: 0.4,
		shrinking: 1.05,
		thinness: 44
	}

	@internalProperty() startingAngle: number = 0

	spinning: boolean = false;

	spinningFunction: NodeJS.Timeout;

	rotationFunction: NodeJS.Timeout;

	rotationChange: number = 1;

	connectedCallback(): void {
		super.connectedCallback()
  	window.addEventListener('keypress', this.keyPress.bind(this));
	}

	keyPress(ev: KeyboardEvent) {
		if (ev.key == ' '){
			this.toggleSpin()
		}
	}

	toggleSpin() {
		if (this.spinning) {
			clearInterval(this.spinningFunction)
			clearInterval(this.rotationFunction)			
			this.spinning = false
		} else {
			this.startingAngle += 80
			this.spinningFunction = setInterval(()=>{
				this.startingAngle += 80
			},1000)

			this.rotationFunction = setInterval(()=>{
				this.settings.rotation += this.rotationChange
				if (Math.abs(this.settings.rotation) > 360) {
					this.rotationChange *= -1
				}
				this.settings = {...this.settings}
			},100)
			
			this.spinning = true
		}
	}

	settingsChanged(ev) {
		this.settings = {...ev.detail.settings}
	}

	render() {
		const colours = ['rgba(195,39,207,1)', 'blueviolet']

		const fractals = Array.from(
			{ length: this.settings.noOfFracs }, 
			(_, idx) => {
				const angle = this.startingAngle + idx * 360/this.settings.noOfFracs
				const color = colours[idx%colours.length]

				return html`
				<div class="relative"
					style=${styleMap({transform: `rotate(${angle}deg)`})}>
					<single-fractal 
						noOfChildren=${this.settings.noOfChildren}
						rotation=${this.settings.rotation}
						size=${this.settings.size}
						forkPosition=${this.settings.forkPosition}
						shrinking=${this.settings.shrinking}
						thinness=${this.settings.thinness}
						color=${color}
					></single-fractal>
				</div>
		`})

		return html`
			<div class="container">
				<div class="frax">
					${fractals}
				</div>
				<control-panel
					.settings=${this.settings}
					@changed=${this.settingsChanged}
				></control-panel>
			</div>
		`;
	}
}
