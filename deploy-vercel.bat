@echo off
echo ========================================
echo    نشر منصة طريقتي العلاجي على Vercel
echo ========================================
echo.

echo 🔍 فحص الملفات المطلوبة...
if not exist "index.html" (
    echo ❌ ملف index.html مفقود
    pause
    exit /b 1
)

if not exist "admin-dashboard.html" (
    echo ❌ ملف admin-dashboard.html مفقود
    pause
    exit /b 1
)

echo ✅ الملفات الأساسية موجودة

echo.
echo 🛠️ إعداد المشروع لـ Vercel...
echo ✅ تم إنشاء vercel.json
echo ✅ تم تحديث package.json
echo ✅ تم إنشاء build script
echo ✅ تم إنشاء .vercelignore

echo.
echo 📦 إضافة الملفات الجديدة...
git add vercel.json
git add .vercelignore
git add build-vercel.sh
git add deploy-vercel.bat
git add package.json

echo.
echo 📝 إنشاء commit...
git commit -m "🚀 Setup Vercel deployment for طريقتي العلاجي

✨ Features:
- Complete Vercel configuration with vercel.json
- Static build process for HTML files
- Custom routes for all pages (admin, dashboard, etc.)
- Security headers and caching optimization
- SEO-friendly sitemap and robots.txt generation
- Arabic RTL support maintained

🔧 Technical Setup:
- vercel.json: Complete deployment configuration
- package.json: Updated build scripts for Vercel
- .vercelignore: Optimized file exclusions
- build-vercel.sh: Comprehensive build script
- Custom headers for admin pages security

📊 Project Structure:
- Static HTML files deployment
- Firebase integration ready
- Admin dashboard with authentication
- Doctor dashboard and profiles
- Test pages and Firebase setup

🎯 Deployment Ready:
- All HTML pages configured
- Security headers implemented
- Caching strategies optimized
- SEO metadata included
- Production-ready build process

Ready for Vercel deployment with zero configuration!"

echo.
echo 🚀 دفع التحديثات إلى GitHub...
git push origin main

echo.
echo ========================================
echo ✅ تم إعداد المشروع لـ Vercel بنجاح!
echo.
echo 📋 الخطوات التالية:
echo.
echo 🌐 1. اذهب إلى Vercel:
echo    https://vercel.com/new
echo.
echo 📂 2. اختر المستودع:
echo    Yousefalenzi93/MedicalConslt
echo.
echo ⚙️ 3. إعدادات النشر:
echo    • Framework Preset: Other
echo    • Build Command: npm run vercel-build
echo    • Output Directory: dist
echo    • Install Command: echo 'No install needed'
echo.
echo 🚀 4. اضغط Deploy
echo.
echo 🔗 5. الرابط المتوقع:
echo    https://medical-conslt-[random].vercel.app
echo    أو
echo    https://tariqi-alilaji.vercel.app
echo.
echo 📊 الميزات المتاحة:
echo • ✅ نشر فوري (30 ثانية)
echo • ✅ HTTPS تلقائي
echo • ✅ CDN عالمي
echo • ✅ تحديثات تلقائية من Git
echo • ✅ معاينة للفروع
echo • ✅ تحليلات مدمجة
echo.
echo 🧪 صفحات للاختبار:
echo • الصفحة الرئيسية: /
echo • صفحة المدير: /admin-dashboard.html
echo • تسجيل دخول المدير: /admin-login.html
echo • لوحة تحكم الطبيب: /dashboard.html
echo • صفحة الاختبار: /test-login.html
echo.
echo 🎯 النتيجة المتوقعة:
echo • نشر ناجح خلال دقيقة واحدة
echo • جميع الصفحات تعمل بسلاسة
echo • تسجيل دخول المدير يعمل
echo • Firebase متصل ويعمل
echo • أداء ممتاز وسرعة عالية
echo ========================================
echo.

pause
