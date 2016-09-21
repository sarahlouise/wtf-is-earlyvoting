        $(document).ready(function() {
            //tool
            x = $.getJSON("https://spreadsheets.google.com/feeds/list/1PEqgQy4OaIruetM-zvq5wcZclbrjcLo-zs1i2_CFlxs/1/public/values?alt=json", function(data) {
            z = data;
            console.debug(data);
            // $.each(data.feed.entry, function( key, value ) {
            //   console.debug(value);
            // })
            })

            $('.selectpicker').on('change', function() {
                //reset
                $('#voteinfo').addClass('hide');
                $('#goodbad').text();
                // $('#stateevst').text();
                // $('#stateevnd').text();
                $('#infourl').text();

                $('#excuse-req').html("<p id='#excuse-req'></p>");

                $('#evBeginsDay').text();
                $('#evBeginsMonth').text();
                $('#evBeginsInfo').text();


                $('#evEndsDay').text();
                $('#evEndsMonth').text();
                $('#evEndsInfo').text();

                // $('#byMailBeginsDay').text();
                // $('#byMailBeginsMonth').text();

                $('#mailInAppDueDay').text();
                $('#mailInAppDueMonth').text();
                $('#mailInAppDueInfo').text();

                $('#mailInSubmitDay').text();
                $('#mailInSubmitMonth').text();
                $('#mailInSubmitInfo').text();



                $('#stateinfo').removeClass('hide');
                var selected = $(this).find("option:selected").val();
                var state = z.feed.entry[selected];

                $('#infobox').removeClass('hide');
                $('#perma-content').removeClass('hide');
                $('#infourl').prop('href', state['gsx$link']['$t']);
                $('#infourl2').prop('href', state['gsx$link']['$t']);
                $('#areYouRegstered').prop('href', state['gsx$areyouregistered']['$t'])

                


                if (state['gsx$hasev']['$t'] == 1) {
                    $('#voteinfo').removeClass('hide');
                    $('#goodbad').text("Fuck yeah, " + state['gsx$state']['$t'] + " has early voting.")
                    // $('#stateevst').text(state['gsx$earlyin-personvotingbegins']['$t'])
                    // $('#stateevnd').text(state['gsx$earlyin-personvotingends']['$t'])
                    
                    //get the dates
                    Date.prototype.monthNames = [
                        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                    ];

                    Date.prototype.getMonthName = function() {
                        return this.monthNames[this.getMonth()];
                    };
                    Date.prototype.getShortMonthName = function () {
                        return this.getMonthName().substr(0, 3);
                    };

                    //early in person voting begins
                    var evVoteDateStart = new Date(state['gsx$evipbegins']['$t']);

                    $('#evBeginsDay').text(evVoteDateStart.getDate());
                    $('#evBeginsMonth').text(evVoteDateStart.getShortMonthName());
                    $('#evBeginsInfo').text(state['gsx$evipbeginsnotes']['$t'])

                    //early in person voting ends
                    var evVoteDateEnd = new Date(state['gsx$evipends']['$t']);

                    $('#evEndsDay').text(evVoteDateEnd.getDate());
                    $('#evEndsMonth').text(evVoteDateEnd.getShortMonthName());
                    $('#evEndsInfo').text(state['gsx$evipendsnotes']['$t']);

                    //vote by mail begins
                    var mailInAppDueDate = new Date(state['gsx$evbmapplicationdue']['$t']);

                    $('#mailInAppDueDay').text( mailInAppDueDate.getDate());
                    $('#mailInAppDueMonth').text(mailInAppDueDate.getShortMonthName());
                    $('#mailInAppDueInfo').text(state['gsx$evbmapplicationnotes']['$t']);


                    //vote by mail ends
                    var mailInSubmitDate = new Date(state['gsx$evbmsubmitted']['$t']);

                    $('#mailInSubmitDay').text( mailInSubmitDate.getDate());
                    $('#mailInSubmitMonth').text(mailInSubmitDate.getShortMonthName());
                    $('#mailInSubmitInfo').text(state['gsx$evbmsubmittednotes']['$t']);


                    $('#infourl').addClass('hide');
                    $('#vbm-only-info').addClass('hide');

                } else {
                    $('#goodbad').html("Fuck!<br>You can only vote early by mail in " + state['gsx$state']['$t'])
                    $('#vbm-only-info').removeClass('hide');
                    // $('#infourl').removeClass('hide');
                    // $('#infourl').text("Click here to see if you can vote absentee");
                }

                if (state['gsx$excuserequired']['$t'] == 1 ) {
                    console.log('excuse needed')
                    $('#excuse-req').html('<strong>*Excuse Required. </strong> See what qualifies <a href="' + state['gsx$excuserequirementslink']['$t']+ '">here.</a>')
                    // $('#excuse-req-url').attr("href", state['gsx$excuserequirementslink']['$t']);
                } else if(state['gsx$excuserequired']['$t'] == 0 ) {
                    console.log('no excuse required')
                    // $('#excuse-req').html('<strong>No excuse needed! Go fucking vote already.</strong>');
                    // $('#excuse-req-url').attr("href", state['gsx$excuserequirementslink']['$t']);
                }
            });

            // Add scrollspy to <body>
            $('body').scrollspy({
                target: ".navbar",
                offset: 50
            });

            //Smoothscroll
            $('a').smoothScroll();

            //share
            $('.rrssb-buttons').rrssb({
                // required:
                title: 'What the fuck is Early Voting?',
                url: 'http://voteearly.us',
                // optional:
                description: "It sounds fucking self-explanatory right? Early voting is voting early, before the fucking election. It’s way better than waiting till election day, because you don’t have to deal with other people, but some of the specifics are a bit different state to state, so pay the fuck attention.",
                emailBody: "Someone thinks you don't fucking know what early voting is. It's about time you fucking find out. Check out http://voteearly.us"
            });

            // Add smooth scrolling on all links inside the navbar
            
            $("#AutoScrollNav a").on('click', function(event) {
                // Make sure this.hash has a value before overriding default behavior
                if (this.hash !== "") {
                    // Prevent default anchor click behavior
                    event.preventDefault();

                    // Store hash
                    var hash = this.hash;

                    // Using jQuery's animate() method to add smooth page scroll
                    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top
                    }, 800, function() {

                        // Add hash (#) to URL when done scrolling (default click behavior)
                        window.location.hash = hash;
                    });
                }
            })
        })