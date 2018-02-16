var item; var file; var itemId; var fileExtn; var waitDialog;var web;
 function checkIsEnabled() {
  var result = false;
  var selectedItems = SP.ListOperation.Selection.getSelectedItems();
  if (CountDictionary(selectedItems) == 1) {      
      if (this.itemId != selectedItems[0]['id']) {
          if (selectedItems[0].fsObjType != 0) { return false; }
          this.itemId = selectedItems[0]['id'];
          GetFileExtension(this.itemId);
      }
      else if ((typeof fileExtn != 'undefined') && (this.fileExtn != 'master')) {
          result = false;
      }
      else if (((typeof fileExtn != 'undefined') && (this.fileExtn == 'master')) && (this.itemId == selectedItems[0]['id'])) {
          result = true;
      }
  }
  else { return false; }
  return result;
}
function GetFileExtension(id) {
    var clientContext = SP.ClientContext.get_current();
    web = clientContext.get_web();
    var list = clientContext.get_web().get_lists().getById(SP.ListOperation.Selection.getSelectedList());
    this.item = list.getItemById(id);
    this.file = item.get_file();
    clientContext.load(web, 'EffectiveBasePermissions');
    clientContext.load(item);
    clientContext.load(file);
    clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed); 
}
function onQuerySucceeded() {
 if(!web.get_effectiveBasePermissions().has(SP.PermissionKind.manageWeb)){return false;}
 var fileName = file.get_name();
 var fileUrl = file.get_serverRelativeUrl(); 
 var fileNameParts = fileName.split('.');
 if (fileNameParts.length === 1 || (fileNameParts[0] === '' && fileNameParts.length === 2)) {
    alert('Issues in File Extension');
    return false;
 }
 else {
    fileExtn = fileNameParts.pop();
 }
 RefreshCommandUI();
}  
 function onQueryFailed(sender, args){
  alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function SetMaster() {
    var resp = confirm("Are you sure?");
    if (resp) {
        var listID = SP.ListOperation.Selection.getSelectedList().replace(/{/g, '').replace(/}/g, '');
        var itemID = SP.ListOperation.Selection.getSelectedItems()[0]['id'];
        var pageUrl = '../../../MasterPageSetterModule/MasterPageSetterAppPage.aspx?ListId=' + listID + '&ItemId=' + itemID;
        ShowWaitDialog();
        $.ajax({
            headers: { "Accept": "application/xml;odata=verbose" },
            contentType: 'application/xml',
            url: pageUrl,
            success: onSuccess,
            error: onError
        });
    }
}
function onSuccess(data) {
    var res; 
    waitDialog.close();
    if (parseFloat($.fn.jquery) >= 1.8) { res = $.parseHTML(data); } else {res = $(data);}
    if ($(res).find('.UserGeneric').length > 0) {
        var message = $(res).find('.UserGeneric')[0].innerText;
        if (message.indexOf('SPException') > 0) {
            var fullError = message.substring(0, message.indexOf('Show Error Details') - 1);
            var errArr = fullError.split(':');
            if (errArr.length == 3) {
                alert(errArr[2]);
            }
            else {
                alert(fullError);
            }
        }
    }
    else if ($(res).find('div[id*="masterPageSetterWP"]').length > 0) {
    alert($(res).find('div[id*="masterPageSetterWP"]').parent().text());
}
window.location.reload(false);
}
function onError(err) {
    alert('Request failed. ' + err.responseText);
}
function ShowWaitDialog() {
    waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose('Processing...', 'Please wait while request is in progress...', 76, 330);
}