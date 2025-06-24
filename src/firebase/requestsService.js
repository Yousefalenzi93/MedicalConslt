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
import { addDoctor } from './doctorsService';

const REQUESTS_COLLECTION = 'joinRequests';

// إضافة طلب انضمام جديد
export const submitJoinRequest = async (requestData) => {
  try {
    const docRef = await addDoc(collection(db, REQUESTS_COLLECTION), {
      ...requestData,
      status: 'pending', // pending, approved, rejected
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('تم إرسال طلب الانضمام بنجاح:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('خطأ في إرسال طلب الانضمام:', error);
    return { success: false, error: error.message };
  }
};

// الحصول على جميع طلبات الانضمام
export const getAllJoinRequests = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, REQUESTS_COLLECTION), orderBy('createdAt', 'desc'))
    );
    
    const requests = [];
    querySnapshot.forEach((doc) => {
      requests.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, requests };
  } catch (error) {
    console.error('خطأ في جلب طلبات الانضمام:', error);
    return { success: false, error: error.message };
  }
};

// الحصول على الطلبات المعلقة فقط
export const getPendingRequests = async () => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, REQUESTS_COLLECTION), 
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      )
    );
    
    const requests = [];
    querySnapshot.forEach((doc) => {
      requests.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, requests };
  } catch (error) {
    console.error('خطأ في جلب الطلبات المعلقة:', error);
    return { success: false, error: error.message };
  }
};

// الموافقة على طلب انضمام
export const approveJoinRequest = async (requestId, adminNotes = '') => {
  try {
    // الحصول على بيانات الطلب
    const requestRef = doc(db, REQUESTS_COLLECTION, requestId);
    const requestSnapshot = await getDocs(
      query(collection(db, REQUESTS_COLLECTION), where('__name__', '==', requestId))
    );
    
    if (requestSnapshot.empty) {
      return { success: false, error: 'لم يتم العثور على الطلب' };
    }
    
    const requestData = requestSnapshot.docs[0].data();
    
    // إضافة الطبيب إلى قاعدة البيانات
    const doctorResult = await addDoctor({
      name: requestData.name,
      email: requestData.email,
      phone: requestData.phone,
      specialty: requestData.specialty,
      license: requestData.license,
      hospital: requestData.hospital,
      experience: requestData.experience,
      bio: requestData.bio || '',
      approvedBy: 'ADMIN001',
      approvedAt: serverTimestamp()
    });
    
    if (!doctorResult.success) {
      return { success: false, error: 'فشل في إضافة الطبيب' };
    }
    
    // تحديث حالة الطلب
    await updateDoc(requestRef, {
      status: 'approved',
      adminNotes,
      approvedAt: serverTimestamp(),
      doctorId: doctorResult.id,
      updatedAt: serverTimestamp()
    });
    
    console.log('تم قبول طلب الانضمام بنجاح');
    return { success: true, doctorId: doctorResult.id };
  } catch (error) {
    console.error('خطأ في قبول طلب الانضمام:', error);
    return { success: false, error: error.message };
  }
};

// رفض طلب انضمام
export const rejectJoinRequest = async (requestId, adminNotes = '') => {
  try {
    const requestRef = doc(db, REQUESTS_COLLECTION, requestId);
    await updateDoc(requestRef, {
      status: 'rejected',
      adminNotes,
      rejectedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('تم رفض طلب الانضمام');
    return { success: true };
  } catch (error) {
    console.error('خطأ في رفض طلب الانضمام:', error);
    return { success: false, error: error.message };
  }
};

// حذف طلب انضمام
export const deleteJoinRequest = async (requestId) => {
  try {
    await deleteDoc(doc(db, REQUESTS_COLLECTION, requestId));
    console.log('تم حذف طلب الانضمام بنجاح');
    return { success: true };
  } catch (error) {
    console.error('خطأ في حذف طلب الانضمام:', error);
    return { success: false, error: error.message };
  }
};

// إحصائيات طلبات الانضمام
export const getRequestsStats = async () => {
  try {
    const allRequestsSnapshot = await getDocs(collection(db, REQUESTS_COLLECTION));
    const pendingRequestsSnapshot = await getDocs(
      query(collection(db, REQUESTS_COLLECTION), where('status', '==', 'pending'))
    );
    const approvedRequestsSnapshot = await getDocs(
      query(collection(db, REQUESTS_COLLECTION), where('status', '==', 'approved'))
    );
    const rejectedRequestsSnapshot = await getDocs(
      query(collection(db, REQUESTS_COLLECTION), where('status', '==', 'rejected'))
    );
    
    return {
      success: true,
      stats: {
        total: allRequestsSnapshot.size,
        pending: pendingRequestsSnapshot.size,
        approved: approvedRequestsSnapshot.size,
        rejected: rejectedRequestsSnapshot.size
      }
    };
  } catch (error) {
    console.error('خطأ في جلب إحصائيات الطلبات:', error);
    return { success: false, error: error.message };
  }
};
