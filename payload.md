# Suit Builder payload

fort theses features, define clearly what fields includes in payload, what function validation need to be handle. Let me see it adaptable

Xây dựng Step2 - select loại suit
Xây dựng Step3 - Chọn quần
Xây dựng Step4 - Chọn áo
Xây dựng Step5 - chọn vải
Xây dựng Step6 - Chọn họa tiết
Xây dựng Step7  select button
Xây dựng Step8 - Thông số đo
Xây dựng step9 - payment - shipping info
Xây dựng step 10 - overview
Step 11 - tích hợp api stripe


GitHub Copilot: # VyxSuit Order Process Payloads

Below is a comprehensive definition of payloads for each step in your suit ordering process, including validation requirements and API endpoints.

## Step 2 - Select Suit Type

### API Endpoints
```
GET /api/products?productType=SuitType
POST /api/order/suit-type
```

### Frontend to Backend (Request)
```json
{
  "suitType": "2piece|3piece",
  "tailoredFit": "SlimFit|ComfortFit",
  "orderId": "number|null"  // null for new orders
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "suitDetails": {
    "suitType": "2piece",
    "tailoredFit": "SlimFit"
  },
  "nextStep": "/order/select-trouser"
}
```

### Validation
- `suitType` must be either "2piece" or "3piece"
- `tailoredFit` must be either "SlimFit" or "ComfortFit"

## Step 3 - Select Trouser

### API Endpoints
```
GET /api/products?productType=TrouserType
POST /api/order/trouser
```

### Frontend to Backend (Request)
```json
{
  "orderId": 123,
  "trouserId": 456,
  "quantity": 1
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "trouser": {
    "id": 456,
    "name": "Classic Trouser",
    "price": 89.99,
    "imageUrl": "https://..."
  },
  "nextStep": "/order/select-jacket"
}
```

### Validation
- `trouserId` must exist in the database
- `quantity` must be at least 1

## Step 4 - Select Jacket

### API Endpoints
```
GET /api/products?productType=Jacket
POST /api/order/jacket
```

### Frontend to Backend (Request)
```json
{
  "orderId": 123,
  "jacketId": 789,
  "quantity": 1
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "jacket": {
    "id": 789,
    "name": "Premium Jacket",
    "price": 159.99,
    "imageUrl": "https://..."
  },
  "nextStep": "/order/select-fabric"
}
```

### Validation
- `jacketId` must exist in the database
- `quantity` must be at least 1

## Step 5 - Select Fabric

### API Endpoints
```
GET /api/products?productType=FabricOptions
POST /api/order/fabric
```

### Frontend to Backend (Request)
```json
{
  "orderId": 123,
  "fabricId": 234
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "fabric": {
    "id": 234,
    "name": "Italian Wool",
    "code": "F123",
    "price": 49.99,
    "imageUrl": "https://..."
  },
  "nextStep": "/order/select-lining"
}
```

### Validation
- `fabricId` must exist in the database as a product with `ProductType` = "FabricOptions"

## Step 6 - Select Lining

### API Endpoints
```
GET /api/products?productType=Lining
POST /api/order/lining
```

### Frontend to Backend (Request)
```json
{
  "orderId": 123,
  "liningId": 345
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "lining": {
    "id": 345,
    "name": "Silk Lining",
    "code": "L123",
    "price": 29.99,
    "imageUrl": "https://..."
  },
  "nextStep": "/order/select-button"
}
```

### Validation
- `liningId` must exist in the database as a product with `ProductType` = "Lining"

## Step 7 - Select Button

### API Endpoints
```
GET /api/products?productType=Button
POST /api/order/button
```

### Frontend to Backend (Request)
```json
{
  "orderId": 123,
  "buttonId": 456
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "button": {
    "id": 456,
    "name": "Mother of Pearl Button",
    "code": "B123",
    "price": 19.99,
    "imageUrl": "https://..."
  },
  "nextStep": "/order/measurements"
}
```

### Validation
- `buttonId` must exist in the database as a product with `ProductType` = "Button"

## Step 8 - Measurements

### API Endpoints
```
POST /api/measurements
PUT /api/order/measurements
```

### Frontend to Backend (Request)
```json
{
  "orderId": 123,
  "measurementType": "Shirt|Trouser",
  "unit": "Cm|Inch",
  "shirtMeasurements": {
    "chest": 102.5,
    "shoulder": 45.0,
    "armLength": 65.0,
    "armShoulderJoint": 42.0,
    "armBicepWidth": 35.0,
    "jacketWidth": 55.0,
    "abdomen": 95.0,
    "bellyTummy": 98.0,
    "hips": 100.0,
    "neck": 40.0
  },
  "trouserMeasurements": {
    "waist": 85.0,
    "upperHips": 95.0,
    "hipsCrotch": 25.0,
    "outswarm": 100.0,
    "thigh": 58.0,
    "calf": 40.0
  },
  "measurementImages": [
    {
      "name": "Front view",
      "imageFile": "[Base64 encoded image]"
    }
  ]
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "measurementId": 789,
  "nextStep": "/order/shipping-payment"
}
```

### Validation
- All measurements should be positive numbers
- `measurementType` must be either "Shirt", "Trouser", or both based on order
- `unit` must be either "Cm" or "Inch"
- Required measurements depend on the order type (shirt/trouser/suit)

## Step 9 - Payment and Shipping Info

### API Endpoints
```
POST /api/order/shipping
```

### Frontend to Backend (Request)
```json
{
  "orderId": 123,
  "shipping": {
    "country": "Vietnam",
    "city": "Ho Chi Minh",
    "state": "District 1",
    "zipCode": "70000",
    "phone": "+84123456789",
    "shippingMethod": "Standard|Express",
    "differentAddress": false
  },
  "customer": {
    "firstName": "Hoa",
    "lastName": "Le",
    "email": "hoa@example.com",
    "companyName": "VyxSuit"
  },
  "currencyCode": "USD",
  "lang": "en"
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "orderSummary": {
    "subtotal": 349.95,
    "shipping": 15.00,
    "total": 364.95
  },
  "nextStep": "/order/overview"
}
```

### Validation
- `country`, `city`, and `phone` are required
- `email` must be a valid email format
- `shippingMethod` must be either "Standard" or "Express"
- `firstName` and `lastName` are required

## Step 10 - Order Overview

### API Endpoints
```
GET /api/order/{orderId}/summary
```

### Backend to Frontend (Response)
```json
{
  "orderId": 123,
  "salesOrderNumber": "VYX-2025-00123",
  "customer": {
    "firstName": "Hoa",
    "lastName": "Le",
    "email": "hoa@example.com"
  },
  "orderDetails": {
    "suitType": "2piece",
    "tailoredFit": "SlimFit",
    "jacket": {
      "name": "Premium Jacket",
      "price": 159.99
    },
    "trouser": {
      "name": "Classic Trouser",
      "price": 89.99
    },
    "fabric": {
      "name": "Italian Wool",
      "code": "F123",
      "price": 49.99
    },
    "lining": {
      "name": "Silk Lining",
      "price": 29.99
    },
    "button": {
      "name": "Mother of Pearl Button",
      "price": 19.99
    }
  },
  "shipping": {
    "country": "Vietnam",
    "city": "Ho Chi Minh",
    "method": "Standard",
    "cost": 15.00
  },
  "pricing": {
    "subtotal": 349.95,
    "shipping": 15.00,
    "total": 364.95,
    "currencyCode": "USD"
  },
  "nextStep": "/order/payment"
}
```

## Step 11 - Stripe Integration

### API Endpoints
```
POST /api/payment/create-intent
POST /api/payment/confirm
```

### Frontend to Backend (Create Payment Intent)
```json
{
  "orderId": 123,
  "currency": "usd"
}
```

### Backend to Frontend (Payment Intent Response)
```json
{
  "clientSecret": "pi_3NkCE7BYrDGnPCLx1gMNviGs_secret_f6tT7H0Ojx9IAsA8TQvPCgcZh",
  "orderId": 123,
  "amount": 36495 // in cents
}
```

### Frontend to Backend (Confirm Payment)
```json
{
  "orderId": 123,
  "paymentIntentId": "pi_3NkCE7BYrDGnPCLx1gMNviGs"
}
```

### Backend to Frontend (Payment Confirmation)
```json
{
  "success": true,
  "orderId": 123,
  "paymentStatus": "success",
  "salesOrderNumber": "VYX-2025-00123",
  "redirectUrl": "/order/confirmation"
}
```

### Validation
- Secure handling of Stripe client secret
- Error handling for payment failures
- Order status updates after payment completion

## General Implementation Notes

1. **State Management:**
   - Maintain order state throughout the multi-step process
   - Implement progress tracking and allow returning to previous steps

2. **Error Handling:**
   - Each API response should include appropriate error messages and codes
   - Frontend should handle API failures gracefully

3. **Localization:**
   - Support multiple languages based on the `lang` parameter
   - Format prices according to locale settings

4. **Security:**
   - Implement CSRF protection for all POST endpoints
   - Validate all user inputs server-side regardless of client validation

5. **Responsive Design:**
   - Ensure mobile-friendly UI for all order steps
   - Optimize image loading for product selections
