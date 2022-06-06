import { ViewEvents } from "../../globals/constants";
import { Api } from "../../api";
import "./App.css";

let api = Api.Instance;
let app = document.getElementById("app");

window.addEventListener("message", (event) => {
	switch (event.data.type) {
		case ViewEvents.API_TOKEN: {
			Api.updateAuthToken(event.data.Token);
			break;
		}
		case ViewEvents.WIKI: {
			Wiki(event.data.isGroup, event.data.id);
			break;
		}
		case ViewEvents.SNIPPET: {
			Snippet(event.data.isGroup, event.data.id);

			break;
		}
	}
});
async function Snippet(isGroup: boolean, id: number) {
	switch (isGroup) {
		case true: {
			break;
		}

		case false: {
			api.getProjectSnippets(id).then((res) => {
				let author: string = res.data[0].title;
				app!.innerHTML = `<div>${author}<div>`;
			});
			break;
		}
	}
}
async function Wiki(isGroup: boolean, id: number) {
	switch (isGroup) {
		case true: {
			break;
		}

		case false: {
			api.getProjectSnippets(id).then((res) => {
				let author: string = res.data[0].title;
				app!.innerHTML = `<div>${author}<div>`;
			});
			break;
		}
	}
}

function CreateHtmlNode(type: string, attributes: { key: string; value: string | Function | boolean }[] | null, innerHTML: string): Node {
	const el = document.createElement(type);
	el.innerHTML = innerHTML;
	if (attributes) {
		for (const attribute of attributes) {
			const key = attribute.key as string;
			const value = attribute.value;
			if (key.startsWith("on") && typeof value === "function") {
				el.addEventListener(key.substring(2) as keyof HTMLElementEventMap, value as EventListenerOrEventListenerObject);
			} else if (typeof value === "boolean") {
				el.setAttribute(key, "");
			} else if (typeof value !== "function") {
				el.setAttribute(key, value);
			} else {
				console.log("Error! Element attribute cannot be set");
			}
		}
	}
	return el;
}
