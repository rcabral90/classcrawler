//////////////////////////////////////////////////////////////////////////////
// Robert Cabral
// Chris Doan
// Titan Class Crawler
// 5-27-14
// Purpose: To crawl the titan portal to display classes, and then auto enroll in classes for an easy registration process.
//////////////////////////////////////////////////////////////////////////////

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
 
    this.echo('Usage: casperjs crawler.js --u=Username --p=Password')
    this.fill('form#Form1', { 
        Username: casper.cli.get('u'), 
        Password: casper.cli.get('p')
    }, false);
});

casper.then(function clickButton() {
    this.click('input[name="btnSignIn"]');
});

casper.thenOpen('https://my.fullerton.edu/PortalVSVB/PortalPSoftLoginTOnline/CSUPsoft.aspx');
casper.thenOpen('https://mycsuf-ng.fullerton.edu/psp/pfulprd/EMPLOYEE/HFULPRD/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?PORTALPARAM_PTCNAV=FUL_POC_HC_SSS_STUDENT_CENTER&EOPP.SCNode=EMPL&EOPP.SCPortal=EMPLOYEE&EOPP.SCName=FUL_STUDENT_CENTER&EOPP.SCLabel=Student%20Center&EOPP.SCPTcname=&FolderPath=PORTAL_ROOT_OBJECT.PORTAL_BASE_DATA.CO_NAVIGATION_COLLECTIONS.FUL_STUDENT_CENTER.FUL_S200711261443438320871608&IsFolder=false');
casper.thenOpen('https://cmsweb.fullerton.edu/psc/HFULPRD/EMPLOYEE/HFULPRD/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?Page=SSR_CLSRCH_ENTRY&Action=U&TargetFrameName=None');

    // Selecting CPSC 
       casper.then(function(){
        casper.evaluate(function() {
            var courses = document.getElementById("SSR_CLSRCH_WRK_SUBJECT$0").value = "CPSC"; //select option you're needed
        }); 
    });

    // Deselect "Show open classes only" box 
        casper.thenClick(x('//*[@id="SSR_CLSRCH_WRK_SSR_OPEN_ONLY$3"]'), function() {
            console.log("Woop!");
        });  

    // Selecting Matching Greater than
       casper.then(function(){
        casper.evaluate(function() {
            var courses = document.getElementById("SSR_CLSRCH_WRK_SSR_EXACT_MATCH1$1").value = "G"; //select option you're needed
        }); 
    }); 

    // Input 0 
       casper.then(function(){
        casper.evaluate(function() {
            var courses = document.getElementById("SSR_CLSRCH_WRK_CATALOG_NBR$1").value = 0 ; //select option you're needed
        }); 
    }); 
casper.then(function(){
        this.wait(5000, function() {
            this.echo("I've waited for a second.");
            this.capture('search_filled.png');
        }); 
    }); 
    // Clicking on Search    
        casper.thenClick(x('//*[@id="CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH"]'), function() {
            console.log("Woop!");
        });  



// Clicking "show more than 50 OK" 
casper.then(function(){
        if(casper.exists('#ICSave')){
            this.echo('There are more than 50 courses.');

            // CLick on the "Show more than 50" courses.
            casper.thenClick(x('//*[@id="#ICSave"]'), function() {
                console.log("Clicking Ok for Show more than 50!");
            });

            // Print out a picture of available classes.
            casper.then(function(){  
                this.wait(8500, function() {
                this.echo("I've waited for a second.");
                this.capture('cpsc list.png');
            });  
                 });

        } // End If 
        else {
            this.echo('There are less than 50 courses.');

            // Print out a picture of available classes.
            casper.then(function(){   
                    this.wait(8500, function() {
                    this.echo("I've waited for a second.");
                    this.capture('cpsc list.png');
                });
            });
        } // End else

    });

    //Print the first class name
       casper.then(function(){
        casper.evaluate(function() {
                var tableofcourses = document.getElementById("ACE_$ICField236$0");
                return Array.prototype.map.call(tableofcourses, function(e) {
                console.log("this the table contents: ", e.innerText); // let's get node text instead of HTMLelement!
            });

        }); 
    });


casper.thenEvaluate(function(){
    console.log("Page Title " + document.title);
    console.log("Base URL is " + document.baseURI);
    
});

casper.run();