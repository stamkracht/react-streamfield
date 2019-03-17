function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import uuidv4 from 'uuid'; //
// Definition
//

export var fieldId = uuidv4();
export var rootBlockDefinition = {
  key: 'image',
  label: 'Image',
  icon: 'image'
};
export var listBlockImageDefinition = {
  key: 'image',
  label: 'Image',
  icon: 'image'
};
export var listBlockDefinition = {
  key: 'carousel',
  label: 'Carousel',
  children: [listBlockImageDefinition]
};
export var structBlockHeightDefinition = {
  key: 'height',
  label: 'Height'
};
export var structBlockWidthDefinition = {
  key: 'width',
  label: 'Width'
};
export var structBlockImageDefinition = {
  key: 'image',
  label: 'Image'
};
export var structBlockImageCellDefinition = {
  key: 'image_cell',
  label: 'Image',
  icon: 'image',
  isStruct: true,
  children: [structBlockWidthDefinition, structBlockImageDefinition]
};
export var structBlockImagesDefinition = {
  key: 'images',
  label: 'Images',
  children: [structBlockImageCellDefinition]
};
export var structBlockPageDefinition = {
  key: 'page',
  label: 'Page'
};
export var structBlockRelatedPagesDefinition = {
  key: 'related_pages',
  label: 'Related pages',
  children: [structBlockPageDefinition]
};
export var structBlockDefinition = {
  key: 'image_row',
  label: 'Image row',
  isStruct: true,
  children: [structBlockHeightDefinition, structBlockImagesDefinition, structBlockRelatedPagesDefinition]
};
export var streamBlockImageDefinition = {
  key: 'image',
  label: 'Image',
  icon: 'image'
};
export var streamBlockTitleDefinition = {
  key: 'title',
  label: 'Title'
};
export var streamBlockDefinition = {
  key: 'rich_carousel',
  label: 'Rich carousel',
  children: [streamBlockImageDefinition, streamBlockTitleDefinition]
};
export var blockDefinitions = [rootBlockDefinition, listBlockDefinition, structBlockDefinition, streamBlockDefinition]; //
// Value
//

export var rootBlock1Id = uuidv4();
export var rootBlock1 = {
  id: rootBlock1Id,
  type: 'image',
  value: 1154
};
export var rootBlock2Id = uuidv4();
export var rootBlock2 = {
  id: rootBlock2Id,
  type: 'image',
  value: 57
};
export var listBlockImage1Id = uuidv4();
export var listBlockImage1 = {
  id: listBlockImage1Id,
  type: 'image',
  value: 1154
};
export var listBlockImage2Id = uuidv4();
export var listBlockImage2 = {
  id: listBlockImage2Id,
  type: 'image',
  value: 57
};
export var listBlockId = uuidv4();
export var listBlock = {
  id: listBlockId,
  type: 'carousel',
  value: [listBlockImage1, listBlockImage2]
};
export var structBlockHeightId = uuidv4();
export var structBlockHeight = {
  id: structBlockHeightId,
  type: 'height',
  value: 'short'
};
export var structBlockWidth1Id = uuidv4();
export var structBlockWidth1 = {
  id: structBlockWidth1Id,
  type: 'width',
  value: 'col-md-4'
};
export var structBlockImage1Id = uuidv4();
export var structBlockImage1 = {
  id: structBlockImage1Id,
  type: 'image',
  value: 257
};
export var structBlockImageCell1Id = uuidv4();
export var structBlockImageCell1 = {
  id: structBlockImageCell1Id,
  type: 'image_cell',
  value: [structBlockImage1, structBlockWidth1]
};
export var structBlockWidth2Id = uuidv4();
export var structBlockWidth2 = {
  id: structBlockWidth2Id,
  type: 'width',
  value: 'col-md-8'
};
export var structBlockImage2Id = uuidv4();
export var structBlockImage2 = {
  id: structBlockImage2Id,
  type: 'image',
  value: 319
};
export var structBlockImageCell2Id = uuidv4();
export var structBlockImageCell2 = {
  id: structBlockImageCell2Id,
  type: 'image_cell',
  value: [structBlockImage2, structBlockWidth2]
};
export var structBlockImageCellAllSortedIds = [structBlockImageCell1Id, structBlockImage1Id, structBlockWidth1Id, structBlockImageCell2Id, structBlockImage2Id, structBlockWidth2Id];
export var structBlockImagesId = uuidv4();
export var structBlockImages = {
  id: structBlockImagesId,
  type: 'images',
  value: [structBlockImageCell1, structBlockImageCell2]
};
export var structBlockPageId = uuidv4();
export var structBlockPage = {
  id: structBlockPageId,
  type: 'page',
  value: 8
};
export var structBlockRelatedPagesId = uuidv4();
export var structBlockRelatedPages = {
  id: structBlockRelatedPagesId,
  type: 'related_pages',
  value: [structBlockPage]
};
export var structBlockId = uuidv4();
export var structBlock = {
  id: structBlockId,
  type: 'image_row',
  value: [structBlockHeight, structBlockImages, structBlockRelatedPages]
};
export var streamBlockImageId = uuidv4();
export var streamBlockImage = {
  id: streamBlockImageId,
  type: 'image',
  value: 121
};
export var streamBlockTitleId = uuidv4();
export var streamBlockTitle = {
  id: streamBlockTitleId,
  type: 'title',
  value: 'Το Πυθαγόρειο ήταν χορτοφάγος'
};
export var streamBlockId = uuidv4();
export var streamBlock = {
  id: streamBlockId,
  type: 'rich_carousel',
  value: [streamBlockImage, streamBlockTitle]
}; //
// State
//

export var initialState = _defineProperty({}, fieldId, {
  blockDefinitions: blockDefinitions
});
export var rootBlock1State = {
  parent: null,
  type: 'image',
  value: 1154,
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var rootBlock2State = {
  parent: null,
  type: 'image',
  value: 57,
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var listBlockState = {
  parent: null,
  type: 'carousel',
  value: [listBlockImage1Id, listBlockImage2Id],
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var listBlockImage1State = {
  parent: listBlockId,
  type: 'image',
  value: 1154,
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var listBlockImage2State = {
  parent: listBlockId,
  type: 'image',
  value: 57,
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockState = {
  parent: null,
  type: 'image_row',
  value: [structBlockHeightId, structBlockImagesId, structBlockRelatedPagesId],
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockHeightState = {
  parent: structBlockId,
  type: 'height',
  value: 'short',
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockImagesState = {
  parent: structBlockId,
  type: 'images',
  value: [structBlockImageCell1Id, structBlockImageCell2Id],
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockImage1State = {
  parent: structBlockImageCell1Id,
  type: 'image',
  value: 257,
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockWidth1State = {
  parent: structBlockImageCell1Id,
  type: 'width',
  value: 'col-md-4',
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockImageCell1State = {
  parent: structBlockImagesId,
  type: 'image_cell',
  value: [structBlockImage1Id, structBlockWidth1Id],
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockImage2State = {
  parent: structBlockImageCell2Id,
  type: 'image',
  value: 319,
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockWidth2State = {
  parent: structBlockImageCell2Id,
  type: 'width',
  value: 'col-md-8',
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockImageCell2State = {
  parent: structBlockImagesId,
  type: 'image_cell',
  value: [structBlockImage2Id, structBlockWidth2Id],
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockRelatedPagesState = {
  parent: structBlockId,
  type: 'related_pages',
  value: [structBlockPageId],
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var structBlockPageState = {
  parent: structBlockRelatedPagesId,
  type: 'page',
  value: 8,
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var streamBlockState = {
  parent: null,
  type: 'rich_carousel',
  value: [streamBlockImageId, streamBlockTitleId],
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var streamBlockImage1State = {
  parent: streamBlockId,
  type: 'image',
  value: 121,
  closed: true,
  hidden: false,
  shouldUpdate: false
};
export var streamBlockImage2State = {
  parent: streamBlockId,
  type: 'title',
  value: 'Το Πυθαγόρειο ήταν χορτοφάγος',
  closed: true,
  hidden: false,
  shouldUpdate: false
};