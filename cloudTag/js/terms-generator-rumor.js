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
//-------------------------------------------

 // Variables for sentiments data


var defPosSentiment = 0;
var defNegSentiment = 0;
var posCount = 0;
 var negCount = 0;

 // End of variables for sentiments data
 //----------------------------------------


 // Variables for most frequent terms in hous
    



 // Variables for most frequent terms in hous

  this.startProcess = function (filename, callback) {


console.log(sentiments);
  //  console.log(filename);
   // d3.tsv("data/wikinews.tsv", function (data) {
      d3.json("data/rumor600.json", function(error, data) {
      
      //console.log(data);
        


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
                      sentiments[hours].totCount = sentiments[hours].totCount + 1;
                  }
                  else if(d.topsy.document_info.sentiment < 0)
                    {
                      sentiments[hours].negSentiment = defNegSentiment + d.topsy.document_info.sentiment;
                       sentiments[hours].negCount = negCount + 1;
                       sentiments[hours].totCount = sentiments[hours].totCount + 1;
                    }
                    else{
                      sentiments[hours].totCount = sentiments[hours].totCount + 1;
                    }
                }

              }
          else {
                sentiments[hours] = new Object();
                  sentiments[hours].posSentiment = 0;
                      sentiments[hours].posCount = 0;
                      sentiments[hours].negSentiment = 0;
                       sentiments[hours].negCount = 0;
                       sentiments[hours].totCount = 0;

                if(d.topsy.document_info.sentiment != undefined){
                  if(d.topsy.document_info.sentiment > 0){
                      sentiments[hours].posSentiment = d.topsy.document_info.sentiment;
                      sentiments[hours].posCount = 1;
                      sentiments[hours].negSentiment = 0;
                       sentiments[hours].negCount = 0;
                       sentiments[hours].totCount = 1;
                  }
                  else if(d.topsy.document_info.sentiment < 0)
                    {
                      sentiments[hours].negSentiment = d.topsy.document_info.sentiment;
                       sentiments[hours].negCount = 1;
                       sentiments[hours].posSentiment = 0;
                         sentiments[hours].posCount = 0;
                         sentiments[hours].totCount = 1;
                    }
                    else{
                      sentiments[hours].totCount = 1;
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




     
      });
frequentTermsInHours(data);
        
      callback(allTerms);
    });
console.log(allTerms);
allTerms["Other Terms"] = allOtherTerms["Others"];

  }

  this.getRelated = function (term) {
   
  }
  this.getMonthFreq = function (term) {
    //
    var termDetails = allTerms.get(term);
    var result = [];
    var Months = termDetails.monthfreq;
    Months.each(function (key, value) {
      result.push({"month": key, "freq": value})
    });
    console.log(result);
    return result;
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
  function frequentTermsInHours(data){
   

      data.sort(function(a, b){
               return a.date-b.date;
      })
      hourlyTerms.pos = new Object();
      hourlyTerms.neg = new Object();
      var hourlyTwitt = [];
      var startTerm = [];
      data.forEach(function (d) {

      var hours = parse2(d.newDate);
        if(d.topsy.document_info.sentiment >= 0){
              if (hourlyTerms.pos[hours]) {
                      hourlyTerms.pos[hours].terms = hourlyTerms.pos[hours].terms.concat(d.topsy.terms);
              }

              else{
                      hourlyTerms.pos[hours] = new Object();
                      hourlyTerms.pos[hours].terms = startTerm.concat(d.topsy.terms);
                      
              }
        }
        else{
          if (hourlyTerms.neg[hours]) {
                      hourlyTerms.neg[hours].terms = hourlyTerms.neg[hours].terms.concat(d.topsy.terms);
              }

              else{
                      hourlyTerms.neg[hours] = new Object();
                      hourlyTerms.neg[hours].terms = startTerm.concat(d.topsy.terms);
                      
              }
        }

      })


      for(var hour in hourlyTerms.pos){
          var allTerms = new Object();
            var lines = 0;
          var terms = hourlyTerms.pos[hour].terms;
          terms.forEach(function (d) {
               if (d != "") {

            if (allTerms[d]) {
              var freq = allTerms[d].frequency;
              allTerms[d].frequency = freq + 1;
            }
            else {
              allTerms[d] = new Object();
              allTerms[d].frequency = 1;
              allTerms[d].category = "Person";
            }
            

          }

          })
          hourlyTerms.pos[hour].termsWithFreq = allTerms;
          hourlyTerms.pos[hour].termsArray = [];
          var i = 0;
          for(var terms in allTerms){
              var arr = new Object();
              arr.term = terms;
              arr.freq = allTerms[terms].frequency;
              hourlyTerms.pos[hour].termsArray.push(arr);
          }
      }

          for(var hour in hourlyTerms.neg){
          var allTerms = new Object();
            var lines = 0;
          var terms = hourlyTerms.neg[hour].terms;
          terms.forEach(function (d) {
               if (d != "") {

            if (allTerms[d]) {
              var freq = allTerms[d].frequency;
              allTerms[d].frequency = freq + 1;
            }
            else {
              allTerms[d] = new Object();
              allTerms[d].frequency = 1;
              allTerms[d].category = "Person";
            }
            

          }

          })
          hourlyTerms.neg[hour].termsWithFreq = allTerms;
          hourlyTerms.neg[hour].termsArray = [];
          var i = 0;
          for(var terms in allTerms){
              var arr = new Object();
              arr.term = terms;
              arr.freq = allTerms[terms].frequency;
              hourlyTerms.neg[hour].termsArray.push(arr);
          }
      }

      
    console.log(hourlyTerms)
      

  }

  return this;
}