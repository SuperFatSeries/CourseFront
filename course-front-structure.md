## course-front-sturcture

```
- config                        # umi 配置，包含路由，构建等配置
- docker                        # Ant Design运行环境
- public 
    - favicon.png               # Favicon
- src
    - assets                    # 本地静态资源
    - components                # 业务通用组件
    - e2e                       # 集成测试用例
    - layouts                   # 通用布局
    - models                    # 全局 dva model
        - course.js
        - homework.js
        - notification.js
    - pages                     # 业务页面入口和常用模板
        - Course           
            - CourseList.js     # 课程列表         course/
            - CourseDetail.js   # 课程             course/{courseId}/
            - Homework          # 作业             course/{courseId}/homework     
            - Info              # 课程详细信息      course/{courseId}/info          
            - Ware              # 课件             course/{courseId}/ware          
        - Result                # 通用结果页面
            - Success
            - Failed
        - Exception        #通用异常页面
            - 403
            - 404
            - 500
    - services             # 后台接口服务
    - utils                # 工具库
    - locales              # 国际化资源
    - global.less          # 全局样式
    - global.js            # 全局 JS
- tests                    # 测试工具
- README.md
- package.json

```