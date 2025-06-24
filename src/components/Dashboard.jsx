import React from 'react'

const Dashboard = ({ user, userStats, navigateTo }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مرحباً، {user.name}</h1>
          <p className="text-gray-600">نظرة عامة على نشاطك في المنصة</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">💬</span>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الاستشارات</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.consultations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">📧</span>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الرسائل</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.messages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">📅</span>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">المواعيد</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.appointments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⭐</span>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">التقييم</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.rating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Consultations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">الاستشارات الحديثة</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { id: 1, patient: 'مريض #1234', specialty: 'طب القلب', status: 'جديدة', time: 'منذ 5 دقائق' },
                    { id: 2, patient: 'مريض #1235', specialty: 'طب عام', status: 'قيد المراجعة', time: 'منذ 15 دقيقة' },
                    { id: 3, patient: 'مريض #1236', specialty: 'طب الأطفال', status: 'مكتملة', time: 'منذ ساعة' },
                  ].map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{consultation.patient}</p>
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                      </div>
                      <div className="text-left">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          consultation.status === 'جديدة' ? 'bg-blue-100 text-blue-800' :
                          consultation.status === 'قيد المراجعة' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {consultation.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{consultation.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
                  عرض جميع الاستشارات
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions & Notifications */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">إجراءات سريعة</h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  💬 استشارة جديدة
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  📅 جدولة موعد
                </button>
                <button 
                  onClick={() => navigateTo('profile')}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  👤 تحديث الملف الشخصي
                </button>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">الرسائل الحديثة</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { from: 'د. أحمد محمد', message: 'شكراً لك على الاستشارة...', time: 'منذ 10 دقائق' },
                    { from: 'إدارة المنصة', message: 'تحديث جديد متاح...', time: 'منذ ساعة' },
                    { from: 'د. فاطمة علي', message: 'هل يمكنك مراجعة هذه الحالة؟', time: 'منذ ساعتين' },
                  ].map((message, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <p className="font-medium text-sm text-gray-900">{message.from}</p>
                      <p className="text-sm text-gray-600 truncate">{message.message}</p>
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                  عرض جميع الرسائل
                </button>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">جدول اليوم</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { time: '09:00', event: 'استشارة - طب القلب' },
                    { time: '11:30', event: 'اجتماع فريق طبي' },
                    { time: '14:00', event: 'مراجعة حالات' },
                    { time: '16:00', event: 'استشارة - طب عام' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-16 text-sm font-medium text-gray-900">{item.time}</div>
                      <div className="flex-1 text-sm text-gray-600">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
