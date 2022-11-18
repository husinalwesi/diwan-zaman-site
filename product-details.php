<?php
        function CallAPI($method, $url, $data = false)
        {
            $curl = curl_init();

            switch ($method)
            {
                case "POST":
                    curl_setopt($curl, CURLOPT_POST, 1);

                    if ($data)
                        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                    break;
                case "PUT":
                    curl_setopt($curl, CURLOPT_PUT, 1);
                    break;
                default:
                    if ($data)
                        $url = sprintf("%s?%s", $url, http_build_query($data));
            }

            // Optional Authentication:
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            curl_setopt($curl, CURLOPT_USERPWD, "username:password");

            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

            $result = curl_exec($curl);

            curl_close($curl);

            return $result;
        }
        
        $data = CallAPI("get", "http://diwan-zaman.com/api/api.php?type=api&action=getProductByID&id=10
        ")
    echo $data;
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="description" content="Arabic Restaurant - Grill Restaurant">
  <meta name="keywords" content="Arabic, Restaurant, Grill">
  <meta name="author" content="Diwan Zaman">
  <link rel="canonical" href="http://diwan-zaman.com/" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta property="fb:page_id" content="256281040558" />
  <meta name="language" content="Arabic">
  <meta name="description" content="مشاوي
  عرايس
  كباب
  عراقي
  منسف
  أوزي
  صواني و قلايات
  برياني 
  كبسة
  رقاب محشية
  ضلعة محشية
  دجاجة محشية 
  دولمة عراقية 
  أفضل و اشهر ملحمة في الأردن 
  أفضل و أشهؤ محل مشاوي" />
  <meta property="og:url" content="http://diwan-zaman.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="ملحمة ومشاوي ديوان زمان" />
  <meta property="og:description" content="مشاوي
  عرايس
  كباب
  عراقي
  منسف
  أوزي
  صواني و قلايات
  برياني 
  كبسة
  رقاب محشية
  ضلعة محشية
  دجاجة محشية 
  دولمة عراقية 
  أفضل و اشهر ملحمة في الأردن 
  أفضل و أشهؤ محل مشاوي" />
  <meta property="og:image" content="http://diwan-zaman.com/assets/images/banner-2.webp" />
				<!-- Open Graph Optional Metadata -->
				<meta property="og:locale" content="ar_AR" />
				<meta property="og:site_name" content="Diwan zaman">
				<meta property="og:locale:alternate" content="en" />





  <title>Diwan Zaman | Arabic Restaurant - Grill Restaurant</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
    <h1>test</h1>
</body>
</html>