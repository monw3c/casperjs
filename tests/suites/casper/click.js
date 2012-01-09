(function(t) {
    casper.start('tests/site/index.html', function() {
        this.click('a[href="test.html"]');
    });

    casper.then(function() {
        t.comment('Casper.click()');
        t.assertTitle('CasperJS test target', 'Casper.click() can click on a link');
    }).thenClick('a', function() {
        t.comment('Casper.thenClick()');
        t.assertTitle('CasperJS test form', 'Casper.thenClick() can click on a link');
    });

    // onclick variants tests
    casper.thenOpen('tests/site/click.html', function() {
        t.comment('CasperUtils.click()');
        this.test.assert(this.click('#test1'), 'CasperUtils.click() can click an `href="javascript:` link');
        this.test.assert(this.click('#test2'), 'CasperUtils.click() can click an `href="#"` link');
        this.test.assert(this.click('#test3'), 'CasperUtils.click() can click an `onclick=".*; return false"` link');
        this.test.assert(this.click('#test4'), 'CasperUtils.click() can click an unobstrusive js handled link');
        var results = this.getGlobal('results');
        this.test.assert(results.test1, 'CasperUtils.click() has clicked an `href="javascript:` link');
        this.test.assert(results.test2, 'CasperUtils.click() has clicked an `href="#"` link');
        this.test.assert(results.test3, 'CasperUtils.click() has clicked an `onclick=".*; return false"` link');
        this.test.assert(results.test4, 'CasperUtils.click() has clicked an unobstrusive js handled link');
    });

    // casper.mouse
    casper.then(function() {
        t.comment('Mouse.down()');
        this.mouse.down(200, 100);
        var results = this.getGlobal('results');
        this.test.assertEquals(results.testdown, [200, 100], 'Mouse.down() has pressed button to the specified position');

        t.comment('Mouse.up()');
        this.mouse.up(200, 100);
        results = this.getGlobal('results');
        this.test.assertEquals(results.testup, [200, 100], 'Mouse.up() has released button to the specified position');

        t.comment('Mouse.move()');
        this.mouse.move(200, 100);
        results = this.getGlobal('results');
        this.test.assertEquals(results.testmove, [200, 100], 'Mouse.move() has moved to the specified position');
    });

    casper.run(function() {
        t.done();
    });
})(casper.test);