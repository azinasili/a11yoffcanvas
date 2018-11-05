import A11yTrap from 'a11ytrap';

/**
 * A11yOffCanvas - A fully accessible and customizable off-canvas element
 * @module A11yOffCanvas
 */

/**
 * A11yOffCanvas
 */
export default class A11yOffCanvas {
  /* eslint-disable max-len */
  /**
   * Create Settings for A11yOffCanvas
   * @param {HTMLElement} trigger                     = null  - Trigger element for drawer
   * @param {Object}      options                     = null  - Options to customize A11yOffCanvas instance
   * @param {String}      options.drawerCloseClass    = null  - Class to add to drawer when closed
   * @param {String}      options.drawerOpenClass     = null  - Class to add to drawer when opened
   * @param {Boolean}     options.closeOnClick        = false - Close drawer when clicking outside outside of it
   * @param {Function}    options.afterCloseFunction  = null  - Function to run after drawer closes
   * @param {Function}    options.afterOpenFunction   = null  - Function to run after drawer opens
   * @param {Function}    options.beforeCloseFunction = null  - Function to run before drawer closes
   * @param {Function}    options.beforeOpenFunction  = null  - Function to run before drawer opens
   * @param {Boolean}     options.addEvents           = false - Add custom A11yOffCanvas events
   * @param {Boolean}     options.trapFocus           = true  - Trap focus within opened drawer
   */
  /* eslint-enable max-len */
  constructor(trigger = null, options = {}) {
    const defaults = {
      drawerCloseClass: null,
      drawerOpenClass: null,
      closeOnClick: false,
      afterCloseFunction: null,
      afterOpenFunction: null,
      beforeCloseFunction: null,
      beforeOpenFunction: null,
      addEvents: false,
      trapFocus: true,
    };

    this.settings = Object.assign({}, defaults, options);
    this.trigger = trigger;
    this.drawer = document.querySelector(`#${this.trigger.getAttribute('data-a11yoffcanvas-trigger')}`);
    this.allTriggers = [...document.querySelectorAll('[data-a11yoffcanvas-trigger]')];
    this.allDrawers = [...document.querySelectorAll('[data-a11yoffcanvas-drawer]')];
    this.allClose = [...document.querySelectorAll('[data-a11yoffcanvas-close]')];
    this.active = false;
    this.loaded = false;
    this.trap = null;
  }

  /**
   * Initialize instance of A11yOffCanvas
   * @returns {Object} - A11yOffCanvas instance
   */
  init() {
    this.addARIA();
    this.addEvents();
    this.loaded = true;

    return this;
  }

  /**
   * Kills instance of A11yOffCanvas
   * @returns {Object} - A11yOffCanvas instance
   */
  destroy() {
    this.close();
    this.removeARIA();
    this.removeEvents();
    this.active = false;
    this.loaded = false;
    this.trap = null;

    return this;
  }

  /**
   * Open drawer
   * @returns {Object} - A11yOffCanvas instance
   */
  open() {
    const {
      eventNames,
      fireEvent,
      isFunction,
      isBoolean,
    } = this.constructor;
    const {
      addEvents,
      afterOpenFunction,
      beforeOpenFunction,
      trapFocus,
    } = this.settings;

    this.close();

    if (
      this.loaded
      && addEvents
      && isBoolean(addEvents)
    ) {
      fireEvent(eventNames().beforeOpen);
    }

    if (
      this.loaded
      && beforeOpenFunction
      && isFunction(beforeOpenFunction)
    ) {
      beforeOpenFunction();
    }

    if (this.settings.drawerOpenClass) {
      this.drawer.classList.add(this.settings.drawerOpenClass);
    }

    this.trigger.setAttribute('aria-expanded', true);
    this.drawer.setAttribute('aria-hidden', false);
    this.drawer.setAttribute('tabindex', 0);
    this.drawer.focus();
    this.active = true;

    if (trapFocus && isBoolean(trapFocus)) {
      this.trap = new A11yTrap(`#${this.drawer.getAttribute('id')}`);
      this.trap.init();
    }

    if (
      this.loaded
      && addEvents
      && isBoolean(addEvents)
    ) {
      fireEvent(eventNames().afterOpen);
    }

    if (
      this.loaded
      && afterOpenFunction
      && isFunction(afterOpenFunction)
    ) {
      afterOpenFunction();
    }

    return this;
  }

  /**
   * Close drawer
   * @returns {Object} - A11yOffCanvas instance
   */
  close() {
    const {
      eventNames,
      fireEvent,
      isFunction,
      isBoolean,
    } = this.constructor;
    const {
      addEvents,
      beforeCloseFunction,
      afterCloseFunction,
      trapFocus,
    } = this.settings;

    if (
      this.loaded
      && addEvents
      && isBoolean(addEvents)
    ) {
      fireEvent(eventNames().beforeClose);
    }

    if (
      this.loaded
      && beforeCloseFunction
      && isFunction(beforeCloseFunction)
    ) {
      beforeCloseFunction();
    }

    if (this.active) {
      this.trigger.focus();
    }

    this.allTriggers.forEach(trigger => trigger.setAttribute('aria-expanded', false));

    this.allDrawers.forEach((drawer) => {
      if (this.settings.drawerOpenClass) {
        drawer.classList.remove(this.settings.drawerOpenClass);
      }

      drawer.setAttribute('aria-hidden', true);
      drawer.setAttribute('tabindex', -1);
    });

    this.active = false;

    if (trapFocus && isBoolean(trapFocus) && this.trap) {
      this.trap.destroy();
      this.trap = null;
    }

    if (
      this.loaded
      && addEvents
      && isBoolean(addEvents)
    ) {
      fireEvent(eventNames().afterClose);
    }

    if (
      this.loaded
      && afterCloseFunction
      && isFunction(afterCloseFunction)
    ) {
      afterCloseFunction();
    }

    return this;
  }

  /**
   * Add ARIA attributes to DOM elements
   * @private
   */
  addARIA() {
    this.trigger.setAttribute('aria-controls', this.drawer.getAttribute('id'));
    this.trigger.setAttribute('aria-expanded', false);
    this.drawer.setAttribute('aria-hidden', true);
    this.drawer.setAttribute('tabindex', -1);
  }

  /**
   * Remove ARIA attributes
   * @private
   */
  removeARIA() {
    this.trigger.removeAttribute('aria-controls');
    this.trigger.removeAttribute('aria-expanded');
    this.drawer.removeAttribute('aria-hidden');
    this.drawer.removeAttribute('tabindex');
  }

  /**
   * Add events to A11yOffCanvas instance
   * @private
   */
  addEvents() {
    if (this.settings.closeOnClick) {
      document.addEventListener('click', this.handleCloseOnClick.bind(this), false);
    }

    this.trigger.addEventListener('click', this, false);
    document.addEventListener('keydown', this, false);
  }

  /**
   * Remove events from A11yOffCanvas instance
   * @private
   */
  removeEvents() {
    if (this.settings.closeOnClick) {
      document.removeEventListener('click', this.handleCloseOnClick.bind(this), false);
    }

    this.trigger.removeEventListener('click', this, false);
    document.removeEventListener('keydown', this, false);
  }

  /**
   * Handle closing drawer when clicking outside of it
   * @private
   * @param {Event} event - Get current target of event
   */
  handleCloseOnClick(event) {
    const { target } = event;
    const drawer = target.hasAttribute('data-a11yoffcanvas-drawer');
    const trigger = target.hasAttribute('data-a11yoffcanvas-trigger');
    const closeButton = target.hasAttribute('data-a11yoffcanvas-close');

    if (closeButton) {
      this.close();
    }

    if (
      !trigger
      && !drawer
      && target.closest(`#${this.drawer.getAttribute('id')}`) !== this.drawer
      && this.drawer.getAttribute('aria-hidden') === 'false'
    ) {
      this.close();
    }
  }

  /**
   * Keyboard navigation callback
   * @private
   * @param {Event} event - Get current target of event
   */
  handleKeydownEvent(event) {
    if (event.metaKey || event.altKey) {
      return;
    }

    if (this.active && event.which === 27) {
      this.close();
    }
  }

  /**
   * Custom event handler
   * `this` can be passed as the second param to `addEventListener()`
   * for it to work a function named `handleEvent` must be added to object
   * @see
   *   https://medium.com/@photokandy/til-you-can-pass-an-object-instead-of-a-function-to-addeventlistener-7838a3c4ec62
   * @private
   * @param {Event} event - Get current target of event
   */
  handleEvent(event) {
    switch (event.type) {
      case 'click':
        this.open();
        break;
      case 'keydown':
        this.handleKeydownEvent(event);
        break;
      default:
        break;
    }
  }

  /**
   * Map all event names
   * @private
   */
  static eventNames() {
    return {
      afterClose: 'a11yoffcanvas:afterClose',
      beforeClose: 'a11yoffcanvas:beforeClose',
      afterOpen: 'a11yoffcanvas:afterOpen',
      beforeOpen: 'a11yoffcanvas:beforeOpen',
    };
  }

  /**
   * Check if passed item is a function
   * @private
   * @param {Function} func - Item to check
   * @returns {boolean}
   */
  static isFunction(func) {
    return func && {}.toString.call(func) === '[object Function]';
  }

  /**
   * Check if passed item is a string
   * @private
   * @param {String} str - Item to check
   * @returns {boolean}
   */
  static isString(str) {
    return str && {}.toString.call(str) === '[object String]';
  }

  /**
   * Check if passed item is a boolean
   * @private
   * @param {Boolean} bool - Item to check
   * @returns {boolean}
   */
  static isBoolean(bool) {
    return bool && {}.toString.call(bool) === '[object Boolean]';
  }

  /**
   * Create custom event for elements
   * @private
   * @param {String} eventName - Name of event to fire
   */
  static fireEvent(eventName) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);
  }
}
