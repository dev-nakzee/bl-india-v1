<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title></title>

        <!-- Preconnect to Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Raleway:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">

        <!-- Apple Touch Icons -->
        <link rel="apple-touch-icon" sizes="57x57" href="https://in.bl-india.com/storage/site_settings/site_icon-57x57.webp">
        <link rel="apple-touch-icon" sizes="60x60" href="https://in.bl-india.com/storage/site_settings/site_icon-60x60.webp">
        <link rel="apple-touch-icon" sizes="72x72" href="https://in.bl-india.com/storage/site_settings/site_icon-72x72.webp">
        <link rel="apple-touch-icon" sizes="76x76" href="https://in.bl-india.com/storage/site_settings/site_icon-76x76.webp">
        <link rel="apple-touch-icon" sizes="114x114" href="https://in.bl-india.com/storage/site_settings/site_icon-114x114.webp">
        <link rel="apple-touch-icon" sizes="120x120" href="https://in.bl-india.com/storage/site_settings/site_icon-120x120.webp">
        <link rel="apple-touch-icon" sizes="144x144" href="https://in.bl-india.com/storage/site_settings/site_icon-144x144.webp">
        <link rel="apple-touch-icon" sizes="152x152" href="https://in.bl-india.com/storage/site_settings/site_icon-152x152.webp">
        <link rel="apple-touch-icon" sizes="180x180" href="https://in.bl-india.com/storage/site_settings/site_icon-180x180.webp">

        <!-- Android Icons -->
        <link rel="icon" sizes="36x36" href="https://in.bl-india.com/storage/site_settings/site_icon-36x36.webp" type="image/webp">
        <link rel="icon" sizes="48x48" href="https://in.bl-india.com/storage/site_settings/site_icon-48x48.webp" type="image/webp">
        <link rel="icon" sizes="72x72" href="https://in.bl-india.com/storage/site_settings/site_icon-72x72.webp" type="image/webp">
        <link rel="icon" sizes="96x96" href="https://in.bl-india.com/storage/site_settings/site_icon-96x96.webp" type="image/webp">
        <link rel="icon" sizes="144x144" href="https://in.bl-india.com/storage/site_settings/site_icon-144x144.webp" type="image/webp">
        <link rel="icon" sizes="192x192" href="https://in.bl-india.com/storage/site_settings/site_icon-192x192.webp" type="image/webp">
        
        <!-- Other Icons -->
        <link rel="icon" sizes="32x32" href="https://in.bl-india.com/storage/site_settings/site_icon-32x32.webp">
        <link rel="icon" sizes="96x96" href="https://in.bl-india.com/storage/site_settings/site_icon-96x96.webp">
        <link rel="icon" sizes="16x16" href="https://in.bl-india.com/storage/site_settings/site_icon-16x16.webp">

        @viteReactRefresh
        @vite('resources/js/Site/app.jsx')
        @vite('resources/css/app.css')

        <!-- Google Analytics Code -->
        <script>
            // Function to get the appropriate Google Analytics tag based on the subdomain
            function getAnalyticsTag() {
                const hostname = window.location.hostname;
                if (hostname.startsWith('in')) {
                    return 'G-7MTYGFV5P3'; // 'in' subdomain Google Analytics tag
                } else if (hostname.startsWith('global')) {
                    return 'G-3SRE4T8KYX'; // 'global' subdomain Google Analytics tag
                }
                return 'G-7MTYGFV5P3'; // Default Google Analytics tag
            }

            // Insert the Google Analytics script dynamically
            (function() {
                const tag = getAnalyticsTag();
                if (tag) {
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = `https://www.googletagmanager.com/gtag/js?id=${tag}`;
                    document.head.appendChild(script);

                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', tag, {
                        cookie_flags: 'SameSite=None;Secure',
                        anonymize_ip: true,
                        send_page_view: false,
                    });
                }
            })();
        </script>

        <!-- Meta Pixel Code -->
        <script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '514698110975496');
            fbq('track', 'PageView');
        </script>
        <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=514698110975496&ev=PageView&noscript=1"
        /></noscript>
        <!-- End Meta Pixel Code -->
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
