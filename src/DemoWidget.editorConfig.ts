import {
	DemoWidgetPreviewProps,
	SubsPreviewType,
} from "./../typings/DemoWidgetProps.d";
import { LayoutProps, TProps } from "./../typings/SPPreviewProps";
import {
	ObjectProperties,
	Properties,
	Property,
} from "../typings/PropertiesProps";

export function getPreview(values: DemoWidgetPreviewProps) {
	if (!values.prevDontReturn) {
		if (values.prevUseContainment) return GetContainmentPreviewProps(values);
		else if (values.prevUseCustomConf) return GetCustomConfPreviewProps(values);
		else if (values.prevUseSelectableSubObjects) {
			return GetSelectableSubsPreviewProps(values);
		}

		return GetDefaultDemoPreviewProps(values);
	}
}

export function getProperties(
	values: DemoWidgetPreviewProps,
	defaultProps: Properties,
	_: string
) {
	if (values.previewDemo) return GetPreviewDemoProps(values, defaultProps);
	else if (values.subObjectsDemo)
		return GetSubObjectsDemoProps(values, defaultProps);
	else if (values.tryMe) return GetCustomProps(values);

	return defaultProps;
}

function GetCustomProps(values: DemoWidgetPreviewProps) {
	var props = [
		{
			key: "tryMe",
			caption: "Secret mode: on",
		},
		{
			key: "customProperties",
			caption: "Custom Visible Properties",
		},
	];

	if (values.customProperties != "") {
		try {
			var moreProps = JSON.parse(values.customProperties);
			props.push(moreProps);
		} catch (err) {
			console.log(`error in custom properties: \n${err.message}`);
		}
	}

	return [{ caption: "0 - Secret stuff", properties: props }];
}

function GetPreviewDemoProps(
	values: DemoWidgetPreviewProps,
	defaultProps: Properties
) {
	var props: Property[] = [
		{
			key: "previewDemo",
			caption: "Preview magic",
		},
	];
	if (values.prevUseContainment) {
		AddContainmentProps(props, defaultProps);
	} else if (values.prevUseCustomConf) {
		AddCustomConfProps(props);
	} else if (values.prevDontReturn) {
		props.push({
			key: "prevDontReturn",
			caption: "Empty preview function",
		});
	} else if (values.prevUseSelectableSubObjects) {
		props.push(
			{
				key: "prevUseSelectableSubObjects",
				caption: "Use selectable sub objects preview configuration",
			},
			{
				key: "randomString1",
				caption: "Hide selectables",
			},
			{
				key: "randomString2",
				caption: "Hide non-selectables",
			}
		);
	} else {
		AddDefaultDemoProps(props);
	}

	return [
		{
			caption: "1 - Preview Demo",
			properties: props,
		},
	];
}

function AddDefaultDemoProps(props: Property[]) {
	props.push(
		{
			key: "prevUseCustomConf",
			caption: "Use custom configuration",
		},
		{
			key: "prevUseContainment",
			caption: "Use containment",
		},
		{
			key: "prevDontReturn",
			caption: "Empty preview function",
		},
		{
			key: "orientation",
			caption: "Layout orientation",
		},
		{
			key: "width",
			caption: "image width (first)",
		},
		{
			key: "height",
			caption: "image height (first)",
		},
		{
			key: "width2",
			caption: "image width (second)",
		},
		{
			key: "height2",
			caption: "image height (second)",
		}
	);
}

function AddCustomConfProps(props: Property[]) {
	props.push(
		{
			key: "prevUseCustomConf",
			caption: "Use custom configuration",
		},
		{
			key: "prevCustomConf",
			caption: "Custom configuration",
		}
	);
}

function AddContainmentProps(props: Property[], defaultProps: Properties) {
	props.push(
		{
			key: "prevUseContainment",
			caption: "Use containment",
		},
		{
			key: "prevContainment",
			caption: "First Main Container",
		},
		{
			key: "prevContainment2",
			caption: "Second Main Container",
		},
		{
			key: "subsWithWidgets",
			caption: "Sub-Containers",
			objects: getDefaultObjects(defaultProps, "subsWithWidgets"),
		}
	);
}

interface DynamicObj {
	[key: string]: any;
}

function GetDefaultDemoPreviewProps(obj: DemoWidgetPreviewProps) {
	var img1: DynamicObj = { type: "image", document: cat };
	var img2: DynamicObj = { type: "image", document: cat };

	if (obj.width != -1) img1.width = obj.width;
	if (obj.height != -1) img1.height = obj.height;
	if (obj.width2 != -1) img2.width = obj.width2;
	if (obj.height2 != -1) img2.height = obj.height2;
	return {
		type: "layout",
		orientation: obj.orientation,
		children: [
			{ type: "text", content: "I am normal", fontSize: 24 },
			{ type: "text", content: "I am bold", bold: true, fontSize: 24 },
			{ type: "text", content: "I am italic", italic: true, fontSize: 24 },
			{
				type: "text",
				content: "I am both",
				italic: true,
				bold: true,
				fontSize: 24,
			},
			{
				type: "layout",
				orientation: "horizontal",
				children: [
					{ type: "layout", borders: true, children: [img1] },
					{ type: "layout", borders: false, children: [img2] },
				],
			},
		],
	};
}

function GetContainmentPreviewProps(obj: DemoWidgetPreviewProps) {
	var containmentLayouts: TProps[] = [
		{
			type: "layout",
			orientation: "horizontal",
			children: [
				{ type: "text", content: "Regular containers:" },
				{ type: "container", property: obj.prevContainment },
				{ type: "container", property: obj.prevContainment2 },
			],
		},
	];
	if (obj.subsWithWidgets) {
		var children: TProps[] = [];
		var subLayouts = {
			type: "layout",
			orientation: "horizontal",
			borders: true,
			children,
		} as LayoutProps;
		obj.subsWithWidgets.forEach((subObj, index) => {
			subLayouts.children.push({
				type: "layout",
				borders: true,
				orientation: "vertical",
				children: [
					{ type: "text", content: `Sub-Object ${index + 1}:` },
					{ type: "container", property: subObj.subWidgets1 },
					{ type: "container", property: subObj.subWidgets2 },
					{ type: "container", property: subObj.subWidgets3 },
					{ type: "container", property: subObj.subWidgets4 },
				],
			} as LayoutProps);
		});
		containmentLayouts.push(subLayouts);
	}
	return {
		type: "layout",
		borders: true,
		orientation: "vertical",
		children: containmentLayouts,
	};
}

function GetCustomConfPreviewProps(obj: DemoWidgetPreviewProps) {
	try {
		return JSON.parse(obj.prevCustomConf);
	} catch (err) {
		console.log(`error in custom config: \n ${err.message}`);
		return {
			type: "text",
			content: `error in custom config: \n ${err.message}`,
		};
	}
}

function GetSelectableSubsPreviewProps(props: DemoWidgetPreviewProps) {
	const showSelectable = props.randomString1 == "";
	const showNonSelectable = props.randomString2 == "";
	const swap = props.randomString3 == "";
	var selectableChildren = [];
	var nonSelectableChildren = [];

	if (showSelectable) {
		props.subs.forEach((subItemValue, index) => {
			selectableChildren.push({
				type: "selectable",
				object: subItemValue,
				child: subObjectReprezz(subItemValue, index),
			});
		});
	} else {
		selectableChildren.push({
			type: "text",
			content: "selectables are hidden",
			italic: true,
		});
	}

	if (showNonSelectable) {
		nonSelectableChildren.push(...props.subs.map(subObjectReprezz));
	} else {
		nonSelectableChildren.push({
			type: "text",
			content: "non-selectables are hidden",
			italic: true,
		});
	}

	const selectables = {
		type: "layout",
		orientation: "vertical",
		borders: true,
		children: [
			{
				type: "text",
				content: "Selectable sub-objects:",
				fontSize: 18,
				bold: true,
			},
			{
				type: "layout",
				orientation: "horizontal",
				children: selectableChildren,
			},
		],
	};

	const nonSelectables = {
		type: "layout",
		orientation: "vertical",
		borders: true,
		children: [
			{
				type: "text",
				content: "Non-selectable sub-objects:",
				fontSize: 18,
				bold: true,
			},
			{
				type: "layout",
				orientation: "horizontal",
				children: nonSelectableChildren,
			},
		],
	};

	return {
		type: "layout",
		orientation: "horizontal",
		children: swap
			? [selectables, nonSelectables]
			: [nonSelectables, selectables],
	};
}

function subObjectReprezz(subItemValue: SubsPreviewType, index: number) {
	return {
		type: "layout",
		orientation: "vertical",
		borders: true,
		children: [
			{
				type: "layout",
				children: [
					{
						type: "text",
						bold: true,
						content: `Object ${index + 1}: ${get0or1(
							subItemValue.subBool1
						)}${get0or1(subItemValue.subBool2)}${get0or1(
							subItemValue.subBool3
						)}${get0or1(subItemValue.subBool4)}${get0or1(
							subItemValue.subBool5
						)}${get0or1(subItemValue.subBool6)}${get0or1(
							subItemValue.subBool7
						)}${get0or1(subItemValue.subBool8)}`,
					},
					{
						type: "text",
						italic: true,
						content: `Data Source?: ${subItemValue.subDatasource ===
							null}\nAction?: ${subItemValue.subAction === null}\nWidgets: ${
							subItemValue.subContent.widgetCount
						}\nImage: ${subItemValue.subImage}`,
					},
				],
			},
			{
				type: "layout",
				children: [{ type: "container", property: subItemValue.subContent }],
			},
		],
	};
}

function getDefaultObjects(
	defaultProps: Properties,
	propertyKey: string
): ObjectProperties[] {
	const flat: Property[] = [];
	defaultProps
		.map((group) => group.properties)
		.forEach((p) => (p ? flat.push(p[0]) : {}));
	return flat.find((p) => p.key == propertyKey)?.objects ?? [];
}

function GetSubObjectsDemoProps(
	values: DemoWidgetPreviewProps,
	defaultProps: Properties
) {
	return [
		{
			caption: "General",
			properties: [
				{
					key: "subObjectsDemo",
					caption: "Sub-object magic",
				},
				{
					key: "setObjectHeaders",
					caption: "Grid headers",
				},
				{
					key: "setCustomCaptions",
					caption: "Object captions",
				},
				getSubs(values, defaultProps),
			],
		},
	];
}

function getSubs(values: DemoWidgetPreviewProps, defaultProps: Properties) {
	const subs: Property = { objects: [], key: "subs", caption: "Submarine" };
	if (values.setObjectHeaders) {
		subs.objectHeaders = ["first column", "second column", "and", "so", "on"];
	}

	// get the default objects structure from the default props
	var defaultSubObjects = getDefaultObjects(defaultProps, "subs");

	// set default structure
	if (!values.setCustomCaptions) {
		subs.caption = "without captions";
		subs.objects = defaultSubObjects;
	} else {
		subs.caption = "with captions";
		if (defaultSubObjects.length == 0 || !values.subs) {
			subs.objects = [];
		} else {
			values.subs.forEach((subItemValue, index) => {
				subs.objects!.push({
					captions: [
						`item ${index}: ${get0or1(subItemValue.subBool1)}${get0or1(
							subItemValue.subBool2
						)}${get0or1(subItemValue.subBool3)}${get0or1(
							subItemValue.subBool4
						)}${get0or1(subItemValue.subBool5)}${get0or1(
							subItemValue.subBool6
						)}${get0or1(subItemValue.subBool7)}${get0or1(
							subItemValue.subBool8
						)}`,
						"I did it all for the",
						"nookie",
						"so you can take that",
						"cookie",
					],
					properties: defaultSubObjects[index].properties,
				});
			});
		}
	}
	return subs;
}

function get0or1(booly: boolean) {
	if (booly) return 1;
	return 0;
}

export function check(values: DemoWidgetPreviewProps) {
	if (values.tryMe) {
		return [
			{
				property: "tryMe",
				severity: "warning",
				message: "Don't try me plz :(",
			},
			{
				property: "tryMe",
				severity: "error",
				message: "Stop trying me!",
			},
			{
				property: "tryMe",
				severity: "deprecation",
				message: "Don't try me anymore",
				url: "www.google.com",
			},
		];
	} else {
		return [];
	}
}

const cat = `<?xml version="1.0" encoding="utf-8"?>
<!-- Svg Vector Icons : http://www.onlinewebfonts.com/icon -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
<g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M1607.2,4071.3c-410.8-109.5-570.6-239.6-741.8-591.1C680.5,3099,612.1,2742.9,657.7,2416.6c68.5-458.8,235.1-874.1,584.3-1460.7l255.6-429.1l-16-189.5c-9.1-105-43.4-310.4-75.3-454.2c-34.2-143.8-68.5-362.9-82.2-483.9c-13.7-130.1-41.1-264.7-68.5-328.7c-79.9-180.3-239.6-378.9-449.6-561.4l-203.1-175.8l-146.1-360.6c-226-561.5-253.3-641.3-301.3-901.5c-22.8-132.4-47.9-255.6-54.8-273.9c-13.7-34.2,146.1-230.5,216.8-269.3c57.1-29.7,146.1,11.4,198.6,89c27.4,43.3,38.8,111.8,41.1,253.3c0,175.8,11.4,216.8,107.3,454.2c59.3,143.8,132.4,287.6,164.3,319.5c125.5,130.1,289.9,203.1,698.4,308.1c219.1,54.8,429.1,114.1,467.9,127.8c57.1,20.5,70.8,18.3,95.9-13.7c41.1-54.8,36.5-116.4-16-392.5c-25.1-127.8-45.6-278.4-45.6-333.2c0-205.4,255.6-595.7,680.1-1040.7l175.7-184.9l271.6,6.8c262.5,6.8,271.6,9.1,317.3,66.2c38.8,54.8,41.1,68.5,13.7,123.3c-45.6,93.6-136.9,150.6-267,166.6c-111.8,16-125.5,25.1-310.4,226c-203.1,219.1-235.1,278.4-210,401.7c18.3,95.9,235.1,413.1,417.7,614c102.7,111.8,175.7,219.1,235.1,351.5c79.9,171.2,95.9,191.7,152.9,194c728.1,20.5,938,38.8,1063.6,84.5l130.1,47.9l200.8-57.1c538.7-148.4,495.3-127.8,502.1-225.9c13.7-157.5-86.7-787.4-157.5-995.1c-59.4-175.7-66.2-228.2-66.2-470.2c0-244.2,4.6-280.7,47.9-335.5c45.7-57.1,54.8-59.3,280.7-59.3c262.5,0,287.6,11.4,287.6,139.2c0,66.2-16,98.2-68.5,141.5c-36.5,32-89,66.2-114.1,73c-93.6,29.7-38.8,189.4,248.8,739.5c367.5,707.5,415.4,755.5,725.8,755.5c109.6,0,219.1,13.7,283,38.8l107.3,36.5l146.1-105c159.8-111.8,292.1-248.8,292.1-299c0-43.3,152.9-178,730.4-643.6c269.3-219.1,547.8-445,616.2-502.1c68.5-59.4,166.6-125.5,219.1-148.3c50.2-22.8,139.2-84.5,196.3-134.7l105-91.3H9527c237.4,0,244.2,2.3,310.4,66.2c86.7,89,84.5,141.5-13.7,228.2c-73,63.9-95.9,70.8-226,70.8H9454l-182.6,189.4c-399.4,410.8-582,634.5-732.6,899.3c-237.4,413.1-228.2,365.2-237.4,1116.1l-6.8,661.9l77.6,152.9c84.4,166.6,225.9,312.7,397.1,413.1c86.7,52.5,148.3,66.2,335.5,82.2c125.5,11.4,237.4,25.1,248.8,31.9c9.1,6.9,66.2,95.9,125.5,198.6c77.6,130.1,105,200.8,95.8,237.4c-6.8,29.7-79.9,134.6-159.8,235.1c-82.2,100.4-155.2,210-164.3,241.9c-20.6,84.5-210,248.8-362.9,312.7l-127.8,54.8l6.8,228.2c6.8,223.7,4.6,228.2-43.4,223.7c-31.9-4.6-52.5,9.1-57.1,34.2c-6.8,29.7-77.6-27.4-271.6-216.8c-230.5-226-283-267-477-356c-166.6-79.9-264.7-146.1-415.4-283C7393,978.7,7230.9,860,7141.9,812.1c-148.3-82.2-173.4-89-344.6-86.7c-100.4,0-303.6,20.5-449.6,45.6c-146.1,25.1-369.7,57.1-495.3,70.8c-125.5,13.7-511.2,68.5-855.9,125.5c-951.7,150.6-1024.8,159.8-1517.8,157.5c-326.4,0-575.2-16-876.4-52.5l-420-50.2l-123.3,63.9c-152.9,77.6-415.4,315-493,447.3c-130.1,221.4-312.7,887.8-312.7,1136.6c2.3,248.8,118.7,620.8,235.1,746.3c107.3,116.4,374.3,198.6,529.5,164.3c82.2-18.3,178-79.9,248.8-157.5c66.2-73,164.3-63.9,207.7,20.6c43.4,84.5,43.4,235.1,2.3,317.2c-43.4,84.5-216.8,239.6-330.9,296.7C2036.3,4114.6,1787.5,4121.5,1607.2,4071.3z"/></g></g>
</svg>`;
