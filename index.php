<!-- Created by Tommy Gaessler!
tommy.gaessler@me.com
https://www.instagram.com/tman_5/
https://www.linkedin.com/in/tommygaessler
https://github.com/tommygaessler -->

<!DOCTYPE html>
<html>
	<head>
    	<meta charset="utf-8">
    	<title>Most Liked! | Beta</title>
    	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    	<link rel="stylesheet" href="genericons/genericons.css">
    	<link rel="stylesheet" href="style.css">
    	<link rel="shortcut icon" type="image/x-icon" href="images/logo.png"/>
    	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    	<script type="text/javascript" src="instagram.js"></script>
  </head>
<body>
	<header>
		<div class="wrapper clearfix">
			<h1>Whats your most liked post on Instagram?</h1>
		</div>
	</header>
	<main>
		<div class="wrapper clearfix">
			<div class="background">
				<?php require_once('./client_id.php'); ?>
				<a href="https://api.instagram.com/oauth/authorize/?client_id=<?php echo $client_id ?>&redirect_uri=http://mostliked.tommygaessler.com&response_type=token&scope=basic">
					<button>Click here to find out!</button>
				</a>
			</div>
			<ul class="popular" id="picture">
			</ul>
			<div class="background-likes">
				<ul class="likes">
				</ul>
			</div>
		</div>
	</main>
	<footer>
		<div class="wrapper clearfix">
			<h3>Created by Tommy Gaessler!</h3>
			<a href="https://www.instagram.com/tman_5/" target="blank">
				<h3>
					<span class="genericon genericon-instagram"></span> Follow me!
				</h3>
			</a>
		</div>
	</footer>
</body>
</html>
