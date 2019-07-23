document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    // var options = {
				// 	    edge: 'left',
				// 	    draggable: true,
				// 	    inDuration: 250,
				// 	    outDuration: 200,
				// 	    onOpenStart: null,
				// 	    onOpenEnd: null,
				// 	    onCloseStart: null,
				// 	    onCloseEnd: null,
				// 	    preventScrolling: true
				// 	};

    // Since we are using default options we use {} instead of options
    // var instances = M.Sidenav.init(elems, options);
    var instances = M.Sidenav.init(elems, {});
  });

window.onscroll = function() { myFunction() };


var navbar = document.getElementById("navbar");
// var sticky = navbar.offsetTop;
var sticky = 75;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    // Add black background-color to navbar 
  } else {
    navbar.classList.remove("sticky");
    // Remove black background-color from navbar
  }
}