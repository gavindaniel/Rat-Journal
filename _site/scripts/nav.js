document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    // Since we are using default options we use {} instead of options
    // var instances = M.Sidenav.init(elems, options);
    var instances = M.Sidenav.init(elems, {});
  });

  // Or with jQuery

  // $(document).ready(function(){
  //   $('.sidenav').sidenav();
  // });