// Created by Tommy Gaessler!
// tommy.gaessler@me.com
// https://www.instagram.com/tman_5/
// https://www.linkedin.com/in/tommygaessler
// https://github.com/tommygaessler

$(document).ready(function()
{
$(document).keypress(function(e)
{
if(e.which == 13)
{
$("input").blur();
instagram();
}
});

if ('createTouch' in document)
{
try
{
var ignore = /:hover/;
for (var i=0; i<document.styleSheets.length; i++)
{
var sheet = document.styleSheets[i];
for (var j=sheet.cssRules.length-1; j>=0; j--)
{
var rule = sheet.cssRules[j];
if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText))
{
sheet.deleteRule(j);
}
}
}
}
catch(e){}
}
instagram();

function instagram()
{
$("button").css("background", "#2F4858");
$("li").remove();
var compare = [];

$.ajax(
{
type: "GET",
	dataType: "jsonp",
	cache: false,
	url: "https://api.instagram.com/v1/users/self/media/recent/?count=33&access_token=" + access_token + "&count=33",

	success: function(data)
	{

		if (data.data.length == 0)
    {
      	alert("You have no posts!");
    }

    else
    {
    	for (var a = 0; a < data.data.length; a++)
    	{
      		var likes = data.data[a].likes.count;
      		// console.log(likes);
      		compare.push(likes);
    	}

      // console.log(compare);

      for (i = 0; i < compare.length; i++)
      {
      	if (compare[i] > likes)
      	{
          	likes = compare[i];
          	a = compare.indexOf(likes);
        	}
      }

      // console.log(likes);
      // console.log(a);

      if (a === 33)
      {
      	a -= 1;
        	// console.log(a);
      }
  }

  if (data.data[a].type == "image")
    {
    	$(".popular").append("<li><a target='_blank' href='" + data.data[a].link + "'><img src='" + data.data[a].images.standard_resolution.url + "'></img></a></li>");
    }

    else if (data.data[a].type == "video")
    {
    	$(".popular").append("<li><a target='_blank' href='" + data.data[a].link + "'><video src='" + data.data[a].videos.standard_resolution.url + "' autoplay loop></video></a></li>");
    }

    $(".likes").append("<li><h2>Number of likes: " + likes + "</h2></li>");

    $('html, body').animate({scrollTop: $("#picture").offset().top }, 1500);
	}
});
setTimeout(function(){ $("button").css('background', ''); },500)
}
});

var hash = window.location.hash;
var access_token = hash.replace('#access_token=', '');
