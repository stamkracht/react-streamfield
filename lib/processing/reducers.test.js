function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { addBlock, deleteBlock, moveBlock } from './reducers';
import { valueToState } from './conversions';
import { initialState, fieldId, rootBlock1, rootBlock2, listBlock, structBlock, streamBlock, rootBlock1Id, rootBlock2Id, listBlockId, listBlockImage1Id, listBlockImage2Id, structBlockId, structBlockHeightId, structBlockImagesId, structBlockImageCell1Id, structBlockImage1Id, structBlockWidth1Id, structBlockImageCell2Id, structBlockImage2Id, structBlockWidth2Id, structBlockRelatedPagesId, structBlockPageId, streamBlockId, streamBlockImageId, streamBlockTitleId, rootBlock1State, rootBlock2State, listBlockState, listBlockImage1State, listBlockImage2State, structBlockState, structBlockHeightState, structBlockImagesState, structBlockImage1State, structBlockWidth1State, structBlockImageCell1State, structBlockImage2State, structBlockWidth2State, structBlockImageCell2State, structBlockRelatedPagesState, structBlockPageState, streamBlockState, streamBlockImage1State, streamBlockImage2State } from './samples';
describe('addBlock', function () {
  test('As root', function () {
    var _blocks2, _blocks3, _blocks4;

    var state = valueToState(initialState, fieldId, []);
    state = addBlock(state, fieldId, null, 0, 'image');
    var id1 = state[fieldId].rootBlocks[0];
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [id1],
      blocks: _defineProperty({}, id1, {
        parent: null,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      })
    }))));
    state = addBlock(state, fieldId, null, 0, 'carousel');
    var id2 = state[fieldId].rootBlocks[0];
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [id2, id1],
      blocks: (_blocks2 = {}, _defineProperty(_blocks2, id1, {
        parent: null,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks2, id2, {
        parent: null,
        type: 'carousel',
        value: [],
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _blocks2)
    }))));
    state = addBlock(state, fieldId, null, 2, 'image_row');
    var id3 = state[fieldId].rootBlocks[2];
    var blocks = state[fieldId].blocks;

    var getId = function getId(key) {
      return blocks[id3].value.find(function (childBlockId) {
        return blocks[childBlockId].type === key;
      });
    };

    var childHeightId = getId('height');
    var childImagesId = getId('images');
    var childRelatedPagesId = getId('related_pages');
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [id2, id1, id3],
      blocks: (_blocks3 = {}, _defineProperty(_blocks3, id1, {
        parent: null,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks3, id2, {
        parent: null,
        type: 'carousel',
        value: [],
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks3, id3, {
        parent: null,
        type: 'image_row',
        value: [childHeightId, childImagesId, childRelatedPagesId],
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks3, childHeightId, {
        parent: id3,
        type: 'height',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: false
      }), _defineProperty(_blocks3, childImagesId, {
        parent: id3,
        type: 'images',
        value: [],
        closed: false,
        hidden: true,
        shouldUpdate: false
      }), _defineProperty(_blocks3, childRelatedPagesId, {
        parent: id3,
        type: 'related_pages',
        value: [],
        closed: false,
        hidden: true,
        shouldUpdate: false
      }), _blocks3)
    }))));
    state = addBlock(state, fieldId, null, 1, 'rich_carousel');
    var id4 = state[fieldId].rootBlocks[1];
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [id2, id4, id1, id3],
      blocks: (_blocks4 = {}, _defineProperty(_blocks4, id1, {
        parent: null,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks4, id2, {
        parent: null,
        type: 'carousel',
        value: [],
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks4, id3, {
        parent: null,
        type: 'image_row',
        value: [childHeightId, childImagesId, childRelatedPagesId],
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks4, childHeightId, {
        parent: id3,
        type: 'height',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: false
      }), _defineProperty(_blocks4, childImagesId, {
        parent: id3,
        type: 'images',
        value: [],
        closed: false,
        hidden: true,
        shouldUpdate: false
      }), _defineProperty(_blocks4, childRelatedPagesId, {
        parent: id3,
        type: 'related_pages',
        value: [],
        closed: false,
        hidden: true,
        shouldUpdate: false
      }), _defineProperty(_blocks4, id4, {
        parent: null,
        type: 'rich_carousel',
        value: [],
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _blocks4)
    }))));
  });
  test('As leaf', function () {
    var _blocks6, _blocks7, _blocks8, _blocks9;

    var state = valueToState(initialState, fieldId, []);
    state = addBlock(state, fieldId, null, 0, 'carousel');
    var id1 = state[fieldId].rootBlocks[0];
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [id1],
      blocks: _defineProperty({}, id1, {
        parent: null,
        type: 'carousel',
        value: [],
        closed: false,
        hidden: true,
        shouldUpdate: true
      })
    }))));
    state = addBlock(state, fieldId, id1, 0, 'image');
    var id2 = state[fieldId].blocks[id1].value[0];
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [id1],
      blocks: (_blocks6 = {}, _defineProperty(_blocks6, id1, {
        parent: null,
        type: 'carousel',
        value: [id2],
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks6, id2, {
        parent: id1,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _blocks6)
    }))));
    state = addBlock(state, fieldId, id1, 0, 'image');
    var id3 = state[fieldId].blocks[id1].value[0];
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [id1],
      blocks: (_blocks7 = {}, _defineProperty(_blocks7, id1, {
        parent: null,
        type: 'carousel',
        value: [id3, id2],
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks7, id2, {
        parent: id1,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks7, id3, {
        parent: id1,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _blocks7)
    }))));
    state = addBlock(state, fieldId, id1, 2, 'image');
    var id4 = state[fieldId].blocks[id1].value[2];
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [id1],
      blocks: (_blocks8 = {}, _defineProperty(_blocks8, id1, {
        parent: null,
        type: 'carousel',
        value: [id3, id2, id4],
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks8, id2, {
        parent: id1,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks8, id3, {
        parent: id1,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks8, id4, {
        parent: id1,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _blocks8)
    }))));
    state = addBlock(state, fieldId, id1, 1, 'image');
    var id5 = state[fieldId].blocks[id1].value[1];
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [id1],
      blocks: (_blocks9 = {}, _defineProperty(_blocks9, id1, {
        parent: null,
        type: 'carousel',
        value: [id3, id5, id2, id4],
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks9, id2, {
        parent: id1,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks9, id3, {
        parent: id1,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks9, id4, {
        parent: id1,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _defineProperty(_blocks9, id5, {
        parent: id1,
        type: 'image',
        value: null,
        closed: false,
        hidden: true,
        shouldUpdate: true
      }), _blocks9)
    }))));
  });
});
describe('moveBlock', function () {
  test('As root', function () {
    var _blocks10, _blocks11, _blocks12, _blocks13, _blocks14, _blocks15, _blocks16, _blocks17;

    var state = valueToState(initialState, fieldId, [rootBlock1, rootBlock2, structBlock]);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [rootBlock1Id, rootBlock2Id, structBlockId],
      blocks: (_blocks10 = {}, _defineProperty(_blocks10, rootBlock1Id, rootBlock1State), _defineProperty(_blocks10, rootBlock2Id, rootBlock2State), _defineProperty(_blocks10, structBlockId, structBlockState), _defineProperty(_blocks10, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks10, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks10, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks10, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks10, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks10, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks10, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks10, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks10, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks10, structBlockPageId, structBlockPageState), _blocks10)
    }))));
    state = moveBlock(state, fieldId, rootBlock1Id, 0);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [rootBlock1Id, rootBlock2Id, structBlockId],
      blocks: (_blocks11 = {}, _defineProperty(_blocks11, rootBlock1Id, _objectSpread({}, rootBlock1State, {
        shouldUpdate: true
      })), _defineProperty(_blocks11, rootBlock2Id, _objectSpread({}, rootBlock2State, {
        shouldUpdate: true
      })), _defineProperty(_blocks11, structBlockId, _objectSpread({}, structBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks11, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks11, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks11, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks11, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks11, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks11, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks11, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks11, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks11, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks11, structBlockPageId, structBlockPageState), _defineProperty(_blocks11, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks11, structBlockPageId, structBlockPageState), _blocks11)
    }))));
    state = moveBlock(state, fieldId, rootBlock2Id, 1);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [rootBlock1Id, rootBlock2Id, structBlockId],
      blocks: (_blocks12 = {}, _defineProperty(_blocks12, rootBlock1Id, _objectSpread({}, rootBlock1State, {
        shouldUpdate: true
      })), _defineProperty(_blocks12, rootBlock2Id, _objectSpread({}, rootBlock2State, {
        shouldUpdate: true
      })), _defineProperty(_blocks12, structBlockId, _objectSpread({}, structBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks12, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks12, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks12, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks12, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks12, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks12, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks12, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks12, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks12, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks12, structBlockPageId, structBlockPageState), _blocks12)
    }))));
    state = moveBlock(state, fieldId, structBlockId, 2);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [rootBlock1Id, rootBlock2Id, structBlockId],
      blocks: (_blocks13 = {}, _defineProperty(_blocks13, rootBlock1Id, _objectSpread({}, rootBlock1State, {
        shouldUpdate: true
      })), _defineProperty(_blocks13, rootBlock2Id, _objectSpread({}, rootBlock2State, {
        shouldUpdate: true
      })), _defineProperty(_blocks13, structBlockId, _objectSpread({}, structBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks13, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks13, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks13, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks13, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks13, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks13, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks13, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks13, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks13, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks13, structBlockPageId, structBlockPageState), _blocks13)
    }))));
    state = moveBlock(state, fieldId, rootBlock1Id, 1);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [rootBlock2Id, rootBlock1Id, structBlockId],
      blocks: (_blocks14 = {}, _defineProperty(_blocks14, rootBlock1Id, _objectSpread({}, rootBlock1State, {
        shouldUpdate: true
      })), _defineProperty(_blocks14, rootBlock2Id, _objectSpread({}, rootBlock2State, {
        shouldUpdate: true
      })), _defineProperty(_blocks14, structBlockId, _objectSpread({}, structBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks14, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks14, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks14, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks14, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks14, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks14, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks14, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks14, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks14, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks14, structBlockPageId, structBlockPageState), _blocks14)
    }))));
    state = moveBlock(state, fieldId, rootBlock1Id, 0);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [rootBlock1Id, rootBlock2Id, structBlockId],
      blocks: (_blocks15 = {}, _defineProperty(_blocks15, rootBlock1Id, _objectSpread({}, rootBlock1State, {
        shouldUpdate: true
      })), _defineProperty(_blocks15, rootBlock2Id, _objectSpread({}, rootBlock2State, {
        shouldUpdate: true
      })), _defineProperty(_blocks15, structBlockId, _objectSpread({}, structBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks15, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks15, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks15, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks15, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks15, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks15, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks15, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks15, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks15, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks15, structBlockPageId, structBlockPageState), _blocks15)
    }))));
    state = moveBlock(state, fieldId, structBlockId, 0);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [structBlockId, rootBlock1Id, rootBlock2Id],
      blocks: (_blocks16 = {}, _defineProperty(_blocks16, rootBlock1Id, _objectSpread({}, rootBlock1State, {
        shouldUpdate: true
      })), _defineProperty(_blocks16, rootBlock2Id, _objectSpread({}, rootBlock2State, {
        shouldUpdate: true
      })), _defineProperty(_blocks16, structBlockId, _objectSpread({}, structBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks16, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks16, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks16, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks16, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks16, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks16, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks16, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks16, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks16, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks16, structBlockPageId, structBlockPageState), _blocks16)
    }))));
    state = moveBlock(state, fieldId, rootBlock1Id, 2);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [structBlockId, rootBlock2Id, rootBlock1Id],
      blocks: (_blocks17 = {}, _defineProperty(_blocks17, rootBlock1Id, _objectSpread({}, rootBlock1State, {
        shouldUpdate: true
      })), _defineProperty(_blocks17, rootBlock2Id, _objectSpread({}, rootBlock2State, {
        shouldUpdate: true
      })), _defineProperty(_blocks17, structBlockId, _objectSpread({}, structBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks17, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks17, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks17, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks17, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks17, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks17, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks17, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks17, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks17, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks17, structBlockPageId, structBlockPageState), _blocks17)
    }))));
  });
  test('As leaf', function () {
    var _blocks18, _blocks19, _blocks20, _blocks21;

    var state = valueToState(initialState, fieldId, [listBlock]);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [listBlockId],
      blocks: (_blocks18 = {}, _defineProperty(_blocks18, listBlockId, listBlockState), _defineProperty(_blocks18, listBlockImage1Id, listBlockImage1State), _defineProperty(_blocks18, listBlockImage2Id, listBlockImage2State), _blocks18)
    }))));
    state = moveBlock(state, fieldId, listBlockImage1Id, 0);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [listBlockId],
      blocks: (_blocks19 = {}, _defineProperty(_blocks19, listBlockId, listBlockState), _defineProperty(_blocks19, listBlockImage1Id, _objectSpread({}, listBlockImage1State, {
        shouldUpdate: true
      })), _defineProperty(_blocks19, listBlockImage2Id, _objectSpread({}, listBlockImage2State, {
        shouldUpdate: true
      })), _blocks19)
    }))));
    state = moveBlock(state, fieldId, listBlockImage1Id, 1);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [listBlockId],
      blocks: (_blocks20 = {}, _defineProperty(_blocks20, listBlockId, _objectSpread({}, listBlockState, {
        value: [listBlockImage2Id, listBlockImage1Id]
      })), _defineProperty(_blocks20, listBlockImage1Id, _objectSpread({}, listBlockImage1State, {
        shouldUpdate: true
      })), _defineProperty(_blocks20, listBlockImage2Id, _objectSpread({}, listBlockImage2State, {
        shouldUpdate: true
      })), _blocks20)
    }))));
    state = moveBlock(state, fieldId, listBlockImage2Id, 1);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [listBlockId],
      blocks: (_blocks21 = {}, _defineProperty(_blocks21, listBlockId, listBlockState), _defineProperty(_blocks21, listBlockImage1Id, _objectSpread({}, listBlockImage1State, {
        shouldUpdate: true
      })), _defineProperty(_blocks21, listBlockImage2Id, _objectSpread({}, listBlockImage2State, {
        shouldUpdate: true
      })), _blocks21)
    }))));
  });
});
describe('deleteBlock', function () {
  test('As root', function () {
    var _blocks22, _blocks23, _blocks24, _blocks25, _blocks26;

    var state = valueToState(initialState, fieldId, [rootBlock1, rootBlock2, listBlock, structBlock, streamBlock]);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [rootBlock1Id, rootBlock2Id, listBlockId, structBlockId, streamBlockId],
      blocks: (_blocks22 = {}, _defineProperty(_blocks22, rootBlock1Id, rootBlock1State), _defineProperty(_blocks22, rootBlock2Id, rootBlock2State), _defineProperty(_blocks22, listBlockId, listBlockState), _defineProperty(_blocks22, listBlockImage1Id, listBlockImage1State), _defineProperty(_blocks22, listBlockImage2Id, listBlockImage2State), _defineProperty(_blocks22, structBlockId, structBlockState), _defineProperty(_blocks22, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks22, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks22, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks22, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks22, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks22, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks22, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks22, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks22, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks22, structBlockPageId, structBlockPageState), _defineProperty(_blocks22, streamBlockId, streamBlockState), _defineProperty(_blocks22, streamBlockImageId, streamBlockImage1State), _defineProperty(_blocks22, streamBlockTitleId, streamBlockImage2State), _blocks22)
    }))));
    state = deleteBlock(state, fieldId, rootBlock1Id);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [rootBlock2Id, listBlockId, structBlockId, streamBlockId],
      blocks: (_blocks23 = {}, _defineProperty(_blocks23, rootBlock2Id, _objectSpread({}, rootBlock2State, {
        shouldUpdate: true
      })), _defineProperty(_blocks23, listBlockId, _objectSpread({}, listBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks23, listBlockImage1Id, listBlockImage1State), _defineProperty(_blocks23, listBlockImage2Id, listBlockImage2State), _defineProperty(_blocks23, structBlockId, _objectSpread({}, structBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks23, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks23, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks23, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks23, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks23, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks23, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks23, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks23, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks23, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks23, structBlockPageId, structBlockPageState), _defineProperty(_blocks23, streamBlockId, _objectSpread({}, streamBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks23, streamBlockImageId, streamBlockImage1State), _defineProperty(_blocks23, streamBlockTitleId, streamBlockImage2State), _blocks23)
    }))));
    state = deleteBlock(state, fieldId, rootBlock2Id);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [listBlockId, structBlockId, streamBlockId],
      blocks: (_blocks24 = {}, _defineProperty(_blocks24, listBlockId, _objectSpread({}, listBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks24, listBlockImage1Id, listBlockImage1State), _defineProperty(_blocks24, listBlockImage2Id, listBlockImage2State), _defineProperty(_blocks24, structBlockId, _objectSpread({}, structBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks24, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks24, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks24, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks24, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks24, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks24, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks24, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks24, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks24, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks24, structBlockPageId, structBlockPageState), _defineProperty(_blocks24, streamBlockId, _objectSpread({}, streamBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks24, streamBlockImageId, streamBlockImage1State), _defineProperty(_blocks24, streamBlockTitleId, streamBlockImage2State), _blocks24)
    }))));
    state = deleteBlock(state, fieldId, listBlockId);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [structBlockId, streamBlockId],
      blocks: (_blocks25 = {}, _defineProperty(_blocks25, structBlockId, _objectSpread({}, structBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks25, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks25, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks25, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks25, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks25, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks25, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks25, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks25, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks25, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks25, structBlockPageId, structBlockPageState), _defineProperty(_blocks25, streamBlockId, _objectSpread({}, streamBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks25, streamBlockImageId, streamBlockImage1State), _defineProperty(_blocks25, streamBlockTitleId, streamBlockImage2State), _blocks25)
    }))));
    state = deleteBlock(state, fieldId, structBlockId);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [streamBlockId],
      blocks: (_blocks26 = {}, _defineProperty(_blocks26, streamBlockId, _objectSpread({}, streamBlockState, {
        shouldUpdate: true
      })), _defineProperty(_blocks26, streamBlockImageId, streamBlockImage1State), _defineProperty(_blocks26, streamBlockTitleId, streamBlockImage2State), _blocks26)
    }))));
    state = deleteBlock(state, fieldId, streamBlockId);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [],
      blocks: {}
    }))));
  });
  test('As branch', function () {
    var _blocks27, _blocks28, _blocks29;

    var state = valueToState(initialState, fieldId, [structBlock]);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [structBlockId],
      blocks: (_blocks27 = {}, _defineProperty(_blocks27, structBlockId, structBlockState), _defineProperty(_blocks27, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks27, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks27, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks27, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks27, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks27, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks27, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks27, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks27, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks27, structBlockPageId, structBlockPageState), _blocks27)
    }))));
    state = deleteBlock(state, fieldId, structBlockImagesId);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [structBlockId],
      blocks: (_blocks28 = {}, _defineProperty(_blocks28, structBlockId, _objectSpread({}, structBlockState, {
        closed: false,
        shouldUpdate: true,
        value: [structBlockHeightId, structBlockRelatedPagesId]
      })), _defineProperty(_blocks28, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks28, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks28, structBlockPageId, structBlockPageState), _blocks28)
    }))));
    state = deleteBlock(state, fieldId, structBlockRelatedPagesId);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [structBlockId],
      blocks: (_blocks29 = {}, _defineProperty(_blocks29, structBlockId, _objectSpread({}, structBlockState, {
        closed: false,
        shouldUpdate: true,
        value: [structBlockHeightId]
      })), _defineProperty(_blocks29, structBlockHeightId, structBlockHeightState), _blocks29)
    }))));
  });
  test('As leaf', function () {
    var _blocks30, _blocks31, _blocks32, _blocks33;

    var state = valueToState(initialState, fieldId, [structBlock]);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [structBlockId],
      blocks: (_blocks30 = {}, _defineProperty(_blocks30, structBlockId, structBlockState), _defineProperty(_blocks30, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks30, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks30, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks30, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks30, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks30, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks30, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks30, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks30, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks30, structBlockPageId, structBlockPageState), _blocks30)
    }))));
    state = deleteBlock(state, fieldId, structBlockImageCell1Id);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [structBlockId],
      blocks: (_blocks31 = {}, _defineProperty(_blocks31, structBlockId, structBlockState), _defineProperty(_blocks31, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks31, structBlockImagesId, _objectSpread({}, structBlockImagesState, {
        closed: false,
        shouldUpdate: true,
        value: [structBlockImageCell2Id]
      })), _defineProperty(_blocks31, structBlockImageCell2Id, _objectSpread({}, structBlockImageCell2State, {
        shouldUpdate: true
      })), _defineProperty(_blocks31, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks31, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks31, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks31, structBlockPageId, structBlockPageState), _blocks31)
    }))));
    state = deleteBlock(state, fieldId, structBlockImageCell2Id);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [structBlockId],
      blocks: (_blocks32 = {}, _defineProperty(_blocks32, structBlockId, structBlockState), _defineProperty(_blocks32, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks32, structBlockImagesId, _objectSpread({}, structBlockImagesState, {
        closed: false,
        shouldUpdate: true,
        value: []
      })), _defineProperty(_blocks32, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks32, structBlockPageId, structBlockPageState), _blocks32)
    }))));
    state = deleteBlock(state, fieldId, structBlockPageId);
    expect(state).toEqual(_objectSpread({}, state, _defineProperty({}, fieldId, _objectSpread({}, state[fieldId], {
      rootBlocks: [structBlockId],
      blocks: (_blocks33 = {}, _defineProperty(_blocks33, structBlockId, structBlockState), _defineProperty(_blocks33, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks33, structBlockImagesId, _objectSpread({}, structBlockImagesState, {
        closed: false,
        shouldUpdate: true,
        value: []
      })), _defineProperty(_blocks33, structBlockRelatedPagesId, _objectSpread({}, structBlockRelatedPagesState, {
        closed: false,
        shouldUpdate: true,
        value: []
      })), _blocks33)
    }))));
  });
});