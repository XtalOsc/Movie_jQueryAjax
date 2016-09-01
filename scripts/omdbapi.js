console.log( 'ondb_api.js sourced' );
// global search array
var movies = [];
//global favorites
var favorites = [];

$( document ).ready( function(){
  console.log( 'document ready' );

  //displayResults
  var displayResults = function(){
  console.log('in displayResults');
  console.log('global movie array', movies);
  $('#outputMovie').empty();
  $('#outputMovie').append('<h3>Results:<h3>');
  for (var i = 0; i < movies.length; i++) {
    $('#outputMovie').append('<p><h3>'+movies[i].Title+' (' + movies[i].Year + ')</h3> \n' + '<img src="' + movies[i].Poster + '"></p><button data-index="' + i + '" class="favbtn">Favorite</button>');
  }//end for
  console.log('end display results function');
};//end function
console.log('outside of function');

$( '.favbtn' ).on( 'click', function(){
  console.log('in favorites');

  var index = $( this ).data("index");

  console.log( "Index is:", index );

  console.log( 'Favorite Movie: ' + movies[index].Title + ' ' + movies[index].Year);

  //move the favorite to the "Favorite Movie" list on the DOM
  $('#outputFavorite').empty();
  $('#outputFavorite').append('<p><h3>'+movies[index].Title+' (' + movies[index].Year + ')</h3> \n' + '<img src="' + movies[index].Poster + '"></p>');
  //Remove favorite movie from the "Movies" list on the DOM
    movies.splice( index, 1 );
  // show cars in garage
  displayResults();
}); // end no


  $( '#searchButton' ).on( 'click', function(){
    console.log( 'in searchButton on click' );
    // get user input
    var movieName = $( '#movieNameIn' ).val();
    console.log( 'searching for:', movieName );
    // omdbapi search url
    // can test the url from console log in Chrome
    var searchURL = 'http://www.omdbapi.com/?s=' + movieName;
    console.log( 'searchURL:', searchURL );
    // ajax call:
    $.ajax({
      url: searchURL,
      dataType: 'JSON',
      success: function( data ){
        console.log( 'ajax success data:', data.Search );
        // store the search results in searchResults
        //searchResults = data.Search;
        console.log( 'searchResults:', data.Search );
        for (var i = 0; i < data.Search.length; i++) {
            if(data.Search[i].Type=="movie"){
          movies.push(data.Search[i]);
        }//end if
        else{
        }//end else
        }//end for
        displayResults();
      } // end success
    }); // end ajax
  }); // end searchButton on click
}); // end doc ready
