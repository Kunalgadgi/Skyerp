(function () {
    function hide_grid_settings() {
        document.querySelectorAll(
            '.grid-heading-row .grid-static-col.pointer'
        ).forEach(function (el) {
            if (el.querySelector('use[href="#icon-settings"]')) {
                el.style.setProperty('display', 'none', 'important');
            }
        });
    }

    // Keep the gear visible for System Manager
    if ((frappe.user_roles || []).includes("System Manager")) {
        return;
    }

    hide_grid_settings();

    // Frappe may recreate the grid after loading/rendering
    const observer = new MutationObserver(function () {
        hide_grid_settings();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
