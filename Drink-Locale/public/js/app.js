'use strict';

function checkAge() {
  var ageVer = document.getElementById('ageVerWrap');
  ageVer.className = 'show';

  var yes = document.getElementById('confirmY');
  yes.addEventListener('click', function(){
    ageVer.className = 'hide'; //hides the ageVer section if they say they are above 21
  });

  var no = document.getElementById('confirmNot');
  no.addEventListener('click', function(){
    window.open('http://www.disney.com', '_self'); //opens disney.com if they say they are not 21
  });
}

(function() {
if (!localStorage.ageCheck) {
       localStorage.ageCheck = 'yes';
       checkAge();
   }
})();
