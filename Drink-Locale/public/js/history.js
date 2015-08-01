'use strict';
$(document).ready(function() {
//Our categories of beer
  //ipa, strongAle, stoutPorter, lagerPilsner, scotch, pale,
  //wheat, belgian, sour, bock, misc

  var ipa = [[
    'Imperial IPA',
    'American IPA',
    'English IPA',
    'Wet Hop Ale',
    'Imperial Red',
    'Irish Red'
    ], 'ipa'];

  var strongAle = [[
    'American Strong Pale',
    'Wheatwine',
    'BBL Aged Strong',
    'American Imperial Porter',
    'Old Ale',
    'Braggot',
    'BBL Aged Dark',
    'American Barleywine',
    'British Barleywine',
    'BBL Aged',
    'Aged Beer',
    'Strong Ale',
    'Malt Liquor'
    ], 'strongAle'];

  var stoutPorter = [[
    'American Stout',
    'Sweet Stout',
    'Cream Ale',
    'Dry Irish Stout',
    'American Imperial Stout',
    'Export Stout',
    'Oatmeal Stout',
    'Stout',
    'Coffee Beer',
    'Baltic Porter',
    'English Brown',
    'Robust Porter',
    'Brown Porter',
    'American Brown'
    ], 'stoutPorter'];

  var lagerPilsner = [[
    'Vienna Lager',
    'Oktoberfest',
    'American Dark Lager',
    'German Pilsener',
    'Kölsch',
    'International Pilsener',
    'American Premium Lager',
    'American Pilsener',
    'Bohemian Pilsener',
    'Märzen',
    'American Lager',
    'California Common',
    'Black Ale',
    'Schwarzbier',
    'Euro Dark'
    ], 'lagerPilsner'];

  var scotch = [[
   'Scottish Export',
   'Scotch Ale'
   ], 'scotch'];

  var pale = [[
    'Special Bitter',
    'English Dark Mild',
    'Amber',
    'Bitter',
    'Bière de Garde',
    'English Pale Mild',
    'Blonde',
    'ESB',
    'Austrailian Pale',
    'English Pale',
    'American Pale',
    'German Rye',
    'Rye Ale'
    ], 'pale'];

  var wheat = [[
   'Witbier',
   'Wheat Ale',
   'Dunkelweizen',
   'Hefeweizen',
   'Bernsteinfarbenesweizen'
   ], 'wheat'];

  var belgian = [[
    'Belgian Pale',
    'Belgian Blonde',
    'Belgian Dubbel',
    'Belgian Pale Strong',
    'American/Belgian Dark',
    'Belgian Dark Strong',
    'Belgian Ale',
    'Belgian Tripel',
    'Saison',
    'American/Belgian Pale'
  ], 'belgian'];

  var sour = [[
    'BBL Aged Sour',
    'Sour',
    'Brett',
    'Berlinerweisse'
  ], 'sour'];

  var bock = [[
    'Doppelbock',
    'Maibock',
    'Bock',
    'Weizenbock',
    'Altbier'
  ], 'bock'];

  var misc = [[
    'Specialty',
    'Spice Beer',
    'Pumpkin Beer',
    'Smoke Beer',
    'Fruit Beer',
    'Fruit Wheat Ale',
    'Common Cider',
    'New England Cider',
    'Experimental Beer',
    'Flavored Malt Beverage',
    'Experimental Beer'
  ], 'misc'];
  var styles = [ipa, strongAle, stoutPorter, lagerPilsner, scotch, pale, wheat, belgian, sour, bock, misc];

  //Get the user's history from local storage
  var history = [];
  if(localStorage.beerHistory) {
    history = JSON.parse(localStorage.beerHistory);
  }

  //Get the style category from our app that the beer belongs to
  var getBeerStyle = function(beer) {
    for (var i = 0; i < styles.length; i++) {
      for (var j = 0; j < styles[i][0].length; j++) {
        if (styles[i][0][j] === beer.style.shortName) {
          return styles[i][1];
        }
      }
    }
    return false;
  };


  //Render the user's history to the page
  var renderHistory = function() {
    var listing;
    var beerLink;
    var beerABV;
    var beerIBU;
    $('.histTable').append('<thead><tr class="histTH"><th><h3>Beer Name</h3></th><th><h3>Brewery</h3></th><th><h3>Beer Style</h3></th><th class="abvTH"><h3>ABV</h3></th><th class="ibuTH"><h3>IBU</h3></th></tr></thead>');
    history.forEach(function(beer) {
      var beerStyle = getBeerStyle(beer);
      beerABV = beer.abv;
      beerIBU = beer.ibu;
      if(!beerABV) {
        beerABV = '???';
      }
      if(!beerIBU) {
        beerIBU = '???';
      }
      beerLink = '<a href="./beer.html?id=' + beer.id + '&style=' + beerStyle + '">' + beer.nameDisplay + '</a>';
      console.log(beerLink);
      listing = '<tr><td class="name">' + beerLink + '</td>' + '<td>' + beer.breweries[0].name + '</td>' + '<td>' + beer.style.shortName + '</td>' + '<td>' + beerABV + '</td>' + '<td>' + beerIBU + '</td>' + '</tr>';
      console.log(listing);
      $('.historyList').append(listing);
    });
  };




  renderHistory();

});
