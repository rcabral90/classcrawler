var x = require('casper').selectXPath;
var firstUrl;
var casper = require('casper').create({   
    waitTimeout: 15000,
    stepTimeout: 15000,
    verbose: true,
    logLevel: 'debug',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
    pageSettings: {
      loadImages:  false,         // The WebPage instance used by Casper will
      loadPlugins: false         // use these settings
    }
});


// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

var url = 'https://my.fullerton.edu/portalvsvb/csulogonuser.aspx?posted=1';

casper.start(url, function() {
    // search for 'casperjs' from google form
    console.log("page loaded");
    this.test.assertExists('form#Form1', 'form is found');
    this.fill('form#Form1', { 
        Username: 'username', 
        Password:  'password'
    }, false);
});

casper.then(function clickButton() {
    this.click('input[name="btnSignIn"]');
});

casper.thenOpen('https://my.fullerton.edu/PortalVSVB/PortalPSoftLoginTOnline/CSUPsoft.aspx');
casper.thenOpen('https://mycsuf-ng.fullerton.edu/psp/pfulprd/EMPLOYEE/HFULPRD/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?PORTALPARAM_PTCNAV=FUL_POC_HC_SSS_STUDENT_CENTER&EOPP.SCNode=EMPL&EOPP.SCPortal=EMPLOYEE&EOPP.SCName=FUL_STUDENT_CENTER&EOPP.SCLabel=Student%20Center&EOPP.SCPTcname=&FolderPath=PORTAL_ROOT_OBJECT.PORTAL_BASE_DATA.CO_NAVIGATION_COLLECTIONS.FUL_STUDENT_CENTER.FUL_S200711261443438320871608&IsFolder=false');

casper.withFrame('TargetContent', function() {
    
					// Make sure Enroll exists before clicking
    this.test.assertExists(
        {type: 'xpath', path: '//*[@id="DERIVED_SSS_SCR_SSS_LINK_ANCHOR1"]' },
        'the element exists'
    );
    
    console.log("Clicking Enroll");
    
   					 // Clicks on enroll
    casper.thenClick(x('//*[@id="DERIVED_SSS_SCR_SSS_LINK_ANCHOR1"]'), function() {
        console.log("Woop!");
    });  
    
	this.wait(5000, function() {
    	this.echo("I've waited for a second.");
    	this.capture('cart.png');
    });


					// Make sure Search exists before clicking    
    this.test.assertExists(
        {type: 'xpath', path: '//*[@id="DERIVED_SSS_SCR_SSS_LINK_ANCHOR1"]' },
        'the element exists'
    );
    
    				// clicking on Search    
    casper.thenClick(x('//*[@id="DERIVED_REGFRM1_SSR_PB_SRCH"]'), function() {
        console.log("Woop!");
    });  
    


    this.wait(5000, function() {
        this.echo("I've waited for a second.");
        this.capture('enroll.png');
    });
    
/*  DOES NOT WORK YET? FILL BY CHILDREN 
   casper.then(function(){
    casper.evaluate(function() {
        var x_unselect = document.getElementById("SSR_CLSRCH_WRK_SUBJECT$0").children[1]; //making "Choisir une mairie" option unselected
        x_unselect.setAttribute("selected", false);

        var y_select = document.getElementById("SSR_CLSRCH_WRK_SUBJECT$0").children[24]; //select option you're needed
        y_select.setAttribute("selected", "selected");
    });
});
casper.then(function() {
    this.captureSelector("result.png", "html");
}); 
*/


/*  DOES NOT WORK YET? FILL BY SELECTED TEXT
casper.fillSelectOptionByText = function (selectSelector,text){
    this.evaluate(function(sel,setByText) {
        $(sel + " > option").each(function() {
            if($(this).text() === setByText) {
                $(this).attr('selected', 'selected');            
            }                        
        });
    },selectSelector,text);
};

// Fill in the list box
this.fillSelectOptionByText("select[name='SSR_CLSRCH_WRK_SUBJECT$0']", "CPSC");
*/

    				// clicking on Search    
    casper.thenClick(x('//*[@id="CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH"]'), function() {
        console.log("Woop!");
    });  
        this.wait(5000, function() {
        this.echo("I've waited for a second.");
        this.capture('cpsc list.png');
    });


}); // end

/*
casper.withFrame('TargetContent', function() {
    

    
  
});
*/

casper.thenEvaluate(function(){
    console.log("Page Title " + document.title);
    console.log("Base URL is " + document.baseURI);
    
});

casper.run();