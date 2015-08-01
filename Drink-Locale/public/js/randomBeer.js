'use strict';


$(document).ready(function() {
  $('#loading').hide();

  //Parse the URL to get the user's input

  var getUserInput = function(input) {
    var urlSearch = window.location.search;
    var split1 = urlSearch.split('id=');
    split1 = split1[1];
    var split2 = split1.split('&');
    if (input === 'id'){
      return split2[0];
    }

    split2 = split2[1];
    var split3 = split2.split('=');

    if (input === 'style'){
      return split3[1];
    }
  };
  var beerId = getUserInput('id');
  var beer;

  //Gets a beer from the local storage
  var getBeerFromLocal = function(id) {
    var workingArray;
    if(localStorage.beerHistory) {
      workingArray = JSON.parse(localStorage.beerHistory);
    } else {
      return false;
    }
    for(var i = workingArray.length - 1; i >= 0; i--) {
      if(workingArray[i].id === id) {
        return workingArray[i];
      }
    }
    return false;
  };

  //Gets a beer from the session storage
  var getBeerFromSession = function(id) {
    var workingArray = JSON.parse(sessionStorage.bucket);
    console.log(workingArray);
    for(var i = 0; i < workingArray.length; i++) {
      if(workingArray[i].id === id) {
        return workingArray[i];
      }
    }
    return false;
  };

  var renderBeer = function() {
    $('#beerName').html(beer.name);
    if(beer.labels) {
      $('#beerPic').attr('src', beer.labels.medium);
    }
    if(beer.description) {
      $('#description').html(beer.description);
    } else if(beer.style.description) {
      $('#description').html(beer.style.description);
    } else {
      $('#description').html('Sorry, we don\'t have a description for this beer.');
    }
    if(beer.breweries) {
      $('#brewery').html('<strong>BREWERY:</strong> ' + beer.breweries[0].name);
    }
    if(beer.abv) {
      $('#abv').html('<strong>ABV:</strong> ' + beer.abv);
    }
    $('#style').html('<strong>STYLE:</strong> ' + beer.style.shortName);
    if(beer.ibu) {
      $('#ibu').html('<strong>IBU:</strong> ' + beer.ibu);
    }
  };

  if(getBeerFromLocal(beerId)) {
    beer = getBeerFromLocal(beerId);
  } else {
    beer = getBeerFromSession(beerId);
  }

  renderBeer();

});
