import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";

/**
 * Just one configurable component for use and reuse
 */
@customElement("component-a")
export class Component extends LitElement{
	static styles = [
		defaultStyles,
		css`
			.box {
				height: 100%;
				padding: 15px 10px;
				background: paleturquoise;
			}
			h1 {
				color: orange; 
				writing-mode: vertical-rl;
				text-orientation: upright;
			}
		`
	];

	@property({type: String}) word: string;
	
  private onClick(ev: MouseEvent) {
		console.log("cilcekd: ", ev.target, "the word", this.word);
	}

	render() {
		return html`
			<div class="box" @click=${this.onClick}>
				<h1>${this.word}</h1>
			</div>
		`;
	}

}
