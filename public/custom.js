
$(document).bind("mobileinit", function(){
  //apply overrides here

  /*                   */
  /* home page scripts */
  /*                   */

  // - custom script for toggling the radiobox, since there's an <a> and an <li> to trigger the checkbox
  // - bind mobile.toggle to the function
  $.mobile.toggle = function(id){
    var cur = $(id);
    if (cur.prop('checked')){
      cur.prop('checked',false).checkboxradio('refresh')}
    else cur.prop('checked',true).checkboxradio('refresh');
  };
  

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




