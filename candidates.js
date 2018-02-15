// // external js: isotope.pkgd.js
//
// // init Isotope
// var $grid = $('index-cards-grid').isotope({
//   itemSelector: '.index-card'
// });
//
// // store filter for each group
// var filters = {};
//
// $('.filters').on( 'click', '.button', function() {
//   console.log('hlep');
//   var $this = $(this);
//   // get group key
//   var $buttonGroup = $this.parents('.button-group');
//   var filterGroup = $buttonGroup.attr('data-filter-group');
//   // set filter for group
//   filters[ filterGroup ] = $this.attr('data-filter');
//   // combine filters
//   var filterValue = concatValues( filters );
//   // set filter for Isotope
//   $grid.isotope({ filter: filterValue });
// });
//
// // change mdl-button--colored class on buttons
// $('.button-group').each( function( i, buttonGroup ) {
//   var $buttonGroup = $( buttonGroup );
//   $buttonGroup.on( 'click', 'button', function() {
//     $buttonGroup.find('.mdl-button--colored').removeClass('mdl-button--colored');
//     $( this ).addClass('mdl-button--colored');
//   });
// });
//
// // flatten object by concatting values
// function concatValues( obj ) {
//   var value = '';
//   for ( var prop in obj ) {
//     value += obj[ prop ];
//   }
//   return value;
// }


// external js: isotope.pkgd.js

// init Isotope
var $grid = $('.candidate-grid').isotope({
  itemSelector: '.candidate-card'
});

// store filter for each group
var filters = {};

$('.filters').on( 'click', '.button', function() {
  var $this = $(this);
  // get group key
  var $buttonGroup = $this.parents('.button-group');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  // set filter for group
  filters[ filterGroup ] = $this.attr('data-filter');
  // combine filters
  var filterValue = concatValues( filters );
  // set filter for Isotope
  $grid.isotope({ filter: filterValue });
});

// change mdl-button--colored class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.mdl-button--colored').removeClass('mdl-button--colored');
    $( this ).addClass('mdl-button--colored');
  });
});

// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}
