import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';

declare var jQuery;

import styles from './PaitSliderSpFx.module.scss';

import * as strings from 'paitSliderSpFxStrings';
import { IPaitSliderSpFxWebPartProps } from './IPaitSliderSpFxWebPartProps';
import 'jquery';  
import ModuleLoader from '@microsoft/sp-module-loader';

export default class PaitSliderSpFxWebPart extends BaseClientSideWebPart<IPaitSliderSpFxWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {      
      require('./unslider-min');
      require('./PAITSlider');

      this.domElement.innerHTML = `
      <style type="text/css">
      `
      +
      this.properties.CustomCSS
      +
      `
      </style>
      <div class="${styles.paitSliderSpFx}">
        <div class="PAITSlider"><ul id="PAITSlides"></ul></div>
      </div>`;

      jQuery().PAITSlider({
        listName:  this.properties.ListName, //name of Promoted Links list to use for slides
		    viewTitle: this.properties.ViewName, //name of the view to use
        prev: this.properties.Previous, //HTML for the previous arrow
        next: this.properties.Next, //HTML for the next arrow
		autoplay: true, 
		infinite: true,
		animation: 'horizontal',
		arrows: this.properties.Arrows,
		dots: true,
		keys: true,
		delay: 3000		
		
    });

  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneTextField('ViewName', {
                  label: strings.ViewNameFieldLabel
                }),
                PropertyPaneTextField('Next', {
                  label: strings.NextFieldLabel
                }),
                PropertyPaneTextField('Previous', {
                  label: strings.PreviousFieldLabel
                }),
                PropertyPaneCheckbox('Arrows',{
                  text: strings.ArrowsFieldLabel, 
                  isChecked: true
                }),
                PropertyPaneTextField('CustomCSS', {
                  label: strings.CustomCSSFieldLabel, 
                  multiline: true
                }),                
              ]
            }
          ]
        }
      ]
    };
  }

   protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
}
