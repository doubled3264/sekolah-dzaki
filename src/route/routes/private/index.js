import adminRoute from '@route/routes/private/admin.route'
import iuranRoute from '@route/routes/private/iuran.route'
import siswaRoute from '@route/routes/private/siswa.route'
import articleRoute from '@route/routes/private/article.route'
import bannerRoute from '@route/routes/private/banner.route'

export default [
   ...adminRoute,
   ...iuranRoute,
   ...siswaRoute,
   ...articleRoute,
   ...bannerRoute,
]
