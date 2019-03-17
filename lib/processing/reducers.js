function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { applyToBlocks, getBlockDefinition, getChildrenIds, getDescendantsIds, getNestedBlockDefinition, getNewBlock, getNewId, isField, isStruct } from './utils';
export var updateChildren = function updateChildren(state, fieldId, parentId) {
  var childrenIds = getChildrenIds(state, fieldId, parentId);
  return applyToBlocks(state, fieldId, childrenIds, function (block) {
    return _objectSpread({}, block, {
      shouldUpdate: true
    });
  });
};
export var setChildren = function setChildren(state, fieldId, parentId, childrenIds) {
  var fieldData = state[fieldId];
  var blocks = fieldData.blocks;

  if (parentId === null) {
    fieldData = _objectSpread({}, fieldData, {
      rootBlocks: childrenIds
    });
  } else {
    blocks = _objectSpread({}, blocks, _defineProperty({}, parentId, _objectSpread({}, blocks[parentId], {
      value: childrenIds
    })));
  }

  return _objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, fieldData, {
    blocks: blocks
  })));
};
export var insertBlock = function insertBlock(state, fieldId, parentId, index, blockId, block) {
  var siblingsIds = _toConsumableArray(getChildrenIds(state, fieldId, parentId));

  siblingsIds.splice(index, 0, blockId);
  state = setChildren(state, fieldId, parentId, siblingsIds);
  var fieldData = state[fieldId];
  var blocks = fieldData.blocks;
  state = _objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, fieldData, {
    blocks: _objectSpread({}, blocks, _defineProperty({}, blockId, block))
  })));
  return updateChildren(state, fieldId, parentId);
};
export var moveBlock = function moveBlock(state, fieldId, blockId, newIndex) {
  if (newIndex < 0) {
    throw new Error("Index ".concat(newIndex, " is out of bounds."));
  }

  var fieldData = state[fieldId];
  var blocks = fieldData.blocks;
  var block = blocks[blockId];

  var siblingsIds = _toConsumableArray(getChildrenIds(state, fieldId, block.parent));

  if (newIndex >= siblingsIds.length) {
    throw new Error("Index ".concat(newIndex, " is out of bounds."));
  }

  var oldIndex = siblingsIds.indexOf(blockId);
  siblingsIds.splice(oldIndex, 1);
  siblingsIds.splice(newIndex, 0, blockId);
  state = setChildren(state, fieldId, block.parent, siblingsIds);
  return updateChildren(state, fieldId, block.parent);
};
export var addBlock = function addBlock(state, fieldId, parentId, index, type) {
  var fieldData = state[fieldId];
  var blockDefinitions;

  if (parentId === null) {
    blockDefinitions = fieldData.blockDefinitions;
  } else {
    var parentBlockDefinition = getNestedBlockDefinition(state, fieldId, parentId);
    blockDefinitions = parentBlockDefinition.children;
  }

  var blockDefinition = getBlockDefinition(blockDefinitions, type);

  var _getNewBlock = getNewBlock(parentId, blockDefinition),
      _getNewBlock2 = _slicedToArray(_getNewBlock, 3),
      blockId = _getNewBlock2[0],
      block = _getNewBlock2[1],
      extraBlocks = _getNewBlock2[2];

  state = _objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, fieldData, {
    blocks: _objectSpread({}, fieldData.blocks, extraBlocks)
  })));
  return insertBlock(state, fieldId, parentId, index, blockId, block);
};
export var getIndex = function getIndex(state, fieldId, blockId) {
  var block = state[fieldId].blocks[blockId];

  var siblingsIds = _toConsumableArray(getChildrenIds(state, fieldId, block.parent));

  return siblingsIds.indexOf(blockId);
};
export var cloneBlock = function cloneBlock(state, fieldId, parentId, blockId) {
  var fieldData = state[fieldId];

  var blocks = _objectSpread({}, fieldData.blocks);

  var newBlockId = getNewId();

  var newBlock = _objectSpread({}, blocks[blockId], {
    parent: parentId
  });

  var newBlocks = _defineProperty({}, newBlockId, newBlock);

  var blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);
  var value = newBlock.value;

  if (isStruct(blockDefinition)) {
    var newValue = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var childBlockId = _step.value;

        var _cloneBlock = cloneBlock(state, fieldId, newBlockId, childBlockId),
            _cloneBlock2 = _slicedToArray(_cloneBlock, 2),
            newChildId = _cloneBlock2[0],
            newChildrenBlocks = _cloneBlock2[1];

        newBlocks = _objectSpread({}, newBlocks, newChildrenBlocks);
        newValue.push(newChildId);
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

    value = newValue;
  } else if (!isField(blockDefinition)) {
    var _newValue = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _childBlockId = _step2.value;

        var _cloneBlock3 = cloneBlock(state, fieldId, newBlockId, _childBlockId),
            _cloneBlock4 = _slicedToArray(_cloneBlock3, 2),
            newChildBlockId = _cloneBlock4[0],
            newChildrenBlocks = _cloneBlock4[1];

        _newValue.push(newChildBlockId);

        newBlocks = _objectSpread({}, newBlocks, newChildrenBlocks);
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

    value = _newValue;
  } else if (blockDefinition.doNotClone) {
    value = '';
  }

  newBlock.value = value;
  return [newBlockId, newBlocks];
};
export var duplicateBlock = function duplicateBlock(state, fieldId, blockId) {
  var fieldData = state[fieldId];
  var blocks = fieldData.blocks;
  var parentId = blocks[blockId].parent;

  var _cloneBlock5 = cloneBlock(state, fieldId, parentId, blockId),
      _cloneBlock6 = _slicedToArray(_cloneBlock5, 2),
      newBlockId = _cloneBlock6[0],
      newBlocks = _cloneBlock6[1];

  state = _objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, fieldData, {
    blocks: _objectSpread({}, blocks, newBlocks)
  })));
  var block = newBlocks[newBlockId];
  block.hidden = true;
  var index = getIndex(state, fieldId, blockId) + 1; // + 1 to add after.

  return insertBlock(state, fieldId, parentId, index, newBlockId, block);
};
export var deleteBlock = function deleteBlock(state, fieldId, blockId) {
  var fieldData = state[fieldId];

  var rootBlocks = _toConsumableArray(fieldData.rootBlocks);

  var blocks = _objectSpread({}, fieldData.blocks);

  var block = blocks[blockId];
  var shouldUpdateSiblings = true;

  if (block.parent === null) {
    rootBlocks = rootBlocks.filter(function (childBlockId) {
      return childBlockId !== blockId;
    });
  } else {
    var parentBlockDefinition = getNestedBlockDefinition(state, fieldId, block.parent);
    var parentBlock = blocks[block.parent];

    if (isStruct(parentBlockDefinition)) {
      shouldUpdateSiblings = false;
    }

    blocks[block.parent] = _objectSpread({}, parentBlock, {
      closed: false,
      // We make sure it’s open for when we remove
      shouldUpdate: true,
      // an errored block from a list block, and we
      // force update the header color.
      value: parentBlock.value.filter(function (childBlockId) {
        return childBlockId !== blockId;
      })
    });
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = getDescendantsIds(state, fieldId, blockId, true)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var descendantBlockId = _step3.value;
      delete blocks[descendantBlockId];
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

  state = _objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, fieldData, {
    rootBlocks: rootBlocks,
    blocks: blocks
  })));

  if (shouldUpdateSiblings) {
    return updateChildren(state, fieldId, block.parent);
  }

  return state;
};