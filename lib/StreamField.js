var _dec, _class, _class2, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveBlock as _moveBlock, initializeStreamField as _initializeStreamField, setIsMobile as _setIsMobile } from './actions';
import { stateToValue } from './processing/conversions';
import { getIsMobile } from './processing/utils';
import BlocksContainer from './BlocksContainer';

function lazyFunction(f) {
  return function () {
    return f().apply(this, arguments);
  };
}

var BlockDefinitionType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  default: PropTypes.any,
  icon: PropTypes.string,
  group: PropTypes.string,
  className: PropTypes.string,
  minNum: PropTypes.number,
  maxNum: PropTypes.number,
  layout: PropTypes.oneOf(['SIMPLE', 'COLLAPSIBLE']),
  closed: PropTypes.bool,
  titleTemplate: PropTypes.string,
  html: PropTypes.string,
  isStruct: PropTypes.bool,
  isStatic: PropTypes.bool,
  dangerouslyRunInnerScripts: PropTypes.bool,
  children: PropTypes.arrayOf(lazyFunction(function () {
    return BlockDefinitionType;
  }))
});
var BlockValueType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  html: PropTypes.string,
  hasError: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.arrayOf(lazyFunction(function () {
    return BlockValueType;
  })), PropTypes.string, PropTypes.number, PropTypes.bool])
});
var StreamFieldDefaultProps = {
  required: false,
  minNum: 0,
  maxNum: Infinity,
  icons: {
    add: '<i aria-hidden="true">+</i>',
    moveUp: '<i class="fas fa-chevron-up" aria-hidden="true" />',
    moveDown: '<i class="fas fa-chevron-down" aria-hidden="true" />',
    duplicate: '<i class="fas fa-clone" aria-hidden="true" />',
    delete: '<i class="fas fa-trash" aria-hidden="true" />',
    grip: '<i class="fas fa-grip-vertical fa-fw" aria-hidden="true" />'
  },
  labels: {
    add: 'Add block',
    moveUp: 'Move up',
    moveDown: 'Move down',
    duplicate: 'Duplicate',
    delete: 'Delete'
  }
};
var StreamField = (_dec = connect(function (state, props) {
  var id = props.id;
  var fieldData = state[id];
  return {
    generatedValue: fieldData === undefined ? '' : stateToValue(state, id),
    isMobile: fieldData === undefined ? null : fieldData.isMobile
  };
}, function (dispatch, props) {
  var id = props.id;
  return bindActionCreators({
    initializeStreamField: function initializeStreamField(data) {
      return _initializeStreamField(id, data);
    },
    setIsMobile: function setIsMobile(isMobile) {
      return _setIsMobile(id, isMobile);
    },
    moveBlock: function moveBlock(blockId, newIndex) {
      return _moveBlock(id, blockId, newIndex);
    }
  }, dispatch);
}), _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StreamField, _React$Component);

  function StreamField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StreamField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StreamField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onWindowResize = function () {
      var value = getIsMobile();

      if (value !== _this.props.isMobile) {
        _this.props.setIsMobile(value);
      }
    };

    _this.onDragEnd = function (result) {
      var draggableId = result.draggableId,
          source = result.source,
          destination = result.destination;

      if (!destination || result.reason === 'CANCEL' || destination.droppableId !== source.droppableId || destination.index === source.index) {
        return;
      }

      _this.props.moveBlock(draggableId, destination.index);
    };

    return _this;
  }

  _createClass(StreamField, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // Removes the input with the same name if it exists.
      var input = document.querySelector("[name=\"".concat(this.props.id, "\"]"));

      if (input !== null) {
        input.parentNode.removeChild(input);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          initializeStreamField = _this$props.initializeStreamField,
          required = _this$props.required,
          minNum = _this$props.minNum,
          maxNum = _this$props.maxNum,
          gutteredAdd = _this$props.gutteredAdd,
          blockDefinitions = _this$props.blockDefinitions,
          value = _this$props.value;
      var defaultProps = StreamFieldDefaultProps;

      var icons = _objectSpread({}, defaultProps.icons, this.props.icons);

      var labels = _objectSpread({}, defaultProps.labels, this.props.labels);

      initializeStreamField({
        required: required,
        minNum: minNum,
        maxNum: maxNum,
        icons: icons,
        labels: labels,
        gutteredAdd: gutteredAdd,
        blockDefinitions: blockDefinitions,
        isMobile: getIsMobile(),
        value: value
      });
      window.addEventListener('resize', this.onWindowResize);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          id = _this$props2.id,
          generatedValue = _this$props2.generatedValue;
      return React.createElement(DragDropContext, {
        onDragEnd: this.onDragEnd
      }, generatedValue ? React.createElement(BlocksContainer, {
        fieldId: id,
        id: null
      }) : null, React.createElement("input", {
        type: "hidden",
        name: id,
        value: JSON.stringify(generatedValue)
      }));
    }
  }]);

  return StreamField;
}(React.Component), _class2.defaultProps = StreamFieldDefaultProps, _temp)) || _class);
process.env.NODE_ENV !== "production" ? StreamField.propTypes = {
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  minNum: PropTypes.number,
  maxNum: PropTypes.number,
  icons: PropTypes.shape({
    add: PropTypes.string,
    moveUp: PropTypes.string,
    moveDown: PropTypes.string,
    duplicate: PropTypes.string,
    delete: PropTypes.string,
    grip: PropTypes.string
  }),
  labels: PropTypes.shape({
    add: PropTypes.string,
    moveUp: PropTypes.string,
    moveDown: PropTypes.string,
    duplicate: PropTypes.string,
    delete: PropTypes.string
  }),
  gutteredAdd: PropTypes.bool,
  blockDefinitions: PropTypes.arrayOf(BlockDefinitionType).isRequired,
  value: PropTypes.arrayOf(BlockValueType).isRequired
} : void 0;
export default StreamField;