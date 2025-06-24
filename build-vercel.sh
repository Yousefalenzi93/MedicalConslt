#!/bin/bash

echo "🚀 بناء منصة طريقتي العلاجي لـ Vercel..."

# إنشاء مجلد dist
echo "📁 إنشاء مجلد dist..."
mkdir -p dist

# نسخ جميع ملفات HTML
echo "📄 نسخ ملفات HTML..."
cp *.html dist/ 2>/dev/null && echo "✅ تم نسخ ملفات HTML" || echo "⚠️ لا توجد ملفات HTML"

# نسخ مجلد public إذا كان موجود
echo "📂 نسخ مجلد public..."
if [ -d "public" ]; then
    cp -r public/* dist/ 2>/dev/null && echo "✅ تم نسخ مجلد public" || echo "ℹ️ مجلد public فارغ"
else
    echo "ℹ️ مجلد public غير موجود"
fi

# نسخ ملفات CSS و JS إذا كانت موجودة
echo "🎨 نسخ ملفات الأصول..."
cp *.css dist/ 2>/dev/null || echo "ℹ️ لا توجد ملفات CSS"
cp *.js dist/ 2>/dev/null || echo "ℹ️ لا توجد ملفات JS"

# نسخ الصور والأيقونات
echo "🖼️ نسخ الصور..."
cp *.ico dist/ 2>/dev/null || echo "ℹ️ لا توجد أيقونات"
cp *.png dist/ 2>/dev/null || echo "ℹ️ لا توجد صور PNG"
cp *.jpg dist/ 2>/dev/null || echo "ℹ️ لا توجد صور JPG"
cp *.svg dist/ 2>/dev/null || echo "ℹ️ لا توجد صور SVG"

# إنشاء ملف robots.txt
echo "🤖 إنشاء robots.txt..."
cat > dist/robots.txt << 'EOF'
User-agent: *
Allow: /

# منصة طريقتي العلاجي - منصة التعاون الطبي المتقدمة
Sitemap: https://tariqi-alilaji.vercel.app/sitemap.xml
EOF

# إنشاء ملف sitemap.xml
echo "🗺️ إنشاء sitemap.xml..."
cat > dist/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tariqi-alilaji.vercel.app/</loc>
    <lastmod>2024-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tariqi-alilaji.vercel.app/admin-dashboard.html</loc>
    <lastmod>2024-06-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tariqi-alilaji.vercel.app/dashboard.html</loc>
    <lastmod>2024-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://tariqi-alilaji.vercel.app/admin-login.html</loc>
    <lastmod>2024-06-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
EOF

# إنشاء ملف _headers لـ Vercel
echo "🔒 إنشاء ملف headers..."
cat > dist/_headers << 'EOF'
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/admin-dashboard.html
  Cache-Control: no-cache, no-store, must-revalidate

/admin-login.html
  Cache-Control: no-cache, no-store, must-revalidate

/*.html
  Cache-Control: public, max-age=3600

/*.css
  Cache-Control: public, max-age=31536000

/*.js
  Cache-Control: public, max-age=31536000
EOF

# عرض محتويات dist
echo "📊 محتويات مجلد dist:"
ls -la dist/ 2>/dev/null || echo "❌ مجلد dist فارغ"

# إحصائيات
html_count=$(ls dist/*.html 2>/dev/null | wc -l)
total_files=$(ls dist/ 2>/dev/null | wc -l)

echo
echo "✅ تم بناء المشروع بنجاح لـ Vercel!"
echo "📁 المجلد: dist"
echo "📄 ملفات HTML: $html_count"
echo "📦 إجمالي الملفات: $total_files"
echo "🌐 جاهز للنشر على Vercel"
