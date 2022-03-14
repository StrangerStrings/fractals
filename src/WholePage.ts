import { css, customElement, html, internalProperty, LitElement }
	from "lit-element";
import { styleMap } from 'lit-html/directives/style-map';
import { defaultStyles } from './defaultStyles';
import { FractalSettings } from "./FractalSettings";
import './components/Fractal';
import './components/Controls';

@customElement('whole-page')
/**
 * Page that creates the initial base fractals based on settings
 * and has the ability to automatically spin the fractals
 */
export class WholePage extends LitElement {

	static styles = [
		defaultStyles,
		css`
			.container {
				height: 100%;
			}
			.fractals {
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

	/** Angle the whole set of fractals is rotated by */
	@internalProperty() totalAngle: number = 0

	spinning: boolean = false;
	/** Time period between successive angle changes */
	spinningSpeed: number = 833;

	/** Increment for each angle change whilst spinning*/
	angleChange: number = 5;
	totalAngleChange: number = 10;
	

	connectedCallback(): void {
		super.connectedCallback();
  	window.addEventListener('keypress', this.keyPress.bind(this));
	}

	keyPress(ev: KeyboardEvent) {
		if (ev.key == ' '){
			this.toggleSpin();
		}
		if (!isNaN(parseInt(ev.key)) && ev.key != '0') {
			this.spinningSpeed = 4000 / parseInt(ev.key);
		}
	}

	toggleSpin() {
		if (!this.spinning) {
			this.spinning = true;
			this.spin();
			this.recursiveSpin();
		} else {
			this.spinning = false;
		}
	}

	/** Recursively spin() whilst this.spinning is true */
	recursiveSpin() {
		setTimeout(function() {
			if (!this.spinning) {
				return;
			}
			this.spin();
			this.recursiveSpin();
		}.bind(this), this.spinningSpeed);
	}

	/** Increment internal fractal angle and total angle */
	spin() {
		this.totalAngle += this.totalAngleChange;
		this.settings.angle += this.angleChange;
		if (Math.abs(this.settings.angle) >= 360) {
			this.angleChange *= -1;
		}
		this.settings = {...this.settings};
	}


	settingsChanged(ev: CustomEvent<{settings: FractalSettings}>) {
		this.settings = {...ev.detail.settings};
	}

	render() {
		const amountOfFractals = this.settings?.amount ? this.settings.amount : 0;

		const fractals = Array.from(
			{ length: amountOfFractals }, 
			(_, idx) => {
				/** starting angle for each branch so they are evenly spaced */
				const totalAngle = this.totalAngle + (360 * idx / amountOfFractals) - this.settings.angle;
				const style = {
					transform: `rotate(${totalAngle}deg)`,
					transition:`transform ${this.spinningSpeed}ms linear`
				};
				
				/** Alternating colour from array of colours */
				const color = this.settings.colors[idx % this.settings.colors.length];
				
				return html`
				<div class="relative"
					style=${styleMap(style)}>
					<my-fractal 
						noOfChildren=${this.settings.layers}
						angle=${this.settings.angle}
						size=${this.settings.size}
						forkPosition=${this.settings.forkPosition}
						shrinking=${this.settings.shrinking}
						thinness=${this.settings.thinness}
						sway=${this.settings.sway}
						spinningSpeed=${this.spinningSpeed}
						color=${color}
					></my-fractal>
				</div>
		`});

		const pageBackgroundColor = {
			background: `radial-gradient(circle, 
				${this.settings?.backgroundColor} 35%, 
				${this.settings?.backgroundColor} 73%, 
				rgba(0, 0, 0, 0) 100%
			)`
		};

		return html`
			<div class="container" style=${styleMap(pageBackgroundColor)}>
				<div class="fractals">
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