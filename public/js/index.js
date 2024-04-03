let config;

addEventListener('load', function() {  
const request = new Request('config/config.json');
  
fetch(request)
.then(response => {
if(response.status == 200) {
return response.json();
} else {
throw new Error("Could not fetch config from server!");
}
}).then(json => {
config = json;
generateElements();
}).catch(error => {
console.log(error);
});
});

function generateElements() {
// Create DOM structure
var mainElement = document.getElementById(config.rootElementId);
mainElement.innerHTML = "";
	
let statusElement = document.createElement('p');
statusElement.textContent = config.messages.status.startup;
mainElement.appendChild(statusElement);

let fileUploadElement = document.createElement('input');
fileUploadElement.classList.add("custom-file-input");
fileUploadElement.type = 'file';
fileUploadElement.accept = "image/*";
mainElement.appendChild(fileUploadElement);
	
let overlayImageElement = new Image();
overlayImageElement.src = config.overlaySource;
overlayImageElement.style.display = 'none';
mainElement.appendChild(overlayImageElement);
	
let logoImageElements = [];
	
config.logoSources.forEach(logo => {
let element = new Image();
element.src = logo;
element.style.display = 'none';
mainElement.appendChild(element);
logoImageElements.push(element);
});
	
fileUploadElement.addEventListener('change', function() {
if(this.files && this.files[0]) {
statusElement.textContent = config.messages.uploading;
			
let uploadedImage = document.createElement('img');
uploadedImage.setAttribute("width", "200");
uploadedImage.setAttribute("height", "200");
uploadedImage.src = URL.createObjectURL(this.files[0]);
			
uploadedImage.addEventListener('load', function() {
statusElement.textContent = config.messages.status.processing;
// create generator
setupOptions = {
width: overlayImageElement.width,
height: overlayImageElement.height
}
const generator = new Generator(setupOptions);
				
// calculate scaling of profile image
scale_width = setupOptions.width / uploadedImage.width;
scale_height = setupOptions.height / uploadedImage.height;
      	
scale = Math.min(scale_width, scale_height);
    
renderOptions = {
offset: {
top: (setupOptions.height - (uploadedImage.height * scale)) / 1,
left: (setupOptions.width - (uploadedImage.width * scale)) / 1
},
scale: scale
};
generator.addLayer(uploadedImage, renderOptions);
generator.addLayer(overlayImageElement, {});
				
// add logos
let nextX = 70;
logoImageElements.forEach(logo => {
renderOptions = {
offset: {
top: setupOptions.height - 100,
left: nextX
},
scale: 0.1
};
generator.addLayer(logo, renderOptions);
nextX += (logo.width * renderOptions.scale) + 10
})
				
// set image url to blob
let downloadImageElement = document.createElement('img');
downloadImageElement.src = generator.render();
mainElement.appendChild(downloadImageElement);

statusElement.textContent = config.messages.status.done;

// create downloadlink
let downloadButtonElement = document.createElement('a');
downloadButtonElement.classList.add("btn");
downloadButtonElement.innerText = config.messages.buttons.download;
downloadButtonElement.href = generator.render();
downloadButtonElement.download = config.profilePictureName;
mainElement.appendChild(downloadButtonElement);
        
// create recreate button and remove filechooser
mainElement.removeChild(fileUploadElement);

let renewFormElement = document.createElement('button');
renewFormElement.classList.add("red");
renewFormElement.innerText = config.messages.buttons.newImage;
renewFormElement.addEventListener('click', function(){
generateElements();
});
mainElement.appendChild(renewFormElement);
});
}
});
}
