$(document).ready(function () { 
	var movie_controller = new Movie_Controller(movies["movies"]);
});

function Movie_Controller(data) {
    this.movies=data;
    
    /*** constants ***/ 
    this.movie_template="#movie-template";
    this.movie_list="#movie_list";
    this.grid_icon="#grid_image";
    this.list_icon="#list_image";
    this.field="#search_bar";
    this.search_button="#search_button";
    this.suggestions="#suggestions_box";
    this.combo_box="#sort_dropdown"
    var self=this;

    this.load_movies();
    //Wrapper functions
    var make_grid_function=function(){
        self.make_grid.call(self);
    };
    var make_list_function=function(){
        self.make_list.call(self);
    };
    var search_function=function(){
        self.search.call(self);       
    };
    
    var search_results_function=function(){
        self.search_click.call(self);
    };
    
    var sort_movies_function=function() {
        self.sort_movies.call(self);
    };
    
    //Add event handlers
    $("html").on('click',function(){ //Event handler when user clicks outside suggestions box, it hides it
        $("#suggestions_box").hide(); //Must be hardcoded in as if the search box is open, this refers to the search box instead 
     }); 
    
    $(this.grid_icon).on("click", make_grid_function);
    $(this.list_icon).on("click", make_list_function);
    $(this.field).on("keyup",search_function);
    $(this.search_button).on("click", search_results_function);
    $(this.combo_box).on("change",sort_movies_function);
    
}    
	
Movie_Controller.prototype.load_movies = function() {
    //Get the template
    var template = $(this.movie_template).html();
    //Create an HTML maker
    var html_maker = new htmlMaker(template);
    //Generate dynamic HTML based on the data
    var html=html_maker.getHTML(this.movies);
    $(this.movie_list).html(html);
    this.add_stars();
}

Movie_Controller.prototype.make_grid = function () {
    //Function to make the movies into a grid 
    $(this.movie_list).attr("class", "grid");
    $(this.grid_icon).attr("src", "images/grid_pressed.jpg");
    $(this.list_icon).attr("src", "images/list.jpg");
};

Movie_Controller.prototype.make_list = function () {
    //Function to make the movies into a listview
    $(this.movie_list).attr("class", "list");
    $(this.grid_icon).attr("src", "images/grid.jpg");
    $(this.list_icon).attr("src", "images/list_pressed.jpg");
};

Movie_Controller.prototype.search = function() {
    //Function to search
    var count = Object.keys(this.movies).length; //Get length of the number of movies
    //Create the array
    var movie_array=new Array(count);
    //After the movies have been loaded, select each item with the title class and get their text into the array
    $('div[class^="movie"]').each(function() {
        if ($(this).text() != null) {
            var text = $(this).children().eq(1).text().trim().replace(/\s\s+/g, ' ');
            var text2 = $(this).children().eq(3).text().trim();
            movie_array.push(text + text2);            
        }
    });
    
    var html = "";
    var value = $(this.field).val(); //get the value of the text field
    var show=false; //don't show suggestions
    
    for (var i=0; i < movie_array.length; ++i){
        if (movie_array[i] != null && movie_array[i] != undefined) {
            var start = movie_array[i].toLowerCase().search(value.toLowerCase().trim());
            if (start != -1) { //if there is a search match
                html += "<div class='sub_suggestions' data-item='" + movie_array[i].trim() + "' >"; //Add item to html
                html += movie_array[i].substring(0,start)+"<b>"+movie_array[i].substring(start,start+value.length)+"</b>"+movie_array[i].substring(start+value.length,movie_array[i].length);
                html += "</div>";
                show=true; //show suggestions
            }      
        }
    }
        
    if(show){
        $(this.suggestions).html(html);
        //Get the children of suggestions_box with .sub_suggestions class
        $(this.suggestions).children(".sub_suggestions").on('click',function(){
            var item=$(this).attr('data-item').trim(); //get the data
            $("#search_bar").val(item); //show it in the field
            $("#suggestions_box").html(this); //make this the only item in the suggestions box
            $("#suggestions_box").hide(); //hide the suggestion box
        });
        $(this.suggestions).show();
    }
    else
       $(this.suggestions).hide();
};

Movie_Controller.prototype.search_click = function() {
    var movie_box = document.getElementById("movie_list").children; //actual movie divs
    var movie_titles = document.getElementsByClassName("title");  //just the movie title
    $(this.suggestions).show(); //show to get access
    var suggestions = document.getElementsByClassName("sub_suggestions");  //the suggestions that pop up when you search
    var match = false; //bool for hiding movies that don't match results
    for (var i = 0; i < movie_titles.length; i++)
    {
        $(movie_box[i]).show();  //make sure we can access all movies before we start
        for (var k = 0; k < suggestions.length; k++)
        {
            var match = false; //reset this in case there is more than one match
            var new_movie_titles = movie_titles[i].innerText.toLowerCase();  //access the text of the movie title
            var new_suggestions = suggestions[k].innerText.toLowerCase().substr(0,new_movie_titles.length);
            if (new_movie_titles == new_suggestions){  //if they match
                match = true;
                k = suggestions.length;
                $(movie_titles[i]).show();
            }
        }
        if (match == false){  //if the dont match, hide them
            $(movie_box[i]).hide();
        }
    }
};

Movie_Controller.prototype.sort_movies = function() {
    var by=$(this.combo_box).val().toLowerCase();
    this.movies=this.movies.sort(
            function(a,b){
                if(a[by]<b[by])
                    return -1;
                if(a[by]==b[by])
                    return 0;
                if(a[by]>b[by])
                    return 1;
            }            
        );
    
    this.load_movies();
};

Movie_Controller.prototype.add_stars = function() {
    var count = 0;
    var star_html = "";
    var movie_box = document.getElementsByClassName("movie");
    for (var i = 0; i < movie_box.length; i++){
        count = parseInt(movie_box[i].children[5].textContent);
        star_html ="";
        for (var j = 0; j < 5; j++) {
            if (j < count) {
                star_html += "<div class='star'><img src='images/gold_star.png'></div>"
            }
            else {
                star_html += "<div class='star'><img src='images/regular_star.png'></div>"
            }
        }
        movie_box[i].children[6].innerHTML = star_html;
    }
};
