#!/bin/bash

echo "🚀 بناء منصة طريقتي العلاجي للنشر على Netlify..."

# إنشاء مجلد dist
echo "📁 إنشاء مجلد dist..."
mkdir -p dist

# نسخ جميع ملفات HTML
echo "📄 نسخ ملفات HTML..."
cp *.html dist/ 2>/dev/null || echo "⚠️ لا توجد ملفات HTML في الجذر"

# نسخ مجلد public إذا كان موجود
echo "📂 نسخ مجلد public..."
if [ -d "public" ]; then
    cp -r public/* dist/ 2>/dev/null || echo "⚠️ مجلد public فارغ"
else
    echo "ℹ️ مجلد public غير موجود"
fi

# نسخ ملفات إضافية مهمة
echo "📋 نسخ ملفات إضافية..."
cp favicon.ico dist/ 2>/dev/null || echo "ℹ️ favicon.ico غير موجود"
cp robots.txt dist/ 2>/dev/null || echo "ℹ️ robots.txt غير موجود"

# إنشاء ملف _redirects إذا لم يكن موجود
echo "🔄 إنشاء ملف _redirects..."
cat > dist/_redirects << 'EOF'
# Admin dashboard
/admin-dashboard.html /admin-dashboard.html 200
/admin-login.html /admin-login.html 200

# Doctor dashboard
/dashboard.html /dashboard.html 200
/profile.html /profile.html 200

# Test pages
/test-login.html /test-login.html 200
/firebase-setup.html /firebase-setup.html 200

# Main page
/index.html /index.html 200

# Default fallback
/* /index.html 200
EOF

# عرض محتويات dist
echo "📊 محتويات مجلد dist:"
ls -la dist/

echo "✅ تم بناء المشروع بنجاح!"
echo "📁 المجلد: dist"
echo "📄 الملفات: $(ls dist/*.html 2>/dev/null | wc -l) ملف HTML"
