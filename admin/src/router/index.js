import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录页
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  // 404页
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  // 主页
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "主页", icon: "dashboard" },
      },
    ],
  },

  // 系统用户信息页
  {
    path: "/system/user/profile",
    component: Layout,
    redirect: "/user/profile",
    children: [
      {
        path: "/user/profile",
        name: "UserProfile",
        component: () => import("@/views/system/user/profile/index"),
      },
    ],
  },

  // 学科管理页
  {
    path: "/subject",
    component: Layout,
    redirect: "/subject/list",
    children: [
      {
        path: "/subject/list",
        name: "Subject",
        component: () => import("@/views/subject/index"),
        meta: { title: "学科管理", icon: "el-icon-menu" },
      },
    ],
  },

  // 日志管理页
  {
    path: "/log",
    component: Layout,
    redirect: "/log/list",
    children: [
      {
        path: "/log/list",
        name: "Log",
        component: () => import("@/views/log/index"),
        meta: { title: "日志管理", icon: "el-icon-s-help" },
      },
    ],
  },

  // 用户管理页
  {
    path: "/user",
    component: Layout,
    redirect: "/user/admin",
    name: "User",
    meta: { title: "用户管理", icon: "el-icon-user-solid" },
    children: [
      {
        path: "/user/admin",
        name: "Admin",
        component: () => import("@/views/user/admin/index"),
        meta: { title: "管理员列表", icon: "table" },
      },
      {
        path: "/user/student",
        name: "Student",
        component: () => import("@/views/user/student/index"),
        meta: { title: "学生列表", icon: "tree" },
      },
    ],
  },

  // 试卷管理页
  {
    path: "/exampaper",
    component: Layout,
    redirect: "/exampaper/list",
    name: "Exampaper",
    meta: { title: "试卷管理", icon: "el-icon-s-management" },
    children: [
      {
        path: "/exampaper/list",
        name: "List",
        component: () => import("@/views/exampaper/index"),
        meta: { title: "试卷列表", icon: "table" },
      },
      {
        path: "/exampaper/edit",
        name: "ExampaperEdit",
        component: () => import("@/views/exampaper/edit/index"),
        meta: { title: "试卷创编", icon: "tree" },
      },
    ],
  },

  // 题库管理页
  {
    path: "/question",
    component: Layout,
    redirect: "/question/list",
    name: "User",
    meta: { title: "题库管理", icon: "el-icon-s-order" },
    children: [
      {
        path: "/question/list",
        name: "List",
        component: () => import("@/views/question/index"),
        meta: { title: "题目列表", icon: "table" },
      },
      {
        path: "/question/edit/single-choice",
        name: "SingleChoice",
        component: () => import("@/views/question/edit/single-choice"),
        meta: { title: "单选题创编", icon: "tree" },
      },
      {
        path: "/question/edit/multiple-choice",
        name: "MultipleChoice",
        component: () => import("@/views/question/edit/multiple-choice"),
        meta: { title: "多选题创编", icon: "tree" },
      },
      {
        path: "/question/edit/true-false",
        name: "TrueFalse",
        component: () => import("@/views/question/edit/true-false"),
        meta: { title: "判断题创编", icon: "tree" },
      },
      {
        path: "/question/edit/gap-filling",
        name: "GapFilling",
        component: () => import("@/views/question/edit/gap-filling"),
        meta: { title: "填空题创编", icon: "tree" },
      },
      {
        path: "/question/edit/short-answer",
        name: "ShortAnswer",
        component: () => import("@/views/question/edit/short-answer"),
        meta: { title: "简答题创编", icon: "tree" },
      },
    ],
  },

  // 任务管理页
  {
    path: "/taskexam",
    component: Layout,
    redirect: "/taskexam/list",
    name: "Taskexam",
    meta: { title: "任务管理", icon: "el-icon-s-promotion" },
    children: [
      {
        path: "/taskexam/list",
        name: "List",
        component: () => import("@/views/taskexam/index"),
        meta: { title: "任务列表", icon: "table" },
      },
      {
        path: "/taskexam/edit",
        name: "TaskexamEdit",
        component: () => import("@/views/taskexam/edit/index"),
        meta: { title: "任务创编", icon: "tree" },
      },
    ],
  },

  // 答卷管理页
  {
    path: "/answer",
    component: Layout,
    redirect: "/answer/judge-list",
    name: "Answer",
    meta: { title: "答卷管理", icon: "el-icon-s-ticket" },
    children: [
      {
        path: "/answer/judge-list",
        name: "JudgeList",
        component: () => import("@/views/answer/judgeList"),
        meta: { title: "批改列表", icon: "table" },
      },
      {
        path: "/answer/completed-list",
        name: "CompletedList",
        component: () => import("@/views/answer/completedList"),
        meta: { title: "完成列表", icon: "tree" },
      },
      {
        path: "/answer/read",
        name: "Read",
        component: () => import("@/views/answer/read"),
      },
      {
        path: "/answer/judge",
        name: "Judge",
        component: () => import("@/views/answer/judge"),
      },
    ],
  },

  
  // 消息管理页
  {
    path: "/message",
    component: Layout,
    redirect: "/message/list",
    name: "Answer",
    meta: { title: "消息管理", icon: "el-icon-s-comment" },
    children: [
      {
        path: "/message/list",
        name: "MessageList",
        component: () => import("@/views/message/index"),
        meta: { title: "消息列表", icon: "table" },
      },
      {
        path: "/message/edit",
        name: "MessageEdit",
        component: () => import("@/views/message/edit"),
        meta: { title: "消息发送", icon: "el-icon-message-solid" },
      }
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
