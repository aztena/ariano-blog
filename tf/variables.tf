variable "aws_region" {
    type = string
    default = "ca-central-1"
}

variable "domain_name" {
    type = string
    default = "ariano.ca"
}

variable "cloudfront_s3_origin_name" {
    type = string
    default = "s3-ariano-blog"
}