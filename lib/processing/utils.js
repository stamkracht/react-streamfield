function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import React from 'react';
import uuidv4 from 'uuid';
export var isNA = function isNA(value) {
  return value === null || value === undefined;
};
export var getNewId = function getNewId() {
  return uuidv4();
};
export var getFieldName = function getFieldName(blockId) {
  return "field-".concat(blockId);
};
export var isField = function isField(blockDefinition) {
  return blockDefinition.children === undefined || blockDefinition.children.length === 0;
};
export var isStruct = function isStruct(blockDefinition) {
  return blockDefinition.isStruct !== undefined && blockDefinition.isStruct;
};
export var isStatic = function isStatic(blockDefinition) {
  return blockDefinition.isStatic !== undefined && blockDefinition.isStatic;
};
export var getIsMobile = function getIsMobile() {
  return window.matchMedia('(max-width: 799px)').matches;
};
export var getLayout = function getLayout(blockDefinition, isMobile) {
  if (blockDefinition.layout === undefined || isMobile) {
    return 'COLLAPSIBLE';
  }

  return blockDefinition.layout;
};
export var isSimpleLayout = function isSimpleLayout(blockDefinition, isMobile) {
  return getLayout(blockDefinition, isMobile) === 'SIMPLE';
};
export var isClosed = function isClosed(blockDefinition, isMobile) {
  return !isSimpleLayout(blockDefinition, isMobile) && (blockDefinition.closed === undefined || blockDefinition.closed);
};
export var shouldRunInnerScripts = function shouldRunInnerScripts(blockDefinition) {
  return blockDefinition.dangerouslyRunInnerScripts !== undefined && blockDefinition.dangerouslyRunInnerScripts;
};
export var getLabel = function getLabel(blockDefinition) {
  var key = blockDefinition.key,
      label = blockDefinition.label;

  if (label === undefined) {
    label = key.replace('_', ' ');
    label = "".concat(label[0].toUpperCase()).concat(label.substring(1));
  }

  return label;
};
export var getChildrenIds = function getChildrenIds(state, fieldId, parentId) {
  var fieldData = state[fieldId];
  var blocks = fieldData.blocks;

  if (parentId === null) {
    return fieldData.rootBlocks;
  } else {
    return blocks[parentId].value;
  }
};
export var getSiblingsIds = function getSiblingsIds(state, fieldId, blockId) {
  var fieldData = state[fieldId];
  var blocks = fieldData.blocks;
  var block = blocks[blockId];
  var parentId = block.parent;

  if (parentId !== null) {
    var parentBlockDefinition = getNestedBlockDefinition(state, fieldId, parentId);

    if (isStruct(parentBlockDefinition)) {
      return [blockId];
    }
  }

  return getChildrenIds(state, fieldId, parentId);
};
export var getAncestorsIds = function getAncestorsIds(state, fieldId, blockId) {
  var includeSelf = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var blocks = state[fieldId].blocks;
  var ancestors = [];

  if (includeSelf) {
    ancestors.push(blockId);
  }

  var block = blocks[blockId];

  while (block.parent !== null) {
    blockId = block.parent;
    ancestors.push(blockId);
    block = blocks[blockId];
  }

  return ancestors.reverse();
};
export var getDescendantsIds = function getDescendantsIds(state, fieldId, blockId) {
  var includeSelf = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var descendants = [];

  if (includeSelf) {
    descendants.push(blockId);
  }

  var blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);

  if (isField(blockDefinition)) {
    return descendants;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = state[fieldId].blocks[blockId].value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var childBlockId = _step.value;
      descendants = [].concat(_toConsumableArray(descendants), _toConsumableArray(getDescendantsIds(state, fieldId, childBlockId, true)));
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

  return descendants;
};
export var getBlockDefinition = function getBlockDefinition(blockDefinitions, type) {
  var blockDefinition = blockDefinitions.find(function (blockDefinition) {
    return blockDefinition.key === type;
  });

  if (blockDefinition === undefined) {
    throw new TypeError("No block definition found for '".concat(type, "'"));
  }

  return blockDefinition;
};
export var getNestedBlockDefinition = function getNestedBlockDefinition(state, fieldId, blockId) {
  var fieldData = state[fieldId];
  var blockDefinitions = fieldData.blockDefinitions,
      blocks = fieldData.blocks;
  var blockDefinition;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = getAncestorsIds(state, fieldId, blockId, true)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var ancestorId = _step2.value;
      var block = blocks[ancestorId];
      blockDefinition = getBlockDefinition(blockDefinitions, block.type);
      blockDefinitions = blockDefinition.children;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return blockDefinition;
};
export var structValueToObject = function structValueToObject(state, fieldId, structValue) {
  var blocks = state[fieldId].blocks;
  var obj = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = structValue[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var childBlockId = _step3.value;
      var childBlockDefinition = getNestedBlockDefinition(state, fieldId, childBlockId);
      var value = void 0;

      if (isField(childBlockDefinition)) {
        var childBlock = blocks[childBlockId];
        value = childBlock.value;
      } else {
        value = childBlockId;
      }

      obj[childBlockDefinition.key] = value;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return obj;
};
export var getNewBlock = function getNewBlock(parentId, blockDefinition) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var extraBlocks = {};
  var childBlockId, childBlock, childExtraBlocks;
  var blockId = getNewId();

  if (isNA(value) && blockDefinition.default !== undefined) {
    value = blockDefinition.default;
  }

  if (isStruct(blockDefinition)) {
    var newValue = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = blockDefinition.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var childBlockDefinition = _step4.value;
        var childDefaultValue = null;

        if (!isNA(value)) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = value[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var childDefault = _step5.value;

              if (childDefault.type === childBlockDefinition.key) {
                childDefaultValue = childDefault.value;
                break;
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }

        var _getNewBlock = getNewBlock(blockId, childBlockDefinition, childDefaultValue);

        var _getNewBlock2 = _slicedToArray(_getNewBlock, 3);

        childBlockId = _getNewBlock2[0];
        childBlock = _getNewBlock2[1];
        childExtraBlocks = _getNewBlock2[2];
        newValue.push(childBlockId);
        extraBlocks = _objectSpread({}, extraBlocks, childExtraBlocks, _defineProperty({}, childBlockId, childBlock));
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    value = newValue;
  } else if (!isField(blockDefinition)) {
    var _newValue = [];

    if (!isNA(value)) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = value[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _childBlock = _step6.value;

          var _childBlockDefinition = void 0;

          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = blockDefinition.children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              _childBlockDefinition = _step7.value;

              if (_childBlockDefinition.key === _childBlock.type) {
                break;
              }
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }

          var _getNewBlock3 = getNewBlock(blockId, _childBlockDefinition, _childBlock.value);

          var _getNewBlock4 = _slicedToArray(_getNewBlock3, 3);

          childBlockId = _getNewBlock4[0];
          _childBlock = _getNewBlock4[1];
          childExtraBlocks = _getNewBlock4[2];

          _newValue.push(childBlockId);

          extraBlocks = _objectSpread({}, extraBlocks, childExtraBlocks, _defineProperty({}, childBlockId, _childBlock));
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }

    value = _newValue;
  }

  return [blockId, {
    parent: parentId,
    type: blockDefinition.key,
    value: value,
    hidden: true,
    closed: false,
    shouldUpdate: false
  }, extraBlocks];
};
export var deepCopy = function deepCopy(data) {
  var copy;

  if (data instanceof FileList) {
    return data;
  }

  if (data instanceof Array) {
    return data.map(function (v) {
      return deepCopy(v);
    });
  }

  if (data instanceof Object) {
    copy = {};

    var _arr2 = Object.entries(data);

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var _arr2$_i = _slicedToArray(_arr2[_i2], 2),
          key = _arr2$_i[0],
          value = _arr2$_i[1];

      copy[key] = deepCopy(value);
    }

    return copy;
  }

  return data;
};
export var applyToBlocks = function applyToBlocks(state, fieldId, blocksIds, func) {
  var fieldData = state[fieldId];
  var blocks = fieldData.blocks;
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = blocksIds[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var blockId = _step8.value;
      var block = deepCopy(blocks[blockId]);
      blocks[blockId] = func(block);
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  return _objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, fieldData, {
    blocks: blocks
  })));
};
export var applyToBlock = function applyToBlock(state, fieldId, blockId, func) {
  return applyToBlocks(state, fieldId, [blockId], func);
};
export var triggerKeyboardEvent = function triggerKeyboardEvent(element, key) {
  var event = new Event('keydown', {
    bubbles: true,
    cancelable: true
  });
  event.key = key; // These four lines

  event.keyIdentifier = key; // are here

  event.keyCode = key; // to fix cross-browser

  event.which = key; // compatibility issues.

  element.dispatchEvent(event);
};
export var triggerCustomEvent = function triggerCustomEvent(element, name) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (data === null) {
    data = {};
  }

  var event = new CustomEvent("streamfield:".concat(name), {
    detail: _objectSpread({
      target: element
    }, data)
  });
  element.dispatchEvent(event);
  window.dispatchEvent(event);
};
export var replaceWithComponent = function replaceWithComponent(string, placeholder, component) {
  var parts = string.split(new RegExp("(".concat(placeholder, ")")));

  for (var i in parts) {
    var part = parts[i];

    if (part === placeholder) {
      parts[i] = React.createElement(React.Fragment, {
        key: i
      }, component);
    } else {
      parts[i] = React.createElement("span", {
        key: i,
        dangerouslySetInnerHTML: {
          __html: part
        }
      });
    }
  }

  return React.createElement(React.Fragment, null, parts);
};