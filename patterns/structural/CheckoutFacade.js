import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // Check inventory
        if (this.inventoryService.checkStock(orderDetails.productIds)) {
            console.log('✓ Inventory check passed.');
            
            // Process payment
            if (this.paymentService.processPayment(orderDetails.userId, orderDetails.amount || 100)) {
                console.log('✓ Payment processed successfully.');
                
                // Arrange shipping
                if (this.shippingService.arrangeShipping(orderDetails.userId, orderDetails.shippingInfo)) {
                    console.log('✓ Shipping arranged successfully.');
                    console.log('Order placed successfully!');
                    return true;
                } else {
                    console.log('✗ Shipping arrangement failed.');
                    return false;
                }
            } else {
                console.log('✗ Payment failed.');
                return false;
            }
        } else {
            console.log('✗ Inventory check failed.');
            return false;
        }
    }
}

export { CheckoutFacade };
