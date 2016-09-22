# JayQuery

JayQuery is your mini version of the popular [jQuery](http://jquery.com/) library. Like its well known sister, it’s accessible through a reserved global variable: `J$`.

The `J$()` function takes a CSS selector (string) as an argument, and should return a collection (array) of all matched DOM elements.

This function should have a [`.ready()`](https://api.jquery.com/ready/) method.

The returned collection should provide the following methods:

- [`.addClass()`](https://api.jquery.com/addClass/) *
- [`.removeClass()`](https://api.jquery.com/removeClass/) *
- [`.toggleClass()`](https://api.jquery.com/toggleClass/) *
- [`.hide()`](https://api.jquery.com/hide/)
- [`.show()`](https://api.jquery.com/show/)
- [`.toggle()`](https://api.jquery.com/toggle/)
- [`.click()`](https://api.jquery.com/click/)
- [`.append()`](https://api.jquery.com/append/) *
- [`.text()`](https://api.jquery.com/text/) *


The methods marked with an * need to be [“chainable“](https://en.wikipedia.org/wiki/Method_chaining).

## Getting started

To install the required dependencies run `npm install`.

Now you can run the `gulp` command from the project folder: this will open the browser on `index.html`, and automagically reload the page any time you modify a js, html, or css file (if you want to disable automatic syncing, you can do it from the control panel at `http://localhost:3001/sync-options`).

Your JavaScript code goes in `index.js`, you can use `index.html` and `style.css` to add anything useful to complete the exercise.

## Extra credits

Add the [`.data()`](https://api.jquery.com/data/) method and write a good test suite for it.
