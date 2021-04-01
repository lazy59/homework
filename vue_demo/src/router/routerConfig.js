export default [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Home/Home.vue"),
    meta: {
      title: "DASHBOARD",
      icon: "icon-dashboard",
    },
  },
  {
    path: "/agent",
    name: "Agent",
    component: () =>
      import(/* webpackChunkName: "agent" */ "../views/Agent.vue"),
    meta: {
      title: "AGENT",
      icon: "icon-sitemap",
    },
  },
  {
    path: "/my",
    name: "My",
    component: () => import(/* webpackChunkName: "my" */ "../views/My.vue"),
    meta: {
      title: "MY CRUISE",
      icon: "icon-boat",
    },
  },
  {
    path: "/help",
    name: "Help",
    component: () => import(/* webpackChunkName: "help" */ "../views/Help.vue"),
    meta: {
      title: "HELP",
      icon: "icon-life-bouy",
    },
  },
];
