import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { FRONTEND_URL } from "../constants";
import { ProductService } from "./product-service";

export class ProductStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the API Gateway REST API
    const apiGateway = new apigateway.RestApi(this, "product-api", {
      restApiName: "Product Service API",
      description: "This service serves product data.",
      defaultCorsPreflightOptions: {
        allowOrigins: [FRONTEND_URL],
        allowMethods: ["GET", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
      },
    });

    new ProductService(this, "ProductService", { apiGateway });

    new cdk.CfnOutput(this, "ProductApiEndpoint", {
      value: apiGateway.url,
      description: "The Product API endpoint URL",
      exportName: "ProductApiEndpoint",
    });
  }
}
