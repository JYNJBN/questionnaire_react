// {
//   path: '/',
//   element: <MainLayout />,
//   children: [
//     { path: '/', element: <Home /> },
//     {
//       path: 'login',
//       element: <Login />,
//     },
//     {
//       path: 'register',
//       element: <Register />,
//     },
//     { path: 'home', element: <Home /> },
//     {
//       path: 'manage',
//       element: <ManageLayout />,
//       children: [
//         { path: 'list', element: <List /> },
//         { path: 'trash', element: <Trash /> },
//         { path: 'start', element: <Start /> },
//       ],
//     },
//   ],
// },
// {
//   path: '/question',
//   element: <QuestionLayout />,
//   children: [
//     { path: 'edit/:id', element: <Edit /> },
//     { path: 'stat/:id', element: <Stat /> },
//   ],
// },
// { path: '*', element: <NotFound /> },
// ])
const LOGIN_URL = '/login'
const HOME_URL = '/home'
const MANAGE_LIST_URL = '/manage/list'
const MANAGE_TRASH_URL = '/manage/trash'
const MANAGE_START_URL = '/manage/start'
const QUESTION_EDIT_URL = '/question/edit/'
const QUESTION_STAT_URL = '/question/stat/'
export { LOGIN_URL, HOME_URL, MANAGE_LIST_URL, QUESTION_EDIT_URL, QUESTION_STAT_URL }
