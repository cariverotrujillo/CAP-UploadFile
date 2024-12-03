sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/padron/capfiles/test/integration/FirstJourney',
		'com/padron/capfiles/test/integration/pages/PadronList',
		'com/padron/capfiles/test/integration/pages/PadronObjectPage'
    ],
    function(JourneyRunner, opaJourney, PadronList, PadronObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/padron/capfiles') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePadronList: PadronList,
					onThePadronObjectPage: PadronObjectPage
                }
            },
            opaJourney.run
        );
    }
);