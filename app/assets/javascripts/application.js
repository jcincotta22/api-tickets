// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


function _(id){
        return document.getElementById(id);
      }
      let droppedIn = false;
      function drag_start(event) {
        _('app_status').innerHTML = "dragging the " + event.target.getAttribute('id');
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.setData("text", event.target.getAttribute('id'));
      }
      function drag_enter(event) {
        _('app_status').innerHTML = "You are dragging over the " + event.target.getAttribute('id');
      }

      function drag_leave(event) {
        _('app_status').innerHTML = "You Left the " + event.target.getAttribute('id');
      }

      function drag_drop(event) {
        event.preventDefault();
        let elem_id = event.dataTransfer.getData("text");
        event.target.appendChild( _(elm_id) );
        _('app_status').innerHTML = "Dropped " +elem_id+" into the " + event.target.getAttribute('id');
        _(elem_id).removeAttribute("draggable");
        _(elem_id).style.cursor = "default";
        droppedIn = true;
       }

       function drag_end(event) {
         if(droppedIn == false) {
           _('app_status').innerHTML = "You let the "+event.target.getAttribute('id')+" go.";
         }
         droppedIn = false;
       }

       function readDropZone(){
         for(let i=0; i< _("drop_zone").children.length; i++) {
           alert(_("drop_zone").children[i].id+" is in the drop zone");
         }
       }
