
s11-25-equipo-52-webapp
├─ .hintrc
├─ app
│  ├─ (auth)
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ (dashboard)
│  │  ├─ categories
│  │  │  ├─ create
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ [id]
│  │  │     └─ page.tsx
│  │  ├─ gestionTestimonio
│  │  │  ├─ page.tsx
│  │  │  └─ testimonial_render-admin.tsx
│  │  ├─ home
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ testimonios
│  │  └─ users
│  │     └─ page.tsx
│  ├─ about
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ categories
│  │  │  ├─ organization
│  │  │  │  └─ [organizacionId]
│  │  │  │     └─ route.ts
│  │  │  ├─ route.ts
│  │  │  ├─ user
│  │  │  │  └─ [creadoPorId]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ organizations
│  │  │  ├─ route.ts
│  │  │  ├─ user
│  │  │  │  └─ [userId]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ persons
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ questions
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ users
│  │  │  └─ route.ts
│  │  └─ [...nextauth]
│  │     └─ route.ts
│  ├─ blog
│  │  └─ page.tsx
│  ├─ contact
│  │  └─ page.tsx
│  ├─ dashboard-category
│  │  └─ page.tsx
│  ├─ documentation
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ generated
│  ├─ globals.css
│  ├─ guides
│  │  ├─ data.ts
│  │  ├─ page.tsx
│  │  └─ [slug]
│  │     └─ page.tsx
│  ├─ landing
│  │  ├─ components
│  │  │  ├─ ApiSection.tsx
│  │  │  ├─ Cta.tsx
│  │  │  ├─ data.ts
│  │  │  ├─ Features.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Hero.tsx
│  │  │  ├─ Prices.tsx
│  │  │  ├─ Problem.tsx
│  │  │  ├─ Stats.tsx
│  │  │  ├─ UseCases.tsx
│  │  │  ├─ VoicesHub.tsx
│  │  │  └─ VoicesHubPreview.tsx
│  │  └─ page.tsx
│  ├─ layout.tsx
│  ├─ orgs
│  │  ├─ components
│  │  │  └─ OrgVoicesHub.tsx
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ pricing
│  │  └─ page.tsx
│  ├─ privacy
│  │  └─ page.tsx
│  ├─ style-guide
│  │  └─ page.tsx
│  ├─ support
│  │  └─ page.tsx
│  ├─ terms
│  │  └─ page.tsx
│  ├─ testimonios
│  │  ├─ components
│  │  │  ├─ RatingStars.tsx
│  │  │  ├─ TestimonioForm.tsx
│  │  │  └─ TestimonioPublicForm.tsx
│  │  ├─ data
│  │  │  └─ categories.ts
│  │  ├─ editar
│  │  │  └─ [formId]
│  │  │     └─ page.tsx
│  │  ├─ enviar
│  │  │  └─ [categoriaId]
│  │  │     └─ page.tsx
│  │  ├─ gestionar
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  └─ voices-hub
│     ├─ page.tsx
│     └─ testimonial_render-visitor.tsx
├─ components
│  ├─ auth
│  │  ├─ GoogleBtn.tsx
│  │  ├─ LoginForm.tsx
│  │  ├─ SignoutBtn.tsx
│  │  └─ SignupForm.tsx
│  ├─ category
│  │  ├─ CategoriesCards.tsx
│  │  ├─ CategoryCard.tsx
│  │  ├─ CategoryDetails.tsx
│  │  ├─ CreateCategoryForm.tsx
│  │  ├─ CreateQuestionsForm.tsx
│  │  └─ NewCategoryPreview.tsx
│  ├─ dashboard
│  │  ├─ DashboardLayout.tsx
│  │  └─ EmptyUsers.tsx
│  ├─ ui
│  │  ├─ alert.tsx
│  │  ├─ badge.tsx
│  │  ├─ button.tsx
│  │  ├─ card.tsx
│  │  ├─ design-system
│  │  │  └─ index.ts
│  │  ├─ dialog.tsx
│  │  ├─ FormField.tsx
│  │  ├─ input.tsx
│  │  ├─ menuItems.tsx
│  │  ├─ navbar.tsx
│  │  ├─ sheet.tsx
│  │  ├─ sidebar.tsx
│  │  ├─ SidebarItem.tsx
│  │  ├─ testimonial
│  │  │  ├─ Admin.tsx
│  │  │  ├─ ratingStars.tsx
│  │  │  └─ Visitor.tsx
│  │  ├─ textarea.tsx
│  │  ├─ theme.ts
│  │  └─ typography.tsx
│  └─ users
│     ├─ mockUsers.ts
│     └─ UsersTable.tsx
├─ components.json
├─ contexts
│  └─ global
│     ├─ globalActions.ts
│     ├─ globalContext.tsx
│     └─ globalReducer.ts
├─ eslint.config.mjs
├─ hooks
│  └─ swr
│     ├─ useCategories.ts
│     └─ useCategory.ts
├─ lib
│  ├─ auth.ts
│  ├─ db.ts
│  ├─ fetcher.ts
│  └─ utils.ts
├─ models
│  ├─ category
│  │  ├─ categoryService.ts
│  │  └─ dto
│  │     └─ category.ts
│  ├─ categoryFull
│  │  ├─ createCategoryFullService.ts
│  │  └─ dto
│  │     └─ categoryFull.ts
│  ├─ organization
│  │  ├─ dto
│  │  │  └─ organization.ts
│  │  └─ organizationService.ts
│  ├─ person
│  │  ├─ dto
│  │  │  └─ person.ts
│  │  └─ personService.ts
│  ├─ question
│  │  ├─ dto
│  │  │  └─ question.ts
│  │  └─ questionService.ts
│  └─ zod
│     └─ auth.ts
├─ next.config.ts
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20251111214910_init
│  │  │  └─ migration.sql
│  │  ├─ 20251113163612_eduvoice1
│  │  │  └─ migration.sql
│  │  ├─ 20251117220212_category_to_space
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ EduVoiceCMS_logo-1.png
│  ├─ EduVoiceCMS_logo-2.png
│  ├─ EduVoiceCMS_logo-SN.png
│  ├─ EduVoiceCMS_logo.png
│  ├─ EduVoiceCMS_logo.svg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tailwind.config.js
├─ tsconfig.json
└─ types
   ├─ category.ts
   ├─ next-auth.d.ts
   ├─ sidebar.ts
   └─ user.ts

```