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

// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

  // $(document).ready(function(){
  //   $('.sidenav').sidenav();
  // });



// var html = '<nav class="transparent z-depth-0">';
// html += '<div class="nav-wrapper">';
// html += '<a href="." class="brand-logo">';
// html += '<img id="icon" src="/images/logo/white-small-v2.png">';
// html += '</a>';
// html += '<a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>';
// html += '<ul class="right hide-on-med-and-down" id="topnav">';
// html += '<li><a href="/code/">code</a></li>';
// html += '<li><a href="/pictures/">pictures</a></li>';
// html += '<li><a href="/paintings/">paintings</a></li>';
// html += '<li><a href="/graphics/">graphics</a></li>';
// html += '<li><a href="/shop/">shop</a></li>';
// html += '<!-- <li><a href="/contact/">contact</a></li> -->';
// html += '</ul></div></nav>';

// // var side = '<ul class="sidenav" id="mobile-demo">';
// var side = '<li><a href="." id="active">home</a></li>';
// side += '<li><a href="/code/">code</a></li>';
// side += '<li><a href="/pictures/">pictures</a></li>';
// side += '<li><a href="/paintings/">paintings</a></li>';
// side += '<li><a href="/graphics/">graphics</a></li>';
// side += '<li><a href="/shop/">shop</a></li>';
// side += '<!-- <li><a href="/contact/">contact</a></li> -->';
// // side += '</ul>';

// window.onload = function what(){
// 	document.getElementById('nav').innerHTML = html;
//   document.getElementById('mobile-demo').innerHTML = side;
// };