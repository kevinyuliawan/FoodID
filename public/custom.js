
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




}); // end mobile init




