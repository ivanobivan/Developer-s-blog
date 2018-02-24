export default function renderFullPage(html, preloadedState) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Developer's Blog</title>
            </head>
            <body>
                <div id="root">${html}</div>
                <script src="public/main.js"></script>
            </body>
        </html>
    `
}
