import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { styleMap } from 'lit-html/directives/style-map';
import { FractalSettings } from "../Types";


/**
 * Just one configurable component for use and reuse
 */
@customElement("control-panel")
export class Controls extends LitElement{
	static styles = [
		defaultStyles,
		css`
      .container {
        display: flex;
        flex-direction: column;
        gap: 3px;
        background: antiquewhite;
        padding: 5px;
        border-radius: 8px;
        border: 2px solid tan;
      }
      .control {
        display: flex;
        justify-content: space-between;
      }
      input {
        margin-left: 5px;
        width: 40px
      }
		`
	];

	@property({type: Object}) settings: FractalSettings;
	
  changeNoOfChildren(ev) {
    this.settings.noOfChildren = ev.target.value
    this.dispatchEvent(new CustomEvent('changed', {
      detail: {settings: this.settings}
    }))
  }

  changeRotation(ev) {
    this.settings.rotation = ev.target.value
    this.dispatchEvent(new CustomEvent('changed', {
      detail: {settings: this.settings}
    }))
  }

  changeSize(ev) {
    this.settings.size = ev.target.value
    this.dispatchEvent(new CustomEvent('changed', {
      detail: {settings: this.settings}
    }))
  }

  changeRatio(ev) {
    this.settings.ratio = ev.target.value
    this.dispatchEvent(new CustomEvent('changed', {
      detail: {settings: this.settings}
    }))
  }

  changeNoOfFracs(ev) {
    this.settings.noOfFracs = ev.target.value
    this.dispatchEvent(new CustomEvent('changed', {
      detail: {settings: this.settings}
    }))
  }


	render() {
		return html`
      <div class="container">
        <div class="control">
          no of child
          <input type="number" 
            @change=${this.changeNoOfChildren}
            .value=${this.settings.noOfChildren.toString()}
          >
        </div>
        <div class="control">
          rotation
          <input type="number" 
            @change=${this.changeRotation}
            .value=${this.settings.rotation.toString()}
          >
        </div>
        <div class="control">
          size
          <input type="number" 
            @change=${this.changeSize}
            .value=${this.settings.size.toString()}
          >
        </div>
        <div class="control">
          ratio
          <input type="number" 
            step=0.005
            @change=${this.changeRatio}
            .value=${this.settings.ratio.toString()}
          >
        </div>
        <div class="control">
          no of fracs
          <input type="number" 
            @change=${this.changeNoOfFracs}
            .value=${this.settings.noOfFracs.toString()}
          >
        </div>
      </div>
		`;
	}

}
