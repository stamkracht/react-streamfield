import PropTypes from 'prop-types';
export var refType = PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
  current: PropTypes.instanceOf(Element)
})]);