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


### API Endpoint
```
POST /api/order/create
```

### Frontend to Backend (Request)
```json
{
  "customer": {
    "firstName": "Hoa",
    "lastName": "Le",
    "email": "hoa@example.com",
    "companyName": "VyxSuit"
  },
  "orderDetails": {
    "suitType": "2piece",
    "trouserId": 456,
    "tailoredFit": "SlimFit",
    "jacketId": 789,
    "fabricId": 234,
    "liningId": 345,
    "buttonId": 456
  },
  "measurements": {
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
  },
  "shipping": {
    "country": "Vietnam",
    "city": "Ho Chi Minh",
    "state": "District 1",
    "zipCode": "70000",
    "phone": "+84123456789",
    "shippingMethod": "Standard|Express",
    "differentAddress": false
  },
  "payment": {
    "currencyCode": "USD"
  },
  "lang": "en"
}
```

### Backend to Frontend (Response)
```json
{
  "success": true,
  "orderId": 123,
  "salesOrderNumber": "VYX-2025-00123",
  "orderSummary": {
    "subtotal": 349.95,
    "shipping": 15.00,
    "total": 364.95
  },
  "paymentIntent": {
    "clientSecret": "pi_3NkCE7BYrDGnPCLx1gMNviGs_secret_f6tT7H0Ojx9IAsA8TQvPCgcZh",
    "amount": 36495 // in cents
  }
}
```

### Validation
- All product IDs must exist in the database
- All measurements should be positive numbers
- Customer email must be valid
- Required shipping information must be provided
- Required measurements must be provided based on order type

This approach allows you to:
1. Create a customer record
2. Create the complete order with all selections
3. Create the measurements
4. Set up payment intent
5. Return everything needed for checkout

You would still need separate endpoints for:
- Getting product listings for each step
- Confirming payment
- Retrieving order status
