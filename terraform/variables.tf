variable "project" {
  default = "bars"
}

variable "service" {
  default = "mock-receiver"
}

variable "domain_name" {
  default = "dev.api.platform.nhs.uk"
}
variable "region"{
default = "eu-west-2"
}

locals {
  environment         = terraform.workspace
  name_prefix         = "${var.project}-${var.service}-${local.environment}"
  service_domain_name = "${local.environment}.${var.project}.${var.domain_name}"

  tags = {
    Project     = var.project
    Environment = local.environment
    Service     = var.service
  }
}
