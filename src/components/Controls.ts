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
      .container[hidden] {
        display: none;
      }

      .control {
        display: flex;
        justify-content: space-between;
      }
      input {
        margin-left: 5px;
        width: 60px
      }

      hr {
        margin: 3px 9px 2px;
      }
      .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 2px;
      }
      button {
        min-width: 24px;
        cursor: pointer;
      }
      .show-button {
        padding: 7px;
      } 
		`
	];

	@property({type: Object}) settings: FractalSettings;

  @internalProperty() seletedDefault?: number = 0;
  @internalProperty() seletedCustom?: number;
  @internalProperty() newSettings: boolean = false;
  
  @internalProperty() customSettings: FractalSettings[] = [];
  
  @internalProperty() hidden: boolean = false;


  connectedCallback(): void {
    super.connectedCallback()
    this.settings = defaultSettings[this.seletedDefault]
    this.emitSettingsChangedEvent()
  }

  emitSettingsChangedEvent(newSettings?: FractalSettings): void {
    const settings = newSettings ? newSettings : this.settings
    this.dispatchEvent(new CustomEvent('changed', {
      detail: {settings: this.settings}
    }))
  }


  changeProperty(ev) {
    const id = ev.target.getAttribute('id')
    this.settings[id] = ev.target.value
    this.emitSettingsChangedEvent()

    this.newSettings = true;
    this.seletedCustom = undefined;
    this.seletedDefault = undefined;
  }

  changeRotation(ev) {
    this.settings.rotation = parseFloat(ev.target.value)
    this.emitSettingsChangedEvent()
  }


  pickNewSettings(ev) {
    const newSettingsValue = ev.target.value as string
    
    if (newSettingsValue.includes("default-")) {
      const idx = parseInt(newSettingsValue.replace("default-", ""))
      this.settings = defaultSettings[idx]
      this.emitSettingsChangedEvent()

      this.newSettings = false;
      this.seletedCustom = undefined;
      this.seletedDefault = idx;
    }
    
    if (newSettingsValue.includes("custom-")) {
      const idx = parseInt(newSettingsValue.replace("custom-", ""))
      
      this.settings = this.customSettings[idx]
      this.emitSettingsChangedEvent()

      this.newSettings = false;
      this.seletedDefault = undefined;
      this.seletedCustom = idx;
    }
    
  }

  save() {
    this.customSettings.push({...this.settings})
    this.customSettings = [...this.customSettings]

    this.newSettings = false;
    this.seletedCustom = this.customSettings.length - 1;
    
  }

  delete() {
    if (this.seletedCustom == undefined) {
      return;
    }

    this.customSettings.splice(this.seletedCustom, 1);
    this.customSettings = [...this.customSettings];

    this.newSettings = true;
    this.seletedCustom = undefined;
    this.seletedDefault = undefined;
  }

  toggleHide() {
    this.hidden = !this.hidden
  }


	render() {
    const newOption = this.newSettings ? 
      html`<option value="new" selected>New Custom</option>`
      : undefined;

    const defaultOptions = Array.from(
      {length: defaultSettings.length},
      (_, idx) => html`
        <option
          value="default-${idx}"
          ?selected=${this.seletedDefault == idx}
          >Default ${idx+1}
        </option>
      `);

    const customOptions = Array.from(
      {length: this.customSettings.length},
      (_, idx) => html`
        <option
          value="custom-${idx}"
          ?selected=${this.seletedCustom == idx}
          >Custom ${idx+1}
        </option>
      `);
      
		return html`
      <div ?hidden=${this.hidden} class="container">

        <div class="control">
          no of fracs
          <input type="number" 
            id="noOfFracs"
            @change=${this.changeProperty}
            .value=${this.settings.noOfFracs.toString()}>
        </div>
        <div class="control">
          no of childs
          <input type="number" 
            id="noOfChildren"
            @change=${this.changeProperty}
            .value=${this.settings.noOfChildren.toString()}>
        </div>
        <div class="control">
          rotation
          <input type="number"
            @change=${this.changeRotation}
            .value=${this.settings.rotation.toString()}>
        </div>
        <div class="control">
          size
          <input type="number" 
            id="size"
            @change=${this.changeProperty}
            .value=${this.settings.size.toString()}>
        </div>
        <div class="control">
          fork pos
          <input type="number" 
            step=0.05
            id="forkPosition"
            @change=${this.changeProperty}
            .value=${this.settings.forkPosition.toString()}>
        </div>
        <div class="control">
          shrink
          <input type="number" 
            step=0.005
            id="shrinking"
            @change=${this.changeProperty}
            .value=${this.settings.shrinking.toString()}>
        </div>
        <div class="control">
          sway
          <input type="number" 
            id="sway"
            @change=${this.changeProperty}
            .value=${this.settings.sway.toString()}>
        </div>
        <div class="control">
          thinness
          <input type="number" 
            id="thinness"
            @change=${this.changeProperty}
            .value=${this.settings.thinness.toString()}>
        </div>

        <hr>

        <select @change=${this.pickNewSettings}>
          ${newOption}
          ${defaultOptions}
          ${customOptions}
        </select>

        <div class="buttons">
          <button @click=${this.toggleHide}>hide</button>
          <button ?hidden=${!this.newSettings} @click=${this.save}>save</button>
          <button ?hidden=${this.seletedCustom == undefined} @click=${this.delete}>delete</button>
        </div>
      </div>
      <div ?hidden=${!this.hidden} class="show-button">
        <button @click=${this.toggleHide}>show</button>
      </div>
		`;
	}
}
