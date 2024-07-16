<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>BL-India</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        @viteReactRefresh
        @vite('resources/js/App/app.jsx')
        <style type="text/css">
            body {
                padding: 0;
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div id="app"></div>
        <script>
            // Store the CSRF token in local storage
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
            localStorage.setItem('csrfToken', csrfToken);
        </script>
    </body>
</html>