import { Route } from '@angular/router';
// import { AuthGuard } from 'app/core/auth/guards/auth.guard';
// import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'documentLogin/page404'},
    {path: 'documentLogin', pathMatch : 'full', redirectTo: 'documentLogin/page404'},
    {path: 'documentLogin/:uni', pathMatch : 'full', redirectTo: 'documentLogin/page404'},
    {path: 'documentLogin/:soli', pathMatch : 'full', redirectTo: 'documentLogin/page404'},
    {path: 'documentLogin/:soli:uni:tipo', pathMatch : 'full', redirectTo: 'documentLogin/page404'},
    {path: 'documentLogin:soli:uni:tipo', pathMatch : 'full', redirectTo: 'documentLogin/page404'},
    {path: 'documentLogin:soli/:uni/:tipo', pathMatch : 'full', redirectTo: 'documentLogin/page404'},
    {path: 'documentLogin/', pathMatch : 'full', redirectTo: 'documentLogin/page404'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'documentLogin'},



    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'documentLogin', loadChildren: () => import('app/modules/auth/document-login/document-login.module').then(m => m.DocumentLoginModule)},
        ]
    }
];
