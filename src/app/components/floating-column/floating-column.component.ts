import { Component, OnInit } from '@angular/core';
import { NavigationService, LeftPanelType } from '../../services/navigation.service';
import { AccountWrapper } from '../../models/account.models';

@Component({
    selector: 'app-floating-column',
    templateUrl: './floating-column.component.html',
    styleUrls: ['./floating-column.component.scss']
})
export class FloatingColumnComponent implements OnInit {
    overlayActive: boolean;
    overlayAccountToBrowse: string;
    overlayHashtagToBrowse: string;

    userAccountUsed: AccountWrapper;

    openPanel: string;


    constructor(private readonly navigationService: NavigationService) { }

    ngOnInit() {
        this.navigationService.activatedPanelSubject.subscribe((type: LeftPanelType) => {
            switch (type) {
                case LeftPanelType.Closed:
                    this.openPanel = '';
                    break;
                case LeftPanelType.AddNewAccount:
                    this.openPanel = 'addNewAccount';
                    break;
                case LeftPanelType.CreateNewStatus:
                    this.openPanel = 'createNewStatus';
                    break;
                case LeftPanelType.ManageAccount:
                this.userAccountUsed = this.navigationService.getAccountToManage();
                    this.openPanel = 'manageAccount';
                    break;
                case LeftPanelType.Search:
                    this.openPanel = 'search';
                    break;
                case LeftPanelType.Settings:
                    this.openPanel = 'settings';
                    break;
                default:
                    this.openPanel = '';
            }
        });
    }

    closePanel(): boolean {
        this.navigationService.closePanel();
        return false;
    }

    browseAccount(account: string): void {
        this.overlayAccountToBrowse = account;
        this.overlayHashtagToBrowse = null;
        this.overlayActive = true;        
    }

    browseHashtag(hashtag: string): void {
        this.overlayAccountToBrowse = null;
        this.overlayHashtagToBrowse = hashtag;
        this.overlayActive = true;  
    }

    browseThread(thread: string): void {
        console.warn('browseThread');
        console.warn(thread);
    }

    closeOverlay(): boolean {
        this.overlayActive = false;
        return false;
    }

}
