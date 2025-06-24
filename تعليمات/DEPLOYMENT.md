# دليل النشر | Deployment Guide

## 🚀 النشر على Netlify

### الطريقة الأولى: Git Integration (الموصى بها)

1. **رفع الكود إلى GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Medical Consultation Platform"
git branch -M main
git remote add origin https://github.com/your-username/medical-consult.git
git push -u origin main
```

2. **ربط المستودع بـ Netlify**
- اذهب إلى [Netlify](https://netlify.com)
- اضغط على "New site from Git"
- اختر GitHub واختر المستودع
- اضبط الإعدادات:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Node version: `18`

3. **إعداد متغيرات البيئة**
في لوحة تحكم Netlify، اذهب إلى Site settings > Environment variables:
```
VITE_API_URL=https://your-api-domain.com/api
VITE_ENABLE_AI_ASSISTANT=true
VITE_ENABLE_REAL_TIME_MESSAGING=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_OFFLINE_MODE=true
```

### الطريقة الثانية: Netlify CLI

1. **تثبيت Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **تسجيل الدخول**
```bash
netlify login
```

3. **بناء المشروع**
```bash
npm run build
```

4. **النشر**
```bash
# نشر تجريبي
netlify deploy --dir=dist

# نشر نهائي
netlify deploy --prod --dir=dist
```

## 🔧 إعدادات إضافية

### إعداد Domain مخصص
1. في لوحة تحكم Netlify، اذهب إلى Domain settings
2. اضغط على "Add custom domain"
3. أدخل اسم النطاق الخاص بك
4. اتبع التعليمات لإعداد DNS

### إعداد SSL Certificate
- Netlify يوفر SSL مجاني تلقائياً
- سيتم تفعيله خلال دقائق من إضافة النطاق

### إعداد Redirects
الملف `public/_redirects` موجود بالفعل ويحتوي على:
- إعادة توجيه SPA للتعامل مع client-side routing
- Headers أمنية
- إعدادات Cache

## 📊 مراقبة الأداء

### Netlify Analytics
- فعّل Netlify Analytics من لوحة التحكم
- ستحصل على إحصائيات مفصلة عن الزوار والأداء

### Google Analytics (اختياري)
أضف Google Analytics ID في متغيرات البيئة:
```
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## 🔒 الأمان

### Headers أمنية
الملف `netlify.toml` يحتوي على headers أمنية:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Environment Variables
- لا تضع أسرار حساسة في الكود
- استخدم متغيرات البيئة في Netlify
- المتغيرات التي تبدأ بـ `VITE_` ستكون متاحة في المتصفح

## 🚀 تحسين الأداء

### تحسين البناء
```bash
# تحليل حجم Bundle
npm run build -- --analyze

# تحسين الصور
# استخدم أدوات ضغط الصور قبل الرفع
```

### PWA Features
- Service Worker مُعد بالفعل
- Manifest.json موجود
- التطبيق يعمل offline جزئياً

## 🔄 التحديثات التلقائية

### Git Hooks
عند push جديد إلى main branch:
1. Netlify سيبني المشروع تلقائياً
2. سيتم نشر النسخة الجديدة
3. ستصلك إشعارات بحالة البناء

### Preview Deployments
- كل Pull Request سيحصل على preview URL
- يمكن اختبار التغييرات قبل الدمج

## 🐛 استكشاف الأخطاء

### أخطاء البناء الشائعة
```bash
# خطأ في Node version
# الحل: تأكد من استخدام Node 18+

# خطأ في dependencies
# الحل: احذف node_modules و package-lock.json ثم:
npm install

# خطأ في environment variables
# الحل: تأكد من إعداد المتغيرات في Netlify
```

### فحص Logs
- اذهب إلى Deploys في لوحة تحكم Netlify
- اضغط على آخر deployment
- راجع Build logs للأخطاء

## 📱 اختبار التطبيق

### اختبار محلي
```bash
# تشغيل محلي
npm run dev

# بناء واختبار
npm run build
npm run preview
```

### اختبار الإنتاج
- اختبر على أجهزة مختلفة
- تأكد من عمل RTL بشكل صحيح
- اختبر offline functionality
- تأكد من responsive design

## 🔗 روابط مفيدة

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deploying)

## 📞 الدعم

إذا واجهت مشاكل في النشر:
1. راجع Build logs في Netlify
2. تأكد من إعدادات Environment variables
3. تحقق من ملف netlify.toml
4. راجع الوثائق أعلاه

---

**ملاحظة**: هذا الدليل مخصص للنشر على Netlify. للنشر على منصات أخرى (Vercel, AWS, etc.)، قد تحتاج إلى تعديلات طفيفة في الإعدادات.
