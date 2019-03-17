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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { getNestedBlockDefinition, isStruct, getDescendantsIds, isSimpleLayout, replaceWithComponent, isNA } from './processing/utils';
import StructChildField from './StructChildField';
import FieldInput from './FieldInput';
var BlockContent = (_dec = connect(function (state, props) {
  var fieldId = props.fieldId,
      blockId = props.blockId;
  var fieldData = state[fieldId];
  var blocks = fieldData.blocks;
  var block = blocks[blockId];
  var blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);
  var hasDescendantError = getDescendantsIds(state, fieldId, blockId, true).some(function (descendantBlockId) {
    return blocks[descendantBlockId].hasError;
  });
  return {
    isSimpleLayout: isSimpleLayout(blockDefinition, fieldData.isMobile),
    blockDefinition: blockDefinition,
    html: block.html,
    closed: block.closed && !hasDescendantError
  };
}), _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BlockContent, _React$Component);

  function BlockContent() {
    _classCallCheck(this, BlockContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(BlockContent).apply(this, arguments));
  }

  _createClass(BlockContent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isSimpleLayout = _this$props.isSimpleLayout,
          blockDefinition = _this$props.blockDefinition,
          collapsible = _this$props.collapsible;
      var content = this.html;
      var className = classNames('c-sf-block__content-inner', blockDefinition.className);

      if (collapsible && !isSimpleLayout) {
        return React.createElement(AnimateHeight, {
          height: this.height,
          easing: "ease-in-out",
          className: "c-sf-block__content",
          contentClassName: className
        }, blockDefinition.show_uuid && React.createElement("p", null, "UUID: ", this.props.blockId), content);
      }

      return React.createElement("div", {
        className: "c-sf-block__content"
      }, React.createElement("div", {
        className: className
      }, blockDefinition.show_uuid && React.createElement("p", null, "UUID: ", this.props.blockId), content));
    }
  }, {
    key: "html",
    get: function get() {
      var _this$props2 = this.props,
          fieldId = _this$props2.fieldId,
          blockDefinition = _this$props2.blockDefinition,
          blockId = _this$props2.blockId;

      if (blockDefinition.reactComponent && blockDefinition.reactComponent.block_type == 'BlockContent' && !this.props.custom) {
        var Component = window.reactStreamFieldComponentMapping[blockDefinition.reactComponent.name];
        return React.createElement(Component, _extends({
          sortable: false,
          collapsible: false,
          fieldId: fieldId,
          blockId: blockId,
          blockDefinition: blockDefinition
        }, blockDefinition.reactComponent.props || {}));
      }

      if (isStruct(blockDefinition)) {
        var blocksContainer = blockDefinition.children.filter(function (childBlockDefinition) {
          return !childBlockDefinition.hidden;
        }).map(function (childBlockDefinition) {
          if (childBlockDefinition.reactComponent && childBlockDefinition.reactComponent.block_type == 'StructChildField') {
            var _Component = window.reactStreamFieldComponentMapping[childBlockDefinition.reactComponent.name];
            return React.createElement(_Component, _extends({
              key: childBlockDefinition.key,
              fieldId: fieldId,
              parentBlockId: blockId,
              type: childBlockDefinition.key
            }, childBlockDefinition.reactComponent.props || {}));
          }

          return React.createElement(StructChildField, {
            key: childBlockDefinition.key,
            fieldId: fieldId,
            parentBlockId: blockId,
            type: childBlockDefinition.key
          });
        });
        var html = this.props.html;

        if (isNA(html)) {
          html = blockDefinition.html;
        }

        if (isNA(html)) {
          return blocksContainer;
        }

        return replaceWithComponent(html, '<noscript data-blocks-container></noscript>', blocksContainer);
      }

      return React.createElement(FieldInput, {
        fieldId: fieldId,
        blockId: blockId
      });
    }
  }, {
    key: "height",
    get: function get() {
      return this.props.closed ? 0 : 'auto';
    }
  }]);

  return BlockContent;
}(React.Component), _class2.defaultProps = {
  collapsible: true
}, _temp)) || _class);
process.env.NODE_ENV !== "production" ? BlockContent.propTypes = {
  fieldId: PropTypes.string.isRequired,
  blockId: PropTypes.string.isRequired,
  collapsible: PropTypes.bool
} : void 0;
export default BlockContent;