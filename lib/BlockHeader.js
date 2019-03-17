var _dec, _class, _class2, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLabel, getNestedBlockDefinition, isNA, isSimpleLayout, isStruct, structValueToObject, triggerCustomEvent as _triggerCustomEvent } from './processing/utils';
import { toggleBlock as _toggleBlock } from './actions';
import BlockActions from './BlockActions';
import { refType } from './types';
var BlockHeader = (_dec = connect(function (state, props) {
  var fieldId = props.fieldId,
      blockId = props.blockId;
  var fieldData = state[fieldId];
  var blocks = fieldData.blocks;
  var block = blocks[blockId];
  var blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);
  var value = block.value;
  return {
    isSimpleLayout: isSimpleLayout(blockDefinition, fieldData.isMobile),
    blockDefinition: blockDefinition,
    icons: fieldData.icons,
    value: isStruct(blockDefinition) ? structValueToObject(state, fieldId, value) : value
  };
}, function (dispatch, props) {
  var fieldId = props.fieldId,
      blockId = props.blockId;
  return bindActionCreators({
    toggleBlock: function toggleBlock() {
      return _toggleBlock(fieldId, blockId);
    }
  }, dispatch);
}), _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BlockHeader, _React$Component);

  function BlockHeader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BlockHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BlockHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.toggle = function () {
      var _this$props = _this.props,
          isSimpleLayout = _this$props.isSimpleLayout,
          toggleBlock = _this$props.toggleBlock,
          closed = _this$props.closed;

      if (isSimpleLayout) {
        return;
      }

      toggleBlock();

      _this.triggerCustomEvent('toggle', {
        closed: !closed
      });
    };

    return _this;
  }

  _createClass(BlockHeader, [{
    key: "triggerCustomEvent",
    value: function triggerCustomEvent(name) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _triggerCustomEvent(ReactDOM.findDOMNode(this), name, data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          fieldId = _this$props2.fieldId,
          blockDefinition = _this$props2.blockDefinition,
          blockId = _this$props2.blockId,
          isSimpleLayout = _this$props2.isSimpleLayout,
          dragHandleProps = _this$props2.dragHandleProps,
          icons = _this$props2.icons,
          collapsibleBlock = _this$props2.collapsibleBlock,
          sortableBlock = _this$props2.sortableBlock,
          canDuplicate = _this$props2.canDuplicate,
          dragHandleRef = _this$props2.dragHandleRef;
      var icon = blockDefinition.icon;
      var content;

      if (isSimpleLayout) {
        content = React.createElement("div", {
          className: "c-sf-block__header__title",
          dangerouslySetInnerHTML: {
            __html: icon ? icon : icons.grip
          }
        });
      } else {
        content = React.createElement(React.Fragment, null, this.titleAndType, React.createElement(BlockActions, {
          fieldId: fieldId,
          blockId: blockId,
          sortableBlock: sortableBlock,
          canDuplicate: canDuplicate,
          dragHandleRef: dragHandleRef
        }));
      }

      return React.createElement("div", _extends({
        ref: dragHandleRef,
        onClick: this.toggle
      }, dragHandleProps, {
        className: classNames('c-sf-block__header', collapsibleBlock && 'c-sf-block__header--collapsible', sortableBlock && 'c-sf-block__header--sortable')
      }), content);
    }
  }, {
    key: "title",
    get: function get() {
      var _this$props3 = this.props,
          title = _this$props3.title,
          blockDefinition = _this$props3.blockDefinition,
          value = _this$props3.value;

      if (title !== undefined && title !== null) {
        return title;
      }

      if (blockDefinition.titleTemplate !== undefined) {
        var hasVariables = false;
        var isEmpty = true;
        var renderedTitle = blockDefinition.titleTemplate.replace(/\${([^}]+)}/g, function (match, varName) {
          if (isStruct(blockDefinition)) {
            var childValue = value[varName];

            if (isNA(childValue)) {
              childValue = '';
            } else if (childValue !== '') {
              isEmpty = false;
            }

            hasVariables = true;
            return childValue;
          } else {
            if (varName === blockDefinition.key) {
              return value;
            }

            return '';
          }
        });

        if (!hasVariables || !isEmpty) {
          return renderedTitle;
        }
      }

      return null;
    }
  }, {
    key: "titleAndType",
    get: function get() {
      var title = this.title;
      var icon = this.props.blockDefinition.icon;
      var blockType = React.createElement("span", {
        className: "c-sf-block__type"
      }, getLabel(this.props.blockDefinition));

      if (isNA(icon)) {
        return blockType;
      }

      icon = React.createElement("span", {
        className: "c-sf-block__header__title__icon",
        dangerouslySetInnerHTML: {
          __html: icon
        }
      });

      if (title) {
        return React.createElement(React.Fragment, null, React.createElement("h3", {
          className: "c-sf-block__header__title"
        }, icon, title), blockType);
      }

      return React.createElement("span", null, React.createElement("h3", {
        className: "c-sf-block__header__title"
      }, icon, title), blockType);
    }
  }]);

  return BlockHeader;
}(React.Component), _class2.defaultProps = {
  collapsibleBlock: true,
  sortableBlock: true,
  canDuplicate: true
}, _temp)) || _class);
process.env.NODE_ENV !== "production" ? BlockHeader.propTypes = {
  fieldId: PropTypes.string.isRequired,
  blockId: PropTypes.string.isRequired,
  collapsibleBlock: PropTypes.bool,
  sortableBlock: PropTypes.bool,
  canDuplicate: PropTypes.bool,
  dragHandleRef: refType,
  dragHandleProps: PropTypes.object
} : void 0;
export default BlockHeader;