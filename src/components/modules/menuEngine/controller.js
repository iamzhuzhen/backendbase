module.exports.getMenus = function (req,res) {
    const navMenus = [
        {
          entity:{
            id: 1,
            parentMenuId: null,
            name: "nav-home",
            alias:"Home",
            path: "/home",
            icon: "el-icon-location",
            discription: "show home",
            enable: true,
            order: 0
          },
          childs: null
        },
        {
          entity:{
            id: 2,
            parentMenuId: null,
            name: "nav-dashboard",
            alias:"Dashboard",
            path: "/dashboard",
            icon: "el-icon-picture",
            discription: "dashboard",
            enable: true,
            order: 1
          },
          childs: null
        },
        {
          entity:{
            id: 3,
            parentMenuId: null,
            name: "nav-document",
            alias:"Document",
            path: "/document",
            icon: "el-icon-document",
            discription: "Document managerment",
            enable: true,
            order: 2
          },
          childs: null
        },
        {
          entity:{
            id: 4,
            parentMenuId: null,
            name: "nav-admin",
            alias:"Admin",
            path: "/admin",
            icon: "el-icon-setting",
            discription: "admin manaerment",
            enable: true,
            order: 3
            },
          childs: [
            {
              entity:{
                id: 5,
                parentMenuId: 4,
                name: "nav-admin-user",
                alias:"User",
                path: "/user",
                icon: "el-icon-menu",
                discription: "User managerment",
                enable: true,
                order: 0
              },
              childs: null
            },
            {
              entity:{
                id: 6,
                parentMenuId: 4,
                name: "nav-admin-rolematrix",
                alias:"Role Matrix",
                path: "/rolematrix",
                icon: "el-icon-share",
                discription: "Role managerment",
                enable: true,
                order: 1
              },
              childs: null
            }
          ]
        }
      ]
      res.send(navMenus);
}