function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'candidates.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    }
    xobj.send(null);

}

// Call to function with anonymous callback
loadJSON(function(response) {
    // Do Something with the response e.g.
    var data = JSON.parse(response);

    // Assuming json data is wrapped in square brackets as Drew suggests
    //console.log(jsonresponse[0].name);


    const markup = `
      ${data.map(person =>
        `<div class="candidate-card ${person.Party} mdl-card mdl-shadow--2dp">
            <a href="#">
            <div class="mdl-card__title mdl-card--expand">
              <h2 class="mdl-card__title-text">${person.Candidate}</h2>
            </div>
            <div class="mdl-card__supporting-text">
              <p> <b>Party</b>: ${person.Party} <p>
              <p class="issue" id="employment"> <b>Previous Employment</b>: ${person["Previous Employment"]} <p>
              <p class="issue" id="taxation"> <b>Taxation</b>: ${person.Taxation} <p>
              <p class="issue" id="immigration"> <b>Immigration</b>: ${person.Immigration} <p>
              <p class="issue" id="environment"> <b>Environment</b>: ${person.Environment} <p>
              <p class="issue" id="rights"> <b>Civil Rights</b>: ${person["Civil Rights"]} <p>
              <p class="issue" id="education"> <b>Education</b>: ${person["Education"]} <p>
              <p class="issue" id="healthcare"> <b>Healthcare</b>: ${person["Healthcare"]} <p>
            </div>
            </a>
        </div>`
      ).join('')}
    `;

    document.getElementById('grid').innerHTML = markup;

    isotopeInit();

    issueFilter();

});



function issueFilter(){
    $('.button-group2').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.mdl-button--colored').removeClass('mdl-button--colored');
        $( this ).addClass('mdl-button--colored');

        var selectedElem = document.querySelector(".ui-group2 .mdl-button--colored");
        var selectedAttr = selectedElem.getAttribute("data-filter");
        var issues = document.querySelectorAll(".issue");
        for (var i = 0; i < issues.length; i++){
          var attr = "#" + issues[i].getAttribute("id");
          if (attr == selectedAttr){
            issues[i].style.display = "block";
          }
          else{
            issues[i].style.display = "none";
          }

        }


      });
    });



}

// external js: isotope.pkgd.js

// init Isotope
function isotopeInit(){
  var $grid = $('.candidate-grid').isotope({
    itemSelector: '.candidate-card'
  });

  // store filter for each group
  var filters = {};

  $('.ui-group').on( 'click', '.button', function() {
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
}
// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}
