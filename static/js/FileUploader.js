	function fileUploader(wrapper){
		this.wrapperElement = wrapper
	}
	fileUploader.prototype=(function(){
		var _defaults={
			maxFileSize: 2e+6
		};
		var returnObject;
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
		function validateFile(){
			var options = this.options,
			selectedFile = options.fileInput.files[0];
			if(selectedFile.size > options.maxFileSize){
				return false
			}
			return true
		}
		function generateWrapperHTML(){
			var wrapperElement = this.wrapperElement;
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
		function validateOptions(options){
			if(!options || !this.wrapperElement || !options.url){
				return false
			}
			return true;
		}
		
		returnObject = {
			init:function(options){
				if(validateOptions.call(this,options)){
					this.options = Object.assign({},_defaults,options);
					generateWrapperHTML.call(this);
					bindCallback.call(this);
				}
				else{
					this.options = null;
				}

			},
			constructor:fileUploader
		}
		/* remove-from-prod */
		returnObject.validateOptions =validateOptions;
		returnObject.validateFile =validateFile;
		/* end-remove-from-prod */
		return returnObject
	}())