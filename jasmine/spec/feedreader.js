/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            // expect(allFeeds).toBeDefined();
            // expect(allFeeds.length).not.toBe(0);
            notEmpty(allFeeds);
        });

        // 遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的
        it('is url defined', function () {
            allFeeds.forEach(function (Feed) {
                notEmpty(Feed.url);
            })
        });

        // 遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的
        it('is name defined', function () {
            allFeeds.forEach(function (Feed) {
                notEmpty(Feed.name);
            })
        });

        function notEmpty(data){
            expect(data).toBeDefined();
            expect(data.length).not.toBe(0);
        }
    });

    /* test suite named "The menu" */
    describe('The menu', function () {
        let body;

        beforeEach(function () {
            body = $('body');
        });

        //菜单元素默认是隐藏的
        it('is hide', function () {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        //当菜单图标被点击的时候菜单会切换可见状态。
        it('is toggle', function () {
            $('.menu-icon-link').trigger('click');
            expect(body.hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').trigger('click');
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        })
    });


    /* test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        //loadFeed 函数被调用而且工作正常，即在 .feed 容器元素里面至少有一个 .entry 的元素。

        beforeEach(function (done) {
            loadFeed(0,done)
        });

        it('loadFeed works well', function () {
            expect($('.feed').children().length).not.toBe(0);
        })
    });


    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        //用 loadFeed 函数加载一个新源的时候内容会改变

        var content;

        beforeEach(function (done) {
            loadFeed(0,function(){
                content = $('.feed').html();
                // loadFeed 1 时接口返回内容有问题，导致不会走回调函数
                // 所以这里使用了 loadFeed 2
                loadFeed(2,done);
            })
        });

        it('loadFeed changed', function () {
            expect($('.feed').html()).not.toBe(content);
        });
    })
}());
