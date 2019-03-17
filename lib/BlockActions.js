var _dec, _class, _class2, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLabel, getNestedBlockDefinition, getSiblingsIds, isSimpleLayout, triggerCustomEvent as _triggerCustomEvent, triggerKeyboardEvent } from './processing/utils';
import { duplicateBlock as _duplicateBlock, hideBlock as _hideBlock } from './actions';
import { refType } from './types';
var BlockActions = (_dec = connect(function (state, props) {
  var fieldId = props.fieldId,
      blockId = props.blockId;
  var blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);
  var siblings = getSiblingsIds(state, fieldId, blockId);
  var field = state[fieldId];
  return {
    isSimpleLayout: isSimpleLayout(blockDefinition, field.isMobile),
    blockDefinition: blockDefinition,
    siblings: siblings,
    icons: field.icons,
    labels: field.labels,
    index: siblings.indexOf(blockId)
  };
}, function (dispatch, props) {
  var fieldId = props.fieldId,
      blockId = props.blockId;
  return bindActionCreators({
    hideBlock: function hideBlock() {
      return _hideBlock(fieldId, blockId);
    },
    duplicateBlock: function duplicateBlock() {
      return _duplicateBlock(fieldId, blockId);
    }
  }, dispatch);
}), _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BlockActions, _React$Component);

  function BlockActions() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BlockActions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BlockActions)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.sendKeyToDragHandle = function (key) {
      var dragHandle = ReactDOM.findDOMNode(_this.props.dragHandleRef.current);
      triggerKeyboardEvent(dragHandle, 32); // 32 for spacebar, to drag

      return new Promise(function (resolve) {
        setTimeout(function () {
          triggerKeyboardEvent(dragHandle, key);
          setTimeout(function () {
            triggerKeyboardEvent(dragHandle, 32); // Drop at the new position

            resolve();
          }, 100); // 100 ms is the duration of a move in react-beautiful-dnd
        }, 0);
      });
    };

    _this.moveUpHandler = function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this.sendKeyToDragHandle(38) // 38 for up arrow
      .then(function () {
        _this.triggerCustomEvent('move', {
          index: _this.props.index
        });
      });
    };

    _this.moveDownHandler = function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this.sendKeyToDragHandle(40) // 40 for down arrow
      .then(function () {
        _this.triggerCustomEvent('move', {
          index: _this.props.index
        });
      });
    };

    _this.duplicateHandler = function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this.props.duplicateBlock();

      _this.triggerCustomEvent('duplicate');
    };

    _this.deleteHandler = function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this.props.hideBlock();
    };

    return _this;
  }

  _createClass(BlockActions, [{
    key: "triggerCustomEvent",
    value: function triggerCustomEvent(name) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _triggerCustomEvent(ReactDOM.findDOMNode(this), name, data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          blockDefinition = _this$props.blockDefinition,
          isSimpleLayout = _this$props.isSimpleLayout,
          sortableBlock = _this$props.sortableBlock,
          canDuplicate = _this$props.canDuplicate,
          icons = _this$props.icons,
          labels = _this$props.labels;
      return React.createElement("div", {
        className: "c-sf-block__aside"
      }, React.createElement("div", {
        className: "c-sf-block__actions"
      }, sortableBlock ? React.createElement(React.Fragment, null, React.createElement("button", {
        className: "c-sf-block__actions__single",
        onClick: this.moveUpHandler,
        title: labels.moveUp,
        disabled: this.isFirst,
        dangerouslySetInnerHTML: {
          __html: icons.moveUp
        }
      }), React.createElement("button", {
        className: "c-sf-block__actions__single",
        onClick: this.moveDownHandler,
        title: labels.moveDown,
        disabled: this.isLast,
        dangerouslySetInnerHTML: {
          __html: icons.moveDown
        }
      })) : null, React.createElement("button", {
        className: "c-sf-block__actions__single",
        onClick: this.duplicateHandler,
        title: labels.duplicate,
        disabled: !canDuplicate,
        dangerouslySetInnerHTML: {
          __html: icons.duplicate
        }
      }), React.createElement("button", {
        className: "c-sf-block__actions__single",
        onClick: this.deleteHandler,
        title: labels.delete,
        dangerouslySetInnerHTML: {
          __html: icons.delete
        }
      })), isSimpleLayout ? React.createElement("span", {
        className: "c-sf-block__type"
      }, getLabel(blockDefinition)) : null);
    }
  }, {
    key: "isFirst",
    get: function get() {
      return this.props.index === 0;
    }
  }, {
    key: "isLast",
    get: function get() {
      return this.props.index === this.props.siblings.length - 1;
    }
  }]);

  return BlockActions;
}(React.Component), _class2.defaultProps = {
  sortableBlock: true,
  canDuplicate: true
}, _temp)) || _class);
process.env.NODE_ENV !== "production" ? BlockActions.propTypes = {
  fieldId: PropTypes.string.isRequired,
  blockId: PropTypes.string.isRequired,
  sortableBlock: PropTypes.bool,
  canDuplicate: PropTypes.bool,
  dragHandleRef: refType
} : void 0;
export default BlockActions;