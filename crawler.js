var colorizer = require('colorizer').create('Colorizer');
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

var u = casper.cli.get('u')
var p = casper.cli.get('p')


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
 

    this.fill('form#Form1', { 
        Username: u, 
        Password: p
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

    // Selecting Spring 2014
       casper.then(function(){
        casper.evaluate(function() {
            var courses = document.getElementById("CLASS_SRCH_WRK2_STRM$44$").value = "2143"; //select option you're needed
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

     casper.then(function(){   
            this.wait(8500, function() {
            this.echo("I've waited for a second.");
            this.capture('cpsc list.png');
        });
             });


// Clicking "show more than 50 OK" 
casper.then(function(){
        if(this.exists('input.PSPUSHBUTTONTBOK')){
            this.echo('There are more than 50 courses.');

            // CLick on the "Show more than 50" courses.
            casper.thenClick(x('//*[@id="#ICSave"]'), function() {
                console.log("Clicking Ok for Show more than 50!");
            });
            casper.then(function(){  
                this.wait(8500, function() {
                this.echo("I've waited for a second.");
                this.capture('cpsc list.png');
            });  
                 });

        } else {
            this.echo('There are less than 50 courses.');
            casper.then(function(){   
                    this.wait(8500, function() {
                    this.echo("I've waited for a second.");
                    this.capture('cpsc list.png');
                });
            });
        }

    });

    //Print all classes name
       casper.then(function(){
            casper.evaluate(function() {

            // Classes increment from 0 - 149 for Spring Semester, this will go through every course indicated by J
            var j = 0;
            var iterating_courses = 0;
            var section_count = 0;

            for (var i = 0; i < document.getElementsByClassName("SSSHYPERLINKBOLD").length; i++) { 
                // Get the Course Name 
                var courseName = document.getElementById("DERIVED_CLSRCH_DESCR200$"+i).innerText;
                
                // Provides the means for getting course count.
                var split = document.getElementById("win0div$ICField244GP$"+i).innerText.split("of")[1];
                
                // Take the first two values of the split text, which includes the number of sections of each class
                var coursesCount = parseInt(split[1] + split[2]);

<<<<<<< HEAD
=======
                // Print the name of the course.
                console.log("Class Name is: " + courseName + "Sections: " + coursesCount);

>>>>>>> afaf0bd7f5874dd09fe71b6e38abb69fae61bfd9
                // Count the iterating courses
                iterating_courses = parseInt(iterating_courses) + parseInt(coursesCount);

                // Print the name of the course and sections
                console.log("\nCourse Name is: " + courseName + "\nSections: " + coursesCount + "\n");

                // Start the For loop of doooooooomm
                for (j; j < iterating_courses; j++) { 
                        section_count++;
                        var class_section = document.getElementById("DERIVED_CLSRCH_SSR_CLASSNAME_LONG$"+j).innerText;
                        var class_information = document.getElementById("trSSR_CLSRCH_MTG1$"+j+"_row1").innerText.split("\n");
                        var class_status = document.getElementById("win0divDERIVED_CLSRCH_SSR_STATUS_LONG$"+j).getElementsByTagName('img')[0].getAttribute('alt'); 
                        
                        //document.images("win0divDERIVED_CLSRCH_SSR_STATUS_LONG$"+j).alt;
                        var class_time = class_information[0];
                        var class_room = class_information[1];
                        var class_instructor = class_information[2];
                        var class_dates = class_information[3];

                        console.log("\nClass Information \n\tSection Count is: " + section_count + "\n\tClass Section: " + class_section +"\n\tClass Status: " + class_status + "\n\tClass Time: " + class_time + "\n\tClass Room: " + class_room + "\n\tClass Instructor: " + class_instructor + "\n\tClass Dates: " + class_dates + "\n");

                }
                section_count = 0;
            } // End First For loop!

            });
        });

casper.thenEvaluate(function(){
    console.log("Page Title " + document.title);
    console.log("Base URL is " + document.baseURI);
    
});

casper.run();
