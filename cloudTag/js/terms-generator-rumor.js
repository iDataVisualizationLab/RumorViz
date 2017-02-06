/**
 * Created by Manohar on 25-Oct-16.
 */
function preProcessData() {
  var topTerms = new Hashtable();
  //var allTerms = new Hashtable();
  var orgTerms = new Hashtable();
  var personsTerms = new Hashtable();
  var miscTerms = new Hashtable();
  var locationTerms = new Hashtable();
  var wnOrgTerms = new Hashtable();
  var wnpersonsTerms = new Hashtable();
  var wnmiscTerms = new Hashtable();
  var wnlocationTerms = new Hashtable();
  var allTerms = new Object();
  var lines = 0;
    var formatDate = d3.time.format("%Y-%m-%d %H:%M:%S");

 // Variable for allOtherTerms
 var allOtherTerms = new Object();
      var otherTerms = "Others";
     allOtherTerms[otherTerms] = new Object();
     allOtherTerms[otherTerms].category = "Person";
 allOtherTerms[otherTerms].frequency = 0;
    var allFreq = 0;

 // End of Variable for allOtherTerms

 // Variables for sentiments data

 var sentiments = new Object();
var defPosSentiment = 0;
var defNegSentiment = 0;
var posCount = 0;
 var negCount = 0;

  this.startProcess = function (filename, callback) {

  //  console.log(filename);
   // d3.tsv("data/wikinews.tsv", function (data) {
      d3.json("data/rumor600.json", function(error, data) {



      data.forEach(function (d) {
        d.date = Date.parse(d.created_at);
        d.newDate = new Date(d.date);
       // console.log(formatDate(d.newDate));

        var time = formatDate(d.newDate);

        // Code start for Sentiments data
        var hours = parse2(d.newDate);

      //  console.log(d.topsy.document_info.sentiment);
        if (sentiments[hours]) {



            if(d.topsy.document_info.sentiment != undefined){
                            if(!isNaN(sentiments[hours].posCount))
                            posCount = sentiments[hours].posCount;
                          if(!isNaN(sentiments[hours].negCount) )
                            negCount = sentiments[hours].negCount;
                          if(!isNaN(sentiments[hours].posSentiment))
                            defPosSentiment = sentiments[hours].posSentiment;
                          if(!isNaN(sentiments[hours].negSentiment))
                            defNegSentiment = sentiments[hours].negSentiment;
                  if(d.topsy.document_info.sentiment > 0){
                      sentiments[hours].posSentiment = defPosSentiment + d.topsy.document_info.sentiment;
                      sentiments[hours].posCount = posCount + 1;
                  }
                  else if(d.topsy.document_info.sentiment < 0)
                    {
                      sentiments[hours].negSentiment = defNegSentiment + d.topsy.document_info.sentiment;
                       sentiments[hours].negCount = negCount + 1;
                    }
                }

              }
          else {
                sentiments[hours] = new Object();
                  sentiments[hours].posSentiment = 0;
                      sentiments[hours].posCount = 0;
                      sentiments[hours].negSentiment = 0;
                       sentiments[hours].negCount = 0;

                if(d.topsy.document_info.sentiment != undefined){
                  if(d.topsy.document_info.sentiment > 0){
                      sentiments[hours].posSentiment = d.topsy.document_info.sentiment;
                      sentiments[hours].posCount = 1;
                      sentiments[hours].negSentiment = 0;
                       sentiments[hours].negCount = 0;
                  }
                  else if(d.topsy.document_info.sentiment < 0)
                    {
                      sentiments[hours].negSentiment = d.topsy.document_info.sentiment;
                       sentiments[hours].negCount = 1;
                       sentiments[hours].posSentiment = 0;
                         sentiments[hours].posCount = 0;
                    }
                }
         }

        




      // Below is the codes for generating terms.
      //  Here persons represent the terms array in each tweets
        var persons = d.topsy.terms;
        

      
        // Here month represent the hours slot actually
        var month = parse2(d.newDate);

    
      //var month = time.substring(0, 4) + " " + time.substring(5, 7);


         ++lines;
        var personsArray = persons;    // Taking all the terms of current tweet into personArray

        personsArray.forEach(function (d) {


          if (d != "") {
            //allTerms consideration.

            if (allTerms[d]) {
           //   console.log(allTerms[d]);
              var freq = allTerms[d].frequency;
              allTerms[d].frequency = freq + 1;

              // allOtherTerms
              allOtherTerms[otherTerms].frequency = allOtherTerms[otherTerms].frequency + 1;
               // End of allOtherTerms


              if (allTerms[d][month]) {
                allTerms[d][month].freq = allTerms[d][month].freq + 1;
                allTerms[d][month].blogs.push(lines);
              }
              else {
                allTerms[d][month] = new Object();
                allTerms[d][month].freq = 1;
                allTerms[d][month].blogs = [];
                allTerms[d][month].blogs.push(lines);

              }
              // allOtherTerms
              if (allOtherTerms[otherTerms][month]) {

                allOtherTerms[otherTerms][month].freq = allOtherTerms[otherTerms][month].freq + 1;
                allOtherTerms[otherTerms][month].blogs.push(lines);
              }
              else {
                allOtherTerms[otherTerms][month] = new Object();
                allOtherTerms[otherTerms][month].freq = 1;
                allOtherTerms[otherTerms][month].blogs = [];
                allOtherTerms[otherTerms][month].blogs.push(lines);

              }

              // End of allOtherTerms

            }
            else {
              allTerms[d] = new Object();
              allTerms[d].frequency = 1;
              allTerms[d].category = "Person";
           
           //   console.log(allTerms[d].sentiment);

              // allOtherTerms
                allOtherTerms[otherTerms].frequency = allOtherTerms[otherTerms].frequency + 1;
               

               // End of allOtherTerms

              if (allTerms[d][month]) {
                allTerms[d][month].freq = allTerms[d][month].freq + 1;
                allTerms[d][month].blogs.push(lines);
              }
              else {
                allTerms[d][month] = new Object();
                allTerms[d][month].freq = 1;
                allTerms[d][month].blogs = [];
                allTerms[d][month].blogs.push(lines);


              }

               // allOtherTerms

               if (allOtherTerms[otherTerms][month]) {
                allOtherTerms[otherTerms][month].freq = allOtherTerms[otherTerms][month].freq + 1;
                allOtherTerms[otherTerms][month].blogs.push(lines);
              }
              else {
                allOtherTerms[otherTerms][month] = new Object();
                allOtherTerms[otherTerms][month].freq = 1;
                allOtherTerms[otherTerms][month].blogs = [];
                allOtherTerms[otherTerms][month].blogs.push(lines);
              }

              // End of allOtherTerms


            }
            

          }
    
        })


  //console.log(allOtherTerms[otherTerms]);



       /* //Organization Terms
        var orgs = d.organization;
        var orgsArray = orgs.split("|");
        orgsArray.forEach(function (d) {

          if (d != "") {
            //allTerms consideration.
            if (allTerms[d]) {
              var freq = allTerms[d].frequency;
              allTerms[d].frequency = freq + 1;
              if (allTerms[d][month]) {
                allTerms[d][month].freq = allTerms[d][month].freq + 1;
                allTerms[d][month].blogs.push(lines);
              }
              else {
                allTerms[d][month] = new Object();
                allTerms[d][month].freq = 1;
                allTerms[d][month].blogs = [];
                allTerms[d][month].blogs.push(lines);

              }
            }
            else {
              allTerms[d] = new Object();
              allTerms[d].frequency = 1;
              allTerms[d].category = "Organization";
              if (allTerms[d][month]) {
                allTerms[d][month].freq = allTerms[d][month].freq + 1;
                allTerms[d][month].blogs.push(lines);
              }
              else {
                allTerms[d][month] = new Object();
                allTerms[d][month].freq = 1;
                allTerms[d][month].blogs = [];
                allTerms[d][month].blogs.push(lines);

              }

            }

          }

        })

        //Misc Terms
        var misc = d.miscellaneous;
        var miscArray = misc.split("|");
        miscArray.forEach(function (d) {
          if (d != "") {
            //allTerms consideration.
            if (allTerms[d]) {
              var freq = allTerms[d].frequency;
              allTerms[d].frequency = freq + 1;
              if (allTerms[d][month]) {
                allTerms[d][month].freq = allTerms[d][month].freq + 1;
                allTerms[d][month].blogs.push(lines);
              }
              else {
                allTerms[d][month] = new Object();
                allTerms[d][month].freq = 1;
                allTerms[d][month].blogs = [];
                allTerms[d][month].blogs.push(lines);

              }
            }
            else {
              allTerms[d] = new Object();
              allTerms[d].frequency = 1;
              allTerms[d].category = "Misc";
              if (allTerms[d][month]) {
                allTerms[d][month].freq = allTerms[d][month].freq + 1;
                allTerms[d][month].blogs.push(lines);
              }
              else {
                allTerms[d][month] = new Object();
                allTerms[d][month].freq = 1;
                allTerms[d][month].blogs = [];
                allTerms[d][month].blogs.push(lines);

              }

            }

          }

        })

        //Location Terms
        var location = d.location;
        var locationArray = location.split("|");
        locationArray.forEach(function (d) {
          if (d != "") {
            //allTerms consideration.
            if (allTerms[d]) {
              var freq = allTerms[d].frequency;
              allTerms[d].frequency = freq + 1;
              if (allTerms[d][month]) {
                allTerms[d][month].freq = allTerms[d][month].freq + 1;
                allTerms[d][month].blogs.push(lines);
              }
              else {
                allTerms[d][month] = new Object();
                allTerms[d][month].freq = 1;
                allTerms[d][month].blogs = [];
                allTerms[d][month].blogs.push(lines);

              }
            }
            else {
              allTerms[d] = new Object();
              allTerms[d].frequency = 1;
              allTerms[d].category = "Location";
              if (allTerms[d][month]) {
                allTerms[d][month].freq = allTerms[d][month].freq + 1;
                allTerms[d][month].blogs.push(lines);
              }
              else {
                allTerms[d][month] = new Object();
                allTerms[d][month].freq = 1;
                allTerms[d][month].blogs = [];
                allTerms[d][month].blogs.push(lines);

              }

            }

          }

        })*/

      });

      // huffingpost
      /*  d3.tsv("data/huffington.tsv", function (data) {
       data.forEach(function (d) {
       var persons = d.person;
       ++lines;
       var personsArray = persons.split("|");
       personsArray.forEach(function (d) {

       if (d != "") {
       //allTerms consideration.
       if (allTerms.containsKey(d) == true) {
       var temp = allTerms.get(d);
       temp.frequency = temp.frequency + 1;
       if (temp.monthfreq.containsKey(month)) {
       var val = temp.monthfreq.get(month);
       temp.monthfreq.put(month, val + 1);
       }
       else {
       temp.monthfreq.put(month, 1);
       }
       //   temp.blogs.push(lines);
       allTerms.put(d, temp);
       }
       else {
       var value = {};
       value.frequency = 1;
       value.monthfreq = new Hashtable();
       value.monthfreq.put(month, 1);
       //  value.blogs = [];
       // value.blogs.push(lines);
       // value.category="person"
       allTerms.put(d, value);
       }


       }
       })

       //Organization Terms
       var orgs = d.organization;
       var orgsArray = orgs.split("|");
       orgsArray.forEach(function (d) {
       if (d != "") {
       //allTerms consideration.
       if (allTerms.containsKey(d) == true) {
       var temp = allTerms.get(d);
       temp.frequency = temp.frequency + 1;
       if (temp.monthfreq.containsKey(month)) {
       var val = temp.monthfreq.get(month);
       temp.monthfreq.put(month, val + 1);
       }
       else {
       temp.monthfreq.put(month, 1);
       }
       //   temp.blogs.push(lines);
       allTerms.put(d, temp);
       }
       else {
       var value = {};
       value.frequency = 1;
       value.monthfreq = new Hashtable();
       value.monthfreq.put(month, 1);
       //  value.blogs = [];
       // value.blogs.push(lines);
       // value.category="person"
       allTerms.put(d, value);
       }


       }
       })

       //Misc Terms
       var misc = d.miscellaneous;
       var miscArray = misc.split("|");
       miscArray.forEach(function (d) {
       if (d != "") {
       //allTerms consideration.
       if (allTerms.containsKey(d) == true) {
       var temp = allTerms.get(d);
       temp.frequency = temp.frequency + 1;
       if (temp.monthfreq.containsKey(month)) {
       var val = temp.monthfreq.get(month);
       temp.monthfreq.put(month, val + 1);
       }
       else {
       temp.monthfreq.put(month, 1);
       }
       //   temp.blogs.push(lines);
       allTerms.put(d, temp);
       }
       else {
       var value = {};
       value.frequency = 1;
       value.monthfreq = new Hashtable();
       value.monthfreq.put(month, 1);
       //  value.blogs = [];
       // value.blogs.push(lines);
       // value.category="person"
       allTerms.put(d, value);
       }


       }
       })

       //Location Terms
       var location = d.location;
       var locationArray = location.split("|");
       locationArray.forEach(function (d) {
       if (d != "") {
       //allTerms consideration.
       if (allTerms.containsKey(d) == true) {
       var temp = allTerms.get(d);
       temp.frequency = temp.frequency + 1;
       if (temp.monthfreq.containsKey(month)) {
       var val = temp.monthfreq.get(month);
       temp.monthfreq.put(month, val + 1);
       }
       else {
       temp.monthfreq.put(month, 1);
       }
       //   temp.blogs.push(lines);
       allTerms.put(d, temp);
       }
       else {
       var value = {};
       value.frequency = 1;
       value.monthfreq = new Hashtable();
       value.monthfreq.put(month, 1);
       //  value.blogs = [];
       // value.blogs.push(lines);
       // value.category="person"
       allTerms.put(d, value);
       }


       }
       })

       });

       });*/

      /*  //  var allTermsEntries = allTerms.entries();
       var allTermsJson = [];
       for(var entry in allTerms){
       var jsonEntry = {}
       jsonEntry.term = entry;
       jsonEntry.properties = {};
       jsonEntry.properties.frequency = allTerms[entry].frequency;
       jsonEntry.properties.monthfreq = [];
       var month = d[1].monthfreq.entries();
       month.forEach(function (r) {
       jsonEntry.properties.monthfreq.push({ month: r[0], freq: r[1] })
       })
       allTermsJson.push(jsonEntry);

       }
       allTerms.forEach(function (d) {

       })
       var finalJson = JSON.stringify(allTerms);

       */


      //


      /*   var url = URL.createObjectURL(new Blob([finalJson], { type: 'text/json' }));
       var dlAnchorElem = document.createElement('a');
       dlAnchorElem.setAttribute("href", url);
       dlAnchorElem.setAttribute("download", "hp_termsfrequency.json");
       dlAnchorElem.click();*/
        
      callback(allTerms);
      console.log(lines);

    });
          console.log(sentiments)
allTerms["Other Terms"] = allOtherTerms["Others"];
 
  }

  this.getRelated = function (term) {
    //
    //var termDetails = allTerms.get(term);
    //var related = [];
    //var blogs = termDetails.blogs;
    //allTerms.each(function (key, value) {
    //    if (term != key) {
    //        var count = 0;
    //        var currblogs = value.blogs;
    //        for (var i = 0; i < blogs.length; i++) {
    //            if (currblogs.indexOf(blogs[i]) > -1) {
    //                ++count;
    //            }
    //        }
    //        if (count > 0) {
    //            var term = {};
    //            term.term = key;
    //            term.freq = count;
    //            related.push(term);
    //        }
    //    }
    //})
    //related.sort(function (a, b) {
    //    return b.freq - a.freq;
    //})
    //return related.slice(0, 49);

  }
  this.getMonthFreq = function (term) {
    //
    var termDetails = allTerms.get(term);
    var result = [];
    var Months = termDetails.monthfreq;
    Months.each(function (key, value) {
      result.push({"month": key, "freq": value})
    });
    return result;
    //allTerms.each(function (key, value) {
    //    if (term != key) {
    //        var count = 0;
    //        var currblogs = value.blogs;
    //        for (var i = 0; i < blogs.length; i++) {
    //            if (currblogs.indexOf(blogs[i]) > -1) {
    //                ++count;
    //            }
    //        }
    //        if (count > 0) {
    //            var term = {};
    //            term.term = key;
    //            term.freq = count;
    //            related.push(term);
    //        }
    //    }
    //})
    //related.sort(function (a, b) {
    //    return b.freq - a.freq;
    //})
    //return related.slice(0, 49);

  }
  this.getPersonTerms = function () {
    return personsTerms.entries();
  }
  this.getOrganizationTerms = function () {
    return orgTerms.entries();
  }
  this.getMiscTerms = function () {
    return miscTerms.entries();
  }
  this.getLocationTerms = function () {
    return locationTerms.entries();
  }
  this.getTerm = function (iterm) {
    return allTerms.get('gop');
  }
  return this;
}