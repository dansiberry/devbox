console.log('hello');

// $('#add-section').click(addSectionInput);
// $('#delete-section').click(deleteSection);

let sectionCount = 0
let resourceCount = 1

function sectionHtml(){
 let thisSection = sectionCount;
 return `
   <div class="form-group section" id="${sectionCount}">
     <label for="sectionTitle">
       Title of section
     </label>
     <input class="form-control" id="content" type="text" name="sections[${sectionCount}][sectionTitle]">
     <label for="sectionContent">
       Section content
     </label>
     <input class="form-control" id="content" type="text" name="sections[${sectionCount}][sectionContent]">
     <button type="button" onClick='deleteSection(this)' id="delete-section" class="btn btn-primary">Delete </button>
     <button type="button" onClick='resourceAdd(this)' id="resource-add" class="btn btn-primary">Add resourse </button>
   </div>
  `;
}

function resourceHtml(parentSection){
 console.log(parentSection);
 return `
   <div class="form-group resource">
     <label for="resourceTitle">
       Title of resource
     </label>
    <input class="form-control" id="resource-title" type="text" name="[resources][sec-${parentSection}][no-${resourceCount}][resourceTitle]">
     <label for="resourceLink">
       Resource link
     </label>
     <input class="form-control" id="resource-title" type="text" name="[resources][sec-${parentSection}][no-${resourceCount}][resourceLink]">
     <label for="resourceType">
       Resource type
     </label>

     <input type="checkbox" class="form-control" id="type" name="resourceType" value="Video"> video
     <input type="checkbox" class="form-control" id="type" name="resourceType" value="Text"> Text
     <input type="checkbox" class="form-control" id="type" name="resourceType" value="Audio">Audio
     <input type="checkbox" class="form-control" id="type" name="resourceType" value="Multi"> Multi </br>
     <button type="button" onClick='deleteResource(this)' id="delete-resource" class="btn btn-primary">Delete </button>
   </div>
  `;
}

function addSection(){
 $(sectionHtml()).insertBefore( "#form-end" );
 sectionCount++;
}

function deleteSection(btn){
 $(btn).parent().remove();
 sectionCount--;
}

function resourceAdd(btn){
 $(resourceHtml($(btn).parent().attr('id'))).insertBefore($(btn));
 resourceCount++;
}

function deleteResource(btn){
 $(btn).parent().remove();
}

