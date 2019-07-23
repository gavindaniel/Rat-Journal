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