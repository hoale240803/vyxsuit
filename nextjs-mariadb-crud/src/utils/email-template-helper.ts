import { OrderRequest } from "@/models/request/request.model";
import { calculateTotalWithCurrency, formatDateTime } from "./format";
import { ProductInfo } from "@/models/product.model";

export class EmailTemplateHelper {
    public static generateOrderConfirmationTemplate(
        orderPayload: OrderRequest,
        totalAmount: number,
        products: ProductInfo[]
    ): string {
        const {
            customer,
            measurements,
            orderDetails,
            salesOrderNumber,
            shippingInfo,
            payment,
            lang,
        } = orderPayload;

        const fullName = `${customer.firstName} ${customer.lastName}`;
        const shirtMeasurement = measurements.shirtMeasurements;
        const trouserMeasurement = measurements.trouserMeasurements;
        const unit = orderPayload.measurements.unit;
        const suit = products.find((x) => x.productType === "DesignOfSuit");
        const suitType = products.find((x) => x.productType === "SuitType");
        const trouser = products.find((x) => x.productType === "TrouserOnly");
        const suitStyle = products.find((x) => x.productType === "TailoredFit");
        const fabric = products.find((x) => x.productType === "FabricOptions");
        const lining = products.find((x) => x.productType === "Lining");
        const button = products.find((x) => x.productType === "Button");
        const measurementImages = orderPayload.measurements.measurementImages;
        const createdAt = formatDateTime(orderDetails.createdAt);

        return `<!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8" />
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
                                border: 1px solid #eee;
                            }
                            .section-title {
                                border-bottom: 1px solid #ddd;
                                padding-bottom: 10px;
                                margin-bottom: 15px;
                                font-weight: bold;
                                font-size: 18px;
                                color: #1a2a3a;
                            }
                            .item {
                                display: flex;
                                margin-bottom: 10px;
                            }
                            .item-image {
                                width: 100px;
                                margin-right: 15px;
                                border: 1px solid #ddd;
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
                            th,
                            td {
                                padding: 8px;
                                text-align: left;
                                border-bottom: 1px solid #ddd;
                            }
                            .footer {
                                margin-top: 30px;
                                text-align: center;
                                font-size: 0.9em;
                                color: #777;
                                border-top: 1px solid #eee;
                                padding-top: 20px;
                            }
                            h4 {
                                margin-top: 20px;
                                margin-bottom: 10px;
                                color: #444;
                                border-bottom: 1px dotted #ccc;
                                padding-bottom: 5px;
                            }
                            .info-group {
                                margin-bottom: 15px;
                                padding-bottom: 15px;
                                border-bottom: 1px dashed #eee;
                            }
                            .info-group:last-child {
                                border-bottom: none;
                                margin-bottom: 0;
                                padding-bottom: 0;
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
                            <p>
                                <strong>Name:</strong> ${customer.firstName} ${
            customer.lastName
        }
                            </p>
                            <p><strong>Email:</strong> ${customer.email}</p>
                            <p><strong>Company:</strong> ${
                                customer.companyName
                            }</p>
                        </div>

                        <div class="section">
                            <div class="section-title">Order Details</div>
                            <p><strong>Order Number:</strong> ${salesOrderNumber}</p>
                            <p><strong>Date:</strong> ${createdAt}</p>
                            <p>
                                <strong>Total Amount:</strong> ${calculateTotalWithCurrency(
                                    totalAmount,
                                    payment.currencyRate
                                )} ${payment.currencyCode}
                            </p>
                            <p><strong>Shipping Method:</strong> ${
                                shippingInfo.shippingMethod
                            }</p>
                        </div>

                        <div class="section">
                            <div class="section-title">Suit Details</div>
                            <div class="item">
                                <img
                                    class="item-image"
                                    src=${suit?.s3url}
                                    alt=${suit?.name}
                                />
                                <div class="item-details">
                                    <p><strong>Design:</strong> ${
                                        suit?.name
                                    }</p>
                                    <p><strong>Suit Type:</strong> ${
                                        suitType?.name
                                    }</p>
                                    <p><strong>Fitting:</strong> ${
                                        orderPayload.orderDetails.tailoredFit
                                    }</p>
                                </div>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Trouser Details</div>
                            <div class="item">
                                <img
                                    class="item-image"
                                    src="${trouser?.s3url}"
                                    alt="${trouser?.name}"
                                />
                                <div class="item-details">
                                    <p><strong>Trouser Style:</strong> ${
                                        trouser?.name
                                    }</p>
                                </div>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Materials</div>

                            <h4>Fabric</h4>
                            <div class="item">
                                <img
                                    class="item-image"
                                    src="${fabric?.s3url}"
                                    alt="${fabric?.name}"
                                />
                                <div class="item-details">
                                    <p><strong>Code:</strong> ${
                                        fabric?.code
                                    }</p>
                                    <p><strong>Type:</strong> ${
                                        fabric?.name
                                    }</p>
                                </div>
                            </div>

                            <h4>Lining</h4>
                            <div class="item">
                                <img
                                    class="item-image"
                                    src="${lining?.s3url}"
                                    alt="${lining?.name}"
                                />
                                <div class="item-details">
                                    <p><strong>Code:</strong> ${
                                        lining?.code
                                    }</p>
                                </div>
                            </div>

                            <h4>Buttons</h4>
                            <div class="item">
                                <img class="item-image" src="${
                                    button?.s3url
                                }" alt="Button" />
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Measurements</div>

                            <h4>Shirt/Jacket Measurements (${unit})</h4>
                            <div class="measurements">
                                <div class="measurement-item">
                                    <strong>Chest:</strong> ${
                                        shirtMeasurement.chest
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Shoulder:</strong> ${
                                        shirtMeasurement.shoulder
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Arm Length:</strong> ${
                                        shirtMeasurement.armLength
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Arm-Shoulder Joint:</strong>
                                    ${shirtMeasurement.armShoulderJoint}
                                </div>
                                <div class="measurement-item">
                                    <strong>Arm Bicep Width:</strong>
                                    ${shirtMeasurement.armBicepWidth}
                                </div>
                                <div class="measurement-item">
                                    <strong>Jacket Width:</strong> ${
                                        shirtMeasurement.jacketWidth
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Abdomen:</strong> ${
                                        shirtMeasurement.abdomen
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Belly/Tummy:</strong> ${
                                        shirtMeasurement.bellyTummy
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Hips:</strong> ${
                                        shirtMeasurement.hips
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Neck:</strong> ${
                                        shirtMeasurement.neck
                                    }
                                </div>
                            </div>

                            <h4>Trouser Measurements (${unit})</h4>
                            <div class="measurements">
                                <div class="measurement-item">
                                    <strong>Waist:</strong> ${
                                        trouserMeasurement.waist
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Upper Hips:</strong> ${
                                        trouserMeasurement.upperHips
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Hips-Crotch (Rise):</strong>
                                    ${trouserMeasurement.hipsCrotch}
                                </div>
                                <div class="measurement-item">
                                    <strong>Hips:</strong> ${
                                        trouserMeasurement.hips
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Outseam:</strong> ${
                                        trouserMeasurement.outswarm
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Thigh:</strong>  ${
                                        trouserMeasurement.thigh
                                    }
                                </div>
                                <div class="measurement-item">
                                    <strong>Calf:</strong>  ${
                                        trouserMeasurement.calf
                                    }
                                </div>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Shipping Information</div>

                            <div class="info-group">
                                <p>
                                    <strong>Name:</strong> ${fullName}
                                </p>
                                <p><strong>Email Address:</strong> ${
                                    customer.email
                                } </p>
                                <p><strong>Phone:</strong> ${
                                    shippingInfo.phone
                                }</p>
                            </div>

                            <div class="info-group">
                                <p><strong>Company:</strong> ${
                                    customer.companyName
                                }</p>
                                <p><strong>Country/Region:</strong> ${
                                    shippingInfo.country
                                }</p>
                                <p><strong>Town/City:</strong> ${
                                    shippingInfo.city
                                }</p>
                                <p><strong>State/Province:</strong> ${
                                    shippingInfo.state
                                }</p>
                                <p><strong>Zip/Postal Code:</strong> ${
                                    shippingInfo.zipCode
                                }</p>
                            </div>

                            <div class="info-group">
                                <p><strong>Shipping Method:</strong> ${
                                    shippingInfo.shippingMethod
                                }</p>
                                <p><strong>Notes:</strong> ${
                                    shippingInfo.note
                                }</p>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Measurement Images</div>
                            <div
                                style="
                                    display: flex;
                                    flex-wrap: wrap;
                                    justify-content: space-between;
                                ">
                                ${measurementImages.forEach((image) => {
                                    `<div style="width: 48%; margin-bottom: 10px; text-align: center">
                                        <img
                                            src="${image.s3Url}"
                                            alt="${image.name}"
                                            style="max-width: 100%; border: 1px solid #ddd"
                                        />
                                    </div>`;
                                })}
                            </div>
                        </div>
                        <div class="footer">
                            <p>
                                Thank you for choosing VyxSuit. If you have any questions about
                                your order, please contact our customer service.
                            </p>
                            <p>&copy; ${createdAt} VyxSuit. All rights reserved.</p>
                        </div>
                    </body>
                </html>`;
    }
}
