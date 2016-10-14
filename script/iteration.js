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
    
    //Add event handlers
    $("html").on('click',function(){ //Event handler when user clicks outside suggestions box, it hides it
        $("#suggestions_box").hide(); //Must be hardcoded in as if the search box is open, this refers to the search box instead 
     }); 
    
    $(this.grid_icon).on("click", make_grid_function);
    $(this.list_icon).on("click", make_list_function);
    $(this.search_button).on("click", search_function);
    $(this.field).on("keyup",search_function);
    
}    
	
Movie_Controller.prototype.load_movies = function() {
    //Get the template
    var template = $(this.movie_template).html();
    //Create an HTML maker
    var html_maker = new htmlMaker(template);
    //Generate dynamic HTML based on the data
    var html=html_maker.getHTML(this.movies);
    $(this.movie_list).html(html);
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
    $('div[class^="title"]').each(function() {
        if ($(this).text() != null) {
            movie_array.push($(this).text());            
        }
    });

    var html = "";
    var value = $(this.field).val(); //get the value of the text field
    var show=false; //don't show suggestions
    
    for (var i=0; i < movie_array.length; ++i){
        if (movie_array[i] != null && movie_array[i] != undefined) {
            var start = movie_array[i].toLowerCase().search(value.toLowerCase().trim());
            if (start != -1) { //if there is a search match
                html += "<div class='sub_suggestions' data-item='" + movie_array[i] + "' >"; //Add item to html
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
            var item=$(this).attr('data-item'); //get the data
            $("#search_bar").val(item); //show it in the field
            $("#suggestions_box").hide(); //hide the suggestion box
        });
        $(this.suggestions).show();
    }
    else
       $(this.suggestions).hide();
}
