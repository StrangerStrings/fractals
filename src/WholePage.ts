import { css, customElement, html, internalProperty, LitElement, property }
	from "lit-element";
import {defaultStyles} from './defaultStyles';
import './components/Fractal';
import './components/Controls';
import { FractalSettings } from "./Types";

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

			control-panel {
				position: fixed;
				bottom: 20px;
				left: 20px;
			}
		`
	];

	@internalProperty() settings: FractalSettings = {
		noOfChildren: 30,
		size: 35,
		rotation: 73
	}

	settingsChanged(ev) {
		this.settings = {...ev.detail.settings}
	}

	render() {
		return html`
			<div class="container">
				<div class="frax">
					<a-fractal 
						noOfChildren=${this.settings.noOfChildren}
						size=${this.settings.size}
						rotation=${this.settings.rotation}
					></a-fractal>
				</div>
				<control-panel
					.settings=${this.settings}
					@changed=${this.settingsChanged}
				></control-panel>
			</div>
		`;
	}
}
