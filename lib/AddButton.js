var _dec, _class, _class2, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { addBlock as _addBlock } from './actions';
import { getLabel, getNestedBlockDefinition, getSiblingsIds, isNA } from './processing/utils';
var AddButton = (_dec = connect(function (state, props) {
  var fieldId = props.fieldId,
      parentId = props.parentId,
      blockId = props.blockId;
  var field = state[fieldId];
  var blockDefinitions;

  if (parentId) {
    blockDefinitions = getNestedBlockDefinition(state, fieldId, parentId).children;
  } else {
    blockDefinitions = field.blockDefinitions;
  }

  var index = 0;

  if (blockId !== undefined) {
    // Incremented by 1 to add after the current block.
    index = getSiblingsIds(state, fieldId, blockId).indexOf(blockId) + 1;
  }

  return {
    blockDefinitions: blockDefinitions,
    index: index,
    icons: field.icons,
    labels: field.labels
  };
}, function (dispatch, props) {
  var fieldId = props.fieldId,
      parentId = props.parentId;
  return bindActionCreators({
    addBlock: function addBlock(index, blockType) {
      return _addBlock(fieldId, parentId, index, blockType);
    }
  }, dispatch);
}), _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddButton, _React$Component);

  function AddButton(props) {
    var _this;

    _classCallCheck(this, AddButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddButton).call(this, props));

    _this.toggle = function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (_this.hasChoice) {
        _this.setState(function (state, props) {
          return {
            open: !state.open
          };
        });
      } else if (_this.props.visible) {
        _this.props.addBlock(_this.props.index, _this.props.blockDefinitions[0].key);
      }
    };

    _this.addHandler = function (event) {
      _this.props.addBlock(_this.props.index, event.target.closest('button').value);

      _this.toggle(event);
    };

    _this.state = {
      open: props.open
    };
    return _this;
  }

  _createClass(AddButton, [{
    key: "getIcon",
    value: function getIcon(blockDefinition) {
      var icon = blockDefinition.icon;

      if (isNA(icon)) {
        return null;
      }

      return React.createElement("span", {
        className: "c-sf-button__icon",
        dangerouslySetInnerHTML: {
          __html: icon
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          visible = _this$props.visible,
          icons = _this$props.icons,
          labels = _this$props.labels;
      var button = React.createElement("button", {
        onClick: this.toggle,
        title: labels.add,
        className: classNames('c-sf-add-button', visible && 'c-sf-add-button--visible', this.state.open && this.hasChoice && 'c-sf-add-button--closed'),
        dangerouslySetInnerHTML: {
          __html: icons.add
        }
      });

      if (this.hasChoice) {
        return React.createElement(React.Fragment, null, button, React.createElement(AnimateHeight, {
          height: this.panelHeight,
          easing: "ease-in-out",
          contentClassName: "c-sf-add-panel"
        }, Object.entries(this.groupedBlockDefinitions).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              group = _ref2[0],
              blockDefinitions = _ref2[1];

          return React.createElement("div", {
            key: group
          }, group ? React.createElement("h4", {
            className: "c-sf-add-panel__group-title"
          }, group) : null, blockDefinitions.map(function (blockDefinition) {
            return React.createElement("button", {
              key: blockDefinition.key,
              onClick: _this2.addHandler,
              value: blockDefinition.key,
              className: "c-sf-button"
            }, _this2.getIcon(blockDefinition), React.createElement("span", {
              className: "c-sf-button__label"
            }, getLabel(blockDefinition)));
          }));
        })));
      }

      return button;
    }
  }, {
    key: "hasChoice",
    get: function get() {
      return this.props.blockDefinitions.length !== 1;
    }
  }, {
    key: "panelHeight",
    get: function get() {
      return this.state.open && this.props.visible ? 'auto' : 0;
    }
  }, {
    key: "groupedBlockDefinitions",
    get: function get() {
      var grouped = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.blockDefinitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var blockDefinition = _step.value;
          var key = blockDefinition.group || '';
          var others = grouped[key] || [];
          others.push(blockDefinition);
          grouped[key] = others;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return grouped;
    }
  }]);

  return AddButton;
}(React.Component), _class2.defaultProps = {
  open: false,
  visible: true
}, _temp)) || _class);
process.env.NODE_ENV !== "production" ? AddButton.propTypes = {
  fieldId: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  blockId: PropTypes.string,
  open: PropTypes.bool,
  visible: PropTypes.bool
} : void 0;
export default AddButton;