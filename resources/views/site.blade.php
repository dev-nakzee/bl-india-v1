<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title></title>

        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Raleway:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">

        <link rel="preconnect" href="https://fonts.googleapis.com">        

        @viteReactRefresh
        @vite('resources/js/Site/app.jsx')
        @vite('resources/css/app.css')
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>