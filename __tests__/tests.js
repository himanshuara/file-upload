var expect = chai.expect;

describe('fileUploader function', function() {
  var uploadInst = new fileUploader(document.getElementById("file-upload"));
  it('wrapper should be a div element', function() {
     expect(uploadInst.wrapperElement.constructor).to.equal(HTMLDivElement);
  });
  it('should not initialize withour url', function() {
     uploadInst.init();
     expect(uploadInst.options).to.equal(undefined);
  });

  // We can have more its here
});