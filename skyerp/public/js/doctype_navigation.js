(() => {
	const doctypes = [
		"Purchase Receipt",
		"Purchase Invoice",
		"BOM",
		"Work Order",
		"Job Card",
		"Quality Inspection",
		"Downtime Entry",
		"Shift Report",
		"Sales Invoice",
		"Stock Entry"
	];

	function add_navigation() {
		const page = frappe.container && frappe.container.page;
		const page_element = page instanceof Element ? page : page?.wrapper?.[0];
		if (!page_element) return;

		const desktop_header = page_element.querySelector(".desktop-navbar");
		const page_header = page_element.querySelector(".page-head");
		const header = desktop_header || page_header;
		if (!header) return;

		let navigation = document.querySelector(".ui-doctype-navigation");
		if (!navigation) {
			navigation = document.createElement("nav");
			navigation.className = "ui-doctype-navigation";
			navigation.setAttribute("aria-label", __("Quick Access"));

			doctypes.forEach((doctype) => {
				// skip doctypes that are not installed / not permitted
				if (!frappe.model.can_read(doctype)) return;
				const link = document.createElement("a");
				link.className = "ui-doctype-navigation-link";
				link.href = "#";
				link.dataset.uiDoctype = doctype;
				link.textContent = __(doctype);
				navigation.appendChild(link);
			});
		}

		header.insertAdjacentElement("afterend", navigation);
	}

	document.addEventListener("click", (event) => {
		const link = event.target.closest("[data-ui-doctype]");
		if (!link) return;

		event.preventDefault();
		frappe.set_route("List", link.dataset.uiDoctype);
	});

	$(document).on("page-change", add_navigation);
	add_navigation();
})();
