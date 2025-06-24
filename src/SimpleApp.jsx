import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import AdminDashboard from './components/AdminDashboard'
import { authenticateUser, signOutUser, onAuthStateChange } from './firebase/authService'
import { submitJoinRequest } from './firebase/requestsService'

const SimpleApp = () => {
  const [showModal, setShowModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('ar')
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('home') // home, dashboard, profile
  const [userStats, setUserStats] = useState({
    consultations: 45,
    messages: 12,
    appointments: 8,
    rating: 4.8
  })

  const showLoginModal = () => setShowModal(true)
  const hideLoginModal = () => setShowModal(false)
  const showRegisterModalFunc = () => {
    setShowModal(false)
    setShowRegisterModal(true)
  }
  const hideRegisterModal = () => setShowRegisterModal(false)

  const navigateTo = (page) => setCurrentPage(page)
  const logout = () => {
    console.log('🚪 تسجيل الخروج...')

    // مسح بيانات المستخدم
    setCurrentUser(null)
    setCurrentPage('home')

    // مسح localStorage
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userType')

    // مسح sessionStorage
    sessionStorage.removeItem('userType')

    showSuccessMessage('تم تسجيل الخروج بنجاح')

    // العودة للصفحة الرئيسية
    setTimeout(() => {
      window.location.href = 'index.html'
    }, 1000)
  }

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'ar' ? 'en' : 'ar'
    setCurrentLanguage(newLang)
    showSuccessMessage(newLang === 'ar' ? 'تم التبديل للعربية' : 'Switched to English')
  }

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const showSuccessMessage = (message) => {
    // Create success message
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

  const showErrorMessage = (message) => {
    // Create error message
    const messageEl = document.createElement('div')
    messageEl.className = 'fixed top-4 left-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    messageEl.textContent = message
    document.body.appendChild(messageEl)

    setTimeout(() => {
      if (document.body.contains(messageEl)) {
        document.body.removeChild(messageEl)
      }
    }, 4000)
  }

  // Demo accounts for testing
  const demoAccounts = [
    { license: 'ADMIN001', password: 'admin123', name: 'مدير المنصة', specialty: 'إدارة النظام', userType: 'admin' },
    { license: 'DOC001', password: 'demo123', name: 'د. أحمد محمد', specialty: 'طب القلب', userType: 'doctor' },
    { license: 'DOC002', password: 'demo123', name: 'د. فاطمة علي', specialty: 'طب الأطفال', userType: 'doctor' },
    { license: 'DOC003', password: 'demo123', name: 'د. محمد سالم', specialty: 'طب عام', userType: 'doctor' },
    { license: 'DOC004', password: 'demo123', name: 'د. نورا أحمد', specialty: 'طب الأعصاب', userType: 'doctor' },
    { license: 'DOC005', password: 'demo123', name: 'د. خالد يوسف', specialty: 'جراحة العظام', userType: 'doctor' }
  ]

  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const license = formData.get('license')
    const password = formData.get('password')

    console.log('🔐 محاولة تسجيل الدخول:', { license, password: '***' })

    if (license && password) {
      try {
        // جرب الحسابات التجريبية أولاً (للتطوير)
        const demoAccount = demoAccounts.find(acc => acc.license === license && acc.password === password)

        if (demoAccount) {
          console.log('✅ تم العثور على حساب تجريبي:', demoAccount.name)

          if (demoAccount.userType === 'admin') {
            // Admin login
            const adminUser = {
              ...demoAccount,
              email: 'admin@tariqi-alilaji.com',
              phone: '+966 11 123 4567',
              userType: 'admin'
            }
            setCurrentUser(adminUser)
            hideLoginModal()
            showSuccessMessage(`مرحباً بك ${demoAccount.name} - مدير النظام`)

            // توجيه للمدير
            setTimeout(() => {
              window.location.href = 'admin-dashboard.html'
            }, 1500)

          } else {
            // Doctor login
            const doctorUser = {
              ...demoAccount,
              email: `${demoAccount.name.replace('د. ', '').replace(' ', '.')}@hospital.com`,
              phone: '+966 50 123 4567',
              hospital: 'مستشفى الملك فيصل التخصصي',
              experience: '10 سنوات',
              bio: `طبيب متخصص في ${demoAccount.specialty} مع خبرة واسعة في التشخيص والعلاج.`,
              userType: 'doctor'
            }
            setCurrentUser(doctorUser)
            hideLoginModal()
            showSuccessMessage(`مرحباً بك ${demoAccount.name} - ${demoAccount.specialty}`)

            // حفظ بيانات المستخدم في localStorage
            localStorage.setItem('currentUser', JSON.stringify(doctorUser))
            localStorage.setItem('userType', 'doctor')

            // توجيه للطبيب
            setTimeout(() => {
              window.location.href = 'dashboard.html'
            }, 1500)
          }

          e.target.reset()
          return
        }

        // إذا لم يتم العثور على حساب تجريبي، جرب Firebase
        console.log('🔥 محاولة Firebase Authentication...')
        const result = await authenticateUser(license, password)

        if (result.success) {
          console.log('✅ Firebase authentication نجح:', result.userType)

          if (result.userType === 'admin') {
            // Admin login
            const adminUser = {
              name: 'مدير المنصة',
              license: 'ADMIN001',
              email: 'admin@tariqi-alilaji.com',
              phone: '+966 11 123 4567',
              userType: 'admin',
              specialty: 'إدارة النظام'
            }
            setCurrentUser(adminUser)
            hideLoginModal()
            showSuccessMessage('مرحباً بك مدير المنصة - مدير النظام')

            localStorage.setItem('currentUser', JSON.stringify(adminUser))
            localStorage.setItem('userType', 'admin')

            setTimeout(() => {
              window.location.href = 'admin-dashboard.html'
            }, 1500)

          } else {
            // Doctor login
            const doctor = result.doctor
            const doctorUser = {
              ...doctor,
              userType: 'doctor'
            }
            setCurrentUser(doctorUser)
            hideLoginModal()
            showSuccessMessage(`مرحباً بك ${doctor.name} - ${doctor.specialty}`)

            localStorage.setItem('currentUser', JSON.stringify(doctorUser))
            localStorage.setItem('userType', 'doctor')

            setTimeout(() => {
              window.location.href = 'dashboard.html'
            }, 1500)
          }

          e.target.reset()
        } else {
          console.error('❌ فشل Firebase authentication:', result.error)
          showErrorMessage(result.error || 'خطأ في تسجيل الدخول')
        }

      } catch (error) {
        console.error('❌ خطأ في تسجيل الدخول:', error)
        showErrorMessage('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.')
      }
    } else {
      showErrorMessage('يرجى إدخال رقم الترخيص وكلمة المرور')
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const license = formData.get('license')
    const specialty = formData.get('specialty')

    if (name && email && license && specialty) {
      hideRegisterModal()
      showSuccessMessage('تم إرسال طلب الانضمام بنجاح! سيتم مراجعته خلال 24 ساعة.')
      e.target.reset()
    }
  }

  const handleForgotPassword = () => {
    hideLoginModal()
    showSuccessMessage('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني')
  }

  // Welcome message on load
  useEffect(() => {
    const timer = setTimeout(() => {
      showSuccessMessage('مرحباً بك في طريقتي العلاجي!')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Render different pages based on currentPage
  const renderHomePage = () => (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            طريقتي العلاجي
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            منصة التعاون الطبي المتقدمة
          </p>
          <div className="space-x-4 space-x-reverse flex flex-wrap justify-center gap-4">
            <button
              onClick={showLoginModal}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              انضم كطبيب
            </button>
            <button
              onClick={() => {
                // Auto-fill demo account
                showLoginModal()
                setTimeout(() => {
                  const licenseInput = document.querySelector('input[name="license"]')
                  const passwordInput = document.querySelector('input[name="password"]')
                  if (licenseInput && passwordInput) {
                    licenseInput.value = 'DOC001'
                    passwordInput.value = 'demo123'
                  }
                }, 100)
              }}
              className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              🧪 تجربة سريعة
            </button>
            <button
              onClick={scrollToServices}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              تعرف على المنصة
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">خدمات المنصة للأطباء</h3>
            <p className="text-gray-600 text-lg">أدوات متقدمة لتعزيز التعاون والتطوير المهني في المجال الطبي</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍⚕️</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">استشارات زملاء المهنة</h4>
              <p className="text-gray-600">تبادل الخبرات والاستشارات الطبية مع الزملاء المتخصصين</p>
            </div>

            {/* Service 2 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">التعليم المستمر</h4>
              <p className="text-gray-600">دورات ومحاضرات طبية متقدمة لتطوير المهارات المهنية</p>
            </div>

            {/* Service 3 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔬</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">البحث والتطوير</h4>
              <p className="text-gray-600">منصة للبحوث الطبية والتطوير العلمي المشترك</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2500+</div>
              <div className="text-blue-100">طبيب مسجل</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15000+</div>
              <div className="text-blue-100">استشارة متبادلة</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">رضا الأطباء</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">منصة متاحة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏥</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">طريقتي العلاجي جاهزة!</h3>
            <p className="text-gray-600 mb-6">
              انضم إلى شبكة الأطباء والعاملين في المجال الصحي لتطوير طرق العلاج وتبادل الخبرات.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <strong className="text-blue-800">👨‍⚕️ للأطباء المختصين</strong>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <strong className="text-green-800">🏥 للعاملين الصحيين</strong>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <strong className="text-purple-800">📚 التعليم المستمر</strong>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <strong className="text-orange-800">🔬 البحث العلمي</strong>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>🏥 منصة طبية متخصصة</p>
              <p>👨‍⚕️ للمهنيين الصحيين</p>
              <p>🌐 متاحة على مدار الساعة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">ط</span>
            </div>
            <span className="mr-2 text-xl font-bold">طريقتي العلاجي</span>
          </div>
          <p className="text-gray-400 mb-4">شبكة مهنية للأطباء والعاملين في المجال الصحي</p>
          <p className="text-gray-500 text-sm">© 2024 طريقتي العلاجي - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </>
  )

  const renderDashboard = () => (
    <Dashboard
      user={currentUser}
      userStats={userStats}
      navigateTo={navigateTo}
    />
  )

  const renderProfile = () => (
    <Profile
      user={currentUser}
      setCurrentUser={setCurrentUser}
    />
  )

  const renderAdminDashboard = () => (
    <AdminDashboard
      user={currentUser}
      navigateTo={navigateTo}
    />
  )

  const renderPage = () => {
    if (currentPage === 'admin-dashboard') return renderAdminDashboard()
    if (currentPage === 'dashboard') return renderDashboard()
    if (currentPage === 'profile') return renderProfile()
    return renderHomePage()
  }

  return (
    <div className="min-h-screen bg-gray-50 font-arabic">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ط</span>
                </div>
                <h1 className="mr-3 text-xl font-bold text-gray-800">طريقتي العلاجي</h1>
              </button>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              {currentUser ? (
                <>
                  {currentUser.userType === 'admin' ? (
                    // Admin navigation
                    <button
                      onClick={() => navigateTo('admin-dashboard')}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === 'admin-dashboard'
                          ? 'bg-red-100 text-red-700'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      ⚙️ لوحة تحكم المدير
                    </button>
                  ) : (
                    // Doctor navigation
                    <>
                      <button
                        onClick={() => navigateTo('dashboard')}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === 'dashboard'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        📊 لوحة التحكم
                      </button>
                      <button
                        onClick={() => navigateTo('profile')}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === 'profile'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        👤 الملف الشخصي
                      </button>
                    </>
                  )}
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className={`text-sm ${currentUser.userType === 'admin' ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                      مرحباً، {currentUser.name}
                    </span>
                    <button
                      onClick={logout}
                      className="text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
                    >
                      خروج
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={toggleLanguage}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    🌐 {currentLanguage === 'ar' ? 'العربية' : 'English'}
                  </button>
                  <button
                    onClick={showLoginModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    دخول الأطباء
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {renderPage()}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            طريقتي العلاجي
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            منصة التعاون الطبي المتقدمة
          </p>
          <div className="space-x-4 space-x-reverse flex flex-wrap justify-center gap-4">
            <button
              onClick={showLoginModal}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              انضم كطبيب
            </button>
            <button
              onClick={() => {
                // Auto-fill demo account
                showLoginModal()
                setTimeout(() => {
                  const licenseInput = document.querySelector('input[name="license"]')
                  const passwordInput = document.querySelector('input[name="password"]')
                  if (licenseInput && passwordInput) {
                    licenseInput.value = 'DOC001'
                    passwordInput.value = 'demo123'
                  }
                }, 100)
              }}
              className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              🧪 تجربة سريعة
            </button>
            <button
              onClick={scrollToServices}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              تعرف على المنصة
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">خدمات المنصة للأطباء</h3>
            <p className="text-gray-600 text-lg">أدوات متقدمة لتعزيز التعاون والتطوير المهني في المجال الطبي</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍⚕️</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">استشارات زملاء المهنة</h4>
              <p className="text-gray-600">تبادل الخبرات والاستشارات الطبية مع الزملاء المتخصصين</p>
            </div>

            {/* Service 2 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">التعليم المستمر</h4>
              <p className="text-gray-600">دورات ومحاضرات طبية متقدمة لتطوير المهارات المهنية</p>
            </div>

            {/* Service 3 */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔬</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">البحث والتطوير</h4>
              <p className="text-gray-600">منصة للبحوث الطبية والتطوير العلمي المشترك</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2500+</div>
              <div className="text-blue-100">طبيب مسجل</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15000+</div>
              <div className="text-blue-100">استشارة متبادلة</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">رضا الأطباء</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">منصة متاحة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏥</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">طريقتي العلاجية جاهزة!</h3>
            <p className="text-gray-600 mb-6">
              انضم إلى شبكة الأطباء والعاملين في المجال الصحي لتطوير طرق العلاج وتبادل الخبرات.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <strong className="text-blue-800">👨‍⚕️ للأطباء المختصين</strong>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <strong className="text-green-800">🏥 للعاملين الصحيين</strong>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <strong className="text-purple-800">📚 التعليم المستمر</strong>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <strong className="text-orange-800">🔬 البحث العلمي</strong>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>🏥 منصة طبية متخصصة</p>
              <p>👨‍⚕️ للمهنيين الصحيين</p>
              <p>🌐 متاحة على مدار الساعة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">ط</span>
            </div>
            <span className="mr-2 text-xl font-bold">طريقتي العلاجي</span>
          </div>
          <p className="text-gray-400 mb-4">شبكة مهنية للأطباء والعاملين في المجال الصحي</p>
          <p className="text-gray-500 text-sm">© 2024 طريقتي العلاجي - جميع الحقوق محفوظة</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">ط</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">دخول الأطباء</h3>
              <p className="text-gray-600 mt-2">انضم إلى طريقتي العلاجي</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الترخيص الطبي</label>
                <input
                  type="text"
                  name="license"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="رقم الترخيص"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" name="remember" className="rounded border-gray-300 text-blue-600" />
                  <span className="mr-2 text-sm text-gray-600">تذكرني</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                دخول المنصة
              </button>
            </form>

            {/* Demo Accounts Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">🧪 حسابات تجريبية للاختبار:</h4>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {/* Admin Account */}
                <div className="flex justify-between items-center bg-red-50 p-2 rounded border border-red-200">
                  <span className="font-medium text-red-700">⚙️ {demoAccounts[0].name}</span>
                  <div className="text-red-600">
                    <span className="mr-2">🆔 {demoAccounts[0].license}</span>
                    <span>🔑 {demoAccounts[0].password}</span>
                  </div>
                </div>
                {/* Doctor Accounts */}
                {demoAccounts.slice(1, 4).map((account, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-2 rounded border">
                    <span className="font-medium text-gray-700">{account.name}</span>
                    <div className="text-gray-500">
                      <span className="mr-2">🆔 {account.license}</span>
                      <span>🔑 {account.password}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">انسخ رقم الترخيص وكلمة المرور للتجربة</p>
              <p className="text-xs text-red-600 mt-1">⚠️ الحساب الأحمر للمدير فقط</p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                طبيب جديد؟
                <button
                  type="button"
                  onClick={showRegisterModalFunc}
                  className="text-blue-600 hover:text-blue-500 font-medium underline"
                >
                  طلب انضمام
                </button>
              </p>
            </div>

            <button
              onClick={hideLoginModal}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">+</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">طلب انضمام جديد</h3>
              <p className="text-gray-600 mt-2">انضم إلى شبكة الأطباء المهنية</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="د. أحمد محمد"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="doctor@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الترخيص الطبي</label>
                <input
                  type="text"
                  name="license"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="رقم الترخيص"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">التخصص</label>
                <select
                  name="specialty"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">اختر التخصص</option>
                  <option value="general">طب عام</option>
                  <option value="cardiology">طب القلب</option>
                  <option value="neurology">طب الأعصاب</option>
                  <option value="pediatrics">طب الأطفال</option>
                  <option value="orthopedics">جراحة العظام</option>
                  <option value="ophthalmology">طب العيون</option>
                  <option value="dentistry">طب الأسنان</option>
                  <option value="dermatology">طب الجلدية</option>
                  <option value="psychiatry">الطب النفسي</option>
                  <option value="other">تخصص آخر</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+966 50 123 4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المستشفى/العيادة</label>
                <input
                  type="text"
                  name="workplace"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مستشفى الملك فيصل التخصصي"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  className="mt-1 rounded border-gray-300 text-green-600"
                />
                <span className="mr-2 text-sm text-gray-600">
                  أوافق على <a href="#" className="text-green-600 hover:text-green-500">شروط الاستخدام</a> و
                  <a href="#" className="text-green-600 hover:text-green-500">سياسة الخصوصية</a>
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                إرسال طلب الانضمام
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                لديك حساب بالفعل؟
                <button
                  type="button"
                  onClick={() => {
                    hideRegisterModal()
                    showLoginModal()
                  }}
                  className="text-blue-600 hover:text-blue-500 font-medium underline"
                >
                  تسجيل الدخول
                </button>
              </p>
            </div>

            <button
              onClick={hideRegisterModal}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SimpleApp
