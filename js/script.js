function loadData() {
    
    event.preventDefault();
    
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    // load wikipedia data
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);

function loadDoc() {
    event.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("signIn").innerHTML =
                this.responseText;            
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send();
};

function readMore() {
    event.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("change1").innerHTML =
                this.responseText;            
    }
  };
  xhttp.open("GET", "read_info.txt", true);
  xhttp.send();
};
