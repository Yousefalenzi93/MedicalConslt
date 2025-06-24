# 🔧 دليل استكشاف الأخطاء - واجهات الويب

## 🚨 إذا لم تعمل الواجهات

### 1. اختبار سريع أولاً
```bash
# افتح هذا الملف أولاً للتأكد من الأساسيات
open minimal-test.html
```

### 2. تحقق من المتطلبات الأساسية

#### ✅ متصفح حديث
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

#### ✅ اتصال إنترنت
- مطلوب لتحميل TailwindCSS من CDN
- مطلوب لتحميل الخطوط من Google Fonts

### 3. خطوات استكشاف الأخطاء

#### الخطوة 1: فتح Developer Tools
```
F12 أو Ctrl+Shift+I (Windows/Linux)
Cmd+Option+I (Mac)
```

#### الخطوة 2: فحص Console
ابحث عن رسائل خطأ مثل:
```
❌ Failed to load resource: net::ERR_INTERNET_DISCONNECTED
❌ Refused to load the script 'https://cdn.tailwindcss.com'
❌ SyntaxError: Unexpected token
```

#### الخطوة 3: فحص Network Tab
تأكد من تحميل:
- ✅ `https://cdn.tailwindcss.com`
- ✅ `https://fonts.googleapis.com`

### 4. الحلول الشائعة

#### مشكلة: الصفحة فارغة أو بيضاء
```html
<!-- تأكد من وجود هذا السطر -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- وهذا أيضاً -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### مشكلة: التصميم لا يظهر
```javascript
// افتح Console واكتب:
console.log(window.tailwind);
// يجب أن يظهر object وليس undefined
```

#### مشكلة: الخطوط لا تظهر
```html
<!-- تأكد من وجود -->
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

#### مشكلة: JavaScript لا يعمل
```html
<!-- تأكد من وضع JavaScript قبل </body> -->
<script>
    console.log('JavaScript يعمل');
</script>
</body>
```

### 5. اختبار بديل (بدون إنترنت)

إذا لم يكن لديك إنترنت، استخدم هذا الكود:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>اختبار بدون إنترنت</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            color: white;
        }
        .container {
            background: white;
            color: #333;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 500px;
        }
        .logo {
            width: 80px;
            height: 80px;
            background: #3b82f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            color: white;
            font-size: 2rem;
            font-weight: bold;
        }
        .btn {
            background: #3b82f6;
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            margin: 0.5rem;
        }
        .btn:hover {
            background: #2563eb;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">م</div>
        <h1>منصة الاستشارات الطبية</h1>
        <p>اختبار بدون إنترنت - يعمل بنجاح!</p>
        <button class="btn" onclick="alert('JavaScript يعمل!')">اختبار التفاعل</button>
        <p style="margin-top: 2rem; font-size: 0.9rem; color: #666;">
            ✅ HTML يعمل<br>
            ✅ CSS يعمل<br>
            ✅ JavaScript يعمل<br>
            ✅ دعم العربية يعمل
        </p>
    </div>
</body>
</html>
```

### 6. اختبار متقدم

#### فحص TailwindCSS
```javascript
// في Console
console.log(getComputedStyle(document.body).backgroundColor);
// يجب أن يظهر لون الخلفية
```

#### فحص RTL
```javascript
// في Console
console.log(document.documentElement.dir);
// يجب أن يظهر "rtl"
```

#### فحص الخطوط
```javascript
// في Console
console.log(getComputedStyle(document.body).fontFamily);
// يجب أن يظهر اسم الخط
```

### 7. بدائل CDN

إذا لم يعمل TailwindCSS من CDN الرئيسي:

```html
<!-- بديل 1 -->
<script src="https://unpkg.com/tailwindcss@^3/dist/tailwind.min.js"></script>

<!-- بديل 2 -->
<script src="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/lib/index.js"></script>

<!-- بديل 3: CSS مباشر -->
<link href="https://unpkg.com/tailwindcss@^3/dist/tailwind.min.css" rel="stylesheet">
```

### 8. اختبار الملفات

#### minimal-test.html
- ✅ أبسط اختبار ممكن
- ✅ يعمل بدون مكتبات خارجية
- ✅ اختبار سريع للأساسيات

#### working-demo.html
- ✅ نموذج كامل
- ✅ جميع الميزات
- ✅ تفاعل متقدم

#### simple-web.html
- ✅ واجهة متوسطة
- ✅ ميزات أساسية
- ✅ سهل التخصيص

### 9. نصائح إضافية

#### تشغيل محلي
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

#### فحص الملفات
```bash
# تأكد من وجود الملفات
ls -la *.html

# فحص محتوى الملف
head -20 minimal-test.html
```

### 10. الحصول على المساعدة

إذا استمرت المشكلة:

1. **افتح minimal-test.html** أولاً
2. **تحقق من Console** للأخطاء
3. **جرب متصفح آخر**
4. **تأكد من الإنترنت**
5. **استخدم النسخة البديلة** (بدون إنترنت)

### 📞 معلومات الدعم

```
الملفات المتاحة:
- minimal-test.html (اختبار أساسي)
- working-demo.html (نموذج كامل)
- simple-web.html (واجهة بسيطة)
- advanced-web.html (واجهة متقدمة)

جميع الملفات تعمل بشكل مستقل ولا تحتاج تثبيت!
```

---

**ملاحظة**: ابدأ دائماً بـ `minimal-test.html` للتأكد من الأساسيات قبل الانتقال للملفات الأخرى.
