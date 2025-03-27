import { OrderDetails } from '../types/OrderTypes';

export class EmailTemplateService {
  /**
   * Generates an HTML email template for order confirmation
   */
  public static generateOrderConfirmationTemplate(orderDetails: OrderDetails): string {
    const {
      customer,
      order,
      orderDetail,
      designSuit,
      suitType,
      trouser,
      fabric,
      lining,
      button,
      shirtMeasurement,
      trouserMeasurement,
      shippingInfo
    } = orderDetails;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          background-color: #1a2a3a;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .section {
          margin: 20px 0;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 5px;
        }
        .section-title {
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
          margin-bottom: 15px;
          font-weight: bold;
        }
        .item {
          display: flex;
          margin-bottom: 10px;
        }
        .item-image {
          width: 100px;
          margin-right: 15px;
        }
        .item-details {
          flex: 1;
        }
        .measurements {
          display: flex;
          flex-wrap: wrap;
        }
        .measurement-item {
          width: 50%;
          padding: 5px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 0.9em;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Order Confirmation</h1>
        <p>Thank you for your purchase!</p>
      </div>
      
      <div class="section">
        <div class="section-title">Customer Information</div>
        <p><strong>Name:</strong> ${customer.FirstName} ${customer.LastName}</p>
        <p><strong>Email:</strong> ${customer.Email}</p>
        ${customer.CompanyName ? `<p><strong>Company:</strong> ${customer.CompanyName}</p>` : ''}
      </div>
      
      <div class="section">
        <div class="section-title">Order Details</div>
        <p><strong>Order Number:</strong> ${order.SalesOrderNumber}</p>
        <p><strong>Date:</strong> ${new Date(order.CreatedAt).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> ${order.TotalAmount} ${order.CurrencyCode}</p>
        <p><strong>Shipping Method:</strong> ${order.ShippingMethod}</p>
      </div>
      
      <div class="section">
        <div class="section-title">Suit Details</div>
        <div class="item">
          ${designSuit.S3Url ? `<img class="item-image" src="${designSuit.S3Url}" alt="${designSuit.Name}">` : ''}
          <div class="item-details">
            <p><strong>Design:</strong> ${designSuit.Name}</p>
            <p><strong>Suit Type:</strong> ${suitType === '2piece' ? 'Two Piece Suit' : 'Three Piece Suit'}</p>
            <p><strong>Fitting:</strong> ${orderDetail.TailoredFit === 'SlimFit' ? 'Slim Fit' : 'Comfort Fit'}</p>
          </div>
        </div>
      </div>
      
      ${trouser ? `
      <div class="section">
        <div class="section-title">Trouser Details</div>
        <div class="item">
          ${trouser.S3Url ? `<img class="item-image" src="${trouser.S3Url}" alt="${trouser.Name}">` : ''}
          <div class="item-details">
            <p><strong>Trouser Style:</strong> ${trouser.Name}</p>
          </div>
        </div>
      </div>
      ` : ''}
      
      <div class="section">
        <div class="section-title">Materials</div>
        
        <h4>Fabric</h4>
        <div class="item">
          ${fabric.S3Url ? `<img class="item-image" src="${fabric.S3Url}" alt="${fabric.Code}">` : ''}
          <div class="item-details">
            <p><strong>Code:</strong> ${fabric.Code}</p>
            <p><strong>Type:</strong> ${fabric.Name}</p>
          </div>
        </div>
        
        ${lining ? `
        <h4>Lining</h4>
        <div class="item">
          ${lining.S3Url ? `<img class="item-image" src="${lining.S3Url}" alt="${lining.Code}">` : ''}
          <div class="item-details">
            <p><strong>Code:</strong> ${lining.Code}</p>
          </div>
        </div>
        ` : ''}
        
        ${button ? `
        <h4>Buttons</h4>
        <div class="item">
          ${button.S3Url ? `<img class="item-image" src="${button.S3Url}" alt="Button">` : ''}
          <div class="item-details">
            <p><strong>Code:</strong> ${button.Code}</p>
          </div>
        </div>
        ` : ''}
      </div>
      
      <div class="section">
        <div class="section-title">Measurements</div>
        
        <h4>Shirt/Jacket Measurements (${order.MeasurementUnit === 'Cm' ? 'cm' : 'inches'})</h4>
        <div class="measurements">
          ${this.generateMeasurementHTML(shirtMeasurement)}
        </div>
        
        <h4>Trouser Measurements (${order.MeasurementUnit === 'Cm' ? 'cm' : 'inches'})</h4>
        <div class="measurements">
          ${this.generateMeasurementHTML(trouserMeasurement)}
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Shipping Information</div>
        <p><strong>Country:</strong> ${order.Country}</p>
        <p><strong>State/Province:</strong> ${order.State}</p>
        <p><strong>City:</strong> ${order.City}</p>
        <p><strong>Zip/Postal Code:</strong> ${order.ZipCode}</p>
        <p><strong>Phone:</strong> ${order.Phone}</p>
        ${order.Note ? `<p><strong>Special Instructions:</strong> ${order.Note}</p>` : ''}
      </div>
      
      <div class="footer">
        <p>Thank you for choosing VyxSuit. If you have any questions about your order, please contact our customer service.</p>
        <p>&copy; ${new Date().getFullYear()} VyxSuit. All rights reserved.</p>
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Helper function to generate HTML for measurement values
   */
  private static generateMeasurementHTML(measurements: Record<string, any>): string {
    if (!measurements) return '<p>No measurements provided</p>';
    
    return Object.entries(measurements)
      .filter(([key, value]) => key !== 'Id' && key !== 'MeasurementId' && value !== null)
      .map(([key, value]) => {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
        return `<div class="measurement-item"><strong>${formattedKey}:</strong> ${value}</div>`;
      })
      .join('');
  }
}