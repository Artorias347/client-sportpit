import { makeAutoObservable } from "mobx";
import axios from 'axios';

export default class DeviceStore {
    constructor() {
        this._types = [];
        this._brands = [];
        this._devices = [];
        this._selectedType = {};
        this._selectedBrand = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 9;

        this._priceRange = { min: 0, max: 10000 };
        this._showInStock = false;
        this._showDiscounted = false;
        this._cart = [];

        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }
    setBrands(brands) {
        this._brands = brands;
    }
    setDevices(devices) {
        this._devices = devices.map(device => ({ ...device, stock: device.stock || 0 }));
    }

    setSelectedType(type) {
        if (this._selectedType.id === type.id) {
            this._selectedType = {};
        } else {
            this._selectedType = type;
        }
        this.setPage(1);
    }
    setSelectedBrand(brand) {
        if (this._selectedBrand.id === brand.id) {
            this._selectedBrand = {};
        } else {
            this._selectedBrand = brand;
        }
        this.setPage(1);
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(count) {
        this._totalCount = count;
    }
    setPriceRange(range) {
        this._priceRange = range;
    }
    setShowInStock(value) {
        this._showInStock = value;
    }
    setShowDiscounted(value) {
        this._showDiscounted = value;
    }
    addToCart(product) {
        this._cart.push(product);
    }
    removeFromCart(product) {
        this._cart = this._cart.filter(item => item.id !== product.id);
    }

    updateStock(productId, stock) {
        this._devices = this._devices.map(device =>
            device.id === productId ? { ...device, stock } : device
        );
    }
     updateProduct(productId, updatedProductData) {
        const index = this.devices.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.devices[index] = { ...this.devices[index], ...updatedProductData };
        }
    }

    async fetchDevices() {
        try {
            const response = await axios.get('your-api-endpoint/devices');
            this.setDevices(response.data);
        } catch (error) {
            console.error('Failed to fetch devices', error);
        }
    }

    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get devices() {
        return this._devices;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedBrand() {
        return this._selectedBrand;
    }
    get totalCount() {
        return this._totalCount;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }
    get priceRange() {
        return this._priceRange;
    }
    get showInStock() {
        return this._showInStock;
    }
    get showDiscounted() {
        return this._showDiscounted;
    }
    get cart() {
        return this._cart;
    }
}
