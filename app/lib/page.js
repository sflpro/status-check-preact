module.exports = () => (
    `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="mobile-web-app-capable" content="yes">

            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>SFL - Employee status check</title>
            <link rel="manifest" href="manifest.json">

        </head>
        <body>
        <script> const PUSH_KEY = '${process.env.PUSH_PUBLIC}'; </script>
        <div id="root"></div>
        <script defer src="scripts/bundle.js"></script>
        </body>
    </html>`
);
