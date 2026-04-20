import { CfnOutput, Stack, type StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DeploymentService } from "./deployment-service";

export class DeployWebAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const deployment = new DeploymentService(this, "deployment");

    new CfnOutput(this, "CloudFrontDistributionId", {
      value: deployment.distribution.distributionId,
      description: "The CloudFront Distribution ID",
      exportName: "CloudFrontDistributionId",
    });

    new CfnOutput(this, "CloudFrontURL", {
      value: deployment.distribution.domainName,
      description: "The distribution URL",
      exportName: "CloudfrontURL",
    });

    new CfnOutput(this, "BucketName", {
      value: deployment.hostingBucket.bucketName,
      description: "The name of the S3 bucket",
      exportName: "BucketName",
    });
  }
}
