function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { getBlockDefinition, getNestedBlockDefinition, isField, isStruct, getNewBlock, getNewId, isClosed, getIsMobile, isNA } from './utils';
export var getNestedBlocksState = function getNestedBlocksState(parentBlockId, blockDefinitions, blocks) {
  var childrenBlocksIds = [];
  var blocksState = {};
  var descendantsBlocksState = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var block = _step.value;
      var blockId = block.id === undefined ? getNewId() : block.id;
      var blockDefinition = blockDefinitions.length === 1 ? blockDefinitions[0] : getBlockDefinition(blockDefinitions, block.type);
      var blockIsField = isField(blockDefinition);
      var value = block.value;

      if (!blockIsField) {
        if (isNA(value)) {
          value = [];
        }

        if (isStruct(blockDefinition)) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            var _loop = function _loop() {
              var childBlockDefinition = _step2.value;
              var childBlockType = childBlockDefinition.key;
              var childBlock = value.find(function (childBlock) {
                return childBlock.type === childBlockType;
              });

              if (childBlock === undefined) {
                var _getNewBlock = getNewBlock(blockId, childBlockDefinition),
                    _getNewBlock2 = _slicedToArray(_getNewBlock, 3),
                    childBlockId = _getNewBlock2[0],
                    _childBlock = _getNewBlock2[1],
                    extraBlocks = _getNewBlock2[2];

                blocksState = _objectSpread({}, blocksState, extraBlocks, _defineProperty({}, childBlockId, _childBlock));
                value.push(_objectSpread({
                  id: childBlockId
                }, _childBlock));
              }
            };

            for (var _iterator2 = blockDefinition.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _loop();
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
        }

        var _getNestedBlocksState = getNestedBlocksState(blockId, blockDefinition.children, value);

        var _getNestedBlocksState2 = _slicedToArray(_getNestedBlocksState, 2);

        value = _getNestedBlocksState2[0];
        descendantsBlocksState = _getNestedBlocksState2[1];
        blocksState = _objectSpread({}, blocksState, descendantsBlocksState);
      }

      childrenBlocksIds.push(blockId);
      blocksState[blockId] = {
        parent: parentBlockId,
        type: blockDefinition.key,
        html: block.html,
        hasError: block.hasError,
        value: value,
        hidden: false,
        closed: isClosed(blockDefinition, getIsMobile()),
        shouldUpdate: false,
        isField: blockIsField
      };
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

  return [childrenBlocksIds, blocksState];
};
export var valueToState = function valueToState(prevState, fieldId, value) {
  var _getNestedBlocksState3 = getNestedBlocksState(null, prevState[fieldId].blockDefinitions, value),
      _getNestedBlocksState4 = _slicedToArray(_getNestedBlocksState3, 2),
      rootBlocks = _getNestedBlocksState4[0],
      blocks = _getNestedBlocksState4[1]; // Delete internal field created only for browsing data.


  var _arr2 = Object.values(blocks);

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var block = _arr2[_i2];
    delete block['isField'];
  }

  return _objectSpread({}, prevState, _defineProperty({}, fieldId, _objectSpread({}, prevState[fieldId], {
    rootBlocks: rootBlocks,
    blocks: blocks
  })));
};
export var extractValue = function extractValue(state, fieldId, blockId) {
  var blocks = state[fieldId].blocks;
  var block = blocks[blockId];
  var value = block.value;
  var blockDefinition = getNestedBlockDefinition(state, fieldId, blockId);

  if (!isField(blockDefinition)) {
    value = value.map(function (childBlockId) {
      return extractValue(state, fieldId, childBlockId);
    });
  }

  return {
    id: blockId,
    type: block.type,
    value: value
  };
};
export var stateToValue = function stateToValue(state, fieldId) {
  var fieldData = state[fieldId];
  return fieldData.rootBlocks.map(function (blockId) {
    return extractValue(state, fieldId, blockId);
  });
};