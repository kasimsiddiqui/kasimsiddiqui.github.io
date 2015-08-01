'use strict';
$(document).ready(function() {
//MongoDB request information
  var db = 'https://api.mongolab.com/api/1/databases/beer-seattle/collections';
  var collection;
  var apiKey = '?apiKey=RjwSNykUJAE_wUTwNZhqr-h0pqxjJzne';
  var contentType = 'application/json';
  var dataType = 'json';

  //Arrays to store each style of beer
  var ipa,
      strongAle,
      stoutPorter,
      lagerPilsner,
      scotch,
      pale,
      wheat,
      belgian,
      sour,
      bock,
      misc;

var beerHistory = [];

  //MongoDB oid's for each style document in the db
  var ipaId = '/ipa/55b84eb37e1ee7f743ec5671';
  var strongAleId = '/strong-ale/55b8540a7e1ee7f743ec5672';
  var stoutPorterId = '/stout-porter/55b8566c7e1ee7f743ec5673';
  var lagerPilsnerId = '/lager-pilsner/55b8595a7e1ee7f743ec5674';
  var scotchId = '/scotch/55b859cb7e1ee7f743ec5675';
  var paleId = '/pale/55b85c827e1ee7f743ec5676';
  var wheatId = '/wheat/55b85d827e1ee7f743ec5677';
  var belgianId = '/belgian/55b85e8d7e1ee7f743ec5678';
  var sourId = '/sours/55b84ab47e1ee7f743ec5670';
  var bockId = '/bock/55b85ee67e1ee7f743ec5679';
  var miscId = '/misc/55b85fb57e1ee7f743ec567a';

  //Populate a style array with data from MongoDB
  var requestBeersByStyle = function(style) {

  switch(style) {
      case 'ipa':
      if(ipa) {
        return;
      } else {
        collection = ipaId;
      }
      break;
      case 'strongAle':
      if(strongAle) {
        return;
      } else {
      collection = strongAleId;
      }
      break;
      case 'stoutPorter':
      if(stoutPorter) {
        return;
      } else {
        collection = stoutPorterId;
      }
      break;
      case 'lagerPilsner':
      if(lagerPilsner) {
        return;
      } else {
      collection = lagerPilsnerId;
      }
      break;
      case 'scotch':
      if(scotch) {
        return;
      } else {
        collection = scotchId;
      }
      break;
      case 'pale':
      if(pale) {
        return;
      } else {
        collection = paleId;
      }
      break;
      case 'wheat':
      if(wheat) {
        return;
      } else {
        collection = wheatId;
      }
      break;
      case 'belgian':
      if(belgian) {
        return;
      } else {
        collection = belgianId;
      }
      break;
      case 'sour':
      if(sour) {
        return;
      } else {
        collection = sourId;
      }
      break;
      case 'bock':
      if(bock) {
        return;
      } else {
        collection = bockId;
      }
      break;
      case 'misc':
      if(misc) {
        return;
      } else {
      collection = miscId;
    }
      break;
  }

  $.ajax({
    url: db + collection + apiKey,
    type: 'GET',
    async: true,
    contentType: contentType,
    dataType: dataType,
    success: console.log('Connected to MongoDB')
  })

  .done(function(response) {
    switch(style) {
      case 'ipa':
        ipa = response.data;
        break;
      case 'strongAle':
        strongAle = response.data;
        break;
      case 'stoutPorter':
        stoutPorter = response.data;
        break;
      case 'lagerPilsner':
        lagerPilsner = response.data;
        break;
      case 'scotch':
        scotch = response.data;
        break;
      case 'pale':
        pale = response.data;
        break;
      case 'wheat':
        wheat = response.data;
        break;
      case 'belgian':
        belgian = response.data;
        break;
      case 'sour':
        sour = response.data;
        break;
      case 'bock':
        bock = response.data;
        break;
      case 'misc':
        misc = response.data;
        break;
    }
    // $(document).ajaxStop(function () {
    //   // $('#loading').hide();
    // });
  })
  .fail(function(error) {
  console.log(error);
  });
};

var loopCounter = 0;
var getRandomBeerByStyle = function(style){

  var workingArray;
    switch(style) {
      case 'ipa':
        workingArray = ipa;
        break;
      case 'strongAle':
        workingArray = strongAle;
        break;
      case 'stoutPorter':
        workingArray = stoutPorter;
        break;
      case 'lagerPilsner':
        workingArray = lagerPilsner;
        break;
      case 'scotch':
        workingArray = scotch;
        break;
      case 'pale':
        workingArray = pale;
        break;
      case 'wheat':
        workingArray = wheat;
        break;
      case 'belgian':
        workingArray = belgian;
        break;
      case 'sour':
        workingArray = sour;
        break;
      case 'bock':
        workingArray = bock;
        break;
      case 'misc':
        workingArray = misc;
        break;
    }

  var randomBeerIndex = Math.floor(Math.random() * (workingArray.length));
  if(!localStorage.beerHistory) {
    localStorage.beerHistory = JSON.stringify([]);
    beerHistory = localStorage.beerHistory;
  }
  beerHistory = JSON.parse(localStorage.beerHistory);

  //Loop to prevent duplicates
  for (var i = 0; i < beerHistory.length; i++) {
    if(beerHistory[i].nameDisplay === workingArray[randomBeerIndex].nameDisplay) {
      console.log('The beers were the same!');
      loopCounter++;
      if(loopCounter >= 100) {
        console.log('You\'ve explored all the beers from this style! It will appear in your history twice. Please pick a different style.');
        break;
      }
      return getRandomBeerByStyle(style);
    }
  }
  beerHistory.push(workingArray[randomBeerIndex]);
  localStorage.beerHistory = JSON.stringify(beerHistory);

  return workingArray[randomBeerIndex];
};

//Event Listener randomBeer.html buttons//
  $('.randBtn').on('click', function(e){
    $(document).ajaxStart(function() {
      $('#loading').fadeIn(1000);
    });
    requestBeersByStyle(e.target.id);
    setTimeout(function() {
      var beer = getRandomBeerByStyle(e.target.id);
      var beerId = beer.id;
      // $('#loading').hide();
      window.open('beer.html' + '?id=' + beerId + '&style=' + e.target.id, '_self');
      // $('.pageTitle').html(beer.name);
    }, 7000);
  });


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

  //Event Listener for Beer.html show me something similar button//
  $('#similarBtn').on('click', function(){
    $(document).ajaxStart(function() {
      $('#loading').fadeIn(1000);
    });
    var beerStyle = getUserInput('style');
    requestBeersByStyle(beerStyle);
    setTimeout(function() {
      var beer = getRandomBeerByStyle(beerStyle);
      var beerId = beer.id;

      window.open('beer.html' + '?id=' + beerId + '&style=' + beerStyle, '_self');
    }, 7000);
  });



  //Render an array in a browseable table
  var renderBrowseStyle = function(style) {
    var bucket;
    var listing;
    switch(style) {
      case 'ipa':
        bucket = ipa;
        sessionStorage.bucket = JSON.stringify(ipa);
        break;
      case 'strongAle':
        bucket = strongAle;
        sessionStorage.bucket = JSON.stringify(strongAle);
        break;
      case 'stoutPorter':
        bucket = stoutPorter;
        sessionStorage.bucket = JSON.stringify(stoutPorter);
        break;
      case 'lagerPilsner':
        bucket = lagerPilsner;
        sessionStorage.bucket = JSON.stringify(lagerPilsner);
        break;
      case 'scotch':
        bucket = scotch;
        sessionStorage.bucket = JSON.stringify(scotch);
        break;
      case 'pale':
        bucket = pale;
        sessionStorage.bucket = JSON.stringify(pale);
        break;
      case 'wheat':
        bucket = wheat;
        sessionStorage.bucket = JSON.stringify(wheat);
        break;
      case 'belgian':
        bucket = belgian;
        sessionStorage.bucket = JSON.stringify(belgian);
        break;
      case 'sour':
        bucket = sour;
        sessionStorage.bucket = JSON.stringify(sour);
        break;
      case 'bock':
        bucket = bock;
        sessionStorage.bucket = JSON.stringify(bock);
        break;
      case 'misc':
        bucket = misc;
        sessionStorage.bucket = JSON.stringify(misc);
        break;
    }
    $('.browseTable').empty();
    $('.browseTable').append('<thead><tr class="browseTH"><th><h3>Beer Name</h3></th><th><h3>Brewery</h3></th><th><h3>Beer Style</h3></th><th class="abvTH"><h3>ABV</h3></th><th class="ibuTH"><h3>IBU</h3></th></tr></thead>');

    bucket.forEach(function(beer) {
      var beerABV = beer.abv;
      var beerIBU = beer.ibu;
      if(!beerABV) {
        beerABV = '???';
      }
      if(!beerIBU) {
        beerIBU = '???';
      }
      var beerLink = '<a href="./beer.html?id=' + beer.id + '&style=' + style + '">' + beer.name + '</a>';

      listing = '<tr><td class="name">' + beerLink + '</td>' + '<td>' + beer.breweries[0].name + '</td>' + '<td>' + beer.style.shortName + '</td>' + '<td>' + beerABV + '</td>' + '<td>' + beerIBU + '</td>' + '</tr>';

      $('.browseTable').append(listing);
    });
  };

 //Listener for the browse selector
  $('.browseTarget').on('change', function(e){
    requestBeersByStyle(e.target.value);
    setTimeout(function() {
      renderBrowseStyle(e.target.value);
    }, 7000);
  });

});
