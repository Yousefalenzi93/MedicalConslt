# 🏥 طريقتي العلاجي - منصة التعاون الطبي المتقدمة

منصة طبية شاملة مصممة للأطباء والعاملين في المجال الصحي مع نظام إدارة متكامل وقاعدة بيانات حقيقية.

## ✨ الميزات الرئيسية

### 👨‍⚕️ **للأطباء:**
- 📊 لوحة تحكم شاملة مع إحصائيات مفصلة
- 👤 إدارة الملف الشخصي والبيانات المهنية
- 💬 نظام الاستشارات والرسائل
- 📅 إدارة المواعيد والجدولة
- 📋 سجل الأنشطة والتقارير

### ⚙️ **للمدير:**
- 🎛️ لوحة تحكم إدارية متقدمة
- 👥 إدارة شاملة للأطباء (إضافة/تعديل/حذف)
- 📋 نظام موافقة طلبات الانضمام
- 📊 إحصائيات وتحليلات في الوقت الفعلي
- 🔒 إعدادات الأمان والنظام
- 📈 تقارير مفصلة وتحليلات الأداء

### 🔥 **Firebase Integration:**
- 🗄️ قاعدة بيانات Firestore للتخزين الآمن
- 🔐 نظام مصادقة Firebase Auth
- 📊 تحليلات Firebase Analytics
- ☁️ تخزين سحابي آمن
- 🔄 تحديثات فورية في الوقت الفعلي

## 🛠️ التقنيات المستخدمة

- **Frontend:** React 18, Vite, TailwindCSS
- **Backend:** Firebase (Firestore, Auth, Analytics)
- **UI/UX:** تصميم متجاوب مع دعم RTL للعربية
- **State Management:** React Hooks
- **Routing:** React Router
- **Build Tool:** Vite
- **Deployment:** Netlify Ready

## 🚀 البدء السريع

### 1. **استنساخ المستودع:**
```bash
git clone https://github.com/Yousefalenzi93/MedicalConslt.git
cd MedicalConslt
```

### 2. **تثبيت التبعيات:**
```bash
npm install
```

### 3. **إعداد Firebase:**
```bash
# تثبيت Firebase
npm install firebase

# أو استخدم الملف التلقائي
./install-firebase.bat  # Windows
./install-firebase.sh   # Linux/Mac
```

### 4. **تشغيل التطبيق:**
```bash
npm run dev
```

### 5. **فتح المتصفح:**
```
http://localhost:5173
```

## 🧪 الحسابات التجريبية

### 👨‍⚕️ **حسابات الأطباء:**
| الطبيب | رقم الترخيص | كلمة المرور | التخصص |
|---------|-------------|-------------|----------|
| د. أحمد محمد | `DOC001` | `demo123` | طب القلب |
| د. فاطمة علي | `DOC002` | `demo123` | طب الأطفال |
| د. محمد سالم | `DOC003` | `demo123` | طب عام |

### ⚙️ **حساب المدير:**
| المستخدم | رقم الترخيص | كلمة المرور | النوع |
|----------|-------------|-------------|-------|
| مدير المنصة | `ADMIN001` | `admin123` | مدير النظام |

## 📁 هيكل المشروع

```
├── src/
│   ├── components/          # مكونات React
│   │   ├── Dashboard.jsx    # لوحة تحكم الأطباء
│   │   ├── Profile.jsx      # الملف الشخصي
│   │   └── AdminDashboard.jsx # لوحة تحكم المدير
│   ├── firebase/            # خدمات Firebase
│   │   ├── config.js        # إعدادات Firebase
│   │   ├── authService.js   # خدمة المصادقة
│   │   ├── doctorsService.js # خدمة الأطباء
│   │   └── requestsService.js # خدمة الطلبات
│   └── SimpleApp.jsx        # التطبيق الرئيسي
├── public/                  # الملفات العامة
├── index.html              # الصفحة الرئيسية
├── dashboard.html          # لوحة تحكم الأطباء
├── profile.html           # الملف الشخصي
├── admin-dashboard.html    # لوحة تحكم المدير
├── firebase-setup.html     # صفحة إعداد Firebase
├── FIREBASE_GUIDE.md       # دليل Firebase الشامل
├── FEATURES.md            # دليل الميزات التفصيلي
└── package.json           # تبعيات المشروع
```

## 🔥 إعداد Firebase

### **معلومات المشروع:**
- **Project ID:** `mtmconsult-f48f1`
- **Auth Domain:** `mtmconsult-f48f1.firebaseapp.com`
- **Storage:** `mtmconsult-f48f1.firebasestorage.app`

### **الخدمات المفعلة:**
- ✅ Firestore Database
- ✅ Authentication (Email/Password)
- ✅ Analytics
- ✅ Cloud Storage

### **اختبار Firebase:**
1. افتح `firebase-setup.html`
2. اضغط "🔥 اختبار اتصال Firebase"
3. اضغط "📊 إضافة بيانات تجريبية"

## 📊 قاعدة البيانات

### **Collections:**
- **doctors:** بيانات الأطباء المسجلين
- **joinRequests:** طلبات الانضمام المعلقة
- **consultations:** الاستشارات الطبية
- **connectionTest:** اختبارات الاتصال

## 🌐 النشر

### **Netlify Deployment:**
1. ادفع الكود إلى GitHub
2. اربط المستودع مع Netlify
3. اضبط متغيرات البيئة
4. انشر المشروع

## 🧪 الاختبار

### **اختبار محلي:**
```bash
npm run dev
```

### **اختبار Firebase:**
```bash
# افتح صفحة الاختبار
firefox-setup.html
```

### **بناء للإنتاج:**
```bash
npm run build
npm run preview
```

## 📈 الإحصائيات

- **👥 2,847 طبيب** مسجل
- **💬 15,420 استشارة** مكتملة
- **🟢 342 مستخدم** نشط
- **📋 23 طلب انضمام** معلق
- **⭐ 4.7/5 تقييم** عام

## 🤝 المساهمة

1. Fork المستودع
2. إنشاء branch للميزة الجديدة
3. تطبيق التغييرات
4. إرسال Pull Request

## 📞 الدعم

- **📧 البريد:** support@tariqi-alilaji.com
- **📱 الهاتف:** +966 11 123 4567
- **💬 الدردشة:** متاحة في المنصة

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

---

**© 2024 طريقتي العلاجي - منصة التعاون الطبي المتقدمة مع Firebase**
