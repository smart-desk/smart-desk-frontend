import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateAddressDto } from '../../models/dto/address/create-address.dto';
import { Address } from '../../models/dto/address/address.entity';

@Injectable()
export class AddressService {
    constructor(private http: HttpClient) {}

    saveAddress(address: CreateAddressDto): Observable<Address> {
        return this.http.put<Address>('/address', address);
    }

    getProfileAddress(): Observable<Address> {
        return this.http.get<Address>('/address');
    }
}
