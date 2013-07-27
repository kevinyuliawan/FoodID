
$(document).bind("mobileinit", function(){
  //apply overrides here

  /*                   */
  /* home page scripts */
  /*                   */

  // - custom script for toggling the radiobox, since there's an <a> and an <li> to trigger the checkbox
  // - bind mobile.toggle to the function
  // array to hold the array of profiles that have been selected
  $.mobile.selProfList= [];

  // auxiliary remove function to remove by value, used with updating the selected profiles array
  function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
  };


  $.mobile.toggle = function(id, profileid){
    var cur = $(id);
    if (cur.prop('checked')){
      cur.prop('checked',false).checkboxradio('refresh');
      $.mobile.selProfList = removeA($.mobile.selProfList, profileid);
      console.log('After uncheck: ' + $.mobile.selProfList);
      $('#profiles').val($.mobile.selProfList);

    }
    else {
      cur.prop('checked',true).checkboxradio('refresh');
      $.mobile.selProfList.push(profileid);
      console.log('After check: ' + $.mobile.selProfList);
      $('#profiles').val($.mobile.selProfList);
    };
  };


  $(document).delegate('#homepage', 'pageshow', function () {
    //Your code for each page load here
      console.log('hijacking page');
      // need to disable label checkbox click events so that the clicks don't register, otherwise it would check then uncheck it with both the label and a:href events firing
      $('.labelcheckbox').off();
      $.mobile.selProfList = [];

      // need to set the scan button to submit a PUT request to scan
      $('#scanbutton').click(function(e){
        // TODO validate here
        $.mobile.selProfList = [];
        $('#homeform').submit();
      });

});

  $('#homepage').live('pageinit', function(event){


    });

  $(document).delegate('#homeeditpage', 'pageshow', function () {
    //Your code for each page load here
    console.log('hijacking page');
      // need to disable label checkbox click events so that the clicks don't register, otherwise it would check then uncheck it with both the label and a:href events firing
      $('.labelcheckbox').off();
      $.mobile.selProfList = [];

      $('#deletebutton').click(function(e){
        $.mobile.selProfList = [];
        $('#homeform').submit();
      });
});

  $('#homeeditpage').live('pageinit', function(event){
      

    });
  

  /*                          */
  /* scan/upload page scripts */
  /*                          */

  $( '#scanpage' ).live( 'pageinit',function(event){
      $('#btn-choose').click(function(){
        $('#scan').click();
      });


      $('#btn-remove').click(function(){
          $('#scanForm').each(function(){
              this.reset();
            });
          $('#filetext').val('');
      });


      $('#scan').change(function(){
          $('#filetext').val($(this).val().replace(/C:\\fakepath\\/i, ''));
      });
  });

  
  /*                                                     */
  /* show profile page scripts to allow checkmarking     */
  /*                                                     */

  $('#showprofilepage').live('pageinit', function(event){
      
      /* checkmarking on update doesn't work
      console.log('Hijacking profile page');
      if  ( $('#hidden').val() == 'true')
            {$('#default').prop('checked',true).checkboxradio('refresh'); console.log('checked it'); $('#default').checkboxradio('refresh')}
      else  { $('#default').prop('checked',false).checkboxradio('refresh'); console.log('didnt check it'); $('#default').checkboxradio('refresh')};
      */

      // $('#default').checkboxradio('refresh');
  });





}); // end mobile init




