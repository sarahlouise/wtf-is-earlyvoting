        $(document).ready(function() {
            //tool
            x = $.getJSON("https://spreadsheets.google.com/feeds/list/1PEqgQy4OaIruetM-zvq5wcZclbrjcLo-zs1i2_CFlxs/1/public/values?alt=json", function(data) {
            z = data;
            console.debug(data);
            // $.each(data.feed.entry, function( key, value ) {
            //   console.debug(value);
            // })
            })


            //share buttons
            var title = 'What the F is Early Voting?';
            var url = 'http://voteearly.us';
            var description = "It sounds effing self-explanatory right? Early voting is voting early, before the effing election. It’s way better than waiting till election day, because you don’t have to deal with other people, but some of the specifics are a bit different state to state, so pay the fuck attention.";
            var emailBody =  "Someone thinks you don't effing know what early voting is. It's about time you effing find out. Check out http://voteearly.us";
            var twitterTweet = "WTF is Early Voting? You can likely vote early in your state. Look it the F up here: www.voteearly.us #WTFisEV #earlyvoting #vote";

            //Twitter: Custom share function
             $('#facebookShare').attr( 'href', "https://www.facebook.com/sharer/sharer.php?u=" + url );
             $('#twitterShare').attr( 'href', "https://twitter.com/intent/tweet?text=" + twitterTweet + "&url="+ url + "&via=veracitymedia");
             $('#emailShare').attr('href', 'mailto:contact@yourcompany.com?subject=' + title + '&body=' + emailBody);


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

            //Smoothscroll
            $('a').smoothScroll();

            function scrollNav() {
              $('.nav a').click(function(){  

                //Animate
                $('html, body').stop().animate({
                    scrollTop: $( $(this).attr('href') ).offset().top - 70
                }, 400);
                return false;
              });
              $('.scrollTop a').scrollTop();
            }
            scrollNav();

        })