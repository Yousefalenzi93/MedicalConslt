# 🚨 إصلاح سريع للموقع الفارغ

## المشكلة
الموقع https://medicalconslt.netlify.app/ يظهر فارغاً

## الحلول المحتملة

### 1. تحقق من Build Logs في Netlify
1. اذهب إلى [Netlify Dashboard](https://app.netlify.com)
2. اختر موقعك
3. اضغط على "Deploys"
4. اضغط على آخر deployment
5. راجع "Deploy log" للأخطاء

### 2. إعدادات البناء الصحيحة
تأكد من أن إعدادات البناء في Netlify هي:
```
Build command: npm run build
Publish directory: dist
Node version: 18
```

### 3. إصلاح محلي أولاً
```bash
# 1. تثبيت التبعيات
npm install

# 2. اختبار محلي
npm run dev

# 3. بناء المشروع
npm run build

# 4. اختبار البناء
npm run preview
```

### 4. إعدادات Environment Variables
في Netlify، أضف هذه المتغيرات:
```
NODE_VERSION=18
NPM_FLAGS=--legacy-peer-deps
VITE_API_URL=https://your-api-domain.com/api
```

### 5. إعادة النشر
```bash
# إذا كنت تستخدم Git
git add .
git commit -m "Fix build issues"
git push origin main

# أو استخدم Netlify CLI
netlify deploy --prod --dir=dist
```

## الأخطاء الشائعة وحلولها

### خطأ: "Module not found"
```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install
```

### خطأ: "Build failed"
```bash
# تحقق من الأخطاء في الكود
npm run lint
```

### خطأ: "Out of memory"
في netlify.toml أضف:
```toml
[build.environment]
  NODE_OPTIONS = "--max_old_space_size=4096"
```

## اختبار سريع

### تشغيل محلي
```bash
npm run dev
```
يجب أن يعمل على http://localhost:3000

### بناء واختبار
```bash
npm run build && npm run preview
```

## إذا استمرت المشكلة

### 1. إنشاء موقع جديد في Netlify
1. اذهب إلى Netlify
2. "New site from Git"
3. اختر المستودع
4. اضبط الإعدادات الصحيحة

### 2. استخدام Netlify Drop
1. قم ببناء المشروع محلياً: `npm run build`
2. اذهب إلى https://app.netlify.com/drop
3. اسحب مجلد `dist` إلى الصفحة

### 3. فحص الملفات المطلوبة
```bash
node build-test.js
```

## تحقق من الحالة
- ✅ الملفات موجودة
- ✅ package.json صحيح
- ✅ التبعيات مثبتة
- ✅ البناء ينجح محلياً
- ❓ النشر على Netlify

## الدعم
إذا استمرت المشكلة، تحقق من:
1. Build logs في Netlify
2. Browser console للأخطاء
3. Network tab في Developer Tools

---

**ملاحظة**: المشروع يحتوي على جميع الملفات المطلوبة. المشكلة غالباً في إعدادات البناء أو النشر.
