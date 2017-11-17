module.exports = () => (
    `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="mobile-web-app-capable" content="yes">

            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link href="/static/styles.css" rel="stylesheet" />
            <title>SFL - Employee status check</title>
        </head>
        <body>
        <script> const PUSH_KEY = '${process.env.PUSH_PUBLIC}'; </script>
        <div id="root"></div>
        <script defer src="/static/runtime.bundle.js"></script>
        <script defer src="/static/vendor.bundle.js"></script>
        <script defer src="/static/main.bundle.js"></script>
        </body>
    </html>`
);
