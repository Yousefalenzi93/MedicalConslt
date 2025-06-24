import React, { useState } from 'react'

const AdminDashboard = ({ user, navigateTo }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [showDoctorModal, setShowDoctorModal] = useState(false)

  // Mock data for admin dashboard
  const adminStats = {
    totalDoctors: 2847,
    doctorGrowth: 12.5,
    totalConsultations: 15420,
    consultationGrowth: 8.3,
    activeUsers: 342,
    pendingRequests: 23,
    averageRating: 4.7
  }

  const mockDoctors = [
    { id: 1, name: 'د. أحمد محمد', specialty: 'طب القلب', license: 'DOC001', joinDate: '2024-01-15', status: 'active', consultations: 45, rating: 4.8 },
    { id: 2, name: 'د. فاطمة علي', specialty: 'طب الأطفال', license: 'DOC002', joinDate: '2024-02-20', status: 'active', consultations: 38, rating: 4.9 },
    { id: 3, name: 'د. محمد سالم', specialty: 'طب عام', license: 'DOC003', joinDate: '2024-03-10', status: 'active', consultations: 52, rating: 4.6 },
    { id: 4, name: 'د. نورا أحمد', specialty: 'طب الأعصاب', license: 'DOC004', joinDate: '2024-01-28', status: 'inactive', consultations: 29, rating: 4.7 },
    { id: 5, name: 'د. خالد يوسف', specialty: 'جراحة العظام', license: 'DOC005', joinDate: '2024-04-05', status: 'active', consultations: 41, rating: 4.5 }
  ]

  const pendingRequests = [
    { id: 1, name: 'د. سارة أحمد', specialty: 'طب الجلدية', license: 'DOC006', email: 'sara@example.com', phone: '+966501234567', submitDate: '2024-06-20' },
    { id: 2, name: 'د. عمر محمد', specialty: 'طب العيون', license: 'DOC007', email: 'omar@example.com', phone: '+966507654321', submitDate: '2024-06-21' },
    { id: 3, name: 'د. ليلى حسن', specialty: 'الطب النفسي', license: 'DOC008', email: 'layla@example.com', phone: '+966509876543', submitDate: '2024-06-22' }
  ]

  const recentActivities = [
    { id: 1, action: 'تسجيل دخول', user: 'د. أحمد محمد', time: 'منذ 5 دقائق', type: 'login' },
    { id: 2, action: 'استشارة جديدة', user: 'د. فاطمة علي', time: 'منذ 15 دقيقة', type: 'consultation' },
    { id: 3, action: 'تحديث الملف الشخصي', user: 'د. محمد سالم', time: 'منذ 30 دقيقة', type: 'profile' },
    { id: 4, action: 'طلب انضمام جديد', user: 'د. سارة أحمد', time: 'منذ ساعة', type: 'request' }
  ]

  const handleDoctorAction = (doctorId, action) => {
    const doctor = mockDoctors.find(d => d.id === doctorId)
    let message = ''
    
    switch(action) {
      case 'activate':
        message = `تم تفعيل حساب ${doctor.name} بنجاح`
        break
      case 'deactivate':
        message = `تم إلغاء تفعيل حساب ${doctor.name}`
        break
      case 'delete':
        if (window.confirm(`هل أنت متأكد من حذف حساب ${doctor.name}؟ هذا الإجراء لا يمكن التراجع عنه.`)) {
          message = `تم حذف حساب ${doctor.name}`
        } else {
          return
        }
        break
      default:
        return
    }

    // Show success message
    const messageEl = document.createElement('div')
    messageEl.className = 'fixed top-4 left-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    messageEl.textContent = message
    document.body.appendChild(messageEl)
    
    setTimeout(() => {
      if (document.body.contains(messageEl)) {
        document.body.removeChild(messageEl)
      }
    }, 3000)
  }

  const handleRequestAction = (requestId, action) => {
    const request = pendingRequests.find(r => r.id === requestId)
    const message = action === 'approve' 
      ? `تم قبول طلب انضمام ${request.name}` 
      : `تم رفض طلب انضمام ${request.name}`

    // Show success message
    const messageEl = document.createElement('div')
    messageEl.className = `fixed top-4 left-4 ${action === 'approve' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg z-50`
    messageEl.textContent = message
    document.body.appendChild(messageEl)
    
    setTimeout(() => {
      if (document.body.contains(messageEl)) {
        document.body.removeChild(messageEl)
      }
    }, 3000)
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي الأطباء</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalDoctors.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{adminStats.doctorGrowth}% هذا الشهر</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">💬</span>
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي الاستشارات</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalConsultations.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{adminStats.consultationGrowth}% هذا الشهر</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">🟢</span>
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المستخدمين النشطين</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.activeUsers}</p>
              <p className="text-xs text-gray-500">الآن</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">📋</span>
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">طلبات الانضمام</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.pendingRequests}</p>
              <p className="text-xs text-orange-600">في الانتظار</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">نمو المنصة</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-600">رسم بياني لنمو المنصة</p>
              <p className="text-sm text-gray-500">سيتم إضافة المخططات قريباً</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">الأنشطة الحديثة</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                  <span className="text-blue-600 text-sm">
                    {activity.type === 'login' ? '🔑' : 
                     activity.type === 'consultation' ? '💬' : 
                     activity.type === 'profile' ? '👤' : '📝'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderDoctorsManagement = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">إدارة الأطباء</h3>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطبيب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التخصص</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ التسجيل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاستشارات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                      <div className="text-sm text-gray-500">{doctor.license}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.consultations}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      doctor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {doctor.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse">
                    <button 
                      onClick={() => {setSelectedDoctor(doctor); setShowDoctorModal(true)}}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      👁️ عرض
                    </button>
                    <button 
                      onClick={() => handleDoctorAction(doctor.id, doctor.status === 'active' ? 'deactivate' : 'activate')}
                      className={doctor.status === 'active' ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}
                    >
                      {doctor.status === 'active' ? '⏸️ إيقاف' : '▶️ تفعيل'}
                    </button>
                    <button 
                      onClick={() => handleDoctorAction(doctor.id, 'delete')}
                      className="text-red-600 hover:text-red-900"
                    >
                      🗑️ حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم المدير</h1>
          <p className="text-gray-600">مرحباً {user.name} - إدارة شاملة لمنصة طريقتي العلاجي</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 space-x-reverse">
            {[
              { id: 'overview', name: 'نظرة عامة', icon: '📊' },
              { id: 'doctors', name: 'إدارة الأطباء', icon: '👥' },
              { id: 'requests', name: 'طلبات الانضمام', icon: '📋' },
              { id: 'reports', name: 'التقارير', icon: '📈' },
              { id: 'settings', name: 'الإعدادات', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="ml-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'doctors' && renderDoctorsManagement()}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">طلبات الانضمام المعلقة</h3>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{request.name}</h4>
                      <p className="text-sm text-gray-600">{request.specialty} • {request.license}</p>
                      <p className="text-sm text-gray-600">{request.email} • {request.phone}</p>
                      <p className="text-xs text-gray-500">تاريخ التقديم: {request.submitDate}</p>
                    </div>
                    <div className="space-x-2 space-x-reverse">
                      <button 
                        onClick={() => handleRequestAction(request.id, 'approve')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        ✅ موافقة
                      </button>
                      <button 
                        onClick={() => handleRequestAction(request.id, 'reject')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        ❌ رفض
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">التقارير والتحليلات</h3>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-600">قسم التقارير قيد التطوير</p>
              <p className="text-sm text-gray-500">سيتم إضافة تقارير مفصلة قريباً</p>
            </div>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">إعدادات النظام</h3>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚙️</div>
              <p className="text-gray-600">إعدادات النظام قيد التطوير</p>
              <p className="text-sm text-gray-500">سيتم إضافة إعدادات شاملة قريباً</p>
            </div>
          </div>
        )}

        {/* Doctor Details Modal */}
        {showDoctorModal && selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">تفاصيل الطبيب</h3>
              <div className="space-y-3">
                <p><strong>الاسم:</strong> {selectedDoctor.name}</p>
                <p><strong>التخصص:</strong> {selectedDoctor.specialty}</p>
                <p><strong>رقم الترخيص:</strong> {selectedDoctor.license}</p>
                <p><strong>تاريخ التسجيل:</strong> {selectedDoctor.joinDate}</p>
                <p><strong>عدد الاستشارات:</strong> {selectedDoctor.consultations}</p>
                <p><strong>التقييم:</strong> ⭐ {selectedDoctor.rating}</p>
                <p><strong>الحالة:</strong> 
                  <span className={`mr-2 px-2 py-1 text-xs rounded-full ${
                    selectedDoctor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedDoctor.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </p>
              </div>
              <button 
                onClick={() => setShowDoctorModal(false)}
                className="mt-6 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
