$(function() {
	// $('.slideshow').each(function() {/* 최초한번만 실행 */
	// var $slideimg = $(this).find('img');// 유사배열
	// var slidecnt = $slideimg.length;
	// var currentindex = 0;
	// var showtime = 3000;
	//
	// $slideimg.eq(currentindex).fadeIn();
	//
	// setInterval(shownextsilde, showtime);
	//
	// function shownextsilde() {
	// console.log('ss');
	// var nextindex = (currentindex + 1) % slidecnt;
	// $slideimg.eq(currentindex).fadeOut();
	// $slideimg.eq(nextindex).fadeIn();
	// currentindex = nextindex;
	// }
	// });

	$('.slideshow')
			.each(
					function() {
						var $container = $(this);
						var $slidegroup = $('.slideshow-slides');
						var $slides = $slidegroup.find('.slide'); // $('.slideshow-slides
						// .slide');
						var $nav = $('.slideshow-nav');
						var $indicator = $('.slideshow-indicator');
						var slidecnt = $slides.length, indicatorHTML = '', currentindex = 0, duration = 500, easing = 'easeInOutExpo', interval = 3000, timer;

						$slides.each(function(index) { // index= 0,1,2,3 (4개의
							// 그림에 대한)
							$(this).css({
								left : 100 * index + '%'
							});
							indicatorHTML += "<a href='#'>'" + (index + 1)
									+ "</a>";
						});
						$indicator.html(indicatorHTML);

						function goToslide(index) {

							$slidegroup.animate({
								left : (-100 * index) + '%'
							}, duration, easing);
							currentindex = index;
							updateNav(); // prev next 이미지 디스플레이 체크 메소드
						}

						function updateNav() {
							var $navprev = $nav.find('.prev');
							var $navnext = $nav.find('.next');

							if (currentindex == 0) {
								$navprev.addClass('disabled');
							} else {
								$navprev.removeClass('disabled');
							}

							if (currentindex == (slidecnt - 1)) {
								$navnext.addClass('disabled');
							} else {
								$navnext.removeClass('disabled');
							}

							$indicator.find('a').removeClass('active').eq(
									currentindex).addClass('active');
						}

						function startTimer() {
							timer = setInterval(function() {
								var nextindex = ((currentindex + 1) % slidecnt)
								goToslide(nextindex);
							}, interval);
						}

						function stopTimer() {
							clearInterval(timer);

						}

						$nav.on('click', 'a', function(event) {
							event.preventDefault();
							if ($(this).hasClass('prev')) {
								goToslide(currentindex - 1)
							} else {
								goToslide(currentindex + 1)
							}
						});

						$indicator.on('click', 'a', function() {
							if (!$(this).hasClass('active')) {
								goToslide($(this).index());
							}
							return false;
						});

						$container.on({
							mouseenter : stopTimer, // 마우스 오버
							mouseleave : startTimer
						// 마우스 아웃

						});
						goToslide(currentindex);

					});
});
