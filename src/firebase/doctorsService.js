import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

const DOCTORS_COLLECTION = 'doctors';

// إضافة طبيب جديد
export const addDoctor = async (doctorData) => {
  try {
    const docRef = await addDoc(collection(db, DOCTORS_COLLECTION), {
      ...doctorData,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('تم إضافة الطبيب بنجاح:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('خطأ في إضافة الطبيب:', error);
    return { success: false, error: error.message };
  }
};

// الحصول على جميع الأطباء
export const getAllDoctors = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, DOCTORS_COLLECTION), orderBy('createdAt', 'desc'))
    );
    
    const doctors = [];
    querySnapshot.forEach((doc) => {
      doctors.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, doctors };
  } catch (error) {
    console.error('خطأ في جلب الأطباء:', error);
    return { success: false, error: error.message };
  }
};

// الحصول على الأطباء النشطين فقط
export const getActiveDoctors = async () => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, DOCTORS_COLLECTION), 
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      )
    );
    
    const doctors = [];
    querySnapshot.forEach((doc) => {
      doctors.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, doctors };
  } catch (error) {
    console.error('خطأ في جلب الأطباء النشطين:', error);
    return { success: false, error: error.message };
  }
};

// تحديث بيانات طبيب
export const updateDoctor = async (doctorId, updateData) => {
  try {
    const doctorRef = doc(db, DOCTORS_COLLECTION, doctorId);
    await updateDoc(doctorRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    
    console.log('تم تحديث الطبيب بنجاح');
    return { success: true };
  } catch (error) {
    console.error('خطأ في تحديث الطبيب:', error);
    return { success: false, error: error.message };
  }
};

// تغيير حالة الطبيب (تفعيل/إلغاء تفعيل)
export const toggleDoctorStatus = async (doctorId, currentStatus) => {
  try {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const doctorRef = doc(db, DOCTORS_COLLECTION, doctorId);
    
    await updateDoc(doctorRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
    
    console.log(`تم ${newStatus === 'active' ? 'تفعيل' : 'إلغاء تفعيل'} الطبيب`);
    return { success: true, newStatus };
  } catch (error) {
    console.error('خطأ في تغيير حالة الطبيب:', error);
    return { success: false, error: error.message };
  }
};

// حذف طبيب
export const deleteDoctor = async (doctorId) => {
  try {
    await deleteDoc(doc(db, DOCTORS_COLLECTION, doctorId));
    console.log('تم حذف الطبيب بنجاح');
    return { success: true };
  } catch (error) {
    console.error('خطأ في حذف الطبيب:', error);
    return { success: false, error: error.message };
  }
};

// البحث عن طبيب برقم الترخيص
export const getDoctorByLicense = async (licenseNumber) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, DOCTORS_COLLECTION), 
        where('license', '==', licenseNumber)
      )
    );
    
    if (querySnapshot.empty) {
      return { success: false, error: 'لم يتم العثور على الطبيب' };
    }
    
    const doctorDoc = querySnapshot.docs[0];
    return { 
      success: true, 
      doctor: { id: doctorDoc.id, ...doctorDoc.data() } 
    };
  } catch (error) {
    console.error('خطأ في البحث عن الطبيب:', error);
    return { success: false, error: error.message };
  }
};

// إحصائيات الأطباء
export const getDoctorsStats = async () => {
  try {
    const allDoctorsSnapshot = await getDocs(collection(db, DOCTORS_COLLECTION));
    const activeDoctorsSnapshot = await getDocs(
      query(collection(db, DOCTORS_COLLECTION), where('status', '==', 'active'))
    );
    
    const totalDoctors = allDoctorsSnapshot.size;
    const activeDoctors = activeDoctorsSnapshot.size;
    const inactiveDoctors = totalDoctors - activeDoctors;
    
    // حساب التخصصات
    const specialties = {};
    allDoctorsSnapshot.forEach((doc) => {
      const specialty = doc.data().specialty;
      specialties[specialty] = (specialties[specialty] || 0) + 1;
    });
    
    return {
      success: true,
      stats: {
        total: totalDoctors,
        active: activeDoctors,
        inactive: inactiveDoctors,
        specialties
      }
    };
  } catch (error) {
    console.error('خطأ في جلب إحصائيات الأطباء:', error);
    return { success: false, error: error.message };
  }
};
