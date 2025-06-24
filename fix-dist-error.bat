@echo off
echo ========================================
echo    إصلاح خطأ "dist does not exist"
echo    منصة طريقتي العلاجي
echo ========================================
echo.

echo 🔍 تشخيص المشكلة...
echo الخطأ: Deploy directory 'dist' does not exist
echo السبب: Netlify يتوقع مجلد dist ولكنه غير موجود
echo.

echo 🛠️ تطبيق الإصلاح...
echo ✅ تم تحديث netlify.toml لإنشاء مجلد dist
echo ✅ تم إضافة أمر نسخ ملفات HTML
echo ✅ تم إنشاء build script احتياطي
echo.

echo 📦 إضافة الملفات المحدثة...
git add netlify.toml
git add build.sh
git add fix-dist-error.bat

echo.
echo 📝 إنشاء commit...
git commit -m "🔧 Fix Netlify dist directory error

❌ Problem:
- Deploy directory 'dist' does not exist
- Netlify expects dist folder but files are in root

✅ Solution:
- Updated netlify.toml to create dist directory
- Added command to copy HTML files to dist
- Created build script for file copying
- Simplified deployment process

🎯 Changes:
- netlify.toml: mkdir -p dist && cp *.html dist/
- build.sh: Comprehensive build script
- Proper dist directory structure

Ready for successful deployment!"

echo.
echo 🚀 دفع التحديثات إلى GitHub...
git push origin main

echo.
echo ========================================
echo ✅ تم إصلاح خطأ dist directory!
echo.
echo 📋 ما تم إصلاحه:
echo • إنشاء مجلد dist تلقائياً
echo • نسخ جميع ملفات HTML إلى dist
echo • إعدادات netlify.toml صحيحة
echo • build script احتياطي
echo.
echo 🔗 بعد النشر، اختبر:
echo • https://mtmcalconslt.netlify.app/
echo • https://mtmcalconslt.netlify.app/admin-dashboard.html
echo • https://mtmcalconslt.netlify.app/dashboard.html
echo.
echo 📊 النتيجة المتوقعة:
echo • نشر ناجح بدون أخطاء
echo • جميع الصفحات متاحة
echo • admin-dashboard.html يعمل
echo • لا مزيد من "Page not found"
echo.
echo ⏱️ وقت النشر المتوقع: 1-2 دقيقة
echo ========================================
echo.

pause
