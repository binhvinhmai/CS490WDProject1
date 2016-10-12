<!doctype html>
<html>
    <head>
        <title>Movie Search System</title>
        <link rel="stylesheet" type="text/css" href="style/style.css">
        <meta charset="utf-8" />
        <script id="movie-template" type="text/html">
        <div class='movie'>
            <img src='{{path}}'>
            <div class='description'>{{description}}</div>
            <div class='year'>{{year}}</div>    
        </div> 
    </script>
    <script src="htmlMaker.js"></script>
    <script src="data.js"></script>
    <script src="movies.js"></script>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body> 
        <div id = "fixed_header">
            <div id="header">
                <img src="images/movie.png">
                <h4>RENT A MOVIE</h4>
                <div id="search_feature">
                    <input type="text" id="search_bar" value="Search for movies">
                    <input type="button" id="search_button" value="Search">
                    <div id="suggestions_box" class="suggestions">

                    </div>
                </div>
            </div>
            <div id="icons_bar">
                <p>Sort By:</p>
                <select id="sort_dropdown">
                    <option value="year">&#160;Year</option>
                    <option value="rating">&#160;Rating</option>
                </select>
                <img src="images/grid.jpg" id="grid_image">
                <img src="images/list.jpg" id="list_image">
            </div>
        </div>

        <div id="movie_list" class="grid">
        </div>
    </body>
</html>
