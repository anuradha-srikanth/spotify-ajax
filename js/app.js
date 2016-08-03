
function showSearchResults(){

}

var showQuestion = function(question) {
    
    // clone our result template code
    var result = $('.templates .result').clone();
    console.log(result);
    
    // Set the question properties in result
    var pic = result.find('.picture');
    pic.html('<img id="picture" src="' + question.images[0].url + '"</img>');

    var name = result.find('.artistName');
    name.html('<p>' + question.name + '</p>');
    //console.log(result)

    var genre = result.find('.genre');
    genre.html('<p>' + question.genres[0] + '</p>');

    var popularity = result.find('.popularity');
    popularity.html('<p>' + question.popularity + '</p>');
    //console.log('result' + question)
    // set some properties related to asker
    /*var asker = result.find('.asker');
    asker.html('<p>Name: <a target="_blank" '+
        'href=https://stackoverflow.com/users/' + question.owner.user_id + ' >' +
        question.owner.display_name +
        '</a></p>' +
        '<p>Reputation: ' + question.owner.reputation + '</p>'
    );*/
    return result;
};

var getSimilar = function(artistId){
    $.ajax({
        url: "https://api.spotify.com/v1/artists/" + artistId + "/related-artists",
    })
    .done(function(result){
        console.log(result.artists);
        $.each(result.artists, function(i, item) {
            var question = showQuestion(item);
            $('.results').append(question);
        });
        console.log(result);
    });
}

var getUnanswered = function(tags) {
    $.ajax({
        url: "https://api.spotify.com/v1/search", //?q=" + tags +"&type=artist",
        data:{
            q:tags,
            type: 'artist'
        },
        type: "GET"
    })
    .done(function(result){ //this waits for the ajax to return with a succesful promise object
        /*var searchResults = showSearchResults(request.tagged, result.items.length);

        $('.search-results').html(searchResults);
        //$.each is a higher order function. It takes an array and a function as an argument.
        //The function is executed once for each item in the array.*/
        console.log(result.artists.items[0]);
        getSimilar(result.artists.items[0].id)
        /*$.each(result.artists.items, function(i, item) {
            var question = showQuestion(item.name);
            $('.results').append(question);
        });*/
    })
    .fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
        var errorElem = showError(error);
        $('.search-results').append(errorElem);
    });
};


$(document).ready( function(){
    $('#search-term').submit(function(e){
        e.preventDefault();
        var query = $('#query').val();
        getUnanswered(query);
    });
});