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

  // We can have more its here
});