import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from './config';
import { getDoctorByLicense } from './doctorsService';

// تسجيل دخول بالبريد الإلكتروني وكلمة المرور
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('تم تسجيل الدخول بنجاح');
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    return { success: false, error: error.message };
  }
};

// تسجيل دخول برقم الترخيص (للأطباء)
export const signInWithLicense = async (licenseNumber, password) => {
  try {
    // البحث عن الطبيب برقم الترخيص
    const doctorResult = await getDoctorByLicense(licenseNumber);
    
    if (!doctorResult.success) {
      return { success: false, error: 'رقم الترخيص غير صحيح' };
    }
    
    const doctor = doctorResult.doctor;
    
    // التحقق من حالة الطبيب
    if (doctor.status !== 'active') {
      return { success: false, error: 'حسابك غير مفعل. يرجى التواصل مع الإدارة' };
    }
    
    // محاولة تسجيل الدخول بالبريد الإلكتروني
    const signInResult = await signInWithEmail(doctor.email, password);
    
    if (signInResult.success) {
      return { 
        success: true, 
        user: signInResult.user,
        doctor: doctor,
        userType: 'doctor'
      };
    } else {
      return { success: false, error: 'كلمة المرور غير صحيحة' };
    }
  } catch (error) {
    console.error('خطأ في تسجيل الدخول برقم الترخيص:', error);
    return { success: false, error: error.message };
  }
};

// تسجيل دخول المدير
export const signInAsAdmin = async (username, password) => {
  try {
    // التحقق من بيانات المدير
    if (username !== 'ADMIN001' || password !== 'admin123') {
      return { success: false, error: 'بيانات المدير غير صحيحة' };
    }
    
    // يمكنك إضافة تسجيل دخول Firebase هنا إذا أردت
    // أو استخدام نظام مصادقة منفصل للمدير
    
    return { 
      success: true, 
      user: { 
        uid: 'admin-001',
        email: 'admin@tariqi-alilaji.com',
        displayName: 'مدير المنصة'
      },
      userType: 'admin'
    };
  } catch (error) {
    console.error('خطأ في تسجيل دخول المدير:', error);
    return { success: false, error: error.message };
  }
};

// إنشاء حساب جديد للطبيب (بعد الموافقة على الطلب)
export const createDoctorAccount = async (email, password, doctorData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('تم إنشاء حساب الطبيب بنجاح');
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('خطأ في إنشاء حساب الطبيب:', error);
    return { success: false, error: error.message };
  }
};

// تسجيل الخروج
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('تم تسجيل الخروج بنجاح');
    return { success: true };
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    return { success: false, error: error.message };
  }
};

// مراقبة حالة المصادقة
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// التحقق من المستخدم الحالي
export const getCurrentUser = () => {
  return auth.currentUser;
};

// دالة تسجيل دخول موحدة
export const authenticateUser = async (identifier, password) => {
  try {
    // التحقق إذا كان المدير
    if (identifier === 'ADMIN001') {
      return await signInAsAdmin(identifier, password);
    }
    
    // التحقق إذا كان بريد إلكتروني
    if (identifier.includes('@')) {
      const result = await signInWithEmail(identifier, password);
      if (result.success) {
        return { ...result, userType: 'doctor' };
      }
      return result;
    }
    
    // افتراض أنه رقم ترخيص
    return await signInWithLicense(identifier, password);
  } catch (error) {
    console.error('خطأ في المصادقة:', error);
    return { success: false, error: error.message };
  }
};
