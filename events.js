function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'events.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}



$(document).ready(function() {

    // page is now ready, initialize the calendar...
    loadJSON(function(response) {

        var data = JSON.parse(response);

        const markup = `
          ${data.map(person =>
            `
            <div class="event">
              <p class="event-title"> ${person.title}
                <span><button class="add button event-button mdl-button mdl-js-button mdl-button--raised" eventId="${person.ID}"> + </button></span>
              </p>
              <p> <b>Date:</b> ${person.start}</p>
              <p> <b>Location:</b> ${person.Location} </p>
              <p> <b>Description:</b> ${person.Description}</p>
            </div>
            `
          ).join('')}
          `;

        document.getElementById('events-placeholder').innerHTML = markup;


        $('#calendar').fullCalendar({
              header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
              },
              defaultDate: '2018-02-12',
              defaultView: 'month',
              editable: true,
              events: [
                {
                  title: 'All Day Event',
                  start: '2014-06-01'
                },
                {
                  title: 'Long Event',
                  start: '2014-06-07',
                  end: '2014-06-10'
                },
                {
                  id: 999,
                  title: 'Repeating Event',
                  start: '2014-06-09T16:00:00'
                },
                {
                  id: 999,
                  title: 'Repeating Event',
                  start: '2014-06-16T16:00:00'
                },
                {
                  title: 'Meeting',
                  start: '2014-06-12T10:30:00',
                  end: '2014-06-12T12:30:00'
                },
                {
                  title: 'Lunch',
                  start: '2014-06-12T12:00:00'
                },
                {
                  title: 'Birthday Party',
                  start: '2014-06-13T07:00:00'
                },
                {
                  title: 'Click for Google',
                  url: 'http://google.com/',
                  start: '2014-06-28'
                }
              ]
            });

            var newEvents = data;

            // $('#calendar').fullCalendar('addEventSource',newEvents);

            var eventIdArray = [];

            $('.addEvents').on( 'click', 'button', function() {
              var id = $( this ).attr('eventId');
              if (!eventIdArray.includes(id)){
                var eventIndex = Number(id);
                var eventData = [newEvents[eventIndex]];
                $('#calendar').fullCalendar('addEventSource',eventData);
                eventIdArray.push(id);
                console.log(id);
              }
            });



    });







});
