$(document).ready(function() {

    // page is now ready, initialize the calendar...

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

        var newEvents = [
          {
            title: 'Event1',
            start: '2018-02-17'
          },
          {
            title: 'Event2',
            start: '2018-02-27'
          }
        ];

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
