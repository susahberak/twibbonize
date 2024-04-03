class Generator {
	
static defaults = {
width: 1024,
height: 1024,
backgroundColor: '#e7e7e7',
offset: {
top: 0,
left: 0
},
scale: 1
};
	
constructor(options) {
// create canvas
this.renderCanvas = document.createElement('canvas');
this.renderCanvas.width = options.width ? options.width : Generator.defaults.width;
this.renderCanvas.height = options.height ? options.height : Generator.defaults.height;
		
this.renderContext = this.renderCanvas.getContext('2d');
		
// fill canvas with background color
this.renderContext.beginPath();
this.renderContext.rect(0, 0, this.renderCanvas.width, this.renderCanvas.height);
this.renderContext.fillStyle = options.backgroundColor ? options.backgroundColor : Generator.defaults.backgroundColor;
this.renderContext.fill();
}
	
addLayer(image, options) {
let x = options.offset && options.offset.left ? options.offset.left : Generator.defaults.offset.left;
let y = options.offset && options.offset.top ? options.offset.top : Generator.defaults.offset.top;
		
let scale = options.scale ? options.scale : Generator.defaults.scale;
		
this.renderContext.drawImage(image, x, y, image.width * scale, image.height * scale);
}
	
render() {
return this.renderCanvas.toDataURL();
}
}
