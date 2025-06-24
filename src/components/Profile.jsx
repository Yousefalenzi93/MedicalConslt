import React, { useState } from 'react'

const Profile = ({ user, setCurrentUser }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    setCurrentUser(formData)
    setIsEditing(false)
    // Show success message
    const messageEl = document.createElement('div')
    messageEl.className = 'fixed top-4 left-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    messageEl.textContent = 'تم حفظ التغييرات بنجاح!'
    document.body.appendChild(messageEl)
    
    setTimeout(() => {
      if (document.body.contains(messageEl)) {
        document.body.removeChild(messageEl)
      }
    }, 3000)
  }

  const handleCancel = () => {
    setFormData(user)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الملف الشخصي</h1>
          <p className="text-gray-600">إدارة معلوماتك الشخصية والمهنية</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-4xl">👨‍⚕️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-600">{user.specialty}</p>
                <p className="text-sm text-gray-500 mt-1">رقم الترخيص: {user.license}</p>
                
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  📷 تغيير الصورة
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">إحصائيات سريعة</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الاستشارات</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">التقييم</span>
                    <span className="font-medium">⭐ 4.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">سنوات الخبرة</span>
                    <span className="font-medium">{user.experience}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">المعلومات التفصيلية</h3>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    ✏️ تعديل
                  </button>
                ) : (
                  <div className="space-x-2 space-x-reverse">
                    <button 
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      💾 حفظ
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      ❌ إلغاء
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">المعلومات الشخصية</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{user.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{user.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{user.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">المعلومات المهنية</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">التخصص</label>
                        {isEditing ? (
                          <select
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="طب عام">طب عام</option>
                            <option value="طب القلب">طب القلب</option>
                            <option value="طب الأطفال">طب الأطفال</option>
                            <option value="طب الأعصاب">طب الأعصاب</option>
                            <option value="جراحة العظام">جراحة العظام</option>
                            <option value="طب العيون">طب العيون</option>
                            <option value="طب الأسنان">طب الأسنان</option>
                          </select>
                        ) : (
                          <p className="text-gray-900">{user.specialty}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">رقم الترخيص</label>
                        <p className="text-gray-900">{user.license}</p>
                        <p className="text-xs text-gray-500">لا يمكن تعديل رقم الترخيص</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">المستشفى/العيادة</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="hospital"
                            value={formData.hospital}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{user.hospital}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">سنوات الخبرة</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{user.experience}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">السيرة الذاتية والخبرات</h4>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="اكتب نبذة عن خبراتك ومؤهلاتك المهنية..."
                    />
                  ) : (
                    <p className="text-gray-900 leading-relaxed">{user.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="mt-6 bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">إعدادات الحساب</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">الإشعارات</h4>
                      <p className="text-sm text-gray-600">تلقي إشعارات الاستشارات والرسائل</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      مفعل
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">الخصوصية</h4>
                      <p className="text-sm text-gray-600">إظهار الملف الشخصي للأطباء الآخرين</p>
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                      عام
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      🗑️ حذف الحساب
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
