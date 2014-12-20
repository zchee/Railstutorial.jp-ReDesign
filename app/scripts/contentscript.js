'use strict';


(function() {
  var link = document.getElementsByTagName('link');
  link[0].parentNode.removeChild(link[0]);
  link[1].parentNode.removeChild(link[1]);


  function toggleClass(element, className) {
    if (!element || !className) {
      return;
    }

    var classString = element.className;
    var nameIndex = classString.indexOf(className);

    if (nameIndex === -1) {
      if (classString.length) {} else {
        classString += className;
      }
    } else {
      classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    }
    element.className = classString;
  }


  var container = document.getElementById('container');
  var tableOfContents = document.getElementById('table_of_contents');
  var tableOfContentsClone = tableOfContents.cloneNode(true);


  toggleClass(tableOfContents, 'hidden');


  var drawerInput = document.createElement('input');
  drawerInput.type = 'checkbox';
  drawerInput.id = 'drawer-toggle-checkbox';
  drawerInput.setAttribute('drawer', 'drawer-toggle-checkbox');
  drawerInput.setAttribute('checked', 'checked');
  document.body.insertBefore(drawerInput, container);

  var drawerLabel = document.createElement('label');
  drawerLabel.id = 'drawer-toggle-label';
  drawerLabel.setAttribute('for', 'drawer-toggle-checkbox');
  document.body.insertBefore(drawerLabel, container);

  document.body.insertBefore(tableOfContentsClone, container);


  window.onload = function() {

    var heading = document.querySelectorAll('.heading');
    var sections = {};
    var i = 0;

    Array.prototype.forEach.call(heading, function(e) {
      sections[e.id] = e.parentNode.offsetTop -1;
    });


    toggleClass(document.querySelector('#table_of_contents a[href="' + heading[0].getAttribute('href') + '"]'), 'active');


    var tocOl = document.querySelectorAll('#table_of_contents > ol');
    var tocOlChildNodesLi = tocOl[0].childNodes;
    var locationUrl = location.href.match(/(.+)\?(.+)/);
    // console.log('1: locationUrl[1]', locationUrl[1]);

    for (var i = 0; i < tocOlChildNodesLi.length; i++) {
      // console.log('2: tocOlChildNodesLi', tocOlChildNodesLi);
      if (tocOlChildNodesLi[i].childNodes[0].href) {
        // console.log('3: tocOlChildNodesLi[i]', tocOlChildNodesLi[i]);
        // console.log('4: tocOlChildNodesLi[i].nextSibling', tocOlChildNodesLi[i].nextSibling);
        // console.log('5: tocOlChildNodesLi[i].childNodes[0].href', tocOlChildNodesLi[i].childNodes[0].href);
        var tocOlChildNodesLiChildNodesAHref = tocOlChildNodesLi[i].childNodes[0].href;
        var tocOlChildNodesLiChildNodesAHrefUrl = tocOlChildNodesLiChildNodesAHref.match(/(.+)\?(.+)/);
        // console.log('6: tocOlChildNodesLiChildNodesAHref', tocOlChildNodesLiChildNodesAHref);
        // console.log('7: tocOlChildNodesLiChildNodesAHrefUrl[1]', tocOlChildNodesLiChildNodesAHrefUrl[1]);
          // console.log('8: tocOlChildNodesLiChildNodesAHrefUrl[1] !== locationUrl[1]', tocOlChildNodesLiChildNodesAHrefUrl[1] !== locationUrl[1]);
        if (tocOlChildNodesLiChildNodesAHrefUrl[1] !== locationUrl[1]) {
          tocOlChildNodesLi[i].parentNode.removeChild(tocOlChildNodesLi[i].nextSibling);
        }
      }
    }


    window.onscroll = function() {
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

      var n = 0;
      for (i in sections) {
        if (sections[i] <= scrollPosition) {
          toggleClass(document.querySelector('#table_of_contents .active'), 'active');
          toggleClass(document.querySelector('#table_of_contents a[href="' + heading[n].getAttribute('href') + '"]'), 'active');
        }
        n++;
      }
    };

  };
}).call(this);
