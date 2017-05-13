/**
 * Convert a NodeList selection into an array.
 *
 * Take a NodeList and convert it to an array
 * to expose useful array methods and properties.
 *
 * @param  {HTMLElement} el             - NodeList to convert to array
 * @param  {HTMLElement} ctx = document - Context to query for element
 * @return {Array}                      - Array of nodes
 */
function _queryToArray(el, ctx = document) {
  return [].slice.call(ctx.querySelectorAll(el));
}

/**
 * Combine two objects based on properties.
 *
 * @param  {Object} source   - Object with original properties
 * @param  {Object} override - Object to override source properties
 * @return {Object}          - Combined object
 */
function _extendDefaults(source, override) {
  for (let property in override) {
    if (override.hasOwnProperty(property)) {
      source[property] = override[property];
    }
  }

  return source;
}

/**
 * Create a new A11yOffCanvas instance.
 *
 * @class  A11yOffCanvas
 * @param  {HTMLElement} trigger  - Element to initialise A11yOffCanvas
 * @param  {Object} options       - Options to customize A11yOffCanvas instance
 * @return {Object}               - Public init(), destroy(), open(), and close()
 */
function A11yOffCanvas(trigger, options) {

  /**
   * Default options used in A11yOffCanvas.
   */
  const defaults = {
    drawerOpenClass: null,
    drawerCloseClass: null,
  };

  /**
   * Combined defaults and user options.
   */
  let settings;

  /**
   * If options object passed to A11yOffCanvas
   * Combine options with defaults.
   */
  if (options && typeof options == 'object') {
    settings = _extendDefaults(defaults, options);
  } else {
    settings = defaults;
  }

  /**
   * Collect elements.
   */
  let button = trigger;
  let buttons = _queryToArray('[data-a11yoffcanvas-toggle]');
  let drawerId = button.getAttribute('data-a11yoffcanvas-toggle');
  let drawer = document.getElementById(drawerId);
  let drawers = _queryToArray('[data-a11yoffcanvas-drawer]');
  let drawerActive = null;
  let currentButton = null;
  let currentDrawer = null;

  /**
   * Initialize A11yOffCanvas.
   *
   * @method
   */
  function init() {
    _addARIA();
    _addEvents();
  }
  init();

  /**
   * Remove all added ARIA attributes and events.
   *
   * @method
   */
  function destroy() {
    _removeARIA();
    _removeEvents();
  }

  /**
   * Open A11yOffCanvas drawer.
   *
   * @method
   */
  function open() {
    close();

    if (settings.drawerOpenClass) drawer.classList.add(settings.drawerOpenClass);

    button.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');

    drawerActive = true;
    currentButton = button;
    currentDrawer = drawer;
  }

  /**
   * Close A11yOffCanvas drawer.
   *
   * @method
   */
  function close() {
    buttons.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
    });

    drawers.forEach((drawer) => {
      if (settings.drawerOpenClass) drawer.classList.remove(settings.drawerOpenClass);

      drawer.setAttribute('aria-hidden', 'true');
    });

    drawerActive = false;
    currentButton = null;
    currentDrawer = null;
  }

  /**
   * Add ARIA and accessibility attributes.
   *
   * @func
   */
  function _addARIA() {
    button.setAttribute('aria-controls', drawerId);
    button.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }

  /**
   * Remove ARIA and accessibility attributes.
   *
   * @func
   */
  function _removeARIA() {
    button.removeAttribute('aria-controls');
    button.removeAttribute('aria-expanded');
    drawer.removeAttribute('aria-hidden');
  }

  /**
   * Toggle A11yOffCanvas drawer open and close.
   *
   * @func
   */
  function _toggleDrawer() {
    if (drawerActive) {
      close();
    }
    else {
      open();
    }
  }

  /**
   * Keyboard navigation callback.
   *
   * @func
   * @param {Event} event - Get current target of event
   */
  function _escapeKey(event) {
    if (event.keyCode === 27 && drawerActive) close();
  }

  /**
   * Add events to A11yOffCanvas instance.
   *
   * @func
   */
  function _addEvents() {
    button.addEventListener('click', _toggleDrawer, false);
    document.addEventListener('keydown', _escapeKey, false);
  }

  /**
   * Remove events to A11yOffCanvas instance.
   *
   * @func
   */
  function _removeEvents() {
    button.removeEventListener('click', _toggleDrawer, false);
    document.removeEventListener('keydown', _escapeKey, false);
  }

  /**
   * Expose A11yOffCanvas public methods.
   */
  return {
    init,
    destroy,
    open,
    close,
  }
}

/**
 * Export A11yOffCanvas component.
 */
export default A11yOffCanvas;
