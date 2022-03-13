import { css, customElement, html, internalProperty, LitElement, property }
	from "lit-element";
import {defaultStyles} from './defaultStyles';
import './components/Fractal';
import './components/Controls';
import { defaultSettings, FractalSettings } from "./FractalSettings";
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

			control-panel {
				position: fixed;
				bottom: 20px;
				left: 20px;
			}
		`
	];

	@internalProperty() settings: FractalSettings;

	@internalProperty() startingAngle: number = 0

	spinning: boolean = false;
	spinningSpeed: number = 833;

	spinningFunction: NodeJS.Timeout;
	rotationFunction: NodeJS.Timeout;

	rotationChange: number = 5;
	angleChange: number = 15;
	

	connectedCallback(): void {
		super.connectedCallback()
  	window.addEventListener('keypress', this.keyPress.bind(this));
	}

	keyPress(ev: KeyboardEvent) {
		if (ev.key == ' '){
			this.toggleSpin()
		}
		if (!isNaN(parseInt(ev.key)) && ev.key != '0') {
			this.spinningSpeed = 4000 / parseInt(ev.key)
		}
	}

	toggleSpin() {
		if (!this.spinning) {
			this.spinning = true
			this.spin()
			this.recursiveSpin()
		} else {
			this.spinning = false
		}
	}

	recursiveSpin() {
		setTimeout(function() {
			if (!this.spinning) {
				return;
			}
			this.spin()
			this.recursiveSpin()
		}.bind(this), this.spinningSpeed)
	}

	spin() {
		this.startingAngle += this.angleChange
		this.settings.rotation += this.rotationChange
		if (Math.abs(this.settings.rotation) >= 360) {
			this.rotationChange *= -1
		}
		this.settings = {...this.settings}
	}


	settingsChanged(ev) {
		this.settings = {...ev.detail.settings}
	}

	render() {
		const colours = ['rgba(195,39,207,1)', 'blueviolet']

		const noOfFracs = this.settings?.noOfFracs ? this.settings.noOfFracs : 0

		const fractals = Array.from(
			{ length: noOfFracs }, 
			(_, idx) => {
				const color = colours[idx%colours.length]

				const angle = this.startingAngle + idx * 360/noOfFracs
				const style = {
					transform: `rotate(${angle}deg)`,
					transition:`transform ${this.spinningSpeed - 10}ms linear`
				}

				return html`
				<div class="relative"
					style=${styleMap(style)}>
					<single-fractal 
						noOfChildren=${this.settings.noOfChildren}
						rotation=${this.settings.rotation}
						size=${this.settings.size}
						forkPosition=${this.settings.forkPosition}
						shrinking=${this.settings.shrinking}
						thinness=${this.settings.thinness}
						sway=${this.settings.sway}
						rotationSpeed=${this.spinningSpeed}
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


//todoo:
//  add colour changing to settings
//  save customs to local on save and delete/ load on open
//  icons for show/hide, save and delete
