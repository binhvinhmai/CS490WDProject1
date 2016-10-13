$(document).ready(function () { 
	var movie_controller = new Movie_Controller(movies["movies"]);
});

function Movie_Controller(data) {
    this.movies=data;
    
    /*** constants ***/ 
    this.movie_template="#movie-template";
    this.movie_list="#movie_list";
    this.grid_icon="#grid_image";
    this.list_icon="#list_image"
    var self=this;
    this.load_movies();
    
    var make_grid_function=function(){
        self.make_grid.call(self);
    };
    
    var make_list_function=function(){
        self.make_list.call(self);
    };
    $(this.grid_icon).on("click", make_grid_function);
    $(this.list_icon).on("click", make_list_function);
}    
	
Movie_Controller.prototype.load_movies = function() {
    //Get the template
    var template = $(this.movie_template).html();
    //Create an HTML maker
    var html_maker = new htmlMaker(template);
    //Generate dynamic HTML based on the data
    var html=html_maker.getHTML(this.movies);
    console.log(html);
    $(this.movie_list).html(html);
}

Movie_Controller.prototype.make_grid = function () {
    $(this.movie_list).attr("class", "grid");
    $(this.grid_icon).attr("src", "images/grid_pressed.jpg");
    $(this.list_icon).attr("src", "images/list.jpg");
};

Movie_Controller.prototype.make_list = function () {
    $(this.movie_list).attr("class", "list");
    $(this.grid_icon).attr("src", "images/grid.jpg");
    $(this.list_icon).attr("src", "images/list_pressed.jpg");
};
