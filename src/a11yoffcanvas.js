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
  const DEFAULTS = {
    drawerOpenClass: null,
    drawerCloseClass: null,
    closeOnBodyClick: false,
  };

  /**
   * Collect elements.
   */
  const BUTTON = trigger;
  const BUTTONS = _queryToArray('[data-a11yoffcanvas-toggle]');
  const DRAWER_ID = BUTTON.getAttribute('data-a11yoffcanvas-toggle');
  const DRAWER = document.getElementById(DRAWER_ID);
  const DRAWERS = _queryToArray('[data-a11yoffcanvas-drawer]');
  /**
   * Combined defaults and user options.
   */
  let settings;

  /**
   * If options object passed to A11yOffCanvas
   * Combine options with defaults.
   */
  if (options && typeof options == 'object') {
    settings = {...DEFAULTS, ...options};
  } else {
    settings = {...DEFAULTS};
  }

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

    if (settings.drawerOpenClass) DRAWER.classList.add(settings.drawerOpenClass);

    BUTTON.setAttribute('aria-expanded', 'true');
    DRAWER.setAttribute('aria-hidden', 'false');
  }

  /**
   * Close A11yOffCanvas drawer.
   *
   * @method
   */
  function close() {
    BUTTONS.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
    });

    DRAWERS.forEach((drawer) => {
      if (settings.drawerOpenClass) drawer.classList.remove(settings.drawerOpenClass);

      drawer.setAttribute('aria-hidden', 'true');
    });
  }

  /**
   * Add ARIA and accessibility attributes.
   *
   * @func
   */
  function _addARIA() {
    BUTTON.setAttribute('aria-controls', DRAWER_ID);
    BUTTON.setAttribute('aria-expanded', 'false');
    DRAWER.setAttribute('aria-hidden', 'true');
  }

  /**
   * Remove ARIA and accessibility attributes.
   *
   * @func
   */
  function _removeARIA() {
    BUTTON.removeAttribute('aria-controls');
    BUTTON.removeAttribute('aria-expanded');
    DRAWER.removeAttribute('aria-hidden');
  }

  /**
   * Toggle A11yOffCanvas drawer open and close.
   *
   * @func
   */
  function _toggleDrawer() {
    if (this.getAttribute('aria-expanded') === 'true') {
      close();
    }
    else {
      open();
    }
  }

  /**
   * Close drawer when clicked outside of it.
   *
   * @func
   * @param {Event} event - Get current target of event
   */
  function _closeOnBodyClick(event) {
    const TARGET = event.target;
    const TARGET_DRAWER = TARGET.hasAttribute('data-a11yoffcanvas-drawer');
    const TARGET_BUTTON = TARGET.hasAttribute('data-a11yoffcanvas-toggle');

    if (!TARGET_BUTTON && !TARGET_DRAWER && DRAWER.getAttribute('aria-hidden') === 'false') {
      close();
    }
  }

  /**
   * Keyboard navigation callback.
   *
   * @func
   * @param {Event} event - Get current target of event
   */
  function _escapeKey(event) {
    if (event.keyCode === 27) close();
  }

  /**
   * Add events to A11yOffCanvas instance.
   *
   * @func
   */
  function _addEvents() {
    BUTTON.addEventListener('click', _toggleDrawer, false);
    document.addEventListener('keydown', _escapeKey, false);
    if (settings.closeOnBodyClick) document.addEventListener('click', _closeOnBodyClick, false);
  }

  /**
   * Remove events to A11yOffCanvas instance.
   *
   * @func
   */
  function _removeEvents() {
    BUTTON.removeEventListener('click', _toggleDrawer, false);
    document.removeEventListener('keydown', _escapeKey, false);
    if (settings.closeOnBodyClick) document.removeEventListener('click', _closeOnBodyClick, false);
  }

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
