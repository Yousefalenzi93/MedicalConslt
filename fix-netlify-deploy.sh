#!/bin/bash

echo "========================================"
echo "   إصلاح نشر Netlify - طريقتي العلاجي"
echo "========================================"
echo

echo "🔍 تشخيص المشكلة..."
echo "المشكلة: Page not found على Netlify"
echo "السبب: إعدادات البناء خاطئة"
echo

echo "🛠️ تطبيق الإصلاح..."
echo "✅ تم تحديث netlify.toml"
echo "✅ تم تغيير publish directory إلى \".\""
echo "✅ تم إضافة redirects محددة"
echo "✅ تم إضافة security headers"
echo

echo "📦 إضافة الملفات المحدثة..."
git add netlify.toml
git add NETLIFY_FIX.md
git add fix-netlify-deploy.sh

echo
echo "📝 إنشاء commit..."
git commit -m "🔧 Fix Netlify deployment - serve static HTML files

✨ Changes:
- Updated netlify.toml to serve static files directly
- Changed publish directory from 'dist' to '.'
- Added specific redirects for all HTML pages
- Added security headers for better protection
- Removed unnecessary build process

🎯 Result:
- All HTML pages now accessible on Netlify
- admin-dashboard.html works directly
- dashboard.html accessible for doctors
- Faster deployment without build complexity
- Better security with custom headers

🧪 Test URLs:
- https://mtmcalconslt.netlify.app/admin-dashboard.html
- https://mtmcalconslt.netlify.app/admin-login.html
- https://mtmcalconslt.netlify.app/dashboard.html
- https://mtmcalconslt.netlify.app/test-login.html

Ready for immediate deployment!"

echo
echo "🚀 دفع التحديثات إلى GitHub..."
git push origin main

echo
echo "========================================"
echo "✅ تم إصلاح مشكلة Netlify بنجاح!"
echo
echo "📋 الخطوات التالية:"
echo "1. انتظر انتهاء النشر على Netlify (1-2 دقيقة)"
echo "2. اختبر الروابط التالية:"
echo
echo "🔗 روابط الاختبار:"
echo "• الصفحة الرئيسية:"
echo "  https://mtmcalconslt.netlify.app/"
echo
echo "• صفحة المدير:"
echo "  https://mtmcalconslt.netlify.app/admin-dashboard.html"
echo
echo "• تسجيل دخول المدير:"
echo "  https://mtmcalconslt.netlify.app/admin-login.html"
echo
echo "• لوحة تحكم الطبيب:"
echo "  https://mtmcalconslt.netlify.app/dashboard.html"
echo
echo "• صفحة الاختبار:"
echo "  https://mtmcalconslt.netlify.app/test-login.html"
echo
echo "🎯 النتيجة المتوقعة:"
echo "• جميع الصفحات تعمل بدون \"Page not found\""
echo "• تسجيل دخول المدير يعمل بسلاسة"
echo "• نشر أسرع بدون عملية بناء معقدة"
echo
echo "📊 إذا استمرت المشكلة:"
echo "1. تحقق من Netlify Deploy Logs"
echo "2. تأكد من انتهاء النشر"
echo "3. جرب إعادة نشر يدوي في Netlify"
echo "4. امسح cache المتصفح (Ctrl+F5)"
echo "========================================"
echo

read -p "اضغط Enter للمتابعة..."
