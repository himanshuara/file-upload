	/**
	 * [fileUploader constructor]
	 * @param  {[DOMElement]} wrapper [DOM element on which file upload needs to be initialized]
	 * @return {[none]}  
	 * Author: Himanshu Saraswat       
	 */
	function fileUploader(wrapper){
		this.wrapperElement = wrapper
	}
	/*Using revealing prototype pattern to keep implementation details
	private*/
	fileUploader.prototype=(function(){
		/*Default parameters*/
		var _defaults={
			maxFileSize: 2e+6
		};
		var returnObject;

		/*Method to bind callbacks on the created elements*/
		function bindCallback(){
			var _this = this;
			_this.options.fileInput.onchange= function(){
					if(validateFile.call(_this)){
						displayPreview.call(_this);
					}
					else{
						alert("Problem uploading file");
						this.value = null;
					}
			}
			_this.options.submitButton.onclick = function(){
				uploadFile.call(_this);
			}
		}
		/*Method to send selected file to server using ajax*/
		function uploadFile(){
			var _this = this;
			var files = _this.options.fileInput.files,formData,xhr;
			if(!files.length){
				return
			}
		 	formData = new FormData();
		 	formData.append("file",files[0]);
		 	formData.append("extra_params",JSON.stringify(_this.options.extraParams))
		 	xhr = new XMLHttpRequest();
			xhr.open('POST', this.options.url, true);
			xhr.onreadystatechange = function () {
				  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				    alert(xhr.responseText);
				    _this.options.fileInput.value = null;
				    _this.options.imgPlaceholder.style.display = "none";
				    _this.options.imgPlaceholder.removeAttribute("src");
				  }
				};
			xhr.send(formData);

		}
		/*Method to display preview if the selected file is image*/
		function displayPreview(){
			var _this = this;
			var options = _this.options;
			var file = options.fileInput.files[0];
			var reader
			if(file.type.match("image/*")){
				reader = new FileReader();

		        reader.onload = function (e) {
		            options.imgPlaceholder.style.display = "block";
		            options.imgPlaceholder.setAttribute('src',e.target.result)
		        }

	        reader.readAsDataURL(file);
	    }
		}
		/*Method to validate selected file.*/
		function validateFile(file){
			var options = this.options,
			selectedFile = file || options.fileInput.files[0];
			if(selectedFile.size > options.maxFileSize){
				return false
			}
			return true
		}
		/*Method to create HTML elements for upload*/
		function generateWrapperHTML(){
			var wrapperElement = this.wrapperElement;
			wrapperElement.innerHTML = ""
			var submitButton = document.createElement("input");
			submitButton.type="button";
			submitButton.value = "submit";
			var fileInput = document.createElement("input");
			fileInput.type="file";
			var imgPlaceholder = document.createElement("img");
			imgPlaceholder.setAttribute("height","100");
			imgPlaceholder.setAttribute("width","100");
			imgPlaceholder.style.display = "none";
			wrapperElement.append(fileInput);
			wrapperElement.append(imgPlaceholder)
			wrapperElement.append(submitButton);
			this.options.fileInput = fileInput;
			this.options.submitButton = submitButton;
			this.options.imgPlaceholder = imgPlaceholder
		}
		/*Method to sanitize the options provided*/
		function validateOptions(options){
			if(!options || !this.wrapperElement || !options.url){
				return false
			}
			return true;
		}
		/*Method to initialize the object with the options*/
		function init(options){
				if(validateOptions.call(this,options)){
					this.options = Object.assign({},_defaults,options);
					generateWrapperHTML.call(this);
					bindCallback.call(this);
				}
				else{
					this.options = null;
					throw new Error("Insufficient options...")
				}

			}
		/*Exposing only the init method*/
		returnObject = {
			init:init,
			constructor:fileUploader
		}
		/*Used grunt-strip-code npm plugin to expose the private methods for unit testing 
		only in dev and not in production code*/

		/* remove-from-prod */
		returnObject.validateOptions =validateOptions;
		returnObject.validateFile =validateFile;
		/* end-remove-from-prod */
		return returnObject
	}())