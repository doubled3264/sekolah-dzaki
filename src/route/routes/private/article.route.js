import BaseArticle from '@pages/Article/BaseArticle.vue'
import ArticleList from '@pages/Article/ArticleList.vue'
import ArticleAdd from '@pages/Article/Add/ArticleAdd.vue'
import ArticleDetail from '@pages/Article/ArticleDetail.vue'
import ArticleEdit from '@pages/Article/Edit/ArticleEdit.vue'

const routes = [
   {
      path: '/artikel',
      name: 'article',
      component: BaseArticle,
      children: [
         {
            path: '',
            name: 'article list',
            component: ArticleList,
            props: { parentItem: 'artikel' },
         },
         {
            path: 'tambah-data',
            component: ArticleAdd,
            props: { parentItem: 'artikel' },
         },
         {
            path: ':id',
            name: 'article detail',
            component: ArticleDetail,
            props: { parentItem: 'artikel' },
         },
         {
            path: 'edit/:id',
            name: 'article change',
            component: ArticleEdit,
            props: { parentItem: 'artikel' },
         },
      ],
   },
]

export default routes.map((route) => {
   return {
      ...route,
      meta: { public: false, role: ['super', 'admin', 'content writer'] },
      children: route.children.map((childrens) => {
         return {
            ...childrens,
            meta: { public: false, role: ['super', 'admin', 'content writer'] },
         }
      }),
   }
})
