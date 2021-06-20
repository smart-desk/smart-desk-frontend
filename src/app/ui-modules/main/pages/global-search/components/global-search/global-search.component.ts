import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { GetAdvertsResponseDto } from '../../../../../../modules/advert/models/advert.dto';
import { AdvertDataService } from '../../../../../../modules';
import { BookmarksStoreService } from '../../../../../../modules/bookmarks/bookmarks-store.service';

@Component({
    selector: 'app-global-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalSearchComponent implements OnInit, OnDestroy {
    advertsResponse: GetAdvertsResponseDto;
    private destroy$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private advertDataService: AdvertDataService,
        private bookmarksStoreService: BookmarksStoreService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.router.events
            .pipe(
                filter((event: RouterEvent) => event instanceof NavigationEnd),
                pairwise(),
                filter((events: RouterEvent[]) => events[0].url !== events[1].url),
                startWith('Initial call'),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                const options = this.advertDataService.parseQueryParams(this.route.snapshot.queryParamMap);
                this.advertDataService.loadAdverts(null, options);
                this.cd.detectChanges();
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
