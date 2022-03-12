import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { styleMap } from 'lit-html/directives/style-map';
import { defaultSettings, FractalSettings } from "../FractalSettings";


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
        width: 60px
      }
		`
	];

	@property({type: Object}) settings: FractalSettings;
	
  connectedCallback(): void {
    super.connectedCallback()
    this.settings = defaultSettings[1]
    this.emitSettingsChangedEvent()
  }

  emitSettingsChangedEvent(): void {
    this.dispatchEvent(new CustomEvent('changed', {
      detail: {settings: this.settings}
    }))
  }

  changeNoOfFracs(ev) {
    this.settings.noOfFracs = parseFloat(ev.target.value)

    this.emitSettingsChangedEvent()
  }

  changeNoOfChildren(ev) {
    this.settings.noOfChildren = ev.target.value
    this.emitSettingsChangedEvent()
  }

  changeRotation(ev) {
    this.settings.rotation = parseFloat(ev.target.value)
    this.emitSettingsChangedEvent()
  }

  changeSize(ev) {
    this.settings.size = ev.target.value
    this.emitSettingsChangedEvent()
  }

  changeForkPosition(ev) {
    this.settings.forkPosition = ev.target.value
    this.emitSettingsChangedEvent()
  }
  
  changeShrinking(ev) {
    this.settings.shrinking = ev.target.value
    this.emitSettingsChangedEvent()
  }

  changeSway(ev) {
    this.settings.sway = ev.target.value
    this.emitSettingsChangedEvent()
  }

  changeThinness(ev) {
    this.settings.thinness = ev.target.value
    this.emitSettingsChangedEvent()
  }



	render() {
		return html`
      <div class="container">



        <div class="control">
          no of fracs
          <input type="number" 
            @change=${this.changeNoOfFracs}
            .value=${this.settings.noOfFracs.toString()}
          >
        </div>

        <div class="control">
          no of childs
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
          fork pos
          <input type="number" 
            step=0.05
            @change=${this.changeForkPosition}
            .value=${this.settings.forkPosition.toString()}
          >
        </div>

        <div class="control">
          shrink
          <input type="number" 
            step=0.005
            @change=${this.changeShrinking}
            .value=${this.settings.shrinking.toString()}
          >
        </div>

        <div class="control">
          sway
          <input type="number" 
            step=1
            @change=${this.changeSway}
            .value=${this.settings.sway.toString()}
          >
        </div>

        <div class="control">
          thinness
          <input type="number" 
            @change=${this.changeThinness}
            .value=${this.settings.thinness.toString()}
          >
        </div>

      </div>
		`;
	}

}
