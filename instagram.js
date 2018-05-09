// Created by Tommy Gaessler!
// tommy.gaessler@me.com
// https://www.instagram.com/tman_5/
// https://www.linkedin.com/in/tommygaessler
// https://github.com/tommygaessler

$(document).ready(function() {

	if(access_token) {
    $("li").remove();
    button.innerHTML = 'Loading Posts';
    $.get('https://api.instagram.com/v1/users/self/?access_token=' + access_token, function(data) {
      mediaCount = data.data.counts.media;
      button.innerHTML = 'Loading Posts ' + loadCount + '/' + mediaCount;
      instagram(url);
    })
	}

  function instagram(url) {
    $.get(url, function(data, status) {
      loadCount += data.data.length;
      button.innerHTML = 'Loading Posts ' + loadCount + '/' + mediaCount;

      data.data.forEach((post) => {
        posts.push(post);
      });

      if(data.pagination.next_url) {
        instagram(data.pagination.next_url);
      } else {
        displayPost();
      }
    });
  }

  function displayPost() {
    if (posts.length == 0) {
      alert("You have no posts!");
    } else {

      mostLikedPost = posts.reduce(function(prev, current) {
        return (prev.likes.count > current.likes.count) ? prev : current
      })

      if (mostLikedPost.type == "image") {
        $(".popular").append("<li><a target='_blank' href='" + mostLikedPost.link + "'><img src='" + mostLikedPost.images.standard_resolution.url + "'></img></a></li>");
      } else if (mostLikedPost.type == "video") {
        $(".popular").append("<li><a target='_blank' href='" + mostLikedPost.link + "'><video src='" + mostLikedPost.videos.standard_resolution.url + "' autoplay loop></video></a></li>");
      }

      $(".likes").append("<li><h2>" + mostLikedPost.likes.count + " Likes</h2></li>");

      $(".likes").append("<li><h3>" + mostLikedPost.caption.text + "</h3></li>");

      $('html, body').animate({
        scrollTop: $("#picture").offset().top
      }, 1500);
    }
    button.innerHTML = 'Click here to find out!'
    setTimeout(function() {
      $("button").css('background', '');
    }, 500)
  }
});

var hash = window.location.hash;
var access_token = hash.replace('#access_token=', '');
var posts = [];
var mostLikedPost;
var url = 'https://api.instagram.com/v1/users/self/media/recent/?count=33&access_token=' + access_token + '&count=33';
var button = document.getElementById("loader");
var loadCount = 0;
var mediaCount;
