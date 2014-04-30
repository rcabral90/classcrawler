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
        Password:  'password!!'
    }, false);
});

casper.then(function clickButton() {
    this.click('input[name="btnSignIn"]');
});

casper.thenOpen('https://my.fullerton.edu/PortalVSVB/PortalPSoftLoginTOnline/CSUPsoft.aspx');
casper.thenOpen('https://mycsuf-ng.fullerton.edu/psp/pfulprd/EMPLOYEE/HFULPRD/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?PORTALPARAM_PTCNAV=FUL_POC_HC_SSS_STUDENT_CENTER&EOPP.SCNode=EMPL&EOPP.SCPortal=EMPLOYEE&EOPP.SCName=FUL_STUDENT_CENTER&EOPP.SCLabel=Student%20Center&EOPP.SCPTcname=&FolderPath=PORTAL_ROOT_OBJECT.PORTAL_BASE_DATA.CO_NAVIGATION_COLLECTIONS.FUL_STUDENT_CENTER.FUL_S200711261443438320871608&IsFolder=false');

casper.withFrame('TargetContent', function() {
    
	// Make sure Search exists before clicking
    this.test.assertExists(
        {type: 'xpath', path: '//*[@id="DERIVED_SSS_SCL_SSS_GO_4$193$"]' },
        'the element exists'
    );
    
    console.log("Clicking Search");
    
   	// Clicks on search
    casper.thenClick(x('//*[@id="DERIVED_SSS_SCL_SSS_GO_4$193$"]'), function() {
        console.log("Woop!");
    });  
    
	this.wait(5000, function() {
    	this.echo("I've waited for a second.");
    	this.capture('search.png');
    });

    // Selecting CPSC 
       casper.then(function(){
        casper.evaluate(function() {
            var y_select = document.getElementById("SSR_CLSRCH_WRK_SUBJECT$0").value = "CPSC"; //select option you're needed
        }); 
    }); 

    // Clicking on Search    
        casper.thenClick(x('//*[@id="CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH"]'), function() {
            console.log("Woop!");
        });  
            this.wait(5000, function() {
            this.echo("I've waited for a second.");
            this.capture('cpsc list.png');
        });

}); 

casper.thenEvaluate(function(){
    console.log("Page Title " + document.title);
    console.log("Base URL is " + document.baseURI);
    
});

casper.run();