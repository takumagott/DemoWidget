export type Properties = PropertyGroup[];

export type PropertyGroup = {
  caption: string;
  propertyGroups?: PropertyGroup[];
  properties?: Property[];
}

export type Property = {
  key: string;
  caption: string;
  description?: string;
  objectHeaders?: string[]; // used for customizing object grids
  objects?: ObjectProperties[];
}

export type ObjectProperties = {
  properties: PropertyGroup[];
  captions?: string[]; // used for customizing object grids
}