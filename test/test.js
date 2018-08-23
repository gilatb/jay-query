'use strict';

const J$ = require('../index.js'); // leave at the top

const fs = require('fs');
require('chai').should();
require('jsdom-global')(fs.readFileSync(__dirname + '/mock.html', 'utf8'));
const $ = require('jquery');

describe('JayQuery', () => {

  let num;

  beforeEach(() => {
    $('body').append(`
    <div class="test"></div>
    <div class="test"></div>
    <div class="test"></div>
    `);
    num = 3;
  });

  afterEach(() => $('.test').remove());

  describe('ready', () => {

    it(
      'should trigger the indicated handler when the HTML document is ready', done => {
        let domReady;
        J$.ready(() => (domReady && done()));
        domReady = true;
        document.dispatchEvent(new Event('DOMContentLoaded'));
        document.dispatchEvent(new Event('load'));
      }
    );

  });

  describe('selector', () => {

    it('should select all the HTML elements that match selector', () => {
      const num = $('.test').length;
      J$('.test').length.should.equal(num);
      J$('no').length.should.equal(0);
    });

  });

  describe('addClass', () => {

    it('should add the indicated class', () => {
      $('.test').hasClass('foo').should.be.false;
      J$('.test').addClass('foo');
      $('.foo').length.should.equal(num);
    });

    it('should not add the class if already present', () => {
      J$('.test').addClass('test');
      $('.test')[0].className.match(/test/g).length.should.equal(1);
    });

    it('should not remove other existing classes', () => {
      J$('.test').addClass('foo1');
      J$('.test').addClass('foo');
      $('.test').length.should.equal(num);
      $('.foo').length.should.equal(num);
    });

  });

  describe('removeClass', () => {

    it('should remove the indicated class', () => {
      $('.test').addClass('foo');
      J$('.test').removeClass('foo');
      $('.foo').length.should.equal(0);
    });

    it('should not remove other existing classes', () => {
      $('.test').addClass('foo1');
      $('.test').addClass('foo');
      J$('.test').removeClass('foo');
      $('.test').length.should.equal(num);
      $('.foo1').length.should.equal(num);
    });

  });

  describe('toggleClass', () => {

    it('should toggle the indicated class', () => {
      $($('.test')[0]).addClass('foo');
      J$('.test').toggleClass('foo');
      $('.foo').length.should.equal(num - 1);
    });

    it('should not remove other existing classes', () => {
      J$('.test').toggleClass('foo1');
      J$('.test').toggleClass('foo');
      $('.test').length.should.equal(num);
      $('.foo1').length.should.equal(num);
    });

  });

  describe('hide', () => {

    it('should hide the elements', () => {
      J$('.test').hide();
      $('.test').each(function () {
        $(this).css('display').should.equal('none');
      });
    });

  });

  describe('show', () => {

    it('should default to "inline" if the elements are not visible', () => {
      $('.test').hide();
      J$('.test').show();
      $('.test').each(function () {
        $(this).css('display').should.equal('inline');
      });
    });

    it('should not change the display property when the elements are already visible', () => {
      $($('.test')[0]).css('display', 'flex');
      J$('.test').show();
      $($('.test')[0]).css('display').should.equal('flex');
      $($('.test')[1]).css('display').should.equal('block');
    });

  });

  describe('hide and show', () => {

    it('should keep the original display property if "show" is applied after "hide"', () => {
      $($('.test')[0]).css('display', 'flex');
      J$('.test').hide();
      J$('.test').show();
      $($('.test')[0]).css('display').should.equal('flex');
      $($('.test')[1]).css('display').should.equal('block');
    });

  });

  describe('toggle', () => {

    it('should toggle the elements visibility', () => {
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

  describe('click', () => {

    it('should trigger the indicated handler when the elements are clicked', () => {
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

  describe('append', () => {

    it('should append the indicated content to the elements', () => {
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

    it('should append HTML elements when the string is HTML', () => {
      const node1 = '<h1>Hello</h1>';
      J$('.test').append(node1);
      $('h1').length.should.equal(num);
    });

  });

  describe('text', () => {

    it('should insert the indicated content as text', () => {
      const text1 = 'Hello';
      J$('.test').text(text1);
      $('.test').each(function () {
        $(this).text().should.equal(text1);
      });
    });

    it('should replace the existing content', () => {
      const text1 = 'Hello';
      const text2 = 'Bye';
      J$('.test').text(text1);
      J$('.test').text(text2);
      $('.test').each(function () {
        $(this).text().should.equal(text2);
      });
    });

    it('should not convert to HTML elements when the string is HTML', () => {
      const node1 = '<h1>Hello</h1>';
      J$('.test').text(node1);
      $('h1').length.should.equal(0);
    });

  });

});
