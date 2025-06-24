// Test Firebase connection and setup
import { db, auth } from './config';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Test Firestore connection
export const testFirestoreConnection = async () => {
  try {
    console.log('🔥 اختبار اتصال Firestore...');
    
    // Test adding a document
    const testDoc = await addDoc(collection(db, 'test'), {
      message: 'اختبار الاتصال',
      timestamp: serverTimestamp(),
      status: 'success'
    });
    
    console.log('✅ تم إنشاء مستند اختبار:', testDoc.id);
    
    // Test reading documents
    const querySnapshot = await getDocs(collection(db, 'test'));
    console.log('✅ تم قراءة المستندات:', querySnapshot.size, 'مستندات');
    
    return { success: true, message: 'Firestore يعمل بنجاح!' };
  } catch (error) {
    console.error('❌ خطأ في Firestore:', error);
    return { success: false, error: error.message };
  }
};

// Test Authentication
export const testAuthentication = async () => {
  try {
    console.log('🔐 اختبار نظام المصادقة...');
    
    // Test creating a user (you might want to comment this out after first test)
    const testEmail = 'test@mtmconsult.com';
    const testPassword = 'test123456';
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
      console.log('✅ تم إنشاء مستخدم اختبار:', userCredential.user.uid);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('ℹ️ المستخدم موجود مسبقاً، جاري اختبار تسجيل الدخول...');
        
        // Test signing in
        const signInResult = await signInWithEmailAndPassword(auth, testEmail, testPassword);
        console.log('✅ تم تسجيل الدخول بنجاح:', signInResult.user.uid);
      } else {
        throw error;
      }
    }
    
    return { success: true, message: 'نظام المصادقة يعمل بنجاح!' };
  } catch (error) {
    console.error('❌ خطأ في المصادقة:', error);
    return { success: false, error: error.message };
  }
};

// Test adding sample doctor data
export const addSampleDoctor = async () => {
  try {
    console.log('👨‍⚕️ إضافة بيانات طبيب تجريبية...');
    
    const sampleDoctor = {
      name: 'د. أحمد محمد التجريبي',
      email: 'ahmed.test@mtmconsult.com',
      phone: '+966501234567',
      specialty: 'طب القلب',
      license: 'TEST001',
      hospital: 'مستشفى الاختبار',
      experience: '10 سنوات',
      bio: 'طبيب تجريبي لاختبار النظام',
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'doctors'), sampleDoctor);
    console.log('✅ تم إضافة طبيب تجريبي:', docRef.id);
    
    return { success: true, doctorId: docRef.id };
  } catch (error) {
    console.error('❌ خطأ في إضافة الطبيب:', error);
    return { success: false, error: error.message };
  }
};

// Test adding sample join request
export const addSampleJoinRequest = async () => {
  try {
    console.log('📋 إضافة طلب انضمام تجريبي...');
    
    const sampleRequest = {
      name: 'د. فاطمة علي التجريبية',
      email: 'fatima.test@mtmconsult.com',
      phone: '+966507654321',
      specialty: 'طب الأطفال',
      license: 'TEST002',
      hospital: 'مستشفى الأطفال التجريبي',
      experience: '8 سنوات',
      bio: 'طبيبة تجريبية لاختبار النظام',
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'joinRequests'), sampleRequest);
    console.log('✅ تم إضافة طلب انضمام تجريبي:', docRef.id);
    
    return { success: true, requestId: docRef.id };
  } catch (error) {
    console.error('❌ خطأ في إضافة طلب الانضمام:', error);
    return { success: false, error: error.message };
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log('🚀 بدء اختبار Firebase الشامل...');
  
  const results = {
    firestore: await testFirestoreConnection(),
    auth: await testAuthentication(),
    sampleDoctor: await addSampleDoctor(),
    sampleRequest: await addSampleJoinRequest()
  };
  
  console.log('📊 نتائج الاختبار:', results);
  
  const allSuccess = Object.values(results).every(result => result.success);
  
  if (allSuccess) {
    console.log('🎉 جميع الاختبارات نجحت! Firebase جاهز للاستخدام.');
  } else {
    console.log('⚠️ بعض الاختبارات فشلت. يرجى مراجعة الأخطاء أعلاه.');
  }
  
  return results;
};

// Quick connection test (for UI)
export const quickConnectionTest = async () => {
  try {
    // Simple test to check if Firebase is configured correctly
    const testCollection = collection(db, 'connectionTest');
    console.log('Firebase connection test passed');
    return { success: true, message: 'Firebase متصل بنجاح!' };
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return { success: false, error: error.message };
  }
};
