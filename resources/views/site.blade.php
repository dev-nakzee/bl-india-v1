<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title></title>

        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Raleway:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">

        <!-- Apple Touch Icons -->
        <link rel="apple-touch-icon" sizes="57x57" href="storage/site_settings/site_icon-57x57.webp">
        <link rel="apple-touch-icon" sizes="60x60" href="storage/site_settings/site_icon-60x60.webp">
        <link rel="apple-touch-icon" sizes="72x72" href="storage/site_settings/site_icon-72x72.webp">
        <link rel="apple-touch-icon" sizes="76x76" href="storage/site_settings/site_icon-76x76.webp">
        <link rel="apple-touch-icon" sizes="114x114" href="storage/site_settings/site_icon-114x114.webp">
        <link rel="apple-touch-icon" sizes="120x120" href="storage/site_settings/site_icon-120x120.webp">
        <link rel="apple-touch-icon" sizes="144x144" href="storage/site_settings/site_icon-144x144.webp">
        <link rel="apple-touch-icon" sizes="152x152" href="storage/site_settings/site_icon-152x152.webp">
        <link rel="apple-touch-icon" sizes="180x180" href="storage/site_settings/site_icon-180x180.webp">

        <!-- Android Icons -->
        <link rel="icon" sizes="36x36" href="storage/site_settings/site_icon-36x36.webp" type="image/webp">
        <link rel="icon" sizes="48x48" href="storage/site_settings/site_icon-48x48.webp" type="image/webp">
        <link rel="icon" sizes="72x72" href="storage/site_settings/site_icon-72x72.webp" type="image/webp">
        <link rel="icon" sizes="96x96" href="storage/site_settings/site_icon-96x96.webp" type="image/webp">
        <link rel="icon" sizes="144x144" href="storage/site_settings/site_icon-144x144.webp" type="image/webp">
        <link rel="icon" sizes="192x192" href="storage/site_settings/site_icon-192x192.webp" type="image/webp">
        
        <!-- Other Icons -->
        <link rel="icon" sizes="32x32" href="storage/site_settings/site_icon-32x32.webp">
        <link rel="icon" sizes="96x96" href="storage/site_settings/site_icon-96x96.webp">
        <link rel="icon" sizes="16x16" href="storage/site_settings/site_icon-16x16.webp">

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
