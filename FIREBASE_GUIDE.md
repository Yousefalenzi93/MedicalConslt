# 🔥 دليل ربط Firebase مع منصة "طريقتي العلاجي"

## 📋 نظرة عامة

هذا الدليل يوضح كيفية ربط منصة "طريقتي العلاجي" الطبية مع Firebase لتخزين البيانات الحقيقية وإدارة المصادقة.

## 🚀 الخطوات الأساسية

### **1. إنشاء مشروع Firebase**

#### أ. إنشاء المشروع:
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اضغط **"Create a project"**
3. اسم المشروع: `tariqi-alilaji-medical`
4. فعّل Google Analytics (اختياري)
5. اختر المنطقة: `europe-west3` (أو الأقرب لك)
6. اضغط **"Create project"**

#### ب. إعداد Firestore Database:
1. في لوحة التحكم، اضغط **"Firestore Database"**
2. اضغط **"Create database"**
3. اختر **"Start in test mode"** (للتطوير)
4. اختر المنطقة الجغرافية

#### ج. إعداد Authentication:
1. اضغط **"Authentication"** → **"Get started"**
2. اذهب إلى **"Sign-in method"**
3. فعّل **"Email/Password"**

### **2. الحصول على إعدادات Firebase**

1. في Firebase Console، اضغط ⚙️ → **"Project settings"**
2. اذهب إلى **"Your apps"**
3. اضغط **"Add app"** → اختر **"Web"** (</>)
4. اسم التطبيق: `Medical Platform`
5. انسخ إعدادات Firebase

### **3. تحديث إعدادات Firebase**

افتح الملف `src/firebase/config.js` وحدث الإعدادات:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDsrOCUDUevhiv2rYc5ATx4NTnBkKQ-T9k",
  authDomain: "mtmconsult-f48f1.firebaseapp.com",
  projectId: "mtmconsult-f48f1",
  storageBucket: "mtmconsult-f48f1.firebasestorage.app",
  messagingSenderId: "668149959230",
  appId: "1:668149959230:web:06c54fd158d03faf8e9f6f",
  measurementId: "G-TR97F5BZ7L"
};
```

> **✅ تم تحديث الإعدادات:** هذه هي إعدادات مشروعك الحقيقي `mtmconsult-f48f1`

### **4. تثبيت Firebase**

```bash
npm install firebase
```

## 🗄️ هيكل قاعدة البيانات

### **مجموعة الأطباء (doctors)**
```json
{
  "id": "auto-generated-id",
  "name": "د. أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "+966501234567",
  "specialty": "طب القلب",
  "license": "DOC001",
  "hospital": "مستشفى الملك فيصل التخصصي",
  "experience": "10 سنوات",
  "bio": "طبيب متخصص في طب القلب...",
  "status": "active", // active, inactive
  "createdAt": "2024-06-24T10:00:00Z",
  "updatedAt": "2024-06-24T10:00:00Z"
}
```

### **مجموعة طلبات الانضمام (joinRequests)**
```json
{
  "id": "auto-generated-id",
  "name": "د. سارة أحمد",
  "email": "sara@example.com",
  "phone": "+966507654321",
  "specialty": "طب الجلدية",
  "license": "DOC006",
  "hospital": "مستشفى الملك خالد",
  "experience": "5 سنوات",
  "bio": "طبيبة متخصصة في الأمراض الجلدية...",
  "status": "pending", // pending, approved, rejected
  "adminNotes": "",
  "createdAt": "2024-06-24T10:00:00Z",
  "updatedAt": "2024-06-24T10:00:00Z",
  "approvedAt": null,
  "rejectedAt": null,
  "doctorId": null // يتم ملؤه عند الموافقة
}
```

### **مجموعة الاستشارات (consultations)**
```json
{
  "id": "auto-generated-id",
  "doctorId": "doctor-document-id",
  "patientName": "مريض #1234",
  "specialty": "طب القلب",
  "status": "pending", // pending, in-progress, completed
  "description": "وصف الحالة الطبية...",
  "priority": "normal", // low, normal, high, urgent
  "createdAt": "2024-06-24T10:00:00Z",
  "updatedAt": "2024-06-24T10:00:00Z",
  "completedAt": null
}
```

## 🔧 الخدمات المتاحة

### **خدمة الأطباء (doctorsService.js)**
- `addDoctor(doctorData)` - إضافة طبيب جديد
- `getAllDoctors()` - جلب جميع الأطباء
- `getActiveDoctors()` - جلب الأطباء النشطين فقط
- `updateDoctor(doctorId, updateData)` - تحديث بيانات طبيب
- `toggleDoctorStatus(doctorId, currentStatus)` - تغيير حالة الطبيب
- `deleteDoctor(doctorId)` - حذف طبيب
- `getDoctorByLicense(licenseNumber)` - البحث برقم الترخيص
- `getDoctorsStats()` - إحصائيات الأطباء

### **خدمة طلبات الانضمام (requestsService.js)**
- `submitJoinRequest(requestData)` - إرسال طلب انضمام
- `getAllJoinRequests()` - جلب جميع الطلبات
- `getPendingRequests()` - جلب الطلبات المعلقة
- `approveJoinRequest(requestId, adminNotes)` - الموافقة على طلب
- `rejectJoinRequest(requestId, adminNotes)` - رفض طلب
- `deleteJoinRequest(requestId)` - حذف طلب
- `getRequestsStats()` - إحصائيات الطلبات

### **خدمة المصادقة (authService.js)**
- `authenticateUser(identifier, password)` - تسجيل دخول موحد
- `signInWithLicense(licenseNumber, password)` - دخول برقم الترخيص
- `signInAsAdmin(username, password)` - دخول المدير
- `signOutUser()` - تسجيل الخروج
- `onAuthStateChange(callback)` - مراقبة حالة المصادقة

## 🔒 قواعد الأمان

### **قواعد Firestore الأساسية:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة والكتابة للمستخدمين المصادق عليهم فقط
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // قواعد خاصة لمجموعة الأطباء
    match /doctors/{doctorId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                      (request.auth.uid == doctorId || 
                       request.auth.token.admin == true);
    }
    
    // الوصول للمدير فقط لطلبات الانضمام
    match /joinRequests/{requestId} {
      allow read, write: if request.auth != null && 
                            request.auth.token.admin == true;
      allow create: if request.auth == null; // السماح بإنشاء طلبات جديدة
    }
  }
}
```

## 🧪 اختبار النظام

### **🚀 اختبار سريع:**

#### **أ. اختبار من المتصفح:**
1. افتح `firebase-setup.html` في المتصفح
2. اضغط **"🔥 اختبار اتصال Firebase"**
3. اضغط **"📊 إضافة بيانات تجريبية"**
4. تحقق من النتائج

#### **ب. اختبار من التطبيق:**
```bash
# تثبيت Firebase
npm install firebase

# تشغيل التطبيق
npm run dev

# فتح المتصفح
http://localhost:5173
```

### **1. اختبار تسجيل الدخول:**
```javascript
import { authenticateUser } from './firebase/authService';

// اختبار دخول طبيب
const result = await authenticateUser('DOC001', 'password123');
console.log(result);

// اختبار دخول مدير
const adminResult = await authenticateUser('ADMIN001', 'admin123');
console.log(adminResult);
```

### **2. اختبار إضافة طبيب:**
```javascript
import { addDoctor } from './firebase/doctorsService';

const doctorData = {
  name: 'د. محمد علي',
  email: 'mohamed@example.com',
  phone: '+966501234567',
  specialty: 'طب عام',
  license: 'DOC010',
  hospital: 'مستشفى الملك سعود',
  experience: '8 سنوات',
  bio: 'طبيب عام مع خبرة واسعة...'
};

const result = await addDoctor(doctorData);
console.log(result);
```

### **3. اختبار طلب انضمام:**
```javascript
import { submitJoinRequest } from './firebase/requestsService';

const requestData = {
  name: 'د. فاطمة أحمد',
  email: 'fatima@example.com',
  phone: '+966507654321',
  specialty: 'طب الأطفال',
  license: 'DOC011',
  hospital: 'مستشفى الأطفال',
  experience: '6 سنوات',
  bio: 'طبيبة أطفال متخصصة...'
};

const result = await submitJoinRequest(requestData);
console.log(result);
```

## 🚀 التشغيل والنشر

### **1. التطوير المحلي:**
```bash
# تثبيت التبعيات
npm install

# تشغيل الخادم المحلي
npm run dev
```

### **2. البناء للإنتاج:**
```bash
# بناء المشروع
npm run build

# معاينة البناء
npm run preview
```

### **3. النشر على Netlify:**
1. ادفع الكود إلى GitHub
2. اربط المستودع مع Netlify
3. اضبط متغيرات البيئة لـ Firebase
4. انشر المشروع

## ⚠️ ملاحظات مهمة

### **الأمان:**
- لا تشارك مفاتيح Firebase API في الكود العام
- استخدم متغيرات البيئة للإعدادات الحساسة
- حدث قواعد Firestore للإنتاج
- فعّل التحقق الثنائي للحسابات الإدارية

### **الأداء:**
- استخدم الفهرسة المناسبة في Firestore
- قم بتحسين الاستعلامات
- استخدم التخزين المؤقت عند الحاجة
- راقب استهلاك Firebase

### **النسخ الاحتياطي:**
- فعّل النسخ الاحتياطي التلقائي
- اختبر استعادة البيانات دورياً
- احتفظ بنسخ محلية مهمة

## 📞 الدعم

للمساعدة في إعداد Firebase:
- [وثائق Firebase الرسمية](https://firebase.google.com/docs)
- [دليل Firestore](https://firebase.google.com/docs/firestore)
- [دليل Authentication](https://firebase.google.com/docs/auth)

---

**© 2024 طريقتي العلاجي - دليل Firebase الشامل**
