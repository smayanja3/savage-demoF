var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        // p -> p -> c = li -> span -> i tag in index.ejs then [i]
        const name = this.parentNode.parentNode.childNodes[1].innerText 
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp  
          })
        }) 
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          console.log(name,msg,thumbUp)
          window.location.reload(true)
        })
      });
});
////////////// 
// WhAT I DID 
/////////////
/*I added a new function for the action of thum down but kept the thumbUp because i would have had to add aa new put in the server.js and every time i did that it always returned NA.
So i tried messing with the numbers on main.js and it worked. no need to add thumbDown just changed the action of thumUp in thumbDown Function
*/

/*
 <!-- to use js in ejs you ned <% %>
    // to get a direct value <%=  -->
*/
 
///THUMS DOWN
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('down', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp 
            // originaly had thumUp:thumbUp -1 and it worked but why does it owkr this way too ???
            /// added the numbers to main js instead of server side <3
            // sidenote didn't know you can go into negatives thats cool
          })
        }) 
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});



/*
need to break this down too
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
^^^^ why this works and how am i able to hit enter to post??? for the click function? is it because after the click, its just function inside and no name?
*/

/* 
Though of Wagons
- how many sets can you havee in your 'put'
- create a thumbDown function and put the value to negative
- create a new set inside of the original put and set it to thumbDown -1 
- create a new 'put' and assign thumbDown to either +1 or -1 but when i  
  did thumUp worked but thumbDown returned NA 
-  create a negative thumb down and it made a difference until i hit zero then NA
- create thumUp in down function to keep it all focused on thumUp
- remove thumUp number from server and try in main.js
- IT WORKED hahahahahahahahahahah evil laugh
- 
*/