import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/log-in",
    pathMatch: "full",
  },
  // {
  //   path: "folder/:id",
  //   loadChildren: () =>
  //     import("./folder/folder.module").then((m) => m.FolderPageModule),
  // },
  {
    path: "home",
    loadChildren: () =>
      import("./Pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "log-in",
    loadChildren: () =>
      import("./Pages/UserAuth/log-in/log-in.module").then(
        (m) => m.LogInPageModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./Pages/UserAuth/register/register.module").then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: "user-profile",
    loadChildren: () =>
      import("./Pages/user-profile/user-profile.module").then(
        (m) => m.UserProfilePageModule
      ),
  },
  {
    path: "quote",
    loadChildren: () =>
      import("./Pages/quote/quote.module").then((m) => m.QuotePageModule),
  },
  {
    path: 'popover',
    loadChildren: () => import('./Components/popover/popover.module').then( m => m.PopoverPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
