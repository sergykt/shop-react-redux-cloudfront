import {
  aws_cloudfront,
  aws_cloudfront_origins,
  aws_s3,
  aws_s3_deployment,
  RemovalPolicy,
} from "aws-cdk-lib";
import { Construct } from "constructs";

const path = "./resources/build";

export class DeploymentService extends Construct {
  public readonly hostingBucket: aws_s3.Bucket;
  public readonly distribution: aws_cloudfront.Distribution;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.hostingBucket = new aws_s3.Bucket(this, "FrontendBucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
    });

    this.distribution = new aws_cloudfront.Distribution(
      this,
      "CloudfrontDistribution",
      {
        defaultBehavior: {
          origin: aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
            this.hostingBucket
          ),
          viewerProtocolPolicy:
            aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
          },
        ],
      }
    );

    new aws_s3_deployment.BucketDeployment(this, "BucketDeployment", {
      sources: [aws_s3_deployment.Source.asset(path)],
      destinationBucket: this.hostingBucket,
      distribution: this.distribution,
      distributionPaths: ["/*"],
    });
  }
}
