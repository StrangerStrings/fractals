import { css, customElement, html, internalProperty, LitElement, property }
	from "lit-element";
import {defaultStyles} from './defaultStyles';
import './components/Component';

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
				display: flex;
				justify-content: space-between;
				align-items: stretch;
				padding: 40px;
				background: peachpuff;
			}
		`
	];

	@property({type: String}) indexHtmlOption: string;
	
	@internalProperty() words: string[] = ["and", "what"];
	// @internalProperty() words: string[] = ["hello", "world"];

	render() {
		var components = this.words.map((word) => 
			html`<component-a word=${word}></component-a>`
		);

		return html`
			<div class="container">
				${components}
			</div>
		`;
	}
}
