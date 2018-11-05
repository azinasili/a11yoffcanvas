# A11yOffCanvas

A fully accessible and customizable off-canvas front-end component. Use your own markup and styles and let A11yOffCanvas do the hard stuff for you.

[DEMO](https://codepen.io/azinasili/pen/adNZxo?editors=0010)

## Installation

A11yOffCanvas is available at:

| Source |  |
|:-------|:-|
| NPM    | `npm install a11yoffcanvas --save` |
| Yarn   | `yarn add a11yoffcanvas` |
| unpkg  | [`https://unpkg.com/a11yoffcanvas`](https://unpkg.com/a11yoffcanvas) |

## Usage

A11yOffCanvas does require minimal amount of markup to function:

```html
<!--
  - Trigger for drawer must have `data-a11yoffcanvas-trigger` attribute must point to the id of it's corresponding drawer
-->
<button data-a11yoffcanvas-trigger="drawerLeft">Open drawer</button>
<!--
  - Although the drawer is not required to be an `<aside>`, semantically it's an appropriate tag to use
  - Drawers must have an unique id
  - Drawers must have `data-a11yoffcanvas-drawer` attribute
-->
<aside id="drawerLeft" data-a11yoffcanvas-drawer>
  <!--
    - Add optional `data-a11yoffcanvas-close` attribute to be able to close drawers
  -->
  <a href="#" data-a11yoffcanvas-close>x</a>
</aside>
```

```javascript
// Import A11yOffCanvas if utilizing JS modules
import A11yOffCanvas from 'a11yoffcanvas';

// Create a new instance of A11yOffCanvas
// All options and default values shown
const drawerTrigger = document.querySelector('button');
const offcanvas = new A11yOffCanvas(drawerTrigger, {
  drawerCloseClass: null,
  drawerOpenClass: null,
  closeOnClick: false,
  afterCloseFunction: null,
  afterOpenFunction: null,
  beforeCloseFunction: null,
  beforeOpenFunction: null,
  addEvents: false,
  trapFocus: true,
});

// Initialize your new tabs
offcanvas.init();
```

A11yOffCanvas will handle all ARIA roles/attributes, focus management, and events, which transform the original HTML into the following:

```html
<button data-a11yoffcanvas-toggle="drawerLeft" aria-controls="drawerLeft" aria-expanded="false">Open drawer</button>
<aside id="drawerLeft" data-a11yoffcanvas-drawer aria-hidden="true">
  <a href="#" data-a11yoffcanvas-close>x</a>
</aside>
```

## A11yOffCanvas API

### Options

| Property            | Type        | Default | Description |
|:--------------------|:------------|:--------|:------------|
| drawerCloseClass    | String      | `null`  | Class to add to drawer when closed |
| drawerOpenClass     | String      | `null`  | Class to add to drawer when opened |
| closeOnClick        | String      | `null`  | Close drawer when clicking outside outside of it |
| afterCloseFunction  | Function    | `null`  | Function to run after drawer closes |
| afterOpenFunction   | Function    | `null`  | Function to run after drawer opens |
| beforeCloseFunction | Function    | `null`  | Function to run before drawer closes |
| beforeOpenFunction  | Function    | `null`  | Function to run before drawer opens |
| addEvents           | Boolean     | `false` | Add custom A11yOffCanvas events |
| trapFocus           | Boolean     | `true`  | Trap focus within opened drawer |

### Methods

| Name    | Description |
|:--------|:------------|
| init    | Initializes instance of A11yOffCanvas |
| destroy | Kills instance of A11yOffCanvas |
| open    | Open drawer |
| close   | Close drawer |

## License

MIT License
