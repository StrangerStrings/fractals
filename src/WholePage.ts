import { css, customElement, html, internalProperty, LitElement, property }
	from "lit-element";
import {defaultStyles} from './defaultStyles';
import './components/Fractal';

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
		`
	];

	render() {
		return html`
			<div class="container">
				<div class="frax">
					<a-fractal 
						noOfChildren=${30}
						size=35
						rotation=93
					></a-fractal>
				</div>
			</div>
		`;
	}
}
