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


The methods marked with a “*” need to be “[chainable](https://en.wikipedia.org/wiki/Method_chaining)”.

## Getting started

To install the required dependencies run `npm install`.

Now you can run the `gulp` command from the project folder: this will open the browser on `index.html`, and automagically reload the page any time you modify a js, html, or css file (if you want to disable automatic syncing, you can do it from the control panel at `http://localhost:3001/sync-options`).

Your JavaScript code goes in `index.js`, you can modify `index.html` or create a `style.css` in case it’s useful to complete the exercise.

## Notes

In your implementation, for simplicity’s sake, assume that:

- `.addClass()`, `.removeClass()`, and `.toggleClass()` only take one class per time as argument.

- `.hide()`, `.show()`, and `.toggle()` neither take any argument, nor generate any “fading” effect. If you invoke `.show()` on an element that has the display property set to `hidden` or `none` it should default it to `inline`, but if it was hidden through `.hide()` it should restore the original value of its display property.

## Extra credits

- Add the [`.data()`](https://api.jquery.com/data/) method and write a good test suite for it.

- Upgrade `.addClass()`, `.removeClass()`, and `.toggleClass()` so that they can take more than one class per time as argument.

- Add a fading effect to `.hide()`, `.show()`, and `.toggle()` which should last for the number of milliseconds passed as argument.
