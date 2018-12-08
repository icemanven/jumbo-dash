import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import {CrmConst} from '@configs/constantes';

@Component({
    selector   : 'error-404',
    templateUrl: './error-404.component.html',
    styleUrls  : ['./error-404.component.scss']
})
export class Error404Component
{
    homeDir = CrmConst.homeDir;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
}
