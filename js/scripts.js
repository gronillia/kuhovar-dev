function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

jQuery('.homepagelink').on('click', function (e) {
    jQuery('body').toggleClass('menuopen');
    e.stopPropagation();
});

// Panel Menu links
jQuery('#menu').on('click', function () {
    jQuery('body').toggleClass('menuopen');
});
jQuery('#menu-products').on('click', function () {
    jQuery('body').toggleClass('menuopen');
});
jQuery('#menu-item-20').click(function() {
    window.location = "gdclassic_ua.html";
});
jQuery('#menu-item-15').click(function() {
    window.location = "pure_ua.html";
});
jQuery('#menu-item-16').click(function() {
    window.location = "soups_ua.html";
});
jQuery('#menu-item-18').click(function() {
    window.location = "about_ua.html";
});

// Scroll to top hide/show
jQuery(window).scroll(function() {
    if ( jQuery(this).scrollTop() > 100 ) {
        jQuery('#scroll-to-top').css('z-index', '99');
        jQuery('#scroll-to-top').addClass('showthis');
    } else {
        jQuery('#scroll-to-top').removeClass('showthis');
    }
});

jQuery('#quoteForm').submit(function(e){
    var form = jQuery('#quoteForm')[0];
    var formData = new FormData(form);
    jQuery.ajax({
        url: 'sendEmail.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData
    });
    form.reset();
    return false;
});


document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});


var language; 
function getLanguage() {
	(localStorage.getItem('language') == null) ? setLanguage('ukr') : false;
	jQuery.ajax({ 
	url: "../public_html/lang/" +  localStorage.getItem('language') + '.json', 
	dataType: 'json', async: false, dataType: 'json', 
	contentType: "application/x-www-form-urlencoded;charset=UTF-8",
	success: function (lang) { language = lang } });
}

function setLanguage(lang) {
	localStorage.setItem('language', lang);
}

jQuery("#lang").on("click", function(){
	getLanguage();
	console.log(language);
    jQuery('#noodles').text(UTF8.decode(language.noodles));
	jQuery('#puree').text(UTF8.decode(language.puree));
	jQuery('#about').text(UTF8.decode(language.about));
	jQuery('#spices').text(UTF8.decode(language.spices));
    });
	
UTF8 = {
    encode: function(s){
        for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
            s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
        );
        return s.join("");
    },
    decode: function(s){
        for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
            ((a = s[i][c](0)) & 0x80) &&
            (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
            o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
        );
        return s.join("");
    }
};

jQuery(document).ready(function(){
  jQuery('.dropdown-submenu').on("click", function(e){
    if ($(this).attr('class') == '.test'){
    jQuery(this).next('ul').toggle();
	e.preventDefault();
	}
	e.stopPropagation();
  });
});