# jquery.candleshadow

I was bored for a minute, and started dragging a picture over itself to see the transparent copy over the actual image. Got me thinking it might be interesting to have a jQuery plugin that mimics that for any element. 

### Notes

See `test.html` which also serves as a demo with text. Include `jquery.candleshadow.js` after jQuery in your scripts. Then simply:

```javascript
$(".selector").candleshadow({ /* options */ });
```

The options are as follows:

* `delay`: the delay on the movement animation, default `800`
* `easing`: the animation easing, default `"linear"`
* `css`: an object you would pass to jquery `css` method, applied to the shadow. Base styling is `opacity: 0.5; margin: 0;` but feel free to override that
* `variance`: how far away the shadow can get in pixels, default is a conservative `5`
* `step`: how far the shadow can move in one animation step in pixels, default is `0.8`

### How It Works

The plugin grabs the location of the selected element(s) and clones the DOM element(s), applies the candleshadow css, makes the position absolute, and puts the clone(s) at the same location(s). Then it randomly moves the clone(s) around the vicinity in an infinite loop.