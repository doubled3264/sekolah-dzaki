import { lazyLoad } from '../../../utils/object-helper'

const routes = [
   {
      path: '/artikel',
      name: 'article',
      component: lazyLoad('Article/BaseArticle'),
      children: [
         {
            path: '',
            name: 'article list',
            component: lazyLoad('Article/ArticleList'),
            props: { parentItem: 'artikel' },
         },
         {
            path: 'tambah-data',
            component: lazyLoad('Article/Add/ArticleAdd'),
            props: { parentItem: 'artikel' },
         },
         {
            path: ':id',
            name: 'article detail',
            component: lazyLoad('Article/ArticleDetail'),
            props: { parentItem: 'artikel' },
         },
         {
            path: 'edit/:id',
            name: 'article change',
            component: lazyLoad('Article/Edit/ArticleEdit'),
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
