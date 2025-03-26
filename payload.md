# Suit Builder payload

fort theses features, define clearly what fields includes in payload, what function validation need to be handle. Let me see it adaptable

Develop Step 2 - Select suit type

Develop Step 3 - Choose trousers

Develop Step 4 - Choose fit style

Develop Step 5 - Choose Fabric

Develop Step 6 - Select lining

Develop Step 7 - Select buttons

Develop Step 8 - Enter measurement details

Develop Step 9 - Payment & shipping info

Develop Step 10 - Overview

Step 11 - Integrate Stripe API


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
  "orderId": "number|null"  // null for new orders
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "suitDetails": {
    "suitType": "2piece"
  },
  "nextStep": "/order/select-trouser"
}
```

### Validation
- `suitType` must be either "2piece" or "3piece"

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
  "trouserId": 456
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

## Step 4 - Select TailoredFit

### API Endpoints
```
GET /api/products?productType=TailoredFit
POST /api/order/tailored-fit
```

### Frontend to Backend (Request)
```json
{
  "orderId": 123,
  "tailoredFit": "SlimFit|ComfortFit"
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "tailoredFit": "SlimFit",
  "nextStep": "/order/select-jacket"
}
```

### Validation
- `tailoredFit` must be either "SlimFit" or "ComfortFit"

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
  "ord  erId": 123,
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
GET /api/measurements/{orderId}  // Get existing measurement details
POST /api/measurements           // Create new measurements
PUT /api/order/measurements      // Update existing measurements
```

### GET Request (Retrieve Measurements)
```
GET /api/measurements/{orderId}
```

### GET Response
```
{
  "success": true,
  "measurementId": 789,
  "measurementType": "Shirt|Trouser",
  "unit": "Cm",
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
      "id": 101,
      "name": "front",
      "s3Url": "https://example.com/images/measurement-front-123.jpg"
    },
    {
      "id": 102,
      "name": "back",
      "s3Url": "https://example.com/images/measurement-back-123.jpg"
    },
    {
      "id": 103,
      "name": "left",
      "s3Url": "https://example.com/images/measurement-left-123.jpg"
    },
    {
      "id": 104,
      "name": "right",
      "s3Url": "https://example.com/images/measurement-right-123.jpg"
    }
  ]
}
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
      "name": "front",
      "imageFile": "[Base64 encoded image]"
    },
    {
      "name": "back",
      "imageFile": "[Base64 encoded image]"
    },
    {
      "name": "left",
      "imageFile": "[Base64 encoded image]"
    },
    {
      "name": "right",
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
- `measurementImages` must contain exactly 4 images with names: "front", "back", "left", "right"

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
- Error han-  ing for payment failures
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
