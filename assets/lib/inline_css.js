// Based on https://github.com/gnat/css-scope-inline
// Allows scoped css blocks inside html using the this keyword
window.cssScopeCount ??= 1
window.cssScope ??= new MutationObserver(mutations => {
    document?.body?.querySelectorAll('style:not([data-scope])').forEach(node => {
        node.dataset.scope = node.parentNode.dataset.scope ??= (window.cssScopeCount++)
        node.style.display = 'none'
        node.textContent = node.textContent
            .replace(/((@keyframes\s|animation:|animation-name:)[^{};]*)\bme(?![A-Za-z])/g, `$1scope-${node.parentNode.dataset.scope}`)
            .replace(/(^|[^-\w])this(?![-\w])/g, `$1[data-scope='${node.parentNode.dataset.scope}']`)
            .replace(/(?:@media)\s+(xs-|sm-|md-|lg-|xl-|sm|md|lg|xl|xx)(?![-\w])/g,
                (match, part1) => { return '@media ' + ({ 'sm': '(min-width: 640px)', 'md': '(min-width: 768px)', 'lg': '(min-width: 1024px)', 'xl': '(min-width: 1280px)', 'xx': '(min-width: 1536px)', 'xs-': '(max-width: 639px)', 'sm-': '(max-width: 767px)', 'md-': '(max-width: 1023px)', 'lg-': '(max-width: 1279px)', 'xl-': '(max-width: 1535px)' }[part1]) }
            )
    })
}).observe(document.documentElement, { childList: true, subtree: true })
