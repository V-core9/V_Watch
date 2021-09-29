
const mainSVG_Template = ( widthSVG = 1280 , heightSVG = 720) => {

  this.configSVG = {
    "svgName": "customSVGdemoName",
    "mainColor": "#101525",
    "backgroundColor": "#ff0000",
    "containerBackground": '#555555'
    
  };

  this.helperWidth = widthSVG;
  this.helperHeight = heightSVG;

  this.getTemplate = () => {
    this.randomColors();
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.helperWidth} ${this.helperHeight}"  height="${this.helperHeight}" width="${this.helperWidth}" class="${this.configSVG.svgName}">
<path d="M 0 0 l ${this.helperWidth} 0 0 60 -20 20 0 ${(this.helperHeight - 180)}  20 20 0 60 -20 20 -160 0 -20 -20${-(this.helperWidth - 400)}  0 -20 20 -160 0 -20 -20 0 -60 20 -20 0 ${-(this.helperHeight - 280)}  -20 -20" stroke="none" stroke-width="3" fill="${this.configSVG.containerBackground}" ></path>
<path d="M 0 0 l ${(this.helperWidth - 330)}  0 -20 60 ${-(this.helperWidth - 350)}  0" stroke="none" stroke-width="3" fill="${this.configSVG.backgroundColor}" ></path>
<path d="M ${(this.helperWidth - 320)}  0 l 20 0 -20 60 -20 0" stroke="none" stroke-width="3" fill="${this.configSVG.backgroundColor}" ></path>
<path d="M ${(this.helperWidth - 290)}  0 l 50 0 -15 45 -50 0" stroke="none" stroke-width="3" fill="${this.configSVG.backgroundColor}" ></path>
<path d="M ${(this.helperWidth - 230)}  0 l 230 0 0 30 -240 0" stroke="none" stroke-width="3" fill="${this.configSVG.backgroundColor}" ></path>
<path class="closeButton background" onmouseleave="closeLeave()" onmouseover="closeHover()" d="M ${(this.helperWidth - 30)}  0 l 30 0 0 30 -40 0 10 -30" stroke="none" stroke-width="3" fill="#3a0000" ></path>
<path class="closeButton icon" onmouseleave="closeLeave()" onmouseover="closeHover()" d="M ${(this.helperWidth - 22)}  7 l 2 0 5 5 5 -5 2 0 0 2 -5 5 5 5 0 2 -2 0 -5 -5 -5 5 -2 0 0 -2 5 -5 -5 -5" stroke="none" stroke-width="3" fill="gray" ></path>
<path class="minButton background"  onmouseleave="minLeave()" onmouseover="minHover()" d="M ${(this.helperWidth - 70)}  0 l 40 0 -10 30 -40 0 10 -30" stroke="none" stroke-width="3" fill="#333333" ></path>
<path class="minButton icon"  onmouseleave="minLeave()" onmouseover="minHover()" d="M ${(this.helperWidth - 62)}  20 l 15 0 0 2 -15 0" stroke="none" stroke-width="3" fill="gray" ></path>
<path d="M 10 ${(this.helperHeight - 30)}  l  20 20 140 0 20 -20 -10 0 -15 15 -130 0 -15 -15" stroke="none" stroke-width="3" fill="${this.configSVG.backgroundColor}" ></path>
<path d="M ${(this.helperWidth - 190)}  ${(this.helperHeight - 30)}  l  20 20 140 0 20 -20 -10 0 -15 15 -130 0 -15 -15" stroke="none" stroke-width="3" fill="${this.configSVG.backgroundColor}" ></path>
<g font-size="30" font-family="Saira Stencil One" fill="white" stroke="none" text-anchor="middle">
<text x="200" y="40" letter-spacing="1">DemoHeading Container</text>
</g>
</svg>`;
    
  };

  this.randomColors = () => {
    try {
      this.configSVG.mainColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      this.configSVG.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      this.configSVG.containerBackground = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      return true;
    } catch (error) {
      return error;
    }
  };

  return this.getTemplate();
};

//console.log(mainSVG_Template);
//console.log(mainSVG_Template());

module.exports = mainSVG_Template;
