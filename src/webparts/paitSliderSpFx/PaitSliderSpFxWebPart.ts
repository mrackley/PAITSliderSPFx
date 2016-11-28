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

      
.unslider{overflow:auto;margin:0;padding:0}.unslider-wrap{position:relative}.unslider-wrap.unslider-carousel>li{float:left}.unslider-vertical>ul{height:100%}.unslider-vertical li{float:none;width:100%}.unslider-fade{position:relative}.unslider-fade .unslider-wrap li{position:absolute;left:0;top:0;right:0;z-index:8}.unslider-fade .unslider-wrap li.unslider-active{z-index:10}.unslider li,.unslider ol,.unslider ul{list-style:none;margin:0;padding:0;border:none}.unslider-arrow{position:absolute;left:20px;z-index:2;cursor:pointer}.unslider-arrow.next{left:auto;right:20px}

.unslider-nav ol {
  list-style: none;
  text-align: center;
}
.unslider-nav ol li {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 4px;
  background: transparent;
  border-radius: 5px;
  overflow: hidden;
  text-indent: -999em;
  border: 2px solid #fff;
  cursor: pointer;
}
.unslider-nav ol li.unslider-active {
  background: #fff;
  cursor: default;
}


    .PAITSlide
  {
    height: 200px;
    width: 500px;
      margin: auto;
      border: 2px solid #000000;
  }

  .unslider-nav ol li {
    border: 2px solid #000;
  }
  .unslider-nav ol li.unslider-active {
    background: #000;
  }

  .next, .prev {
    font-size: 24px;
    color: #3d3d3d;
    top: 50%;
    width: 25px;
    height: 25px;
    line-height: 20px;
    text-align: center;
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid #000;
    cursor: pointer;
  }
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
