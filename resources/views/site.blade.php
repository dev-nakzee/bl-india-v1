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
        <link rel="apple-touch-icon" sizes="57x57" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-57x57.webp?updatedAt=1724390109990">
        <link rel="apple-touch-icon" sizes="60x60" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-60x60.webp?updatedAt=1724390109664">
        <link rel="apple-touch-icon" sizes="72x72" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-72x72.webp?updatedAt=1724390106937">
        <link rel="apple-touch-icon" sizes="76x76" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-76x76.webp?updatedAt=1724390109614">
        <link rel="apple-touch-icon" sizes="114x114" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-114x114.webp?updatedAt=1724390107000">
        <link rel="apple-touch-icon" sizes="120x120" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-120x120.webp?updatedAt=1724390107013">
        <link rel="apple-touch-icon" sizes="144x144" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-144x144.webp?updatedAt=1724390107283">
        <link rel="apple-touch-icon" sizes="152x152" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-152x152.webp?updatedAt=1724390107207">
        <link rel="apple-touch-icon" sizes="180x180" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-180x180.webp?updatedAt=1724390109714">

        <!-- Android Icons -->
        <link rel="icon" sizes="36x36" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-32x32.webp?updatedAt=1724390107213" type="image/webp">
        <link rel="icon" sizes="48x48" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-48x48.webp?updatedAt=1724390107175" type="image/webp">
        <link rel="icon" sizes="72x72" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-72x72.webp?updatedAt=1724390106937" type="image/webp">
        <link rel="icon" sizes="96x96" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-96x96.webp?updatedAt=1724390106977" type="image/webp">
        <link rel="icon" sizes="144x144" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-144x144.webp?updatedAt=1724390107283" type="image/webp">
        <link rel="icon" sizes="192x192" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-192x192.webp?updatedAt=1724390110131" type="image/webp">
        
        <!-- Other Icons -->
        <link rel="icon" sizes="32x32" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-32x32.webp?updatedAt=1724390107213">
        <link rel="icon" sizes="96x96" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-96x96.webp?updatedAt=1724390106977">
        <link rel="icon" sizes="16x16" href="https://ik.imagekit.io/iouishbjd/BL-Site/site_settings/site_icon-16x16.webp?updatedAt=1724390107177">

        <meta name="robots" content="index, follow" />
        
        <meta name="author" content="Rajesh Kumar" />
        <meta name="publisher" content="Brand Liaison India Pvt. Ltd." />
        <meta name="copyright" content="Brand Liaison India Pvt. Ltd." />
        <meta name="Classification" content="Business" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Best Consultant for Product Certifications and Approvals" />
        <meta property="og:description" content="BIS/CRS | BIS/ISI | Scheme X | EPRA | BEE | TEC | WPC/ETA | Trademark | Copyright | Patent" />
        <meta property="og:url" content="https://bl-india.com" />
        <meta property="og:site_name" content="Brand Liaison India®" />
        <meta property="og:image" content="https://ik.imagekit.io/iouishbjd/BL-Site/logo-700x175.jpg?updatedAt=1722162753208" />
        <meta name="format-detection" content="telephone=no" />
        
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
        <!--Start of Tawk.to Script-->
        <script type="text/javascript">
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/66cd972650c10f7a00a0d7dc/1i69hcrlt';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
        </script>
        <!--End of Tawk.to Script-->
    </body>
</html>
