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
                <span><button class="add button event-button mdl-button mdl-js-button mdl-button--raised" eventId="${person.id}"> + </button></span>
                <span><button class="delete button event-button mdl-button mdl-js-button mdl-button--raised" eventId="${person.id}"> - </button></span>
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
              defaultDate: '2018-03-15',
              defaultView: 'month',
              editable: true,
              events: [
                {
                  title: 'Voting Day',
                  start: '2018-03-20'
                },
                {
                  title: 'Early Voting',
                  start: '2018-02-18',
                  end: '2018-03-20'
                }
              ],
              color: 'yellow',
              eventStartEditable: false
            });

            var newEvents = data;

            // $('#calendar').fullCalendar('addEventSource',newEvents);

            var eventIdArray = [];

            $('.add').on( 'click', function() {
              var id = $( this ).attr('eventId');
              if (!eventIdArray.includes(id)){
                var eventIndex = Number(id);
                var eventData = [newEvents[eventIndex]];
                var eventObject = {'id':id, 'events': eventData};
                $('#calendar').fullCalendar('addEventSource',eventObject);
                eventIdArray.push(id);
              }
            });

            $('.delete').on( 'click', function() {
              var id = $( this ).attr('eventId');
              if (eventIdArray.includes(id)){
                var eventIndex = Number(id);
                var eventData = [newEvents[eventIndex]];
                var eventObject = $('#calendar').fullCalendar('getEventSourceById', id );
                $('#calendar').fullCalendar('removeEventSource',eventObject);
                var index = eventIdArray.indexOf(id);
                eventIdArray.splice(index, 1);
              }
            });

    });







});
