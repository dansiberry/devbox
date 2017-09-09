// $('#add-section').click(addSectionInput);
// $('#delete-section').click(deleteSection);
  let sectionCount = 0
  let resourceCount = 1

  window.sectionHtml = function sectionHtml(){
   let thisSection = sectionCount;
   return `
     <div class="form-group section" id="${sectionCount}">
       <input class="form-control" placeholder="Section 1" id="title"  type="text" name="sections[${sectionCount}][sectionTitle]">
       <input class="form-control" id="content" value="null" type="text" name="sections[${sectionCount}][sectionContent]">
       <button type="button" onClick='window.deleteSection(this)' id="delete-section" class="btn btn-primary"><i class="fa fa-trash-o" aria-hidden="true"></i> </button>
       <button type="button" onClick='window.resourceAdd(this)' id="resource-add" class="btn btn-primary">Add Link </button>
     </div>
    `;
  }

  window.resourceHtml = function resourceHtml(parentSection){
   return `
     <div class="form-group resource">
      <input class="form-control" id="resource-title" type="text" placeholder="title of link" name="[resources][sec-${parentSection}][no-${resourceCount}][resourceTitle]">
      <input class="form-control" id="resource-link" placeholder="link" type="text" name="[resources][sec-${parentSection}][no-${resourceCount}][resourceLink]">

       <input type="checkbox" class="form-control" id="type" name="resourceType" value="Video">
       <input type="checkbox" class="form-control" id="type" name="resourceType" value="Text">
       <input type="checkbox" class="form-control" id="type" name="resourceType" value="Audio">
       <input type="checkbox" class="form-control" id="type" name="resourceType" value="Multi">
       <button type="button" onClick='window.deleteResource(this)' id="delete-resource" class="btn btn-primary"><i class="fa fa-trash-o" aria-hidden="true"></i> </button>
     </div>
    `;
  }

  window.addSection = function addSection(){
   $(sectionHtml()).insertBefore( "#form-end" );
   sectionCount++;
  }

  window.deleteSection = function deleteSection(btn){
   $(btn).parent().addClass('shrink-hide');
   setTimeout(function() {$(btn).parent().remove()}, 4950);
   sectionCount--;
  }

  window.resourceAdd = function resourceAdd(btn){
   $(resourceHtml($(btn).parent().attr('id'))).insertBefore($(btn));
   document.getElementById("main-form").classList.add("active");
   resourceCount++;
  }

 window.deleteResource = function deleteResource(btn){
   $(btn).parent().addClass('shrink-hide');
   setTimeout(function() {$(btn).parent().remove()}, 950);
   // $(btn).parent().remove();
  }

  window.formActivate = function formActivate() {
    document.getElementsByClassName("homepage-wrapper")[0].classList.add("active");
  }
