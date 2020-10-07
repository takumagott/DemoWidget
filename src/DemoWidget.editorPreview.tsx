import {
	DemoWidgetPreviewProps,
	SubsPreviewType,
	SubsType,
} from "../typings/DemoWidgetProps";

import { Selectable } from "mendix/preview/Selectable";
import { createElement } from "react";

declare function require(name: string): string;

const beautifulBlockStyle = {
	border: "1px solid blue",
	marginBottom: "3px",
	padding: "3px",
};

export const preview: React.FC<DemoWidgetPreviewProps> = (props) => {
	const { subs, prevContainment, prevContainment2 } = props;

	console.log(props);
	return (
		<div key="bloppedi">
			<div key="selectable_objects" style={beautifulBlockStyle}>
				Selectable sub-objects:
				{subs.map((subObject, i) => (
					<Selectable
						key={`sub_${i}`}
						object={subObject}
						caption={i === 1 ? "Troll object" : undefined}
					>
						<div style={{ padding: "2px" }}>{showSubObject(subObject, i)}</div>
					</Selectable>
				))}
			</div>
			<div key="non-selectables" style={beautifulBlockStyle}>
				Non-selectable sub-objects:
				{subs.map((subObject, i) => (
					<div key={`sub_without_selectable_${i}`} style={{ padding: "2px" }}>
						{showSubObject(subObject, i)}
					</div>
				))}
			</div>
			<div key="unrelated content">
				Here are some containers:
				<prevContainment.renderer>
					<div />
				</prevContainment.renderer>
				<prevContainment2.renderer>
					<div />
				</prevContainment2.renderer>
			</div>
		</div>
	);
};

function showSubObject(subObj: SubsPreviewType, index: number) {
	let result = `Subobject ${index}: `;
	for (let i = 1; i <= 8; i++) {
		result += show(subObj, i);
	}
	result += ` ${subObj.subDatasource} ${subObj.subAction}`;
	return result;
}

function show(subObj: SubsPreviewType, i: number) {
	const boolKey = `subBool${i}` as keyof SubsType;
	return subObj[boolKey] ? "X" : "O";
}

export function getPreviewCss(): string {
	return require("./ui/DemoWidget.css");
}
