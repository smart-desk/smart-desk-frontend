import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdCampaignType } from '../../../../../../modules/ad/models/ad-campaign.entity';
import { AdService } from '../../../../../../modules/ad/ad.service';
import { AdCampaignCurrentDto } from '../../../../../../modules/ad/models/ad-campaign-current.dto';
import { GetProductsDto, GetProductsResponseDto } from '../../../../../../modules/product/models/product.dto';
import { ProductService } from '../../../../../../modules/product/product.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
    mainAdCampaign: AdCampaignCurrentDto;
    recentProducts: GetProductsResponseDto;

    constructor(private adService: AdService, private cd: ChangeDetectorRef, private productService: ProductService) {}

    ngOnInit() {
        this.adService.getAdCampaignsCurrent(AdCampaignType.MAIN).subscribe(campaign => {
            this.mainAdCampaign = campaign;
            this.cd.detectChanges();
        });

        const options = new GetProductsDto();
        options.limit = 8;
        this.productService.getProducts(options).subscribe(res => {
            this.recentProducts = res;
            this.cd.detectChanges();
        });
    }
}
