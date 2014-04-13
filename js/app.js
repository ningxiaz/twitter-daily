// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
var tweets = ["448835295463874560", "448591420858073088", "448743319989125120", "448792602616557568", "448808036665405440", "448708478903656449", "448520235097018368", "448807042086862849", "448581681365004288", "448625431793528832", "448762559013715968", "448796551276933120", "448762240750329856", "448810399958597632", "448570923118235648", "448610332034871296", "448693929601273856", "448573322859909120", "448624522019610624", "448571104735809536", "448693119421517825", "448853864813703168", "448735487209918464", "448578381727408128", "448612946319400960", "448675733229940738", "448664900093476864", "448735740391071744", "448614443924992000", "448532285118496768", "448832347580813312", "448658877501145089", "448596883762454528", "448700240099409920", "448809600767111168", "448692811945082880", "448826760528814081", "448756978546798594", "448751795687264256", "448771310651330561"];

$('#generate').click(function(){
  console.log('here');
  $('.start').hide();
  $('.newspaper').show();
  $('.toolbar').show();

  keywords = $('#keywords').val();
  date = $('#date').val();
  date_tokens = date.split('-');
  year = parseInt(date_tokens[0]);
  month = parseInt(date_tokens[1]);
  day = parseInt(date_tokens[2]);

  mintime = Date.UTC(year, month - 1, day, 0, 0, 0) / 1000;
  maxtime = Date.UTC(year, month - 1, day, 24, 0, 0) / 1000;
  now = Date.now();
  // tweets = [];

  url = "http://otter.topsy.com/search.js?q="+keywords+"&allow_lang=en&offset=0&perpage=40&mintime="+mintime+"&maxtime="+maxtime+"&call_timestamp="+now+"&apikey=09C43A9B270A470B8EB8F2946A9369F3&_=1397196936083"

  // $.getJSON(url + "&callback=?", function(json){
  //   list = json.response.list
  //   for(i = 0; i < list.length; i++){
  //     permalink = list[i].trackback_permalink;
  //     tokens = permalink.split('/');
  //     id = tokens[tokens.length - 1];
  //     tweets.push(id);
  //   }

  //   console.log(tweets)

    for(i = 0; i < tweets.length/2; i ++){
      url = "https://api.twitter.com/1/statuses/oembed.json?id=" + tweets[i] + "&maxwidth=600";
      $.getJSON(url + "&callback=?", function(json){
        html = json.html;
        $('.column1').append(html);
      });
    }

    for(i = tweets.length/2; i < tweets.length; i ++){
      url = "https://api.twitter.com/1/statuses/oembed.json?id=" + tweets[i] + "&maxwidth=350&hide_media=true";
      $.getJSON(url + "&callback=?", function(json){
        html = json.html;
        $('.column2').append(html);
      });
    }
  // });
  
});

$('.newspaper').load(function(){
  console.log("AJAX COMPLETE!!!!!!!!!!");
});

$('#filter').click(function(){
  $('.tweet-container').hover(function(){
    $(this).css('opacity', 0.6);
    style = {
      'position': 'absolute',
      'display': 'block',
      'opacity': 1,
      'right': '15px',
      'bottom': '43px',
      'color': 'red',
      'cursor': 'pointer',
      'font-weight': 'bold',
    };
    remove_button = jQuery('<div/>', {
      class: 'remove'
    });
    remove_button.css(style);
    remove_button.text('Remove');
    $(this).contents().find('body').append(remove_button);
    console.log(remove_button);
    iframe = $(this);
    remove_button.click(function(){
      iframe.css('display', 'none');
    });
  }, 
  function(){
    $(this).css('opacity', 1);
    $(this).contents().find('.remove').remove();
  });
});

$('#organize').click(function(){
  $('.column1').children('iframe').each(function(){
    img = $(this).contents().find('.autosized-media');
    iframe_height = $(this).attr('height');
    container = jQuery('<iframe/>', {
      id: $(this).attr('id') + '-container',
      class: 'tweet-container',
      scrolling: 'no',
      frameborder: '0',
      allowtransparency: 'true',
      title: 'Embedded Tweet',
      width: '575',
      height: iframe_height
    });

    if(img.length == 1){
      container.prependTo('.column-left');
    }
    else{
      container.appendTo('.column-left');
    }

    head = $(this).contents().find('head').html();
    body = $(this).contents().find('body').html();
    container.contents().find('head').append(head);
    container.contents().find('body').append(body);
  });

  $('.column1').empty();  

  $('.column2').children('iframe').each(function(){
    iframe_height = $(this).attr('height');
    container = jQuery('<iframe/>', {
      id: $(this).attr('id') + '-container',
      class: 'tweet-container',
      scrolling: 'no',
      frameborder: '0',
      allowtransparency: 'true',
      title: 'Embedded Tweet',
      width: '350',
      height: iframe_height
    }).appendTo('.column-right');

    head = $(this).contents().find('head').html();
    body = $(this).contents().find('body').html();
    container.contents().find('head').append(head);
    container.contents().find('body').append(body);
  });

  $('.column2').empty();  
});

$(document).foundation();


