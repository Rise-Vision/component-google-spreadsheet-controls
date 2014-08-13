(function (window){
  "use strict";
  window.gapi = {
    load: function (name, options) {
      if (options.callback) {
        options.callback();
      }
    },
    auth: {
      authorize: function (options, callback) {

        if(callback) {
          window.google = {
            picker: {
              "Action":{
                 "Su":"cancel",
                 "zw":"picked",
                 "sx":"uploadProgress",
                 "tx":"uploadScheduled",
                 "vx":"uploadStateChange",
                 "LOADED":"loaded",
                 "MO":"viewChanged",
                 "NO":"viewUpdated",
                 "DR":"viewContentRendered",
                 "Ew":"received",
                 "CANCEL":"cancel",
                 "PICKED":"picked"
              },
              "Audience":{
                 "sw":"ownerOnly",
                 "Sv":"limited",
                 "Iu":"allPersonalCircles",
                 "vv":"extendedCircles",
                 "jv":"domainPublic",
                 "Cw":"public",
                 "PUBLIC":"public",
                 "DOMAIN_PUBLIC":"domainPublic",
                 "EXTENDED_CIRCLES":"extendedCircles",
                 "ALL_PERSONAL_CIRCLES":"allPersonalCircles",
                 "LIMITED":"limited",
                 "OWNER_ONLY":"ownerOnly"
              },
              "Document":{
                 "Mu":"audience",
                 "Tu":"children",
                 "MH":"contentId",
                 "JM":"coverPhotoId",
                 "cv":"crop",
                 "ev":"description",
                 "UR":"downloadUrl",
                 "ov":"driveSuccess",
                 "mv":"driveError",
                 "pv":"email",
                 "qv":"embedUrl",
                 "Iv":"iconUrl",
                 "Vj":"id",
                 "Kv":"isNew",
                 "Jv":"isLocalProfilePhoto",
                 "Mv":"kansasVersionInfo",
                 "Qv":"lastEditedUtc",
                 "Rv":"latitude",
                 "Xv":"longitude",
                 "CN":"markedForRemoval",
                 "EH":"mediaKey",
                 "cw":"mimeType",
                 "gw":"name",
                 "mw":"numChildren",
                 "nw":"numTagged",
                 "ow":"numUntagged",
                 "uw":"parentId",
                 "sq":"people",
                 "Iw":"rotation",
                 "Mw":"serviceId",
                 "SQ":"sizeBytes",
                 "mx":"thumbnails",
                 "ox":"type",
                 "rx":"uploadId",
                 "KO":"uploadMetadata",
                 "ux":"uploadState",
                 "URL":"url",
                 "VERSION":"version",
                 "wQ":"visibility",
                 "ADDRESS_LINES":"addressLines",
                 "AUDIENCE":"audience",
                 "DESCRIPTION":"description",
                 "DURATION":"duration",
                 "EMBEDDABLE_URL":"embedUrl",
                 "ICON_URL":"iconUrl",
                 "ID":"id",
                 "IS_NEW":"isNew",
                 "LAST_EDITED_UTC":"lastEditedUtc",
                 "LATITUDE":"latitude",
                 "LONGITUDE":"longitude",
                 "MIME_TYPE":"mimeType",
                 "NAME":"name",
                 "NUM_CHILDREN":"numChildren",
                 "PARENT_ID":"parentId",
                 "PHONE_NUMBERS":"phoneNumbers",
                 "SERVICE_ID":"serviceId",
                 "THUMBNAILS":"thumbnails",
                 "TYPE":"type"
              },
              "DocsViewMode":{
                 "Fv":"grid",
                 "Tv":"list",
                 "GRID":"grid",
                 "LIST":"list"
              },
              "Feature":{
                 "TM":"driveGridViewSwitcherHidden",
                 "VM":"driveSortHidden",
                 "ZM":"showAttach",
                 "TF":"enableSizeEstimation",
                 "rv":"esUsersOnly",
                 "xv":"faceRecoPromo",
                 "Cv":"formsEnabled",
                 "Hv":"horizNav",
                 "dw":"mineOnly",
                 "HN":"minimal",
                 "oJ":"minew",
                 "ew":"multiselectEnabled",
                 "hw":"navHidden",
                 "CJ":"newDriveView",
                 "iw":"newHorizNav",
                 "jw":"newPhotoGridView",
                 "kw":"npuv",
                 "VR":"odv",
                 "UN":"pcpfe",
                 "Bw":"profilePhoto",
                 "Lw":"swue",
                 "Nw":"shadeDialog",
                 "Ow":"shapeSuggestions",
                 "Pw":"showroomNav",
                 "Qw":"simpleUploadEnabled",
                 "wx":"urlInputVisible",
                 "Ex":"white",
                 "MULTISELECT_ENABLED":"multiselectEnabled",
                 "NAV_HIDDEN":"navHidden",
                 "MINE_ONLY":"mineOnly",
                 "SIMPLE_UPLOAD_ENABLED":"simpleUploadEnabled"
              },
              "ResourceId":{

              },
              "Response":{
                 "Fu":"action",
                 "cN":"extraUserInputs",
                 "iv":"docs",
                 "tw":"parents",
                 "Oo":"view",
                 "Cx":"viewToken",
                 "ACTION":"action",
                 "DOCUMENTS":"docs",
                 "PARENTS":"parents",
                 "VIEW":"viewToken"
              },
              "ServiceId":{
                 "Qu":"books",
                 "Ap":"calendar",
                 "Zu":"contacts",
                 "hN":"gready",
                 "KM":"cportal",
                 "tO":"cultural",
                 "hv":"docs",
                 "kv":"photo",
                 "RM":"dragonflyphotos",
                 "SM":"drive",
                 "UM":"drive-select",
                 "Av":"fonts",
                 "uv":"et",
                 "Dv":"geodiscussion",
                 "Wv":"localphotos",
                 "Zv":"maps",
                 "AN":"mapshop",
                 "$v":"mapspro",
                 "bw":"media",
                 "rw":"orkut",
                 "MR":"party",
                 "yw":"picasa",
                 "XN":"places",
                 "iO":"relatedcontent",
                 "Mj":"stories",
                 "Fx":"youtube",
                 "sq":"people",
                 "Jw":"search-api",
                 "URL":"url",
                 "Fw":"recent",
                 "$u":"cosmo",
                 "gv":"DoclistBlob",
                 "Bp":"doc",
                 "lv":"drawing",
                 "Bv":"form",
                 "Ov":"kix",
                 "Aw":"pres",
                 "Dw":"punch",
                 "jx":"spread",
                 "DOCS":"docs",
                 "MAPS":"maps",
                 "PHOTOS":"picasa",
                 "SEARCH_API":"search-api",
                 "YOUTUBE":"youtube"
              },
              "Thumbnail":{
                 "Tj":"height",
                 "URL":"url",
                 "$j":"width",
                 "HEIGHT":"height",
                 "WIDTH":"width"
              },
              "Type":{
                 "Hu":"album",
                 "Ku":"attachment",
                 "Pu":"book",
                 "Ap":"calendar",
                 "CIRCLE":"circle",
                 "Yu":"contact",
                 "Vu":"collection",
                 "Bp":"document",
                 "sv":"event",
                 "tv":"et",
                 "wv":"faces",
                 "zv":"font",
                 "eo":"location",
                 "Yv":"map",
                 "ww":"person",
                 "xw":"photo",
                 "URL":"url",
                 "zx":"video",
                 "ALBUM":"album",
                 "DOCUMENT":"document",
                 "LOCATION":"location",
                 "PHOTO":"photo",
                 "VIDEO":"video"
              },
              "ViewId":{
                 "DOCS":"all",
                 "DOCS_IMAGES":"docs-images",
                 "DOCS_IMAGES_AND_VIDEOS":"docs-images-and-videos",
                 "DOCS_VIDEOS":"docs-videos",
                 "DOCUMENTS":"documents",
                 "DRAWINGS":"drawings",
                 "FOLDERS":"folders",
                 "FORMS":"forms",
                 "IMAGE_SEARCH":"image-search",
                 "MAPS":"maps",
                 "PDFS":"pdfs",
                 "PHOTO_ALBUMS":"photo-albums",
                 "PHOTOS":"photos",
                 "PHOTO_UPLOAD":"photo-upload",
                 "PRESENTATIONS":"presentations",
                 "RECENTLY_PICKED":"recently-picked",
                 "SPREADSHEETS":"spreadsheets",
                 "VIDEO_SEARCH":"video-search",
                 "WEBCAM":"webcam",
                 "YOUTUBE":"youtube"
              },
              "ViewToken":{
                 "Ax":0,
                 "Pv":1,
                 "Bx":2,
                 "LABEL":1,
                 "VIEW_ID":0,
                 "VIEW_OPTIONS":2
              },
              "WebCamViewType":{
                 "STANDARD":"standard",
                 "VIDEO":"video"
              },
              PickerBuilder: function () {
                var ret = {
                  setOrigin: function (){return ret; },
                  addView: function () {return ret; },
                  setOAuthToken: function () {return ret; },
                  setCallback: function (fn) {
                    window._pickerCallbackFn = fn;
                    return ret;
                  },
                  setVisible: function() {return ret; },
                  build: function () {
                    return ret;
                  }
                };
                return ret;
              }
            }
          };
          callback.call(null,{
            "state":"",
            "access_token":"ya29.QwBr4qWgS3xxiBwAAAB2vKbNdBEDga_lW-AVSOsmGaLZnu38B1UcRCzmLQplsw",
            "token_type":"Bearer",
            "expires_in":"3600",
            "scope":"https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
            "client_id":"614513768474.apps.googleusercontent.com",
            "response_type":"token",
            "issued_at":"1405420625","expires_at":"1405424225","_aa":"1","status":{"google_logged_in":false,"signed_in":true,"method":"AUTO"}
          });
        }
      }
    }
  };
  window.pickFiles = function (files) {
    var req = {};
    req[window.google.picker.Response.ACTION] = window.google.picker.Action.PICKED;
    req[window.google.picker.Response.DOCUMENTS] = files;
    window._pickerCallbackFn.call(null, req);
  };
  window.dialogCancel = function () {
    var req = {};
    req[window.google.picker.Response.ACTION] = window.google.picker.Action.CANCEL;
    window._pickerCallbackFn.call(null, req);
  };

})(window);
