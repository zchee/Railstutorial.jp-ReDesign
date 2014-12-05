(function() {
    'use strict';


    function toggleClass(element, className) {
        if (!element || !className) {
            return;
        }

        var classString = element.className;
        // console.log('classString', classString);
        var nameIndex = classString.indexOf(className);
        // console.log('nameIndex', nameIndex);

        if (nameIndex === -1) {
            if (classString.length) {
                classString += ' ' + className;
            } else {
                classString += className;
            }
        } else {
            classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
        }
        element.className = classString;
    }




}).call(this);
