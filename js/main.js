//add listener for form submission
document.getElementById('myform').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
  //get form values
  var siteName =document.getElementById('sitename').value;
  var siteUrl =document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
      return false;
  }



  var bookmark = {
      name:siteName,
      url: siteUrl}
     /*
      //local storage test
      localStorage.setItem('test','hello world');
      console.log( localStorage.getItem('test'));
      localStorage.removeItem('test');
      console.log( localStorage.getItem('test'));
      */

      //Test if bookmark is null
      if(localStorage.getItem('bookmarks') === null){
          //init array
          var bookmarks = [];

        //add to array
        bookmarks.push(bookmark);
        //set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }else{
          //get bookmarks from localstorage
          var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
          //add bookmark to array
          bookmarks.push(bookmark);
          //reset back to localstorage
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
  
    //prevent form from submitting
    e.preventDefault();
  }
  //delete bookmark
  function deleteBookmark(url){
      //get bookmarks from local storage
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      //loop through bookmarks
      for(var i =0;i< bookmarks.length;i++){
          if(bookmarks[i].url == url){
              //remove from array
              bookmarks.splice(i, 1);
          }
        }
        //reset back to local storage
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          }

          //clear form
          document.getElementById('myform').reset();

          //refetch bookmarks
          fetchBookmarks();
       
  

  

  //fetch bookmarks
  function fetchBookmarks(){

    //get  bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   //get output id
   var bookmarksResults = document.getElementById('bookmarksResults');
   //build output
   bookmarksResults.innerHTML = '';
   for(var i = 0; i < bookmarks.length; i++){
       var name = bookmarks[i].name;
       var url = bookmarks[i].url;  

       bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+ 
                                      '<a class="btn btn-default" target="_blank" href="'+url+'">visit</a> ' +  
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a> ' + 
                                      '</h3>'+
                                      '<div>';
   }
    

  }

  function validateForm(siteName, siteUrl){
  if(!siteName ||  !siteUrl){
    alert('please fill in the form');
    return false;
}
 var expression = /[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)?/gi;
 var regex = new  RegExp(expression);
 
 if(!siteUrl.match(regex)){
     alert('please use a valid url');
     return false;
 }
 return true;
}