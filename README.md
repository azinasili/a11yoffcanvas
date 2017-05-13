# A11yOffCanvas
A fully accessible and customizable off-canvas front-end component. Apply it a single button/drawer or all of them on your page. A11yOffCanvas allows you to use whatever markup you like, you can apply your own classes and everything will just work.

[DEMO](https://codepen.io/azinasili/pen/adNZxo?editors=0010)

## Installation
With [NPM](https://www.npmjs.com/package/a11yoffcanvas):

```bash
npm install a11yoffcanvas --save
```

With [Bower](https://bower.io/):

```bash
bower install a11yoffcanvas --save
```

Or include A11yOffCanvas directly:

```html
<script src="/path/to/a11yoffcanvas.js"></script>
```

A11yOffCanvas is written using [ES2015 modules](http://2ality.com/2014/09/es6-modules-final.html). To import A11yOffCanvas into an ES2015 application:

```javascript
import A11yOffCanvas from 'a11yoffcanvas';
```


## Usage
A11yOffCanvas does require a small amount of markup to function, an interactive element and an element for the drawer.

```html
<button class="a11yoffcanvas" data-a11yoffcanvas-toggle="drawerLeft">Open drawer</button>
<aside class="a11yoffcanvas-drawer" id="drawerLeft" data-a11yoffcanvas-drawer>...</aside>
```
**Note:** *Elements to use, source ordering, and other markup is completely customizable.*

**Note:** *A11yOffCanvas is a BYOCSS component. Style your drawer however you like, A11yOffCanvas only has the ability to add/remove classes.

Select element to initalise A11yOffCanvas on.

```javascript
const offcanvas = document.querySelector('.a11yoffcanvas');
```

Apply A11yOffCanvas to selected element (all options with default values are shown).

```javascript
const tabs = new A11yOffCanvas(offcanvas, {
  drawerOpenClass: null,
  drawerCloseClass: null,
  closeOnBodyClick: false,
});
```

A11yOffCanvas will handle all ARIA roles/attributes, transforming the original HTML into the following:

```html
<button class="a11yoffcanvas" data-a11yoffcanvas-toggle="drawerLeft" aria-controls="drawerLeft" aria-expanded="false">Open drawer</button>
<aside class="a11yoffcanvas-drawer" id="drawerLeft" data-a11yoffcanvas-drawer aria-hidden="true">...</aside>
```


### Configuration options
#### drawerOpenClass
**Type:** `String` **Default:** `null`

**Usage:** Class to add/remove to drawer when opened.

#### drawerCloseClass
**Type:** `String` **Default:** `null`

**Usage:** Class to add/remove to drawer is closed.

#### closeOnBodyClick
**Type:** `String` **Default:** `false`

**Usage:** Close drawer when clicking out side of it when opened.


### Methods

#### init()
**Usage:** Creates new instance of A11yOffCanvas, adds event listeners, and adds ARIA attributes to passed element.

#### destroy()
**Usage:** Kills the instance of A11yOffCanvas, removes all event listerners and reverts `HTML` back to intial state.

#### open()
**Usage:** Open selected drawer.

#### close()
**Usage:** Close selected drawer.


## License
MIT License
