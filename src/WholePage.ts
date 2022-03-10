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
			}
			.frax {
				position: absolute;
				top: 50%;
				left: 50%;
			}

			.relative {
				transition: transform 0.5s ease;
			}

			control-panel {
				position: fixed;
				bottom: 20px;
				left: 20px;
			}
		`
	];

	@internalProperty() settings: FractalSettings = {
		noOfFracs: 5,
		noOfChildren: 6,
		rotation: 46,
		size: 15,
		forkPosition: 0.5,
		shrinking: 1.055,
		thinness: 44
	}

	@internalProperty() startingAngle: number = 0

	connectedCallback(): void {
		super.connectedCallback()
  	window.addEventListener('keypress', this.changeAngle.bind(this));
	}

	changeAngle() {
		this.startingAngle += 30
		
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
