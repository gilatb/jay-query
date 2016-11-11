'use strict';

const J$ = require('../index.js'); // leave at the top

const fs = require('fs');
require('chai').should();
require('jsdom-global')(fs.readFileSync(__dirname + '/mock.html', 'utf8'));
const $ = require('jquery');

describe('JayQuery', function () {

  let num;

  beforeEach(function () {
    $('body').append(`
    <div class="test"></div>
    <div class="test"></div>
    <div class="test"></div>
    `);
    num = 3;
  });

  afterEach(function () {
    $('.test').remove();
  });

  describe('ready', function () {

    it('should trigger the indicated handler when the HTML document is ready', function (done) {
      J$.ready(function () {
        done();
      });
      window.document.dispatchEvent(new Event('DOMContentLoaded'));
      window.document.dispatchEvent(new Event('load'));
    });

  });

  describe('selector', function () {

    it('should select all the HTML elements that match selector', function () {
      var num = $('.test').length;
      J$('.test').length.should.equal(num);
      J$('no').length.should.equal(0);
    });

  });

  describe('addClass', function () {

    it('should add the indicated class', function () {
      $('.test').hasClass('foo').should.be.false;
      J$('.test').addClass('foo');
      $('.foo').length.should.equal(num);
    });

    it('should not add the class if already present', function () {
      J$('.test').addClass('test');
      $('.test')[0].className.match(/test/g).length.should.equal(1);
    });

    it('should not remove other existing classes', function () {
      J$('.test').addClass('foo1');
      J$('.test').addClass('foo');
      $('.test').length.should.equal(num);
      $('.foo').length.should.equal(num);
    });

  });

  describe('removeClass', function () {

    it('should remove the indicated class', function () {
      $('.test').addClass('foo');
      J$('.test').removeClass('foo');
      $('.foo').length.should.equal(0);
    });

    it('should not remove other existing classes', function () {
      $('.test').addClass('foo1');
      $('.test').addClass('foo');
      J$('.test').removeClass('foo');
      $('.test').length.should.equal(num);
      $('.foo1').length.should.equal(num);
    });

  });

  describe('toggleClass', function () {

    it('should toggle the indicated class', function () {
      $($('.test')[0]).addClass('foo');
      J$('.test').toggleClass('foo');
      $('.foo').length.should.equal(num - 1);
    });

    it('should not remove other existing classes', function () {
      J$('.test').toggleClass('foo1');
      J$('.test').toggleClass('foo');
      $('.test').length.should.equal(num);
      $('.foo1').length.should.equal(num);
    });

  });

  describe('hide', function () {

    it('should hide the elements', function () {
      J$('.test').hide();
      $('.test').each(function () {
        $(this).css('display').should.equal('none');
      });
    });

  });

  describe('show', function () {

    it('should default to "inline" if the elements are not visible', function () {
      $('.test').hide();
      J$('.test').show();
      $('.test').each(function () {
        $(this).css('display').should.equal('inline');
      });
    });

    it('should not change the display property when the elements are already visible', function () {
      $($('.test')[0]).css('display', 'flex');
      J$('.test').show();
      $($('.test')[0]).css('display').should.equal('flex');
      $($('.test')[1]).css('display').should.equal('block');
    });

  });

  describe('hide and show', function () {

    it('should keep the original display property if "show" is applied after "hide"', function () {
      $($('.test')[0]).css('display', 'flex');
      J$('.test').hide();
      J$('.test').show();
      $($('.test')[0]).css('display').should.equal('flex');
      $($('.test')[1]).css('display').should.equal('block');
    });

  });

  describe('toggle', function () {

    it('should toggle the elements visibility', function () {
      $($('.test')[0]).css('display', 'flex');
      J$('.test').toggle();
      $('.test').each(function () {
        $(this).css('display').should.equal('none');
      });
      J$('.test').toggle();
      $($('.test')[0]).css('display').should.equal('flex');
      $($('.test')[1]).css('display').should.equal('block');
    });

  });

  describe('click', function () {

    it('should trigger the indicated handler when the elements are clicked', function () {
      let called = 0;
      function test () {
        called++;
      }
      J$('.test').click(test);
      called.should.equal(0);
      $('.test').click();
      called.should.equal(num);
    });

  });

  describe('append', function () {

    it('should append the indicated content to the elements', function () {
      const node1 = '<h1>Hello</h1>';
      const node2 = '<h2>Bye</h2>';
      J$('.test').append(node1);
      $('.test').each(function () {
        $(this).html().should.equal(node1);
      });
      J$('.test').append(node2);
      $('.test').each(function () {
        $(this).html().should.equal(node1 + node2);
      });
    });

    it('should append HTML elements when the string is HTML', function () {
      const node1 = '<h1>Hello</h1>';
      J$('.test').append(node1);
      $('h1').length.should.equal(num);
    });

  });

  describe('text', function () {

    it('should insert the indicated content as text', function () {
      const text1 = 'Hello';
      J$('.test').text(text1);
      $('.test').each(function () {
        $(this).text().should.equal(text1);
      });
    });

    it('should replace the existing content', function () {
      const text1 = 'Hello';
      const text2 = 'Bye';
      J$('.test').text(text1);
      J$('.test').text(text2);
      $('.test').each(function () {
        $(this).text().should.equal(text2);
      });
    });

    it('should not convert to HTML elements when the string is HTML', function () {
      const node1 = '<h1>Hello</h1>';
      J$('.test').text(node1);
      $('h1').length.should.equal(0);
    });

  });

});

