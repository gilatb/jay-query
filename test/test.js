'use strict';

const fs = require('fs');
require('chai').should();
require('jsdom-global')(fs.readFileSync(__dirname + '/../index.html', 'utf8'));
const $ = require('jquery');

const J$ = require('../index.js');

describe('JayQuery', function () {

  beforeEach(function () {
    $('body').append('<div id="test" class="foo"></div>');
  });

  afterEach(function () {
    $('#test').remove();
  });

  describe('addClass', function () {

    it('should add the indicated class to the matched HTML elements', function () {
      $('#test').hasClass('bar').should.be.false;
      J$('#test').addClass('bar');
      $('#test').hasClass('bar').should.be.true;
    });

  });

  describe('removeClass', function () {

    it('should remove the indicated class from the matched HTML elements', function () {
      $('#test').addClass('bar');
      $('#test').hasClass('bar').should.be.true;
      J$('#test').removeClass('bar');
      $('#test').hasClass('bar').should.be.false;
    });

  });

  describe('toggleClass', function () {

    it('should toggle the indicated class on the matched HTML elements', function () {
      $('#test').hasClass('bar').should.be.false;
      J$('#test').toggleClass('bar');
      $('#test').hasClass('bar').should.be.true;
      J$('#test').toggleClass('bar');
      $('#test').hasClass('bar').should.be.false;
    });

  });

  describe('hide', function () {

    it('should hide the matched HTML elements', function () {
      $('#test').css('display').should.equal('block');
      J$('#test').hide();
      $('#test').css('display').should.equal('none');
    });

  });

  describe('show', function () {

    it('should show the matched HTML elements', function () {
      $('#test').css('display').should.equal('block');
      $('#test').hide();
      J$('#test').show();
      $('#test').css('display').should.equal('inline');
      $('#test').css('display', 'block');
      $('#test').css('display').should.equal('block');
      J$('#test').hide();
      J$('#test').show();
      $('#test').css('display').should.equal('block');
    });

  });

  describe('toggle', function () {

    it('should toggle the matched HTML elements', function () {
      $('#test').css('display').should.equal('block');
      J$('#test').toggle();
      $('#test').css('display').should.equal('none');
      J$('#test').toggle();
      $('#test').css('display').should.equal('block');
    });

  });

  describe('click', function () {

    it('should trigger the indicated handler when the matched HTML elements are clicked', function () {
      let called = 0;
      function test () {
        called++;
      }
      J$('#test').click(test);
      called.should.equal(0);
      $('#test').click();
      called.should.equal(1);
    });

  });

  describe('append', function () {

    it('should append the indicated content to the matched HTML elements', function () {
      const node1 = '<h1>Hello</h1>';
      const node2 = '<h2>Bye</h2>';
      $('#test').html().should.equal('');
      J$('#test').append(node1);
      $('#test').html().should.equal(node1);
      J$('#test').append(node2);
      $('#test').html().should.equal(node1 + node2);
    });

  });

  describe('text', function () {

    it('should add as text the indicated content to the matched HTML elements', function () {
      const text1 = 'Hello';
      const text2 = 'Bye';
      $('#test').text().should.equal('');
      J$('#test').append(text1);
      $('#test').text().should.equal(text1);
      J$('#test').append(text2);
      $('#test').text().should.equal(text1 + text2);
    });

  });

});

