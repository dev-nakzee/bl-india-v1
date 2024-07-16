<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title></title>

        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Raleway:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">

        @viteReactRefresh
        @vite('resources/js/Site/app.jsx')
        @vite('resources/css/app.css')
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
