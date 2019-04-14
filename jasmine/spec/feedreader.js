/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的
        it('is url defined', function(){
            allFeeds.forEach( function(Feed){
                let url = Feed.url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            })
        });

        // 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的
        it('is name defined',function(){
            allFeeds.forEach( function(Feed){
                let name = Feed.name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            })
        })
    });

    /* test suite named "The menu" */
     describe('The menu', function(){
         let body;

         beforeEach(function(){
             body = document.getElementsByTagName("body");
         });

         //写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css 来搞清楚我们是怎么实现隐藏/展示菜单元素的
         it('is hide', function(){
             expect(body[0].className).toBe('menu-hidden');
         });

         //写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个测试应该包含两个 expectation ：
         // 当点击图标的时候菜单是否显示，再次点击的时候是否隐藏
         it('is toggle', function(){
             $('.menu-icon-link').trigger('click');
             // body = document.getElementsByTagName("body");
             expect(body[0].className).not.toBe('menu-hidden');

             $('.menu-icon-link').trigger('click');
             // body = document.getElementsByTagName("body");
             expect(body[0].className).toBe('menu-hidden');
         })
     });


    /* test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        //写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素里面至少有一个 .entry 的元素。
        //loadFeed()是异步的，因此这个测试需要使用Jasmine的beforeEach和异步的done（）函数。

        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            })
        });

        it('loadFeed works well', function(done){
            expect($('.feed').children().length).not.toBe(0);
            done();
        })
    });


    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        //写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变
        //loadFeed()是异步的

        let child = $('.feed').children();

        beforeEach(function(done){
            loadFeed(1,function(){
                done();
            })
        });

        it('loadFeed changed', function(done){
            expect($('.feed').children()).not.toBe(child);
            done();
        });
    })
}());
