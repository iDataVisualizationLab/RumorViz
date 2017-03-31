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
  this.startProcess = function (filename, callback) {
    d3.tsv(filename, function (data) {


      data.forEach(function (d) {
        var persons = d.person;
        var time = d.time;
        var month = d.time.substring(0, 4) + " " + d.time.substring(5, 7);
        ++lines;
        var personsArray = persons.split("|");
        personsArray.forEach(function (d) {

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
              allTerms[d].category = "Person";
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

        //Organization Terms
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

        })

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