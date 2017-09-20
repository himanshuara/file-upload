var expect = chai.expect;

describe('fileUploader function', function() {
  var uploadInst = new fileUploader(document.getElementById("file-upload"));
  it('wrapper should be a div element', function() {
     expect(uploadInst.wrapperElement.constructor).to.equal(HTMLDivElement);
  });
  it('validateOptions should return true when url provided', function() {
     var options={
		url:"/api/Upload/",
		extraParams:{
			userId:"hsaraswat"
		}
	}
     
     expect(uploadInst.validateOptions(options)).to.be.true;
  });
  it('validateOptions should return false when url not provided', function() {
     var options={
		extraParams:{
			userId:"hsaraswat"
		}
	}
     expect(uploadInst.validateOptions(options)).to.be.false;
  });
  it('wrapper component should contain 3 children', function() {
     var options={
		url:"/api/Upload/",
		extraParams:{
			userId:"hsaraswat"
		}
	}
	uploadInst.init(options)
     expect(uploadInst.wrapperElement.childElementCount).to.be.equal(3);
  });
  it('File size greater than 3MB should be rejected', function() {
     var options={
		url:"/api/Upload/",
		maxFileSize:3e+6,
		extraParams:{
			userId:"hsaraswat"
		}
	}
	var byteArray = new Uint8Array(5000000);
	var blob = new Blob([byteArray]);
	uploadInst.init(options)
     expect(uploadInst.validateFile.call(uploadInst,blob)).to.be.false;
  });


  // We can have more its here
});