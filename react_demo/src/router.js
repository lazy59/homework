import Agent from "./pages/Agent";
import Help from "./pages/Help";
import Home from "./pages/Home";
import My from "./pages/My";

const router = [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "DASHBOARD",
        icon: "icon-dashboard",
      },
    },
    {
      path: "/agent",
      name: "Agent",
      component: Agent,
      meta: {
        title: "AGENT",
        icon: "icon-sitemap",
        
      },
    },
    {
      path: "/my",
      name: "My",
      component: My,
      meta: {
        title: "MY CRUISE",
        icon: "icon-boat",
      },
    },
    {
      path: "/help",
      name: "Help",
      component: Help,
      meta: {
        title: "HELP",
        icon: "icon-life-bouy",
      },
    },
  ];
export default router
  